import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MachineService {

    api: string = "https://pokeapi.co/api/v2/machine"
    api2: string = "https://pokeapi.co/api/v2/machine/"

    constructor(private http: HttpClient) { }

    getAllMachines() {
        return this.http.get(this.api)
    }
    getEveryMachine() {
        return this.http.get(this.api + "?limit=10000")
    }

    getMachineById(id: number) {
        return this.http.get(this.api2 + id)
    }
    getMachineByName(name: string) {
        return this.http.get(this.api2 + name)
    }

    getPage(url: string) {
        return this.http.get(url)
    }
}
