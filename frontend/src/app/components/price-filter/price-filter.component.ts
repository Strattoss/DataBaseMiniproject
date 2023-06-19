import { Component } from '@angular/core';
import { TravelService } from '../../services/travel.service';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.css']
})
export class PriceFilterComponent {
  max : number
  min : number
  ts

  constructor(private service : TravelService) {
    this.ts = service
  }
}
