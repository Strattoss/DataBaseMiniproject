import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TravelComponent } from './components/travel/travel.component';
import { TravelsComponent } from './components/travels/travels.component';
import { RatingComponent } from './components/rating/rating.component';
import { FiltersComponent } from './components/filters/filters.component';
import { DestinationFilterComponent } from './components/destination-filter/destination-filter.component';
import { FilterPipe } from './pipes/filterPipe';
import { TravelService } from './services/travel.service';
import { PriceFilterComponent } from './components/price-filter/price-filter.component';
import { DateFilterComponent } from './components/date-filter/date-filter.component';
import { RatingFilterComponent } from './components/rating-filter/rating-filter.component';
import { AddTravelFormComponent } from './components/add-travel-form/add-travel-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { AppRoutingModule } from './app-routing.module';
import { MainViewComponent } from './components/main-view/main-view.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { TravelsViewComponent } from './components/travels-view/travels-view.component';
import { TravelDetailsComponent } from './components/travel-details/travel-details.component';
import { CartService } from './services/cart.service';
import { HistoryComponent } from './components/history/history.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { AddCustomerFormComponent } from './components/add-customer-form/add-customer-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TravelComponent,
    TravelsComponent,
    RatingComponent,
    FiltersComponent,
    DestinationFilterComponent, 
    FilterPipe, PriceFilterComponent, DateFilterComponent, RatingFilterComponent, AddTravelFormComponent, CartComponent, MainViewComponent, CartDetailsComponent, TravelsViewComponent, TravelDetailsComponent, HistoryComponent, CustomersComponent, CustomerDetailsComponent, AddCustomerFormComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, 
    FormsModule, AppRoutingModule,
    HttpClientModule
  ],
  providers: [TravelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
