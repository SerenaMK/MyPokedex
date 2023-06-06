import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

    item: any;
    itemSearch!: FormGroup
    thisPageOffset: number = 0
    pagination: any = [
        {
            number: 1,
            link: "https://pokeapi.co/api/v2/item?offset=0&limit=20"
        },
        {
            number: 2,
            link: "https://pokeapi.co/api/v2/item?offset=20&limit=20"
        },
        {
            number: 3,
            link: "https://pokeapi.co/api/v2/item?offset=40&limit=20"
        }
    ]
    lastPage: number = 100
    lastOffset: number = 100

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.itemService.getAllItems().subscribe(data => {
            this.item = data
            this.replaceHyphens()
            console.log(this.item.results);

            let next = this.item.next
            let offset = next.slice(next.indexOf("?offset=20") + 8, next.indexOf("&limit")) - 20
            this.thisPageOffset = offset

            this.getLastPage()

            console.log("-------------------------");
            console.log(this.thisPageOffset);
        })

        this.itemSearch = new FormGroup({
            search: new FormControl(null, Validators.required)
        })
    }

    onSubmit() {
        // Form value
        let itemName: string = this.itemSearch.value.search.toLowerCase()

        if (itemName.includes(" ")) {
            itemName = itemName.replaceAll(" ", "-")
        }

        // Filter items by searched name
        if (itemName) {
            this.itemService.getEveryItem().subscribe(data => {
                let everyItem: any = data
                let array = everyItem.results
                let filtered: any = []

                // Filters an array that contains every item
                for (let i = 0; i < array.length; i++) {
                    if (array[i].name.includes(itemName)) {
                        filtered.push(array[i])
                    }
                }
                everyItem.results = filtered

                // Replaces the visible list of item with the search results
                this.item = everyItem
                this.replaceHyphens()
            })
        }
    }

    replaceHyphens() {
        let array = []

        for (let i = 0; i < this.item.results.length; i++) {
            let pokeName: string = this.item.results[i].name

            if (pokeName.includes("-")) {
                this.item.results[i].name = pokeName.replaceAll("-", " ")
                array.push(this.item.results[i])
            } else {
                array.push(this.item.results[i])
            }
        }

        this.item.results = array
    }

    getPage(num: number): string {
        return "https://pokeapi.co/api/v2/item?offset=" + num + "&limit=20"
    }
    getOffset(url: any): number {
        return parseInt(url.slice(url.indexOf("?offset=") + 8, url.indexOf("&limit")))
    }
    getLastPage() {
        let divided = parseInt(this.item.count) / 20
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
            this.itemService.getPage(this.getPage(off)).subscribe(data => {
                this.item = data
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
            this.itemService.getPage(this.getPage(off)).subscribe(data => {
                this.item = data
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
            this.itemService.getPage(this.getPage(off)).subscribe(data => {
                this.item = data
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
            this.itemService.getPage(this.pagination[0].link).subscribe(data => {
                this.item = data
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
            this.itemService.getPage(this.pagination[1].link).subscribe(data => {
                this.item = data
                this.thisPageOffset = this.getOffset(this.pagination[1].link)
                this.replaceHyphens()
            })
        }
    }
    getNextPage() {
        if (this.thisPageOffset != 0 && this.thisPageOffset != this.lastOffset) {
            // if (this.thisPageOffset != 0) {
            this.itemService.getPage(this.pagination[2].link).subscribe(data => {
                this.item = data
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
            this.itemService.getPage(this.pagination[1].link).subscribe(data => {
                this.item = data
                this.thisPageOffset = this.getOffset(this.pagination[1].link)
                this.replaceHyphens()
            })
        }
    }

    getPageA() {
        this.itemService.getPage(this.pagination[0].link).subscribe(data => {
            this.item = data
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
        this.itemService.getPage(this.pagination[1].link).subscribe(data => {
            this.item = data
            this.thisPageOffset = this.getOffset(this.pagination[1].link)
            this.replaceHyphens()
        })
    }
    getPageC() {
        if (this.thisPageOffset != this.lastOffset) {
            this.itemService.getPage(this.pagination[2].link).subscribe(data => {
                this.item = data
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
