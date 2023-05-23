import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
    selector: 'app-pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

    id: number = parseInt(this.route.snapshot.paramMap.get("id")!);
    newId!: string;
    pokemon: any;

    constructor(private pokedexService: PokedexService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe((data) => {
            let id = this.route.snapshot.paramMap.get('id');
            this.newId = id!;
        });

        this.pokedexService.getPokemonById(this.id).subscribe(data => {
            this.pokemon = data
            this.replaceHyphens();

            console.log("THIS POKEMON OBJECT:");
            console.log(this.pokemon);
            console.log("-----------------------------------");
            // console.log("pokemonRaw:");
            // console.log(this.pokemonRaw);
        })


    }

    // Replaces potential hyphens into spaces
    replaceHyphens() {
        if (this.pokemon.name.includes("-")) {
            this.pokemon.name = this.pokemon.name.replaceAll("-", " ")
        }

        if(this.pokemon.past_types[0]) {
            if (this.pokemon.past_types[0].generation.name.includes("-")) {
                this.pokemon.past_types[0].generation.name = this.pokemon.past_types[0].generation.name.replaceAll("-", " ")
            }
        }

        if(this.pokemon.abilities[0]) {
            for (let i = 0; i < this.pokemon.abilities.length; i++) {
                if (this.pokemon.abilities[i].ability.name.includes("-")) {
                    this.pokemon.abilities[i].ability.name = this.pokemon.abilities[i].ability.name.replaceAll("-", " ")
                }
            }
        }

        if(this.pokemon.moves[0]) {
            for (let i = 0; i < this.pokemon.moves.length; i++) {
                if (this.pokemon.moves[i].move.name.includes("-")) {
                    this.pokemon.moves[i].move.name = this.pokemon.moves[i].move.name.replaceAll("-", " ")
                }
            }
        }

        if(this.pokemon.held_items[0]) {
            for (let i = 0; i < this.pokemon.held_items.length; i++) {
                if (this.pokemon.held_items[i].item.name.includes("-")) {
                    this.pokemon.held_items[i].item.name = this.pokemon.held_items[i].item.name.replaceAll("-", " ")
                }
            }
        }

        if(this.pokemon.stats[0]) {
            for (let i = 0; i < this.pokemon.stats.length; i++) {
                if (this.pokemon.stats[i].stat.name.includes("-")) {
                    this.pokemon.stats[i].stat.name = this.pokemon.stats[i].stat.name.replaceAll("-", " ")
                }
            }
        }
    }

    // ngDoCheck() {
    //     this.id = parseInt(this.route.snapshot.paramMap.get("id")!);
    // }

    getPreviousPokemon() {
        this.router.navigateByUrl("/pokemon/" + (this.id - 1)).then(() => {
            window.location.reload();
        });
    }

    getNextPokemon() {
        this.router.navigateByUrl("/pokemon/" + (this.id + 1)).then(() => {
            window.location.reload();
        });
    }

}
