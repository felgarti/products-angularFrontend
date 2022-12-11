import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {ValidationErrors} from "@angular/forms";
import { ProductService } from './product.service';
import {CustomerService} from "./customer.service";
import {Bill} from "../model/bill.model";
import {Customer} from "../model/customer.model";
import {ProductItem} from "../model/productItem";


@Injectable({
  providedIn: 'root'
})
export class BillService {


  private readonly billsServiceUrl: string;

  constructor(private http: HttpClient,
              private productService : ProductService,
              private customerService : CustomerService
  ) {

    this.billsServiceUrl = 'http://localhost:8083/bills';
  }

  public findAll(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.billsServiceUrl);
  }

  public getCustomer(id: number) : Observable<Customer> {
    return this.customerService.getCustomer(id);
  }


  public searchBill(keyword:string):Observable<Array<Bill>>{
    let result = new Array<Bill>();
    this.findAll().subscribe({
      next : (bills) => {
        bills.forEach((bill) => {
          bill.productItems.forEach((productItem) => {
            if(productItem.productName.toLowerCase().includes(keyword.toLowerCase())){
              result.push(bill);
              return;
            }
          })
        })
      }
    })
    return of(result)
  }

  public addNewBill(bill : Bill) : Observable<Bill>{
    return this.http.post<Bill>(this.billsServiceUrl,bill);
  }

  public getBill(id : number) : Observable<Bill> {
   return this.http.get<Bill>(this.billsServiceUrl + "/" + id)

  }

  public getErrorMessage(fieldName: string, errors: ValidationErrors) {
    if(errors['required']) {
      return fieldName + " is Required";
    } else if (errors['min']){
      return fieldName + " should have at least a value of "+ errors['min']['min'];
    } else if (errors['minlength']){
      return fieldName + " should have at least "+ errors['minlength']['requiredLength']+" Characters";
    } else if (errors['email']){
      return "Please enter a valid "+ fieldName;
    }
    else return "";
  }

  public updateBill(bill : Bill) : Observable<Bill> {
    return this.http.put<Bill>(this.billsServiceUrl + "/" + bill.id, bill);
  }
  public getProductItem(id : number) : Observable<any>{
   return  this.http.get<any>(this.billsServiceUrl + "/" + id+"/productItems")
  }
}
