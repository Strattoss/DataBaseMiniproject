import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Purchase } from '../models/u_purchase';
import { Reservation } from '../models/reservation';
import { Trip } from '../models/trip';
import { Purchase } from '../models/purchase';
import { Review } from '../models/review';

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
    return this.http.get<Trip[]>(tripsUrl)
  }

  getTravelByKey(key: string): Observable<Trip> {
    return this.http.get<Trip>(`${tripsUrl}/${key}`)
  }

  getReservations(customerId: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${reservationsUrl}/${customerId}`)
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
}
