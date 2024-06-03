import { Component, OnInit } from '@angular/core';
import { User} from '../model/model';
import { CommonModule, DatePipe, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BankAccountService } from '../service/bank-account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from '../service/payment.service';
import { CardService } from "../service/card.service";
import { Profit } from '../model/model';
import { ProfitService } from '../service/profit.service';
import {UserService} from "../service/employee.service";
import {forkJoin} from "rxjs";
import {map} from "rxjs/operators";
import {TableComponentModule} from "../welcome/redesign/TableComponent";

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

  ngOnInit() {
    this.loadAgents();
    this.loadBankProfit();
    this.loadAgentProfits();
  }

  loadAgentProfits() {
    this.profits = [
      {
        name: 'Milan Aleksic',
        totalProfit: 15000,
        phoneNumber: '123-456-7890',
        email: 'banka@example.com'
      },
      {
        name: 'Petar Popovic',
        totalProfit: 12000,
        phoneNumber: '098-765-4321',
        email: 'bankb@example.com'
      },
      {
        name: 'Ana Maljkovic',
        totalProfit: 18000,
        phoneNumber: '555-555-5555',
        email: 'bankc@example.com'
      }
    ];
  }

  loadBankProfit() {
    this.bankProfit = this.profits.reduce((acc, profit) => acc + profit.totalProfit, 0);
  }

  private loadAgents() {
    this.userService.getEmployees().subscribe(
      (data: User[]) => {
        this.agents = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading agents:', error);
      }
    );
  }

  // loadAgentProfits() {
  //   this.userService.getEmployees().subscribe(
  //     (agents: User[]) => {
  //       this.agents = agents;
  //
  //       const profitObservables = agents.map(agent =>
  //         this.profitService.getAgentProfit(agent.userId).pipe(
  //           map((profit: number) => ({
  //             name: agent.firstName + ' ' + agent.lastName,
  //             totalProfit: profit,
  //             phoneNumber: agent.phoneNumber,
  //             email: agent.email
  //           }))
  //         )
  //       );
  //
  //       forkJoin(profitObservables).subscribe(
  //         (profits: Profit[]) => {
  //           this.profits = profits;
  //           console.log('Agent profits:', this.profits);
  //         },
  //         (error: HttpErrorResponse) => {
  //           console.error('Error loading agent profits:', error);
  //         }
  //       );
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.error('Error loading agents:', error);
  //     }
  //   );
  // }
  //
  // loadBankProfit() {
  //   this.profitService.getAllProfit().subscribe(
  //     (profit: number) => {
  //       this.bankProfit = profit;
  //       console.log('Bank profit:', this.bankProfit);
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.error('Error loading bank profit:', error);
  //     }
  //   );
  // }
  //

  setTab(tabName: string) {
    this.selectedTab = tabName;
  }

}

