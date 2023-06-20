import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review';
import { Trip } from '../models/trip';
import { DBService } from './db.service';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TravelService {
  travels : Trip[] = []
  locations : string[] = []
  selectedLocations : string[] = []
  selectedStars : number[] = []
  selectedPrice : number
  minDate : Date
  maxDate : Date
  showArchiwe : boolean

  constructor(private dbService: DBService) {     
    this.dbService.getTravels().subscribe(res => {
      this.travels = res
      this.setLocations()
      this.selectedPrice = this.maxPrice
      this.minDate = new Date()
      this.setMaxDate()
      this.showArchiwe = false      
    })
  }

  refreshTravels() {
    this.dbService.getTravels().subscribe(res => {
      this.travels = res
      this.setLocations()
    })
  }

  getTravelByKey(key: string): Observable<Trip> {
    return this.dbService.getTravelByKey(key)
  }

  get maxPrice() {
    if(this.travels.length == 0) return 0
    let max = this.travels[0].unitPrice
    for(const travel of this.travels) if(travel.unitPrice > max) max = travel.unitPrice
    return max
  }
  
  get minPrice() {
    if(this.travels.length == 0) return 0
    let min = this.travels[0].unitPrice
    for(const travel of this.travels) if(travel.unitPrice < min) min = travel.unitPrice
    return min
  }

  changeArchiwe(b : boolean) {
    if(b) this.setMinDate()
    else this.minDate = new Date()
    this.showArchiwe = b
  }
  
  setMaxDate() {
    let date = this.travels[0].endDate
    for(const travel of this.travels) {
      let curDate = travel.endDate
      if(curDate > date) date = curDate
    }

    this.maxDate = new Date(date)
  }
  
  setMinDate() {
    let date = this.travels[0].startDate
    for(const travel of this.travels) {
      let curDate = travel.startDate
      if(curDate < date) date = curDate
    }

    this.minDate = new Date(date)
  }
  
  setLocations() {
    this.locations = this.travels.map(x => x.destination).reduce((acc: string[], cur: string) => {
      if(!acc.includes(cur)) acc.push(cur)
      return acc
    }, []).sort()
  }
  
  newOpinion(tripId: string, reservationId: string, comment: string, rating: number) {
    if(reservationId == '') return -1
    this.dbService.newOpinion(tripId, reservationId, comment, rating)
    return 1
  }

  newTravel(title: string, destination: string, description: string, startDate: string, endDate: string, seats: number, unitPrice: number) {        
    this.dbService.newTravel(title, destination, description, startDate, endDate, seats, unitPrice)
    this.refreshTravels()
  }

  deleteTravel(tripId : string) {
    this.dbService.deleteTravel(tripId)
    this.refreshTravels()
  }
}
