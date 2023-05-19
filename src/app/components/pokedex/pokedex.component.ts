import { Component, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
    selector: 'app-pokedex',
    templateUrl: './pokedex.component.html',
    styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

    pokemon: any;
    // thisPokemonId: any = this.pokemon[i].results.url

    constructor(private pokedexService: PokedexService) { }

    ngOnInit(): void {
        this.pokedexService.getAllPokemon().subscribe(data => {
            this.pokemon = data

            console.log(this.pokemon);
        })
    }

    getNextPage() {
        this.pokedexService.getPage(this.pokemon.next).subscribe(data => {
            this.pokemon = data

            console.log("NEXT PAGE DATA:");
            console.log(this.pokemon);
        })
    }
    getPreviousPage() {
        this.pokedexService.getPage(this.pokemon.previous).subscribe(data => {
            this.pokemon = data

            console.log("PREVIOUS PAGE DATA:");
            console.log(this.pokemon);
        })
    }

}
