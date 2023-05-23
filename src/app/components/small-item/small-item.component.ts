import { Component, Input, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
    selector: 'app-small-item',
    templateUrl: './small-item.component.html',
    styleUrls: ['./small-item.component.scss']
})
export class SmallItemComponent implements OnInit {

    @Input() itemName!: string

    item: any
    icon: string = ""

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.itemService.getItemByName(this.itemName).subscribe(data => {
            this.item = data
            this.icon = this.item.sprites.default
            this.replaceHyphens()
        })
    }

    // Replaces potential hyphens into spaces
    replaceHyphens() {
        if (this.item.name.includes("-")) {
            this.item.name = this.item.name.replaceAll("-", " ")
        }
    }

}
