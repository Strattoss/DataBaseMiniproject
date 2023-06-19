import { Component } from '@angular/core';
import { TravelService } from '../../services/travel.service';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent {
  ts

  constructor(private service : TravelService) {
    this.ts = service
  }
  
  changeMin(e:any) {
    this.ts.minDate = new Date(e.target.value)
  }
  changeMax(e:any) {
    this.ts.maxDate = new Date(e.target.value)
  }
}
