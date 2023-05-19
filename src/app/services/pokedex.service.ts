import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PokedexService {

    api: string = "https://pokeapi.co/api/v2/"

    constructor(private http: HttpClient) { }

    getAllPokemon() {
        // Get a list of all Pokemon
        return this.http.get("https://pokeapi.co/api/v2/pokemon")
    }

    getPokemonById(id: number) {
        return this.http.get("https://pokeapi.co/api/v2/pokemon/" + id)
    }
    getPokemonByName(name: string) {
        return this.http.get("https://pokeapi.co/api/v2/pokemon/" + name)
    }

    getPage(url: string) {
        return this.http.get(url)
    }

}
