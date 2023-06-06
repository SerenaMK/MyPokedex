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
    thisPageOffset: number = 0
    pagination: any = [
        {
            number: 1,
            link: "https://pokeapi.co/api/v2/move?offset=0&limit=20"
        },
        {
            number: 2,
            link: "https://pokeapi.co/api/v2/move?offset=20&limit=20"
        },
        {
            number: 3,
            link: "https://pokeapi.co/api/v2/move?offset=40&limit=20"
        }
    ]
    lastPage: number = 100
    lastOffset: number = 100

    constructor(private moveService: MoveService) { }

    ngOnInit(): void {
        this.moveService.getAllMoves().subscribe(data => {
            this.move = data
            this.replaceHyphens()
            console.log(this.move.results);

            let next = this.move.next
            let offset = next.slice(next.indexOf("?offset=20") + 8, next.indexOf("&limit")) - 20
            this.thisPageOffset = offset

            this.getLastPage()

            console.log("-------------------------");
            console.log(this.thisPageOffset);
        })

        this.moveSearch = new FormGroup({
            search: new FormControl(null, Validators.required)
        })
    }

    onSubmit() {
        // Form value
        let moveName: string = this.moveSearch.value.search.toLowerCase()

        if (moveName.includes(" ")) {
            moveName = moveName.replaceAll(" ", "-")
        }

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
            let moveName: string = this.move.results[i].name

            if (moveName.includes("-")) {
                this.move.results[i].name = moveName.replaceAll("-", " ")
                array.push(this.move.results[i])
            } else {
                array.push(this.move.results[i])
            }
        }

        this.move.results = array
    }

    getPage(num: number): string {
        return "https://pokeapi.co/api/v2/move?offset=" + num + "&limit=20"
    }
    getOffset(url: any): number {
        return parseInt(url.slice(url.indexOf("?offset=") + 8, url.indexOf("&limit")))
    }
    getLastPage() {
        let divided = parseInt(this.move.count) / 20
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
            this.moveService.getPage(this.getPage(off)).subscribe(data => {
                this.move = data
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
            this.moveService.getPage(this.getPage(off)).subscribe(data => {
                this.move = data
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
            this.moveService.getPage(this.getPage(off)).subscribe(data => {
                this.move = data
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
            this.moveService.getPage(this.pagination[0].link).subscribe(data => {
                this.move = data
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
            this.moveService.getPage(this.pagination[1].link).subscribe(data => {
                this.move = data
                this.thisPageOffset = this.getOffset(this.pagination[1].link)
                this.replaceHyphens()
            })
        }
    }
    getNextPage() {
        if (this.thisPageOffset != 0 && this.thisPageOffset != this.lastOffset) {
            // if (this.thisPageOffset != 0) {
            this.moveService.getPage(this.pagination[2].link).subscribe(data => {
                this.move = data
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
            this.moveService.getPage(this.pagination[1].link).subscribe(data => {
                this.move = data
                this.thisPageOffset = this.getOffset(this.pagination[1].link)
                this.replaceHyphens()
            })
        }
    }

    getPageA() {
        this.moveService.getPage(this.pagination[0].link).subscribe(data => {
            this.move = data
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
        this.moveService.getPage(this.pagination[1].link).subscribe(data => {
            this.move = data
            this.thisPageOffset = this.getOffset(this.pagination[1].link)
            this.replaceHyphens()
        })
    }
    getPageC() {
        if (this.thisPageOffset != this.lastOffset) {
            this.moveService.getPage(this.pagination[2].link).subscribe(data => {
                this.move = data
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
