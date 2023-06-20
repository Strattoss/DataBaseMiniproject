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
  customers: Customer[] = []
  currentCustomer : Customer
  startCustomerId = "6447a9ead297195ac0dd240c"

  ts

  fullPrice = 0
  fullReservations = 0

  constructor(private dbService: DBService, private tService : TravelService ) { 
    if(localStorage.getItem('lastLogged') !== null) {
     this.startCustomerId = localStorage.getItem('lastLogged') || ""
    }  
    
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
    })
  }

  getReservationsById(id: string) {
    return this.dbService.getReservations(id).subscribe()
  }

  refreshCustomers() {    
    this.dbService.getCustomers().subscribe(res => this.customers = res)
  }

  refreshCustomer() {       
    this.dbService.getReservations(this.currentCustomer._id).subscribe(res => {
      this.reservations = res
      this.fullReservations = this.reservations.map(r => r.tickets).reduce((a, b) => a + b, 0)      
      this.fullPrice = this.reservations.map(r => r.tickets * r.price).reduce((a, b) => a + b, 0)
    })
    this.dbService.getPurchases(this.currentCustomer._id).subscribe(res => {
      this.purchases = res
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
    })
    localStorage.setItem('lastLogged', id)
  }

  purchaseForThisTrip(tripId: string) {    
    for(const purchase of this.purchases) {
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
    this.dbService.newReservation(tripId, tickets, price, this.currentCustomer._id)
    setInterval(this.ts.refreshTravels, 100)
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

  newCustomer(c : Customer) {
    this.dbService.newCustomer(c)
    this.refreshCustomers()
  }

  deleteCustomer(id : string)  {
    this.dbService.deleteCustomer(id)
    this.refreshCustomers()
  }
}
