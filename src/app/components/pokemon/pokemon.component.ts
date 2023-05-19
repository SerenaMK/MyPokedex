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

            console.log(this.pokemon);
        })
    }

}
