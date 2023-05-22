import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
    selector: 'app-pokedex',
    templateUrl: './pokedex.component.html',
    styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

    pokemon: any;
    pokemonSearch!: FormGroup

    constructor(private pokedexService: PokedexService) { }

    ngOnInit(): void {
        this.pokedexService.getAllPokemon().subscribe(data => {
            this.pokemon = data
            this.replaceHyphens()
            console.log(this.pokemon.results);

        })

        this.pokemonSearch = new FormGroup({
            search: new FormControl(null, Validators.required)
        })
    }

    getNextPage() {
        this.pokedexService.getPage(this.pokemon.next).subscribe(data => {
            this.pokemon = data
            this.replaceHyphens()
        })
    }
    getPreviousPage() {
        this.pokedexService.getPage(this.pokemon.previous).subscribe(data => {
            this.pokemon = data
            this.replaceHyphens()
        })
    }

    onSubmit() {
        // Form value
        let pokemonName: string = this.pokemonSearch.value.search

        // Filter Pokemon by searched name
        if (pokemonName) {
            this.pokedexService.getEveryPokemon().subscribe(data => {
                let everyPokemon: any = data
                let array = everyPokemon.results
                let filtered: any = []

                // Filters an array that contains every pokemon
                for (let i = 0; i < array.length; i++) {
                    if (array[i].name.includes(pokemonName)) {
                        filtered.push(array[i])
                    }
                }
                everyPokemon.results = filtered

                // Replaces the visible list of pokemon with the search results
                this.pokemon = everyPokemon
                this.replaceHyphens()
            })
        }
    }

    // Replaces hyphens in Pokemon names into spaces
    replaceHyphens() {
        let array = []

        for (let i = 0; i < this.pokemon.results.length; i++) {
            let pokeName: string = this.pokemon.results[i].name

            if (pokeName.includes("-")) {
                this.pokemon.results[i].name = pokeName.replaceAll("-", " ")
                array.push(this.pokemon.results[i])
            } else {
                array.push(this.pokemon.results[i])
            }
        }

        this.pokemon.results = array
    }
}
