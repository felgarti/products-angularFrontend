import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products/products.component';

import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import {HttpClientModule} from "@angular/common/http";
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { NewCustomerComponent } from './customers/new-customer/new-customer.component';
import {CustomersComponent} from "./customers/customers/customers.component";
import { BillsComponent } from './bills/bills/bills.component';
import { EditBillsComponent } from './bills/edit-bills/edit-bills.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CustomersComponent,
    LoginComponent,
    AdminTemplateComponent,
    NewProductComponent,
    EditProductComponent,
    EditCustomerComponent,
    NewCustomerComponent,
    BillsComponent,
    EditBillsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
      HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
