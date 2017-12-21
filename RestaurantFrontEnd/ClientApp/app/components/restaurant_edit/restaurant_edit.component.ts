import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'restaurant-edit',
    templateUrl: './restaurant_edit.component.html'
})
export class RestaurantEditComponent implements OnInit {
    public restaurant: any
    id: number;
    private sub: any;
    public errorMessage: string = ""

    constructor (
        private http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
        
    ) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];

            this.http
                .get('http://localhost:51888/api/Restaurants/' + this.id)
                .map(res => res.json())
                .subscribe(
                (data) => { this.restaurant = data },
                (err) => { }); 
            
        });
    }

    saveRestaurant(): void {

        if (this.restaurant.Name == "") {
            this.errorMessage = "Por favor informe o nome do restaurante";
            return;
        } else {


            let payload: any = {
                "Id" : this.restaurant.Id,
                "Name": this.restaurant.Name
           }
          
            let headers = new Headers({ 'Content-Type': 'application/json' }); 
            let options = new RequestOptions({ headers: headers }); 

            this.http.put("http://localhost:51888/api/Restaurants/" + this.restaurant.Id, payload, options) 
                .map(res => res.json()) 
                .subscribe();


            this.location.back()
        }
    }
}
