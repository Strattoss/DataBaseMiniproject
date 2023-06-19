import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Trip } from '../../models/trip';
import { TravelService } from '../../services/travel.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent {
  @Input() travel : Trip
  reservedTickets = 0
  warning = "Zarezerwuj już dziś!"
  ts
  cs

  constructor(ts : TravelService, cs : CartService) {
    this.ts = ts
    this.cs = cs  
  }

  isFinished(end : Date) {
    return new Date(end) < new Date()
  }

  isCurrent(start : Date, end : Date) {
    return new Date(start) < new Date() && new Date(end) > new Date()
  }

  delete() : void {
    this.reservedTickets = 0
    this.ts.deleteTravel(this.travel)
  }
}
