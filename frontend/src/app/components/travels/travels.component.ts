import { Component } from '@angular/core';
import { TravelService } from '../../services/travel.service'; 
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.css']
})
export class TravelsComponent {
  reservations : number[]
  amountOfReservations = 0
  travels
  ts

  constructor(service : TravelService) {
    this.travels = service.travels
    this.ts = service
    this.reservations = new Array(service.travels.length)
  }

  changeReservations(e : number, index : number) {
    if(e == -1) this.reservations.splice(index, 1)
    else this.reservations[index] = e
    this.amountOfReservations = this.reservations.reduce((acc, curr) => { return acc + curr; }, 0)
    
  }
}
