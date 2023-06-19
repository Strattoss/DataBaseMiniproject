import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
// import { Opinion } from '../../models/review';
import { Trip } from '../../models/trip';
import { TravelService } from '../../services/travel.service';
import { Review } from 'src/app/models/review';
// import { TravelClass } from '../../models/u_travelClass';

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.component.html',
  styleUrls: ['./travel-details.component.css']
})
export class TravelDetailsComponent {
  imgIndex = 0
  allImages : string[]
  reservedTickets = 1
  hideForm = true
  travel: Trip
  comment = ""
  rating = 0

  cs
  ts
  
  constructor(private travelService: TravelService, private route: ActivatedRoute, private cartService: CartService) {    
    this.cs = cartService
    this.ts = travelService
    route.params.subscribe(params => this.ts.getTravelByKey(params['key']).subscribe(res => {
      this.travel = res      
      this.allImages = [`/assets/images/${this.travel.destination}.jpg`, 
                        `/assets/images/${this.travel.destination}2.jpg`,
                        `/assets/images/${this.travel.destination}3.jpg`,]      
    }))
  }

  nextImage() { this.imgIndex = (this.imgIndex + 1) % this.allImages.length}
  prevImage() { this.imgIndex = (this.imgIndex - 1 + this.allImages.length) % this.allImages.length}

  isFinished(end : Date) {
    return new Date(end) < new Date()
  }
  isCurrent(start : Date, end : Date) {
    return new Date(start) < new Date() && new Date(end) > new Date()
  }

  reserve() : void {    
    this.reservedTickets = 1
    this.cs.reserve(this.travel._id, this.reservedTickets, this.travel.unitPrice) 
  }

  showForm() {
    this.hideForm = false
    this.comment = ""
    this.rating = 0
  }

  onSubmit() { 
    this.ts.newOpinion(this.travel._id, this.cs.purchaseForThisTrip(this.travel._id), this.comment, this.rating)

    this.hideForm = true
  }
}
