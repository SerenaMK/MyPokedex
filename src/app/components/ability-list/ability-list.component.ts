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

    constructor(private abilityService: AbilityService) { }

    ngOnInit(): void {
        this.abilityService.getAllAbilities().subscribe(data => {
            this.ability = data
            this.replaceHyphens()
            console.log(this.ability.results);
        })

        this.abilitySearch = new FormGroup({
            search: new FormControl(null, Validators.required)
        })
    }

    getNextPage() {
        this.abilityService.getPage(this.ability.next).subscribe(data => {
            this.ability = data
            this.replaceHyphens()
        })
    }
    getPreviousPage() {
        this.abilityService.getPage(this.ability.previous).subscribe(data => {
            this.ability = data
            this.replaceHyphens()
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

                // Replaces the visible list of moves with the search results
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

}
