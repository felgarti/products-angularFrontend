import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../model/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthentificationService} from "../../services/authentification.service";
import {Route, Router} from "@angular/router";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products!  :  Array<Product>  ;
  errorMessage! :string ;
  searchFormGroup! : FormGroup ;
  currentPage : number=0 ;
  pageSize : number=20 ;
  totalPages : number=0 ;
  currentAction : string="all" ;

//1h06
  constructor(  public  authService  : AuthentificationService,private  productService : ProductService , private fb : FormBuilder , private  router : Router) {

  }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control( null)

    });
this.handleGetPageProducts() ;

  }

  handleGetAllProducts()
  {
    this.productService.getAllProducts().subscribe({
      next : value => {
        // @ts-ignore
        this.products=value["_embedded"]["products"]

      } , error : err => {
        console.log('lol error ')
      }
    }) ; ;

  }
  handleGetPageProducts()
  {
    let  index=this.currentPage*this.pageSize ;


    this.productService.getPageProducts(this.currentPage , this.pageSize).subscribe({
        next : value => {

          // @ts-ignore

        this.products=value["_embedded"]["products"]
          console.log(this.products)
         // @ts-ignore
          let pageProducts= this.products.slice(index,index+this.pageSize) ;

// @ts-ignore
          this.totalPages = value["_embedded"]["page"]["totalPages"]

          if(this.products.length% this.pageSize!= 0)
            this.totalPages++ ;
        } ,
      error : (error) => {
          console.log('error')
        }
      }
    ) ;
  }




  handleDeleteProduct(p: Product) {
    let conf=confirm("Are you sure ? ") ;
    if(conf==false) return ;
    this.productService.deleteProduct(p.id).subscribe({
      next : (data)=>
      {
        this.handleGetPageProducts();
      }
    }) ;
//
  }

  handleSetPromotion(p: Product) {
    let  promo=p.promotion ;
    this.productService.setPromotion(p.id , p).subscribe(
      {
        next: (data)=>{

        } , error:err => {
          this.errorMessage=err ;
        }
      }
    )
  }

  handleSearchProducts() {
    this.currentPage=0 ;
    this.currentAction="search" ;
    let keyword = this.searchFormGroup.value.keyword ;
    this.productService.searchProducts(keyword ,this.currentPage ,  this.pageSize).subscribe({
      next :(value)=>{
        this.currentPage=value.page
        this.pageSize=value.size
        this.totalPages= value.totalPages

        value.products.subscribe({
          next : data => {
            // @ts-ignore
            // @ts-ignore
            this.products=data["_embedded"]["products"]
            console.log(this.products[0])
          } , error : err => {
            console.log('lol error product')
          }
        }) ;

      }
    }) ;

  }

  gotoPage(i: number) {
    this.currentPage = i;
    if(this.currentAction=="all") {

      this.handleGetPageProducts();
    }
    else {
      this.handleSearchProducts() ;
    }

  }

  handleNewProduct() {
    this.router.navigateByUrl("admin/newProduct")
  }

  handleEditProduct(p: Product) {
    this.router.navigateByUrl("admin/editProduct/"+p.id)
  }
}


//     this.productService.getPageProducts(this.currentPage , this.pageSize).subscribe({
//       next : value => {
//         this.currentPage=value.page
//         this.pageSize=value.size
//         this.totalPages= value.totalPages
//
//         value.products.subscribe({
//           next : data => {
//             // @ts-ignore
//             // @ts-ignore
//             this.products=data["_embedded"]["products"]
//
//           } , error : err => {
//             console.log('lol error product')
//           }
//         }) ;
//       } , error : err => {
//         console.log('lol error get page')
//       }
//     }) ;
// //
//
//
