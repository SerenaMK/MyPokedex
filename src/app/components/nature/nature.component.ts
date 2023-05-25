import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NatureService } from 'src/app/services/nature.service';

@Component({
    selector: 'app-nature',
    templateUrl: './nature.component.html',
    styleUrls: ['./nature.component.scss']
})
export class NatureComponent implements OnInit {

    id: number = parseInt(this.route.snapshot.paramMap.get("id")!);
    newId!: string;
    nature: any;

    constructor(private natureService: NatureService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe((data) => {
            let id = this.route.snapshot.paramMap.get('id');
            this.newId = id!;
        });

        this.natureService.getNatureById(this.id).subscribe(data => {
            this.nature = data
            this.replaceHyphens();
            console.log(this.nature);
        })
    }

    // Replaces potential hyphens into spaces
    replaceHyphens() {
        if (this.nature.likes_flavor.name.includes("-")) {
            this.nature.likes_flavor.name = this.nature.likes_flavor.name.replaceAll("-", " ")
        }
        if (this.nature.hates_flavor.name.includes("-")) {
            this.nature.hates_flavor.name = this.nature.hates_flavor.name.replaceAll("-", " ")
        }
        if (this.nature.increased_stat.name.includes("-")) {
            this.nature.increased_stat.name = this.nature.increased_stat.name.replaceAll("-", " ")
        }
        if (this.nature.decreased_stat.name.includes("-")) {
            this.nature.decreased_stat.name = this.nature.decreased_stat.name.replaceAll("-", " ")
        }
    }

    getPreviousNature() {
        if (this.id != 1) {
            this.router.navigateByUrl("/nature/" + (this.id - 1)).then(() => {
                window.location.reload();
            });
        }
    }

    getNextNature() {
        if (this.id != 25) {
            this.router.navigateByUrl("/nature/" + (this.id + 1)).then(() => {
                window.location.reload();
            });
        }
    }


}
