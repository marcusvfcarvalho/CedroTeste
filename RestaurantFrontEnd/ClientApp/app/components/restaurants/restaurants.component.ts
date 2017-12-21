
import { Component } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
    selector: 'restaurants',
    templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent {
    private searchString: string = "";
    restaurants: Object = { restaurants: [] };

    
    constructor(
        private http: Http,
        private router: Router
    ) {}

    public remove(id: Number) {
        if (window.confirm("Você realmente deseja remover esse restaurante?")) {
            this.http
                .delete("http://localhost:51888/api/Restaurants/" + id)
                .map(res => res.json())
                .subscribe(
                (data) => {
                    this.restaurants = data
                    this.searchRestaurants()
                },
                (err) => { });

           
        }
        
    }


    public edit(id: Number) {
       this.router.navigateByUrl('/restaurants/edit/' + id)
    }


    public searchRestaurants() {
        this.restaurants = { restaurants: [] };
        let url = 'http://localhost:51888/api/Restaurants/Search/' + this.searchString
        
        if (this.searchString == "") {
            url = 'http://localhost:51888/api/Restaurants'
        }

        this.http
            .get(url)
            .map(res => res.json())
            .subscribe(
            (data) => { this.restaurants = data } ,
            (err) => {  });


    }
}
