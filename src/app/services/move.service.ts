import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MoveService {

    api: string = "https://pokeapi.co/api/v2/move"
    api2: string = "https://pokeapi.co/api/v2/move/"

    constructor(private http: HttpClient) { }

    getAllMoves() {
        return this.http.get(this.api)
    }
    getEveryMove() {
        return this.http.get(this.api + "?limit=10000")
    }

    getMoveById(id: number) {
        return this.http.get(this.api2 + id)
    }
    getMoveByName(name: string) {
        return this.http.get(this.api2 + name)
    }

    getPage(url: string) {
        return this.http.get(url)
    }
}
