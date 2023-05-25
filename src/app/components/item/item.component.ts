import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

    id: number = parseInt(this.route.snapshot.paramMap.get("id")!);
    newId!: string;
    item: any;

    constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe((data) => {
            let id = this.route.snapshot.paramMap.get('id');
            this.newId = id!;
        });

        this.itemService.getItemById(this.id).subscribe(data => {
            this.item = data
            this.replaceHyphens();

            console.log("THIS ITEM OBJECT:");
            console.log(this.item);
        })


    }

    // Replaces potential hyphens into spaces
    replaceHyphens() {
        if (this.item.name.includes("-")) {
            this.item.name = this.item.name.replaceAll("-", " ")
        }

        if(this.item.category) {
            if (this.item.category.name.includes("-")) {
                this.item.category.name = this.item.category.name.replaceAll("-", " ")
            }
        }

        if(this.item.game_indices[0]) {
            for (let i = 0; i < this.item.game_indices.length; i++) {
                if (this.item.game_indices[i].generation.name.includes("-")) {
                    this.item.game_indices[i].generation.name = this.item.game_indices[i].generation.name.replaceAll("-", " ")
                }
            }
        }

        if(this.item.attributes[0]) {
            for (let i = 0; i < this.item.attributes.length; i++) {
                if (this.item.attributes[i].name.includes("-")) {
                    this.item.attributes[i].name = this.item.attributes[i].name.replaceAll("-", " ")
                }
            }
        }

        if(this.item.effect_entries[0]) {
            for (let i = 0; i < this.item.effect_entries.length; i++) {
                if (this.item.effect_entries[i].effect.includes("\n:   ")) {
                    this.item.effect_entries[i].effect = this.item.effect_entries[i].effect.replaceAll("\n:   ", ":\n")
                }
            }
        }

        if(this.item.fling_effect) {
            if (this.item.fling_effect.name.includes("-")) {
                this.item.fling_effect.name = this.item.fling_effect.name.replaceAll("-", " ")
            }
        }
    }

    getPreviousItem() {
        if (this.id != 1 && this.id != 10001) {
            this.router.navigateByUrl("/item/" + (this.id - 1)).then(() => {
                window.location.reload();
            });
        } else if (this.id == 10001) {
            this.router.navigateByUrl("/item/2099").then(() => {
                window.location.reload();
            });
        }
    }

    getNextItem() {
        if (this.id != 2099 && this.id != 10002) {
            this.router.navigateByUrl("/item/" + (this.id + 1)).then(() => {
                window.location.reload();
            });
        } else if (this.id == 2099) {
            this.router.navigateByUrl("/item/10001").then(() => {
                window.location.reload();
            });
        }
    }

}
