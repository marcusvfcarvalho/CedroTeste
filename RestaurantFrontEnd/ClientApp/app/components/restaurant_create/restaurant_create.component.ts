import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Component } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';

@Component({
    selector: 'restaurant-create',
    templateUrl: './restaurant_create.component.html'
})
export class RestaurantCreateComponent {
    public restaurantName: string = ""
    public errorMessage: string = ""

    constructor(
        private http: Http,
        private router: Router
    ) {
    }

    saveRestaurant(value: string): void {
        this.errorMessage = ""
        if (this.restaurantName == "") {
            this.errorMessage = "Por favor informe o nome do restaurante";
            return;
        } else {


            let payload: any = {
                "Name": this.restaurantName
           }
          
            let headers = new Headers({ 'Content-Type': 'application/json' }); 
            let options = new RequestOptions({ headers: headers }); 

            this.http.post("http://localhost:51888/api/Restaurants", payload, options) 
                .map(res => res.json()) 
                .subscribe();

            this.router.navigateByUrl("/restaurants")
        }
    }
}
