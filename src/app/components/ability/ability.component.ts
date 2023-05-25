import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AbilityService } from 'src/app/services/ability.service';

@Component({
    selector: 'app-ability',
    templateUrl: './ability.component.html',
    styleUrls: ['./ability.component.scss']
})
export class AbilityComponent implements OnInit {

    id: number = parseInt(this.route.snapshot.paramMap.get("id")!);
    newId!: string;
    ability: any;

    constructor(private abilityService: AbilityService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe((data) => {
            let id = this.route.snapshot.paramMap.get('id');
            this.newId = id!;
        });

        this.abilityService.getAbilityById(this.id).subscribe(data => {
            this.ability = data
            this.replaceHyphens();
            console.log(this.ability);
        })
    }

    // Replaces potential hyphens into spaces
    replaceHyphens() {
        if (this.ability.name.includes("-")) {
            this.ability.name = this.ability.name.replaceAll("-", " ")
        }

        if (this.ability.generation.name.includes("-")) {
            this.ability.generation.name = this.ability.generation.name.replaceAll("-", " ")
        }

    }

    getPreviousAbility() {
        if (this.id != 1 && this.id != 10001) {
            this.router.navigateByUrl("/ability/" + (this.id - 1)).then(() => {
                window.location.reload();
            });
        } else if (this.id == 10001) {
            this.router.navigateByUrl("/ability/298").then(() => {
                window.location.reload();
            });
        }
    }

    getNextAbility() {
        if (this.id != 298 && this.id != 10060) {
            this.router.navigateByUrl("/ability/" + (this.id + 1)).then(() => {
                window.location.reload();
            });
        } else if (this.id == 298) {
            this.router.navigateByUrl("/ability/10001").then(() => {
                window.location.reload();
            });
        }
    }

}
