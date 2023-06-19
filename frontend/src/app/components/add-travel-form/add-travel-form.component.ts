import { Component } from '@angular/core';
import { TravelService } from '../../services/travel.service';
// import { TravelClass } from '../../models/u_travelClass';

@Component({
  selector: 'app-add-travel-form',
  templateUrl: './add-travel-form.component.html',
  styleUrls: ['./add-travel-form.component.css']
})
export class AddTravelFormComponent {
  // ts : TravelService
  // model : TravelClass

  constructor(private service : TravelService) {
    // this.ts = service
    // this.model = new TravelClass("", "", "", "", "", 0, 0, "", "", [], [], 0)
  }

  onSubmit() { 
    // this.ts.addTravel(this.model)
    // this.model = new TravelClass("", "", "", "", "", 0, 0, "", "", [], [], 0)
  }
  
}
