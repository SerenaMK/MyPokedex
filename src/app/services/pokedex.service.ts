import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PokedexService {

    api: string = "https://pokeapi.co/api/v2/pokemon"
    api2: string = "https://pokeapi.co/api/v2/pokemon/"

    constructor(private http: HttpClient) { }

    getAllPokemon() {
        return this.http.get(this.api)
    }
    getEveryPokemon() {
        return this.http.get(this.api + "?limit=10000")
    }

    getPokemonById(id: number) {
        return this.http.get(this.api2 + id)
    }
    getPokemonByName(name: string) {
        return this.http.get(this.api2 + name)
    }

    getPage(url: string) {
        return this.http.get(url)
    }

}
