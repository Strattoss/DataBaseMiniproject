import { Injectable } from '@angular/core';
import { DBService } from './db.service';
import { Reservation } from '../models/reservation';
import { Trip } from '../models/trip';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';
import { Purchase } from '../models/purchase';
import { Cancelled } from '../models/cancelled';
import { TravelService } from './travel.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  reservations : Reservation[] = []
  purchases : Purchase[] = []
  cancelled: Cancelled[] = []
  customers: Customer[] = []
  currentCustomer : Customer
  startCustomerId = "6447a9ead297195ac0dd240c"

  ts

  fullPrice = 0
  fullReservations = 0

  constructor(private dbService: DBService, private tService : TravelService ) { 
    this.ts = tService
    this.dbService.getCustomers().subscribe(res => this.customers = res)
    this.dbService.getCustomerByKey(this.startCustomerId).subscribe(res => {
      this.currentCustomer = res
      
      this.dbService.getReservations(this.currentCustomer._id).subscribe(res => {
        this.reservations = res
        this.fullReservations = this.reservations.map(r => r.tickets).reduce((a, b) => a + b, 0)      
        this.fullPrice = this.reservations.map(r => r.tickets * r.price).reduce((a, b) => a + b, 0)
      })
      this.dbService.getPurchases(this.currentCustomer._id).subscribe(res => {
        this.purchases = res
      })
      this.dbService.getCancelled(this.currentCustomer._id).subscribe(res => {
        this.cancelled = res
      })
    })
  }

  refreshCustomer() {    
    console.log(this.reservations);
    
    this.dbService.getReservations(this.currentCustomer._id).subscribe(res => {
      this.reservations = res
      this.fullReservations = this.reservations.map(r => r.tickets).reduce((a, b) => a + b, 0)      
      this.fullPrice = this.reservations.map(r => r.tickets * r.price).reduce((a, b) => a + b, 0)
      console.log(this.reservations);
    })
    this.dbService.getPurchases(this.currentCustomer._id).subscribe(res => {
      this.purchases = res
    })
    this.dbService.getCancelled(this.currentCustomer._id).subscribe(res => {
      this.cancelled = res
    })
  }

  changeCustomer(id: string) {
    this.dbService.getCustomerByKey(id).subscribe(res => {
      this.currentCustomer = res
      
      this.dbService.getReservations(this.currentCustomer._id).subscribe(res => {
        this.reservations = res
        this.fullReservations = this.reservations.map(r => r.tickets).reduce((a, b) => a + b, 0)      
        this.fullPrice = this.reservations.map(r => r.tickets * r.price).reduce((a, b) => a + b, 0)
      })
      this.dbService.getPurchases(this.currentCustomer._id).subscribe(res => {
        this.purchases = res
      })
      this.dbService.getCancelled(this.currentCustomer._id).subscribe(res => {
        this.cancelled = res
      })
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
    this.ts.refreshTravels()
    this.refreshCustomer()
  }

  resign(tripId : string, reservationId: string) { 
    this.dbService.resignReservation(tripId, reservationId)
    this.ts.refreshTravels()
    this.refreshCustomer()
  }

  buy(tripId : string, reservationId: string) {
    this.dbService.newPurchase(tripId, reservationId)
    this.ts.refreshTravels()
    this.refreshCustomer()
  }

  getCustomerByKey(key: string): Observable<Customer> {
    return this.dbService.getCustomerByKey(key)
  }
}
