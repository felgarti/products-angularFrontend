import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthentificationService} from "../services/authentification.service";
import {AppUser} from "../model/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
userFormGroup! : FormGroup ;
errorMessage! : string ;
  constructor(private fb : FormBuilder ,  private router : Router,private  auth : AuthentificationService ) {

  }

  ngOnInit(): void {
    this.userFormGroup=this.fb.group({
      username : this.fb.control("" ) ,
      password : this.fb.control("")
    })
  }

  handleLogin() {
let username = this.userFormGroup.value.username ;
let password = this.userFormGroup.value.password ;
this.auth.login(username , password).subscribe({
  next : (appuser : AppUser)=>{
    this.auth.authenticateUser(appuser).subscribe({
      next : ()=>{
        this.router.navigateByUrl("/admin") ;
      }
    }) ;
    } ,
  error : (err)=>{
this.errorMessage=err ;
  }
}) ;
  }

}
