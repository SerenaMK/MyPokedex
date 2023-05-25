import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeService } from 'src/app/services/type.service';

@Component({
    selector: 'app-type',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {

    id: number = parseInt(this.route.snapshot.paramMap.get("id")!);
    newId!: string;
    type: any;

    constructor(private typeService: TypeService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe((data) => {
            let id = this.route.snapshot.paramMap.get('id');
            this.newId = id!;
        });

        this.typeService.getTypeById(this.id).subscribe(data => {
            this.type = data
            this.replaceHyphens();
            console.log(this.type);
        })
    }

    // Replaces potential hyphens into spaces
    replaceHyphens() {
        if (this.type.generation.name.includes("-")) {
            this.type.generation.name = this.type.generation.name.replaceAll("-", " ")
        }

        if(this.type.moves[0]) {
            for (let i = 0; i < this.type.moves.length; i++) {
                if (this.type.moves[i].name.includes("-")) {
                    this.type.moves[i].name = this.type.moves[i].name.replaceAll("-", " ")
                }
            }
        }

        if(this.type.game_indices[0]) {
            for (let i = 0; i < this.type.game_indices.length; i++) {
                if (this.type.game_indices[i].generation.name.includes("-")) {
                    this.type.game_indices[i].generation.name = this.type.game_indices[i].generation.name.replaceAll("-", " ")
                }
            }
        }
    }

    getPreviousAbility() {
        if (this.id != 1 && this.id != 10001) {
            this.router.navigateByUrl("/type/" + (this.id - 1)).then(() => {
                window.location.reload();
            });
        } else if (this.id == 10001) {
            this.router.navigateByUrl("/type/18").then(() => {
                window.location.reload();
            });
        }
    }

    getNextAbility() {
        if (this.id != 18 && this.id != 10002) {
            this.router.navigateByUrl("/type/" + (this.id + 1)).then(() => {
                window.location.reload();
            });
        } else if (this.id == 18) {
            this.router.navigateByUrl("/type/10001").then(() => {
                window.location.reload();
            });
        }
    }

}
