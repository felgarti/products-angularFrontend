import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../model/product.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId! : string
  product! : Product
  productFormGroup! : FormGroup
  constructor(private fb : FormBuilder , private route : ActivatedRoute , private router : Router, public  productService : ProductService) {
    this.productId=this.route.snapshot.params['id'] ;
  }

  ngOnInit(): void {
this.productService.getProduct(this.productId).subscribe({
  next : (product)=>{
    this.product=product ;
    this.productFormGroup=this.fb.group({
      name : this.fb.control(this.product.name , [Validators.required , Validators.minLength(4)]) ,
      price :  this.fb.control(this.product.price , Validators.required ) ,
      promotion :  this.fb.control(this.product.promotion , Validators.required )
    })
  }, error : err => {
    console.log('error')
  }
}) ;

  }

  handleUpdateProduct() {
let p = this.productFormGroup.value ;
p.id=this.product.id ;
this.productService.updateProduct( p , p.id).subscribe({
  next : (prod)=>{
    alert('Product update successfully')
    this.router.navigateByUrl('/admin/products')
  } , error: err => {
    console.log('error')
  }
})
  }
}
