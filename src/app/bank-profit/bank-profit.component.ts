import { Component, OnInit } from '@angular/core';
import { User} from '../model/model';
import { CommonModule, DatePipe, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Profit } from '../model/model';
import { ProfitService } from '../service/profit.service';
import {UserService} from "../service/employee.service";
import {TableComponentModule} from "../welcome/redesign/TableComponent";
import {map, mergeMap} from "rxjs/operators";
import {catchError, forkJoin, of} from "rxjs";

@Component({
  selector: 'app-bank-profit',
  standalone: true,
  imports: [DatePipe, NgForOf, NgIf, CommonModule, FormsModule, TableComponentModule],
  templateUrl: './bank-profit.component.html',
  styleUrl: './bank-profit.component.css'
})
export class BankProfitComponent implements OnInit {
  public headers = ['Name', 'Total Profit', 'Phone Number', 'Email'];
  selectedTab: string = 'profits';
  public agents: User[] = [];
  public profits: Profit[] = [];
  public bankProfit: number = 0;
  loggedUserId: number = -1;

  constructor(private profitService: ProfitService, private userService: UserService) {
    let loggedUserIdAsString = sessionStorage.getItem('loggedUserID');
    if (loggedUserIdAsString !== null) {
      this.loggedUserId = parseInt(loggedUserIdAsString);
    } else {
      console.log('Error occurred: logged user id cannot be null!');
    }
  }

  async ngOnInit() {
    this.loadAgentProfits();
  }

  public loadAgentProfits(): void {
    this.userService.getEmployees().pipe(

      // Ako hocemo sve da prikazemo profit za sve zaposlene zakomentarisati liniju ispod
      map(employees => employees.filter(employee => employee.position.toLowerCase() === 'agent')),

      mergeMap(employees => {
        const profitRequests = employees.map(employee =>
          this.profitService.getAgentProfit(employee.userId).pipe(
            map(profit => ({
              name: employee.firstName + ' ' + employee.lastName,
              totalProfit: profit || 0, // Ako profit nije dostupan, postavljamo na 0
              phoneNumber: employee.phoneNumber,
              email: employee.email
            } as Profit)),

            catchError(error => {
              console.error(`Error loading profit for user ${employee.userId}:`, error);
              return of({
                name: employee.firstName + ' ' + employee.lastName,
                totalProfit: 0,
                phoneNumber: employee.phoneNumber,
                email: employee.email
              } as Profit);
            })

          )

        );

        return forkJoin(profitRequests);
      })
    ).subscribe(
      (employeeProfits: Profit[]) => {
        this.profits = employeeProfits;
        this.bankProfit = this.profits.reduce((acc, profit) => acc + profit.totalProfit, 0);
        console.log('Bank profit:', this.bankProfit);
        console.log('Employees with profit:', this.profits);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading employees with profit:', error);
      }
    );
  }

  setTab(tabName: string) {
    this.selectedTab = tabName;
  }

  refresh() {
    this.ngOnInit().then();
  }

}

