import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MoveService } from 'src/app/services/move.service';

@Component({
    selector: 'app-move-list',
    templateUrl: './move-list.component.html',
    styleUrls: ['./move-list.component.scss']
})
export class MoveListComponent implements OnInit {

    move: any;
    moveSearch!: FormGroup

    constructor(private moveService: MoveService) { }

    ngOnInit(): void {
        this.moveService.getAllMoves().subscribe(data => {
            this.move = data
            this.replaceHyphens()
            console.log(this.move.results);
        })

        this.moveSearch = new FormGroup({
            search: new FormControl(null, Validators.required)
        })
    }

    getNextPage() {
        this.moveService.getPage(this.move.next).subscribe(data => {
            this.move = data
            this.replaceHyphens()
        })
    }
    getPreviousPage() {
        this.moveService.getPage(this.move.previous).subscribe(data => {
            this.move = data
            this.replaceHyphens()
        })
    }

    onSubmit() {
        // Form value
        let moveName: string = this.moveSearch.value.search

        // Filter moves by searched name
        if (moveName) {
            this.moveService.getEveryMove().subscribe(data => {
                let everyMove: any = data
                let array = everyMove.results
                let filtered: any = []

                // Filters an array that contains every move
                for (let i = 0; i < array.length; i++) {
                    if (array[i].name.includes(moveName)) {
                        filtered.push(array[i])
                    }
                }
                everyMove.results = filtered

                // Replaces the visible list of moves with the search results
                this.move = everyMove
                this.replaceHyphens()
            })
        }
    }

    replaceHyphens() {
        let array = []

        for (let i = 0; i < this.move.results.length; i++) {
            let pokeName: string = this.move.results[i].name

            if (pokeName.includes("-")) {
                this.move.results[i].name = pokeName.replaceAll("-", " ")
                array.push(this.move.results[i])
            } else {
                array.push(this.move.results[i])
            }
        }

        this.move.results = array
    }

}
