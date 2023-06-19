import { Injectable } from '@angular/core';
import { DBService } from './db.service';
import { Reservation } from '../models/reservation';
import { Trip } from '../models/trip';
import { TravelService } from './travel.service';
import { Observable } from 'rxjs';
import { Purchase } from '../models/purchase';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  reservations : Reservation[] = []
  purchases : Purchase[] = []
  
  fullPrice = 0
  fullReservations = 0

  constructor(private dbService: DBService, private ts: TravelService) { 
    this.dbService.getReservations("6447a9ead297195ac0dd240c").subscribe(res => {
      this.reservations = res
      this.fullReservations = this.reservations.map(r => r.tickets).reduce((a, b) => a + b, 0)      
      this.fullPrice = this.reservations.map(r => r.tickets * r.price).reduce((a, b) => a + b, 0)
    })
    this.dbService.getPurchases("6447a9ead297195ac0dd240c").subscribe(res => {
      this.purchases = res
    })
  }

  purchaseForThisTrip(tripId: string) {    
    for(const purchase of this.purchases) {
      console.log(purchase.tickets);
      if(purchase.tripId === tripId) {
        if(purchase.review)
          return ''
        else
          return purchase._id
      }
    }
    return ''
  }

  reserve(tripId: string, tickets: number, price: number) {        
    this.dbService.newReservation(tripId, tickets, price, "6447a9ead297195ac0dd240c")
  }

  resign(tripId : string, reservationId: string) { 
    this.dbService.resignReservation(tripId, reservationId)
  }

  buy(tripId : string, reservationId: string) {
    this.dbService.newPurchase(tripId, reservationId)
  }
}
