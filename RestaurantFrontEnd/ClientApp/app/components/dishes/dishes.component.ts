
import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
    selector: 'dish',
    templateUrl: './dishes.component.html',
})
export class DishComponent implements OnInit {
    private sub: any;
    private dishes: any;

    constructor(
        private http: Http,
        private router: Router
    ) {
        router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                this.loadDishes();
            }
         });

    }

    createNew() {
        this.router.navigateByUrl("/dishes/create")
    }

    
    remove(id: Number) {
        if (window.confirm("Você realmente deseja remover esse prato?")) {
            this.http
                .delete("http://localhost:51888/api/Dishes/" + id)
                .map(res => res.json())
                .subscribe(
                (data) => { this.loadDishes()},
                (err) => { });

           
        }

    }

    public edit(id: Number) {
        this.router.navigateByUrl("/dishes/edit/" + id)
    }

    loadDishes() {
        this.http
            .get('http://localhost:51888/api/Dishes')
            .map(res => res.json())
            .subscribe(
            (data) => { this.dishes = data },
            (err) => { }); 
    }
     

    ngOnInit() {

    }
}
