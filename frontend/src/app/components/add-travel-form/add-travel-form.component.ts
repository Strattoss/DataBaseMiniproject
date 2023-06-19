import { Component } from '@angular/core';
import { TravelService } from '../../services/travel.service';
import { Trip } from 'src/app/models/trip';
// import { TravelClass } from '../../models/u_travelClass';

@Component({
  selector: 'app-add-travel-form',
  templateUrl: './add-travel-form.component.html',
  styleUrls: ['./add-travel-form.component.css']
})
export class AddTravelFormComponent {
  ts : TravelService

  model = {
    description : "",
    destination : "",
    startDate : new Date().toJSON(),
    endDate : new Date().toJSON(),
    availableSeats : 0,
    title : "",
    unitPrice : 0
  }
  

  constructor(private service : TravelService) {
    this.ts = service
  }

  onSubmit() {             
    this.ts.newTravel(this.model.title, this.model.destination, this.model.description, 
        this.model.startDate, this.model.endDate, this.model.availableSeats, this.model.unitPrice)
  
    this.model = {
      description : "",
      destination : "",
      startDate : new Date().toJSON(),
      endDate : new Date().toJSON(),
      availableSeats : 0,
      title : "",
      unitPrice : 0
    }
  }
}
