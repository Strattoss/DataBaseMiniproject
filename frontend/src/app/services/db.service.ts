import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';
import { Cancelled } from '../models/cancelled';
import { Trip } from '../models/trip';
import { Purchase } from '../models/purchase';
import { Review } from '../models/review';
import { Customer } from '../models/customer';

const tripsUrl = 'http://localhost:8080/trips';
const customersUrl = 'http://localhost:8080/customers';
const purchasesUrl = 'http://localhost:8080/purchases';
const reservationsUrl = 'http://localhost:8080/reservations';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor(private http: HttpClient) { }

  getTravels(): Observable<Trip[]> {
    console.log(new Date().getMilliseconds());
    return this.http.get<Trip[]>(tripsUrl)
    // return this.http.get<Trip[]>(`${tripsUrl}?t=${new Date().getMilliseconds()}`)
  }

  getTravelByKey(key: string): Observable<Trip> {
    return this.http.get<Trip>(`${tripsUrl}/${key}`)
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(customersUrl)
  }

  getCustomerByKey(key: string): Observable<Customer> {
    return this.http.get<Customer>(`${customersUrl}/${key}`)
  }

  getReservations(customerId: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${reservationsUrl}/${customerId}`)
  }

  getCancelled(customerId: string): Observable<Cancelled[]> {
    return this.http.get<Cancelled[]>(`${reservationsUrl}/cancelled/${customerId}`)
  }

  getPurchases(customerId: string): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${purchasesUrl}/${customerId}`)
  }

  newReservation(tripId: string, tickets: number, price: number, customerId: string) {        
    const body = new HttpParams().set("tripId", tripId)
                                 .set("tickets", tickets)
                                 .set("price", price)
                                 .set("customerId", customerId)

    return this.http.post<Reservation>(reservationsUrl, body).subscribe()
  }
  
  resignReservation(tripId: string, reservationId: string) {    
    const body = new HttpParams().set("tripId", tripId)
                                 .set("reservationId", reservationId)

    return this.http.put<Reservation>(reservationsUrl, body).subscribe()
  }

  newPurchase(tripId: string, reservationId: string) {    
    const body = new HttpParams().set("tripId", tripId)
                                 .set("reservationId", reservationId)

    return this.http.put<Reservation>(purchasesUrl, body).subscribe()
  }
  
  newOpinion(tripId: string, reservationId: string, comment: string, rating: number) {
    const body = new HttpParams().set("tripId", tripId)
                                 .set("reservationId", reservationId)
                                 .set("comment", comment)
                                 .set("rating", rating)

    return this.http.post<Reservation>(`${reservationsUrl}/review`, body).subscribe()
  }

  newTravel(title: string, destination: string, description: string, startDate: string, endDate: string, seats: number, unitPrice: number) {        
    const body = new HttpParams().set("title", title)
                                 .set("destination", destination)
                                 .set("description", description)
                                 .set("startDate", startDate)
                                 .set("endDate", endDate)
                                 .set("seats", seats)
                                 .set("unitPrice", unitPrice)
    return this.http.post<Trip>(tripsUrl, body).subscribe()
  }

  deleteTravel(key: string) {
    return this.http.delete<Trip>(`${tripsUrl}/${key}`).subscribe()
  }

  newCustomer(c : Customer) {
    const body = new HttpParams().set("firstName", c.firstName)
                                 .set("lastName", c.lastName)
                                 .set("userName", c.username)
                                 .set("phoneNumber", c.phoneNumber)
                                 .set("email", c.email)
                                 .set("country", c.address.country)
                                 .set("city", c.address.city)
                                 .set("street", c.address.street)
                                 .set("postalCode", c.address.postalCode)
                                 .set("buildingNumber", c.address.buildingNumber)
                                 .set("apartmentNumber", c.address.apartmentNumber)
    return this.http.post<Customer>(customersUrl, body).subscribe()
  }

  deleteCustomer(id: string) {
    return this.http.delete<Customer>(`${customersUrl}/${id}`).subscribe()
  }
}
