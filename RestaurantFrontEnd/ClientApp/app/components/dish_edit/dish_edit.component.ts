
import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'dish-edit',
    templateUrl: './dish_edit.component.html'
})
export class DishEditComponent implements OnInit {
    restaurants: any
    dish: any
    id: number;
    private sub: any;
    errorMessage: string = ""
    selectedRestaurant: any

    constructor(
        private http: Http,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];

            this.http
                .get('http://localhost:51888/api/restaurants')
                .map(res => res.json())
                .subscribe(
                (data) => {
                    this.restaurants = data
                    this.http
                        .get('http://localhost:51888/api/dishes/' + this.id)
                        .map(res => res.json())
                        .subscribe(
                        (data) => {
                            this.dish = data
                            for (let restaurant of this.restaurants) {
                                if (this.dish.Restaurant.Id == restaurant.Id) {
                                     this.selectedRestaurant = restaurant
                                } 
                            }
                        },
                        (err) => { });
                });
                },
                (err) => { }); 
    }

    public saveDish() {
        this.errorMessage = ""
        if (this.dish == "") {
            this.errorMessage = "Por favor informe o nome do prato";
            return;
        } else {
            
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            this.dish.Restaurant = this.selectedRestaurant;

            this.http.put("http://localhost:51888/api/Dishes/" + this.dish.Id, this.dish, options)
                .map(res => res.json())
                .subscribe((data) => {
                    this.router.navigateByUrl("/dishes")
                });

             
        }
    }
}
