import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partails/header/header.component';
import { FooterComponent } from './components/partails/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RatingModule } from 'ng-starrating';


import { SearchComponent } from './components/partails/search/search.component';
import { FoodPagesComponent } from './components/pages/food-pages/food-pages.component';
import { TagsComponent } from './components/partails/tags/tags.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './components/partails/title/title.component';
import { NotFoundComponent } from './components/partails/not-found/not-found.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import {ReactiveFormsModule} from '@angular/forms'
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { InputContainerComponent } from './components/partails/input-container/input-container.component';
import { DefaultButtonComponent } from './components/partails/default-button/default-button.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoadingComponent } from './components/partails/loading/loading.component'
import { LoadingInterceptor } from './shared/interceptor/loading.interceptor';
import { CheckoutpageComponent } from './components/pages/checkoutpage/checkoutpage.component';
import { OrderlistComponent } from './components/partails/orderlist/orderlist.component';
import { MapComponent } from './components/partails/map/map.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { PaypalButtonComponent } from './components/partails/paypal-button/paypal-button.component';
import { OrderTrackComponent } from './components/pages/order-track/order-track.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SearchComponent,
    FoodPagesComponent,
    TagsComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoginPageComponent,
    InputContainerComponent,
    DefaultButtonComponent,
    RegisterComponent,
    LoadingComponent,
    CheckoutpageComponent,
    OrderlistComponent,
    MapComponent,
    PaymentComponent,
    PaypalButtonComponent,
    OrderTrackComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(
      {
        timeOut:3000,
      }
    )
  
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
