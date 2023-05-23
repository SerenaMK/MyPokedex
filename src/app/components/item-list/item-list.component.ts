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

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.itemService.getAllItems().subscribe(data => {
            this.item = data
            this.replaceHyphens()
            console.log(this.item.results);
        })

        this.itemSearch = new FormGroup({
            search: new FormControl(null, Validators.required)
        })
    }

    getNextPage() {
        this.itemService.getPage(this.item.next).subscribe(data => {
            this.item = data
            this.replaceHyphens()
        })
    }
    getPreviousPage() {
        this.itemService.getPage(this.item.previous).subscribe(data => {
            this.item = data
            this.replaceHyphens()
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

}
