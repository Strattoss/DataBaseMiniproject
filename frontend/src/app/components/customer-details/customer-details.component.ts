import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Customer } from '../../models/customer';
import { Purchase } from '../../models/purchase';
import { Reservation } from 'src/app/models/reservation';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {
  cs
  customer : Customer

  constructor(private route: ActivatedRoute, private cartService: CartService) {    
    this.cs = cartService
    route.params.subscribe(params => this.cs.getCustomerByKey(params['key']).subscribe(res => this.customer = res))
  }

  checkStatus(r: Reservation) {
    const startdate = new Date(r.startDate)
    const enddate = new Date(r.endDate)
    const today = new Date()
    if(startdate > today) return "przyszła"
    else if (enddate > today) return "aktywna"
    else return "archiwalna"
  }
}
