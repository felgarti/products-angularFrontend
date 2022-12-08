import {Observable} from "rxjs";

export interface Product
{
  id: string ;
  name : string ;
  price : number ;
  promotion : boolean ;
  quantity : number ;
}

export interface PageProduct{
  products :Observable< Product[]> ;
  page : number ;
  size : number ;
  totalPages : number ;
}
