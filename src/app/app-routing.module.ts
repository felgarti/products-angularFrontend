import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products/products.component";

import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {NewProductComponent} from "./products/new-product/new-product.component";
import {EditProductComponent} from "./products/edit-product/edit-product.component";
import {CustomersComponent} from "./customers/customers/customers.component";
import {NewCustomerComponent} from "./customers/new-customer/new-customer.component";
import {EditCustomerComponent} from "./customers/edit-customer/edit-customer.component";
import {BillsComponent} from "./bills/bills/bills.component";
import {EditBillsComponent} from "./bills/edit-bills/edit-bills.component";



const routes: Routes = [

  {path: "login" , component : LoginComponent} ,
  {path: "" , component : LoginComponent} ,
{path: "admin" , component : AdminTemplateComponent , canActivate:[AuthenticationGuard],  children : [
    {path: "products" , component : ProductsComponent},
    {path: "newProduct" , component : NewProductComponent},
    {path: "editProduct/:id" , component : EditProductComponent} ,
    {path : "customers", component : CustomersComponent},
    {path : "newCustomer", component : NewCustomerComponent},
    {path : "editCustomer/:id", component : EditCustomerComponent},
    {path : "bills", component : BillsComponent},
    {path : "editBill/:id", component : EditBillsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
