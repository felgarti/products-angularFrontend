import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

import {Router} from "@angular/router";
import {AuthentificationService} from "../../services/authentification.service";
import {Bill} from "../../model/bill.model";
import {BillService} from "../../services/bill.service";
import {ProductService} from "../../services/product.service";


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  bills! : Array<Bill>;
  errorMessage! : string;
  searchFormGroup! : FormGroup;
  currentAction : string = "all";

  constructor(private billService : BillService,
              private formBuilder : FormBuilder,
              public authService : AuthentificationService,
              private router : Router ,
              private productService : ProductService
  ) { }

  ngOnInit(): void {
    this.getAllBills();
    this.searchFormGroup = this.formBuilder.group({
      keyword : this.formBuilder.control(null)
    });
  }

  getAllBills(){
    this.billService.findAll().subscribe({
      next : (value) => {
        // @ts-ignore
        this.bills = value["_embedded"]["bills"];
        this.bills.forEach((bill)=>{
          console.log(bill.customrId)
          this.billService.getCustomer(bill.customrId).subscribe({
            next : (k) => {
              bill.customer = k;
            }

          })
// @ts-ignore
          bill.id=+(bill["_links"]["bill"]["href"][bill["_links"]["bill"]["href"].length-1])
          console.log(bill.id)
          this.billService.getProductItem(bill.id).subscribe({
            next : (v)=>{
              bill.productItems= v["_embedded"]["productItems"]
              bill.productItems.forEach((pi)=>{

                this.productService.getProduct(pi.productId.toString()).subscribe({
                  next : value1 => {
                    pi.product=value1
                    console.log(pi.product)
                  }
                })
              })
            }
          })


        })
      }
    });
  }



  handleSearchBills() {
    this.currentAction = "search";
    let keyword = this.searchFormGroup.value.keyword;
    if (keyword=="" || keyword==null){
      this.getAllBills();
    } else {
      this.billService.searchBill(keyword).subscribe({
        next:(data)=>{
          this.bills = data;
        }
      });
    }
  }

  handleNewBill() {
    this.router.navigateByUrl("/admin/newCustomer").then( () => {
    });
  }



}
