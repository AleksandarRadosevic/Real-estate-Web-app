import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAgencyComponent } from './add-agency/add-agency.component';
import { AddStreetComponent } from './add-street/add-street.component';
import { AdminAddMicrolocationComponent } from './admin-add-microlocation/admin-add-microlocation.component';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { AdminAgencyComponent } from './admin-agency/admin-agency.component';
import { AdminMicrolocationComponent } from './admin-microlocation/admin-microlocation.component';
import { AdminUpdateUserComponent } from './admin-update-user/admin-update-user.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminComponent } from './admin/admin.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { AdvertisementsAdvancedComponent } from './advertisements-advanced/advertisements-advanced.component';
import { AdvertisementsComponent } from './advertisements/advertisements.component';
import { BasicSearchComponent } from './basic-search/basic-search.component';
import { CustomerComponent } from './customer/customer.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';
import { PictureCaptchaComponent } from './picture-captcha/picture-captcha.component';
import { RegisterComponent } from './register/register.component';
import { SellerEstatesAddComponent } from './seller-estates-add/seller-estates-add.component';
import { SellerEstatesUpdateComponent } from './seller-estates-update/seller-estates-update.component';
import { SellerEstatesComponent } from './seller-estates/seller-estates.component';
import { SellerGraphsComponent } from './seller-graphs/seller-graphs.component';
import { SellerInformationComponent } from './seller-information/seller-information.component';
import { SellerJSONComponent } from './seller-json/seller-json.component';
import { SellerComponent } from './seller/seller.component';
import { ShowAdvertisementComponent } from './show-advertisement/show-advertisement.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'admin',component:AdminComponent},
  {path:'seller',component:SellerComponent},
  {path:'customer',component:CustomerComponent},
  {path:'register',component:RegisterComponent},
  {path:'captcha',component:PictureCaptchaComponent},
  {path:'login',component:LoginComponent},
  {path:'changePass',component:PasswordchangeComponent},
  {path:'basicSearch',component:BasicSearchComponent},
  {path:'advancedSearch',component:AdvancedSearchComponent},
  {path:'advertisements',component:AdvertisementsComponent},
  {path:'showAdvertisement',component:ShowAdvertisementComponent},
  {path:'favorites',component:FavoritesComponent},
  {path:'ads',component:AdvertisementsAdvancedComponent},
  {path:'adminUsers',component:AdminUsersComponent},
  {path:'adminAgency',component:AdminAgencyComponent},
  {path:'adminMicrolocation',component:AdminMicrolocationComponent},
  {path:'updateUser',component:AdminUpdateUserComponent},
  {path:'adminAddUser',component:AdminAddUserComponent},
  {path:'addAgency',component:AddAgencyComponent},
  {path:'adminAddMicrolocation',component:AdminAddMicrolocationComponent},
  {path:'adminAddStreet',component:AddStreetComponent},
  {path:'sellerEstates',component:SellerEstatesComponent},
  {path:'sellerEstatesUpdate',component:SellerEstatesUpdateComponent},
  {path:'sellerEstatesAdd',component:SellerEstatesAddComponent},
  {path:'sellerInformation',component:SellerInformationComponent},
  {path:'sellerGraphs',component:SellerGraphsComponent},
  {path:'sellerJSON',component:SellerJSONComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
