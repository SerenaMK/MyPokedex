import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TypeService {

    api: string = "https://pokeapi.co/api/v2/type"
    api2: string = "https://pokeapi.co/api/v2/type/"

    constructor(private http: HttpClient) { }

    getAllTypes() {
        return this.http.get(this.api)
    }
    getEveryType() {
        return this.http.get(this.api + "?limit=10000")
    }

    getTypeById(id: number) {
        return this.http.get(this.api2 + id)
    }
    getTypeByName(name: string) {
        return this.http.get(this.api2 + name)
    }

    getPage(url: string) {
        return this.http.get(url)
    }
}
