import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AbilityService {

    api: string = "https://pokeapi.co/api/v2/ability"
    api2: string = "https://pokeapi.co/api/v2/ability/"

    constructor(private http: HttpClient) { }

    getAllAbilities() {
        return this.http.get(this.api)
    }
    getEveryAbility() {
        return this.http.get(this.api + "?limit=10000")
    }

    getAbilityById(id: number) {
        return this.http.get(this.api2 + id)
    }
    getAbilityByName(name: string) {
        return this.http.get(this.api2 + name)
    }

    getPage(url: string) {
        return this.http.get(url)
    }
}
