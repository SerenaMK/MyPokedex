import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbilityService } from 'src/app/services/ability.service';

@Component({
    selector: 'app-ability-list',
    templateUrl: './ability-list.component.html',
    styleUrls: ['./ability-list.component.scss']
})
export class AbilityListComponent implements OnInit {

    ability: any;
    abilitySearch!: FormGroup
    thisPageOffset: number = 0
    pagination: any = [
        {
            number: 1,
            link: "https://pokeapi.co/api/v2/ability?offset=0&limit=20"
        },
        {
            number: 2,
            link: "https://pokeapi.co/api/v2/ability?offset=20&limit=20"
        },
        {
            number: 3,
            link: "https://pokeapi.co/api/v2/ability?offset=40&limit=20"
        }
    ]
    lastPage: number = 100
    lastOffset: number = 100

    constructor(private abilityService: AbilityService) { }

    ngOnInit(): void {
        this.abilityService.getAllAbilities().subscribe(data => {
            this.ability = data
            this.replaceHyphens()
            console.log(this.ability.results);

            let next = this.ability.next
            let offset = next.slice(next.indexOf("?offset=20") + 8, next.indexOf("&limit")) - 20
            this.thisPageOffset = offset

            this.getLastPage()

            console.log("-------------------------");
            console.log(this.thisPageOffset);
        })

        this.abilitySearch = new FormGroup({
            search: new FormControl(null, Validators.required)
        })
    }

    onSubmit() {
        // Form value
        let abilityName: string = this.abilitySearch.value.search.toLowerCase()

        if (abilityName.includes(" ")) {
            abilityName = abilityName.replaceAll(" ", "-")
        }

        // Filter abilities by searched name
        if (abilityName) {
            this.abilityService.getEveryAbility().subscribe(data => {
                let everyAbility: any = data
                let array = everyAbility.results
                let filtered: any = []

                // Filters an array that contains every ability
                for (let i = 0; i < array.length; i++) {
                    if (array[i].name.includes(abilityName)) {
                        filtered.push(array[i])
                    }
                }
                everyAbility.results = filtered

                // Replaces the visible list of abilitys with the search results
                this.ability = everyAbility
                this.replaceHyphens()
            })
        }
    }

    replaceHyphens() {
        let array = []

        for (let i = 0; i < this.ability.results.length; i++) {
            let abilityName: string = this.ability.results[i].name

            if (abilityName.includes("-")) {
                this.ability.results[i].name = abilityName.replaceAll("-", " ")
                array.push(this.ability.results[i])
            } else {
                array.push(this.ability.results[i])
            }
        }

        this.ability.results = array
    }


    getPage(num: number): string {
        return "https://pokeapi.co/api/v2/ability?offset=" + num + "&limit=20"
    }
    getOffset(url: any): number {
        return parseInt(url.slice(url.indexOf("?offset=") + 8, url.indexOf("&limit")))
    }
    getLastPage() {
        let divided = parseInt(this.ability.count) / 20
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
            this.abilityService.getPage(this.getPage(off)).subscribe(data => {
                this.ability = data
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
            this.abilityService.getPage(this.getPage(off)).subscribe(data => {
                this.ability = data
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
            this.abilityService.getPage(this.getPage(off)).subscribe(data => {
                this.ability = data
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

    getPreviousPage() {
        if (this.thisPageOffset != this.lastOffset) {
            this.abilityService.getPage(this.pagination[0].link).subscribe(data => {
                this.ability = data
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
            this.abilityService.getPage(this.pagination[1].link).subscribe(data => {
                this.ability = data
                this.thisPageOffset = this.getOffset(this.pagination[1].link)
                this.replaceHyphens()
            })
        }
    }
    getNextPage() {
        if (this.thisPageOffset != 0 && this.thisPageOffset != this.lastOffset) {
            // if (this.thisPageOffset != 0) {
            this.abilityService.getPage(this.pagination[2].link).subscribe(data => {
                this.ability = data
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
            this.abilityService.getPage(this.pagination[1].link).subscribe(data => {
                this.ability = data
                this.thisPageOffset = this.getOffset(this.pagination[1].link)
                this.replaceHyphens()
            })
        }
    }

    getPageA() {
        this.abilityService.getPage(this.pagination[0].link).subscribe(data => {
            this.ability = data
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
        this.abilityService.getPage(this.pagination[1].link).subscribe(data => {
            this.ability = data
            this.thisPageOffset = this.getOffset(this.pagination[1].link)
            this.replaceHyphens()
        })
    }
    getPageC() {
        if (this.thisPageOffset != this.lastOffset) {
            this.abilityService.getPage(this.pagination[2].link).subscribe(data => {
                this.ability = data
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

}
