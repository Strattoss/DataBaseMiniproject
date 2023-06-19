import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  @Input() rating : number
  @Output() rate = new EventEmitter<number>()


  // star(n : number) {
  //   this.rating = n
  //   this.rate.emit(this.rating)
  // }
}
