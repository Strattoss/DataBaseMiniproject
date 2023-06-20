import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Customer } from '../../models/customer';
import { Purchase } from '../../models/purchase';
import { Reservation } from 'src/app/models/reservation';
import { Cancelled } from 'src/app/models/cancelled';
import { DBService } from 'src/app/services/db.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {
  customer : Customer
  reservations : Reservation[] = []
  purchases : Purchase[] = []
  cancelled : Cancelled[] = []

  constructor(private route: ActivatedRoute, private dbService: DBService) {    
    route.params.subscribe(params => this.dbService.getCustomerByKey(params['key']).subscribe(res => {
      this.customer = res
      this.dbService.getReservations(this.customer._id).subscribe(res => {
        this.reservations = res
      })
      this.dbService.getPurchases(this.customer._id).subscribe(res => {
        this.purchases = res
      })
      this.dbService.getCancelled(this.customer._id).subscribe(res => {
        this.cancelled = res
      })
    }))
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
