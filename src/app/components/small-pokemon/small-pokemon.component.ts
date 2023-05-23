import { Component, Input, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
    selector: 'app-small-pokemon',
    templateUrl: './small-pokemon.component.html',
    styleUrls: ['./small-pokemon.component.scss']
})
export class SmallPokemonComponent implements OnInit {

    @Input() pokemonName!: string;
    pokemon: any
    icon: string = ""

    constructor(private pokedexService: PokedexService) { }

    ngOnInit(): void {
        this.pokedexService.getPokemonByName(this.pokemonName).subscribe(data => {
            this.pokemon = data
            this.icon = this.pokemon.sprites.versions['generation-viii'].icons.front_default
            this.replaceHyphens()

            console.log(this.pokemon.sprites.versions['generation-vii'].icons.front_default);
            // console.log(this.pokemon.sprites.versions['generation-viii'].icons.front_default);

        })
    }

    // Replaces potential hyphens into spaces
    replaceHyphens() {
        if (this.pokemonName.includes("-")) {
            this.pokemonName = this.pokemonName.replaceAll("-", " ")
        }
    }

}
