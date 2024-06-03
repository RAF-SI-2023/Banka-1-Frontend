import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer, CustomerTable, User } from '../model/model';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { PopupService } from '../service/popup.service';
import { TableComponentModule } from "../welcome/redesign/TableComponent";
import { TransformCustomerPipe } from '../transform-customer.pipe';

@Component({
    selector: 'app-customer',
    standalone: true,
    templateUrl: './customer.component.html',
    styleUrl: './customer.component.css',
    imports: [CommonModule, FormsModule, TableComponentModule, TransformCustomerPipe]
})
export class CustomerComponent implements OnInit{
  customers: Customer[] = [];
  headers: string[] = ['Name', 'Email', 'JMBG', 'Phone number', 'Gender', 'Address']

  constructor(
    private customerService: CustomerService,
    private router:Router,
    private popup:PopupService
    ) { }


  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (customers: Customer[]) => {
        this.customers = customers;
        console.log(customers);
      },
      error: (error: any) => {
        this.popup.openPopup("Error", "Failed to load customers: " + error.error);
      }
    });
  }

  public position:string='';
  public firstName:string='';
  public lastName:string='';
  public email:string='';

  search(){
    this.customers = this.customers.filter((cust:Customer) => {
      if(this.email === '') {
        return true;
      }

      return cust.email.includes(this.email);
    })

    this.customers = this.customers.filter((cust:Customer) => {
      if(this.firstName === '') {
        return true;
      }

      return cust.firstName.includes(this.firstName);
    })

    this.customers = this.customers.filter((cust:Customer) => {
      if(this.lastName === '') {
        return true;
      }

      return cust.lastName.includes(this.lastName);
    })
  }

  togglePopupAddCustomer(){
    this.popup.openAddCustomerPopup();
  }

  viewCustomer(customerEmail: string) {
    const customer = this.customers.find((cust:Customer) => cust.email === customerEmail);

    if(!customer) return;

    this.customerService.setSelectedCustomer(customer);
    const queryParams = {
      queryParams : {customerName: customer.firstName + " " + customer.lastName, customerId: customer.userId}}

    this.router.navigate(['/customer/view'], queryParams);
  }

  editCustomer(customerEmail: string) {
    const customer = this.customers.find((cust:Customer) => cust.email === customerEmail);

    if(!customer) return;

    this.customerService.setCustomerForEdit(
      {
        id: customer.userId,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        jmbg: customer.jmbg,
        phoneNumber: customer.phoneNumber,
        address: customer.address,
        gender: customer.gender,
        password: '',
        active:false,
        dateOfBirth: 0
      }
    );
    this.popup.openUpdateCustomerPopup();
  }

  deleteCustomer(customerId: number) {
    this.customerService.deleteCustomer(customerId).subscribe(
      (response) => {
        if (response) {
          this.popup.openPopup("Success", "Customer successfully deleted.");
          this.customers = this.customers.filter((customer) => customer.userId !== customerId);
        } else {
          this.popup.openPopup("Error", "Failed to delete customer.");
        }
      },
      (error) => {
        console.error('Error while deleting customer: ', error);
        this.popup.openPopup("Error", "Failed to delete customer.");
      }
    );
  }


}
