import { Component } from '@angular/core';
import { CartService } from './services/cart.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cs
  constructor(private service: CartService) {
    this.cs = service
  }
}
