import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTravelFormComponent } from './components/add-travel-form/add-travel-form.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CartComponent } from './components/cart/cart.component';
import { HistoryComponent } from './components/history/history.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { TravelDetailsComponent } from './components/travel-details/travel-details.component';
import { TravelComponent } from './components/travel/travel.component';
import { TravelsViewComponent } from './components/travels-view/travels-view.component';
import { TravelsComponent } from './components/travels/travels.component';


const routes: Routes = [
  {path: 'travels/add', component: AddTravelFormComponent},
  {path: 'travels/:key', component: TravelDetailsComponent},
  {path: 'travels', component: TravelsViewComponent},
  {path: 'orders', component: HistoryComponent},
  {path: 'cart', component: CartDetailsComponent},
  {path: 'user', component: CartComponent},
  {path: '', component: MainViewComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
