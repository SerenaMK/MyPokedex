import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
    selector: 'app-pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

    id: number = parseInt(this.route.snapshot.paramMap.get("id")!);
    pokemon: any;

    constructor(private pokedexService: PokedexService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.pokedexService.getPokemonById(this.id).subscribe(data => {
            this.pokemon = data
            this.replaceHyphens();

            console.log("THIS POKEMON OBJECT:");
            console.log(this.pokemon);
            console.log("-----------------------------------");
            console.log("VERSIONS:");
            console.log(this.pokemon.sprites.versions);
        })
    }

    // Replaces potential hyphens in Pokemon name into spaces
    replaceHyphens() {
        if (this.pokemon.name.includes("-")) {
            this.pokemon.name = this.pokemon.name.replaceAll("-", " ")
        }
    }

    // ngDoCheck() {
    //     this.id = parseInt(this.route.snapshot.paramMap.get("id")!);
    // }

}
