import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MoveService } from 'src/app/services/move.service';

@Component({
    selector: 'app-move',
    templateUrl: './move.component.html',
    styleUrls: ['./move.component.scss']
})
export class MoveComponent implements OnInit {

    id: number = parseInt(this.route.snapshot.paramMap.get("id")!);
    newId!: string;
    move: any;
    machines: any

    constructor(private moveService: MoveService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe((data) => {
            let id = this.route.snapshot.paramMap.get('id');
            this.newId = id!;
        });

        this.moveService.getMoveById(this.id).subscribe(data => {
            this.move = data
            this.replaceHyphens();
        })


    }

    // Replaces potential hyphens into spaces
    replaceHyphens() {
        if (this.move.name.includes("-")) {
            this.move.name = this.move.name.replaceAll("-", " ")
        }

        if (this.move.target.name.includes("-")) {
            this.move.target.name = this.move.target.name.replaceAll("-", " ")
        }

        if(this.move.effect_entries[0]) {
            for (let i = 0; i < this.move.effect_entries.length; i++) {
                if (this.move.effect_entries[i].effect.includes("$effect_chance%")) {
                    this.move.effect_entries[i].effect = this.move.effect_entries[i].effect.replaceAll("$effect_chance%", this.move.effect_chance + "%")
                }

                if (this.move.effect_entries[i].short_effect.includes("$effect_chance%")) {
                    this.move.effect_entries[i].short_effect = this.move.effect_entries[i].short_effect.replaceAll("$effect_chance%", this.move.effect_chance + "%")
                }
            }
        }

    }

    getPreviousMove() {
        this.router.navigateByUrl("/move/" + (this.id - 1)).then(() => {
            window.location.reload();
        });
    }

    getNextMove() {
        this.router.navigateByUrl("/move/" + (this.id + 1)).then(() => {
            window.location.reload();
        });
    }

}
