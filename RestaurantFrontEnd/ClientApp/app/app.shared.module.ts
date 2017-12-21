import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LOCALE_ID } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';

import { HeaderComponent } from './components/shared/header/header.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantCreateComponent } from './components/restaurant_create/restaurant_create.component';
import { RestaurantEditComponent } from './components/restaurant_edit/restaurant_edit.component';
import { DishComponent } from './components/dishes/dishes.component';
import { DishCreateComponent } from './components/dish_create/dish_create.component';
import { DishEditComponent } from './components/dish_edit/dish_edit.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        RestaurantsComponent,
        RestaurantCreateComponent,
        RestaurantEditComponent,
        DishComponent,
        DishCreateComponent,
        DishEditComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'restaurants', component: RestaurantsComponent }, 
            { path: 'dishes', component: DishComponent}, 
            { path: 'restaurants/create', component: RestaurantCreateComponent }, 
            { path: 'restaurants/edit/:id', component: RestaurantEditComponent }, 
            { path: 'dishes/create', component: DishCreateComponent }, 
            { path: 'dishes/edit/:id', component: DishEditComponent }, 
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
