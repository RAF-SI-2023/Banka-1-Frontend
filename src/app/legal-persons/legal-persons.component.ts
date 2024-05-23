import { Component } from '@angular/core';
import { LegalPerson} from '../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LegalPersonService } from '../service/legal-person.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-legal-persons',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './legal-persons.component.html',
  styleUrl: './legal-persons.component.css'
})
export class LegalPersonsComponent {
  // Initially set the first tab as active (This page only has one tab for now)
  activeTab: string = 'overviewTab';

  // Function to change the active tab (This page only has one tab for now)
  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  public allLegalPersons: LegalPerson[] = [];
  loggedUserId:number = -1;

  constructor(private legalPersonService: LegalPersonService, private router: Router) {
    let loggedUserIdAsString = sessionStorage.getItem('loggedUserID');
    
    if (loggedUserIdAsString !== null) {
      this.loggedUserId = parseInt(loggedUserIdAsString);
    } else {
      console.log('Error occurred: logged user id cannot be null!');
    }
   }

   ngOnInit() {
    this.loadAllLegalPersons();
  }

   loadAllLegalPersons()
   {
    this.legalPersonService.getAllLegalPersons().subscribe(
      (allLegalPersonsData: LegalPerson[]) => {
        this.allLegalPersons = allLegalPersonsData;

        console.log('All legal persons data loaded');
        console.log(this.allLegalPersons);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading users:', error);
      }
    );
   }


   joinCustomer(legalPerson: LegalPerson, idx: number){
    console.log("Join pressed for legal peron at idx " + idx);
    console.log(legalPerson);

    // const dialogRef=this.popupService.openEditRecipientPopup(recipient);
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result && result.success) {
    //     this.loadAllUserRecipients();
    //   }
    // });
  }

  addNewLegalPerson(){
    console.log("Adding new legal person pressed");

    // const dialogRef=this.popupService.openEditRecipientPopup(recipient);
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result && result.success) {
    //     this.loadAllUserRecipients();
    //   }
    // });
  }
}
