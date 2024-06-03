import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {Margin} from "../model/model";
import {HttpClient} from "@angular/common/http";
import {PopupService} from "../service/popup.service";
import {TableComponentMarginModule} from "../welcome/redesign/TableComponentMargin";
import {Router} from "@angular/router";
import {GrayButtonModule} from "../welcome/redesign/GrayButton";
import {MarginService} from "../service/margin.service";

@Component({
  selector: 'app-margin',
  standalone: true,
  imports: [
    NgIf,
    OrangeButtonModule,
    GrayButtonModule,
    TableComponentMarginModule,
  ],
  templateUrl: './margin.component.html',
  styleUrl: './margin.component.css'
})
export class MarginComponent {
  headersMargins = [
    'Margin Account',
    'Currency',
    'Security',
    'Invested Funds',
    'Borrowed Funds',
    'Maintenance Margin',
    'Margin Call'
  ];
  selectedTab: string = 'margin_accounts';
  margins: Margin[] = [];

  constructor(
    private http: HttpClient,
    private popup: PopupService,
    private router: Router,
    private marginService: MarginService
  ) {}

  async ngOnInit() {
    this.loadMargins();
  }

  async loadMargins() {
    this.http.get<Margin[]>('/assets/mocked_banking_data/margin-mocked.json').subscribe(data => {
      this.margins = data
      console.log('Margins:', this.margins);
    });

    // this.margins = await this.marginService.getAllMargins();
  }

  setTab(tabName: string) {
    this.selectedTab = tabName;
  }

  navigateToDetails(accountNumber: string|undefined) {
    this.router.navigate(['/margin-transaction-details', accountNumber]);
  }

  openPopUp(row: any) {
    this.popup.openMarginCallPopup(row);
  }
}
