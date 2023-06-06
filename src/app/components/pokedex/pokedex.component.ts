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
    thisPageOffset: number = 0
    pagination: any = [
        {
            number: 1,
            link: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
        },
        {
            number: 2,
            link: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
        },
        {
            number: 3,
            link: "https://pokeapi.co/api/v2/pokemon?offset=40&limit=20"
        }
    ]
    lastPage: number = 100
    lastOffset: number = 100

    constructor(private pokedexService: PokedexService) { }

    ngOnInit(): void {
        this.pokedexService.getAllPokemon().subscribe(data => {
            this.pokemon = data
            this.replaceHyphens()
            console.log(this.pokemon.results);

            let next = this.pokemon.next
            let offset = next.slice(next.indexOf("?offset=20") + 8, next.indexOf("&limit")) - 20
            this.thisPageOffset = offset

            this.getLastPage()

            console.log("-------------------------");
            console.log(this.thisPageOffset);
        })

        this.pokemonSearch = new FormGroup({
            search: new FormControl(null, Validators.required)
        })
    }

    getPreviousPage() {
        if (this.thisPageOffset != this.lastOffset) {
            this.pokedexService.getPage(this.pagination[0].link).subscribe(data => {
                this.pokemon = data
                this.thisPageOffset = this.getOffset(this.pagination[0].link)
                if (this.pagination[0].number != 1) {
                    this.pagination[0].number -= 1
                    this.pagination[1].number -= 1
                    this.pagination[2].number -= 1
                    this.pagination[0].link = this.getPage(this.thisPageOffset - 20)
                    this.pagination[1].link = this.getPage(this.thisPageOffset)
                    this.pagination[2].link = this.getPage(this.thisPageOffset + 20)
                }
                this.replaceHyphens()
            })
        } else {
            this.pokedexService.getPage(this.pagination[1].link).subscribe(data => {
                this.pokemon = data
                this.thisPageOffset = this.getOffset(this.pagination[1].link)
                this.replaceHyphens()
            })
        }
    }
    getNextPage() {
        if (this.thisPageOffset != 0 && this.thisPageOffset != this.lastOffset) {
            // if (this.thisPageOffset != 0) {
            this.pokedexService.getPage(this.pagination[2].link).subscribe(data => {
                this.pokemon = data
                this.thisPageOffset = this.getOffset(this.pagination[2].link)
                if (this.pagination[2].number != this.lastPage) {
                    this.pagination[0].number += 1
                    this.pagination[1].number += 1
                    this.pagination[2].number += 1
                    this.pagination[0].link = this.getPage(this.thisPageOffset - 20)
                    this.pagination[1].link = this.getPage(this.thisPageOffset)
                    this.pagination[2].link = this.getPage(this.thisPageOffset + 20)
                }
                this.replaceHyphens()
            })
        } else if (this.thisPageOffset == 0) {
            this.pokedexService.getPage(this.pagination[1].link).subscribe(data => {
                this.pokemon = data
                this.thisPageOffset = this.getOffset(this.pagination[1].link)
                this.replaceHyphens()
            })
        }
    }

    getPageA() {
        this.pokedexService.getPage(this.pagination[0].link).subscribe(data => {
            this.pokemon = data
            this.thisPageOffset = this.getOffset(this.pagination[0].link)
            if (this.pagination[0].number != 1) {
                this.pagination[0].number -= 1
                this.pagination[1].number -= 1
                this.pagination[2].number -= 1
                this.pagination[0].link = this.getPage(this.thisPageOffset - 20)
                this.pagination[1].link = this.getPage(this.thisPageOffset)
                this.pagination[2].link = this.getPage(this.thisPageOffset + 20)
            }
            this.replaceHyphens()
        })
    }
    getPageB() {
        this.pokedexService.getPage(this.pagination[1].link).subscribe(data => {
            this.pokemon = data
            this.thisPageOffset = this.getOffset(this.pagination[1].link)
            this.replaceHyphens()
        })
    }
    getPageC() {
        if (this.thisPageOffset != this.lastOffset) {
            this.pokedexService.getPage(this.pagination[2].link).subscribe(data => {
                this.pokemon = data
                this.thisPageOffset = this.getOffset(this.pagination[2].link)
                if (this.pagination[2].number != this.lastPage) {
                    this.pagination[0].number += 1
                    this.pagination[1].number += 1
                    this.pagination[2].number += 1
                    this.pagination[0].link = this.getPage(this.thisPageOffset - 20)
                    this.pagination[1].link = this.getPage(this.thisPageOffset)
                    this.pagination[2].link = this.getPage(this.thisPageOffset + 20)
                }
                this.replaceHyphens()
            })
        }
    }

    onSubmit() {
        // Form value
        let pokemonName: string = this.pokemonSearch.value.search.toLowerCase()

        if (pokemonName.includes(" ")) {
            pokemonName = pokemonName.replaceAll(" ", "-")
        }

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

    getPage(num: number): string {
        return "https://pokeapi.co/api/v2/pokemon?offset=" + num + "&limit=20"
    }
    getOffset(url: any): number {
        return parseInt(url.slice(url.indexOf("?offset=") + 8, url.indexOf("&limit")))
    }
    getLastPage() {
        let divided = parseInt(this.pokemon.count) / 20
        let isInteger: boolean = (divided % 1 == 0)

        if (isInteger) {
            this.lastPage = divided
        } else {
            this.lastPage = Math.trunc(divided) + 1
        }

        this.lastOffset = Math.trunc(divided) * 20
    }

    goToPage(num: number) {
        let off = (num - 1) * 20

        if (off == this.lastOffset) {
            this.pokedexService.getPage(this.getPage(off)).subscribe(data => {
                this.pokemon = data
                this.thisPageOffset = off
                this.pagination[0].number = num - 2
                this.pagination[1].number = num - 1
                this.pagination[2].number = num
                this.pagination[0].link = this.getPage(off - 40)
                this.pagination[1].link = this.getPage(off - 20)
                this.pagination[2].link = this.getPage(off)
                this.replaceHyphens()
            })
        } else if (off == 0) {
            this.pokedexService.getPage(this.getPage(off)).subscribe(data => {
                this.pokemon = data
                this.thisPageOffset = off
                this.pagination[0].number = num
                this.pagination[1].number = num + 1
                this.pagination[2].number = num + 2
                this.pagination[0].link = this.getPage(off)
                this.pagination[1].link = this.getPage(off + 20)
                this.pagination[2].link = this.getPage(off + 40)
                this.replaceHyphens()
            })
        } else {
            this.pokedexService.getPage(this.getPage(off)).subscribe(data => {
                this.pokemon = data
                this.thisPageOffset = off
                this.pagination[0].number = num - 1
                this.pagination[1].number = num
                this.pagination[2].number = num + 1
                this.pagination[0].link = this.getPage(off - 20)
                this.pagination[1].link = this.getPage(off)
                this.pagination[2].link = this.getPage(off + 20)
                this.replaceHyphens()
            })
        }
    }

}
