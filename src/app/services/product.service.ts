import { Injectable } from '@angular/core';
import {map, Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../model/product.model";
import {UUID} from "angular2-uuid";
import {ValidationErrors} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private  products! : Array<Product> ;
  private  test! : any ;

  constructor(private  http : HttpClient) {}


//   public  getProducts() {
//     this.http.get<Array<Product>>(environment.backendHost + "/products/").subscribe({
//       next : value => {
//         // @ts-ignore
//         // @ts-ignore
//         this.products=value._embedded.products
// return this.products
//       } , error : err => {
//         console.log('lol error ')
//       }
//     }) ;
//
//   }

  public  getAllProducts():Observable<Array<Product>>
  {
    this.products=[]

       return this.http.get<Array<Product>>(environment.backendHost + "/products/") ;
  }
  public  getPageProducts(page : number , size : number):Observable<Array<Product>>
  {
    return this.http.get<Array<Product>>(environment.backendHost + "/products?page="+page+"&size="+size) ;

  };



  public deleteProduct(id : string ):Observable<boolean>
  {
   return this.http.delete<boolean>(environment.backendHost +"/products/"+id)
  }
  public setPromotion(id : string , p : Product) : Observable<any>{
 p.promotion=!p.promotion
    return this.updateProduct(p , id) ;
  }
  public searchProducts(keyword : string ,page : number , size : number) : Observable<PageProduct>
  {
    let result = this.products.filter(p=>p.name.includes(keyword)) ;
    let  index=page*size ;
    let totalPages = ~~ (result.length/size);

    if(this.products.length% size!= 0)
      totalPages++ ;
    console.log("total : " + totalPages)
    let pageProducts= result.slice(index,index+size) ;
    return  of({page:page , size:size , totalPages : totalPages , products : of(pageProducts)}) ;

  }
  public addNewProduct(product : Product) : Observable<Product>{

    return this.http.post<Product>(environment.backendHost +"/products",product)
  }

  public getProduct(id : string ) : Observable<Product>{
    return this.http.get<Product>(environment.backendHost +"/products/"+id)
  }


  getErrorMessage(field: string, errors: ValidationErrors):string {
    if (errors['required']) {
      return field + " is required";
    }
    else if (errors['minlength']){
      return  field + " should have at least "+errors['minlength']['requiredLength']+ " characters " ;

    }else{
      return "";
    }
  }


  public updateProduct(product:Product,id:string):Observable<any>{
    return this.http.put(environment.backendHost+"/products/"+id,product);
  }
}







