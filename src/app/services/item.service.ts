import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    api: string = "https://pokeapi.co/api/v2/item"
    api2: string = "https://pokeapi.co/api/v2/item/"

    constructor(private http: HttpClient) { }

    getAllItems() {
        return this.http.get(this.api)
    }
    getEveryItem() {
        return this.http.get(this.api + "?limit=10000")
    }

    getItemById(id: number) {
        return this.http.get(this.api2 + id)
    }
    getItemByName(name: string) {
        return this.http.get(this.api2 + name)
    }

    getPage(url: string) {
        return this.http.get(url)
    }
}
