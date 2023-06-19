import { Component } from '@angular/core';
import { TravelService } from '../../services/travel.service';

@Component({
  selector: 'app-rating-filter',
  templateUrl: './rating-filter.component.html',
  styleUrls: ['./rating-filter.component.css']
})
export class RatingFilterComponent {
  selectedStars : number[] = []
  ts

  constructor(private service : TravelService) {
    this.ts = service
  }

  change(rate : number) {
    let indexStar = this.selectedStars.indexOf(rate)
    if(indexStar == -1) {
      this.selectedStars.push(rate)    
    }
    else this.selectedStars.splice(indexStar, 1)
    this.ts.selectedStars = this.selectedStars
    this.ts.changeArchiwe(true)
  }

}
