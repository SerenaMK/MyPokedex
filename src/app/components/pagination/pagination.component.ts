import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    element: any
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

    constructor() { }

    ngOnInit(): void {

        let next = this.element.next
        let offset = next.slice(next.indexOf("?offset=20") + 8, next.indexOf("&limit")) - 20
        this.thisPageOffset = offset

        // this.getLastPage()
    }

    // getPreviousPage() {
    //     if (this.thisPageOffset != this.lastOffset) {
    //         this.pokedexService.getPage(this.pagination[0].link).subscribe(data => {
    //             this.pokemon = data
    //             this.thisPageOffset = this.getOffset(this.pagination[0].link)
    //             if (this.pagination[0].number != 1) {
    //                 this.pagination[0].number -= 1
    //                 this.pagination[1].number -= 1
    //                 this.pagination[2].number -= 1
    //                 this.pagination[0].link = this.getPage(this.thisPageOffset - 20)
    //                 this.pagination[1].link = this.getPage(this.thisPageOffset)
    //                 this.pagination[2].link = this.getPage(this.thisPageOffset + 20)
    //             }
    //             this.replaceHyphens()
    //         })
    //     } else {
    //         this.pokedexService.getPage(this.pagination[1].link).subscribe(data => {
    //             this.pokemon = data
    //             this.thisPageOffset = this.getOffset(this.pagination[1].link)
    //             this.replaceHyphens()
    //         })
    //     }
    // }
    // getNextPage() {
    //     if (this.thisPageOffset != 0 && this.thisPageOffset != this.lastOffset) {
    //         // if (this.thisPageOffset != 0) {
    //         this.pokedexService.getPage(this.pagination[2].link).subscribe(data => {
    //             this.pokemon = data
    //             this.thisPageOffset = this.getOffset(this.pagination[2].link)
    //             if (this.pagination[2].number != this.lastPage) {
    //                 this.pagination[0].number += 1
    //                 this.pagination[1].number += 1
    //                 this.pagination[2].number += 1
    //                 this.pagination[0].link = this.getPage(this.thisPageOffset - 20)
    //                 this.pagination[1].link = this.getPage(this.thisPageOffset)
    //                 this.pagination[2].link = this.getPage(this.thisPageOffset + 20)
    //             }
    //             this.replaceHyphens()
    //         })
    //     } else if (this.thisPageOffset == 0) {
    //         this.pokedexService.getPage(this.pagination[1].link).subscribe(data => {
    //             this.pokemon = data
    //             this.thisPageOffset = this.getOffset(this.pagination[1].link)
    //             this.replaceHyphens()
    //         })
    //     }
    // }

    // getPageA() {
    //     this.pokedexService.getPage(this.pagination[0].link).subscribe(data => {
    //         this.pokemon = data
    //         this.thisPageOffset = this.getOffset(this.pagination[0].link)
    //         if (this.pagination[0].number != 1) {
    //             this.pagination[0].number -= 1
    //             this.pagination[1].number -= 1
    //             this.pagination[2].number -= 1
    //             this.pagination[0].link = this.getPage(this.thisPageOffset - 20)
    //             this.pagination[1].link = this.getPage(this.thisPageOffset)
    //             this.pagination[2].link = this.getPage(this.thisPageOffset + 20)
    //         }
    //         this.replaceHyphens()
    //     })
    // }
    // getPageB() {
    //     this.pokedexService.getPage(this.pagination[1].link).subscribe(data => {
    //         this.pokemon = data
    //         this.thisPageOffset = this.getOffset(this.pagination[1].link)
    //         this.replaceHyphens()
    //     })
    // }
    // getPageC() {
    //     this.pokedexService.getPage(this.pagination[2].link).subscribe(data => {
    //         this.pokemon = data
    //         this.thisPageOffset = this.getOffset(this.pagination[2].link)
    //         this.pagination[0].number += 1
    //         this.pagination[1].number += 1
    //         this.pagination[2].number += 1
    //         this.pagination[0].link = this.getPage(this.thisPageOffset - 20)
    //         this.pagination[1].link = this.getPage(this.thisPageOffset)
    //         this.pagination[2].link = this.getPage(this.thisPageOffset + 20)
    //         this.replaceHyphens()
    //     })
    // }

    // getPage(num: number): string {
    //     return "https://pokeapi.co/api/v2/pokemon?offset=" + num + "&limit=20"
    // }
    // getOffset(url: any): number {
    //     return parseInt(url.slice(url.indexOf("?offset=") + 8, url.indexOf("&limit")))
    // }
    // getLastPage() {
    //     let divided = parseInt(this.element.count) / 20
    //     let isInteger: boolean = (divided % 1 == 0)

    //     if (isInteger) {
    //         this.lastPage = divided
    //     } else {
    //         this.lastPage = Math.trunc(divided) + 1
    //     }

    //     this.lastOffset = Math.trunc(divided) * 20

    // }

}
