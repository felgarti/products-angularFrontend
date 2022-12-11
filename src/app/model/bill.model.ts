import {Customer} from "./customer.model";
import {ProductItem} from "./productItem";

export interface Bill {
  id : number;
  billingDate : Date;
  customrId : number;
  productItems : ProductItem[];
  customer : Customer;
}
