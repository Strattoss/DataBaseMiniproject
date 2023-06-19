import { Component } from '@angular/core';
import { TravelService } from '../../services/travel.service'; 

@Component({
  selector: 'app-destination-filter',
  templateUrl: './destination-filter.component.html',
  styleUrls: ['./destination-filter.component.css']
})
export class DestinationFilterComponent {
  selectedLocations : string[] = []
  ts

  constructor(private service : TravelService) {
    this.ts = service
  }

  change(loc : string) {
    let indexLoc = this.selectedLocations.indexOf(loc)
    if(indexLoc == -1) {
      this.selectedLocations.push(loc)    
      this.selectedLocations.sort()
    }
    else this.selectedLocations.splice(indexLoc, 1)
    this.ts.selectedLocations = this.selectedLocations
  }
}
