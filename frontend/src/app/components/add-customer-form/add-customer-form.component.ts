import { Component } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-add-customer-form',
  templateUrl: './add-customer-form.component.html',
  styleUrls: ['./add-customer-form.component.css']
})
export class AddCustomerFormComponent {
  cs
  
  model : Customer = {
    _id : "",
    numberOfReservations : 0,
    reservations: [],

    firstName : "",
    lastName : "",
    username: "",
    phoneNumber: "",
    email: "",
    address: {
      country: "",
      city: "",
      street: "",
      postalCode: "",
      buildingNumber: 0,
      apartmentNumber: 0
    }
  }
  

  constructor(private service : CartService) {
    console.log("dobrze");
    
    this.cs = service
  }

  onSubmit() {             
    this.cs.newCustomer(this.model)
  
    this.model = {
      _id : "",
      numberOfReservations : 0,
      reservations: [],
  
      firstName : "",
      lastName : "",
      username: "",
      phoneNumber: "",
      email: "",
      address: {
        country: "",
        city: "",
        street: "",
        postalCode: "",
        buildingNumber: 0,
        apartmentNumber: 0
      }
    }
  }
}
