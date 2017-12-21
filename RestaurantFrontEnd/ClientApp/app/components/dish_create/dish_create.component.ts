
import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Router } from '@angular/router';

@Component({
    selector: 'dish-create',
    templateUrl: './dish_create.component.html'
})
export class DishCreateComponent implements OnInit {
    restaurants: any
    selectedRestaurant: any
    dish: string = ""
    price: number
    errorMessage: string = ""

    constructor(
        private http: Http,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.http
            .get('http://localhost:51888/api/restaurants')
            .map(res => res.json())
            .subscribe(
            (data) => {
                this.restaurants = data
                this.selectedRestaurant = this.restaurants[0];
            },
            (err) => { }); 

        
    }

    public saveDish() {
        this.errorMessage = ""
        if (this.dish == "") {
            this.errorMessage = "Por favor informe o nome do prato";
            return;
        } else {
            let payload: any = {
                "Name": this.dish,
                "Restaurant": this.selectedRestaurant,
                "Price": this.price
            }

            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.post("http://localhost:51888/api/Dishes", payload, options)
                .map(res => res.json())
                .subscribe((data) => { 
                    this.router.navigateByUrl("/dishes")
                });

             
        }
    }
}
