import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SellerComponent } from './seller/seller.component';
import { CustomerComponent } from './customer/customer.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { PictureCaptchaComponent } from './picture-captcha/picture-captcha.component';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';
import { BasicSearchComponent } from './basic-search/basic-search.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { AdvertisementsComponent } from './advertisements/advertisements.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ShowAdvertisementComponent } from './show-advertisement/show-advertisement.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AdvertisementsAdvancedComponent } from './advertisements-advanced/advertisements-advanced.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminAgencyComponent } from './admin-agency/admin-agency.component';
import { AdminMicrolocationComponent } from './admin-microlocation/admin-microlocation.component';
import { AdminUpdateUserComponent } from './admin-update-user/admin-update-user.component';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { AddAgencyComponent } from './add-agency/add-agency.component';
import { AdminAddMicrolocationComponent } from './admin-add-microlocation/admin-add-microlocation.component';
import { AddStreetComponent } from './add-street/add-street.component';
import { SellerEstatesComponent } from './seller-estates/seller-estates.component';
import { SellerEstatesAddComponent } from './seller-estates-add/seller-estates-add.component';
import { SellerEstatesUpdateComponent } from './seller-estates-update/seller-estates-update.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { SellerInformationComponent } from './seller-information/seller-information.component';
import { SellerGraphsComponent } from './seller-graphs/seller-graphs.component';
import { SellerJSONComponent } from './seller-json/seller-json.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SellerComponent,
    CustomerComponent,
    AdminComponent,
    HomeComponent,
    PictureCaptchaComponent,
    PasswordchangeComponent,
    BasicSearchComponent,
    AdvancedSearchComponent,
    AdvertisementsComponent,
    ShowAdvertisementComponent,
    FavoritesComponent,
    AdvertisementsAdvancedComponent,
    AdminUsersComponent,
    AdminAgencyComponent,
    AdminMicrolocationComponent,
    AdminUpdateUserComponent,
    AdminAddUserComponent,
    AddAgencyComponent,
    AdminAddMicrolocationComponent,
    AddStreetComponent,
    SellerEstatesComponent,
    SellerEstatesAddComponent,
    SellerEstatesUpdateComponent,
    SellerInformationComponent,
    SellerGraphsComponent,
    SellerJSONComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot()
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
