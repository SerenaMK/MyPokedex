import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NatureService {

    api: string = "https://pokeapi.co/api/v2/nature"
    api2: string = "https://pokeapi.co/api/v2/nature/"

    constructor(private http: HttpClient) { }

    getAllNatures() {
        return this.http.get(this.api)
    }
    getEveryNature() {
        return this.http.get(this.api + "?limit=10000")
    }

    getNatureById(id: number) {
        return this.http.get(this.api2 + id)
    }
    getNatureByName(name: string) {
        return this.http.get(this.api2 + name)
    }

    getPage(url: string) {
        return this.http.get(url)
    }
}
