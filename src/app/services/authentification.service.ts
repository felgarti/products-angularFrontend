import { Injectable } from '@angular/core';
import {AppUser} from "../model/user.model";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
users : AppUser[]=[];
authenticatedUser : AppUser|undefined ;
  constructor() {
    this.users.push({userId : UUID.UUID() , username : "user1" , password : "1234" , roles :["USER"] }) ;
    this.users.push({userId : UUID.UUID() , username : "user2" , password : "1234" , roles :["USER"] }) ;
    this.users.push({userId : UUID.UUID() , username : "admin" , password : "1234" , roles :["USER", "ADMIN"] }) ;
  }
  public  login(username : string , password : string ) : Observable<AppUser>
  {
              let appuser= this.users.find(value => value.username==username ) //23:11 mins
if(!appuser){
  return throwError(()=> new Error("User not found "))
}
if(appuser.password!=password)  return throwError(()=> new Error("Wrong credentials  "))
  return  of(appuser) ;


  }
  public authenticateUser(appuser : AppUser)
  {
    this.authenticatedUser=appuser ;
    localStorage.setItem("authUser",JSON.stringify({username : appuser.username ,
    roles : appuser.roles , jwt: "JWT_TOKEN"}) ) ;
    return of(true) ;
  }
  public hasRole( role : String):boolean{
    return this.authenticatedUser!.roles.includes(role) ;

  }
  public isAuthenticated(){
    return this.authenticatedUser!=undefined ;
  }
  public  logout(): Observable<Boolean>{
    this.authenticatedUser=undefined ;
    localStorage.removeItem("authUser") ;
    return of(true) ;
  }
}
