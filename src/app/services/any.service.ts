import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AnyService {

    api: string = "https://pokeapi.co/api/v2/"

    constructor(private http: HttpClient) { }

    getAllAbilities(element: string) {
        return this.http.get(this.api + element)
    }
    getEveryAbility(element: string) {
        return this.http.get(this.api + element + "?limit=10000")
    }

    getAbilityById(element: string, id: number) {
        return this.http.get(this.api + "/" + element + id)
    }
    getAbilityByName(element: string, name: string) {
        return this.http.get(this.api + "/" + element + name)
    }

    getPage(url: string) {
        return this.http.get(url)
    }
}
