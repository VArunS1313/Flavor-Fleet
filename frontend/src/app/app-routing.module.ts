import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPagesComponent } from './components/pages/food-pages/food-pages.component';
import { Tag } from './components/shared/models/tag';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { CheckoutpageComponent } from './components/pages/checkoutpage/checkoutpage.component';
import { authGuard } from './auth/guard/auth.guard';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { OrderTrackComponent } from './components/pages/order-track/order-track.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'search/:searchterm',component:HomeComponent},
  {path:'food/:id',component:FoodPagesComponent},
  {path:'tag/:tag',component:HomeComponent},
  {path:'cart-page',component:CartPageComponent},
  {path:'login',component:LoginPageComponent},
  {path:'register',component:RegisterComponent},
  {path:'checkout',component:CheckoutpageComponent,canActivate:[authGuard]},
  {path:'payment',component:PaymentComponent,canActivate:[authGuard]},
  {path:'track/:orderId',component:OrderTrackComponent,canActivate:[authGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
