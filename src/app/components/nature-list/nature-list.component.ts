import { Component, OnInit } from '@angular/core';
import { NatureService } from 'src/app/services/nature.service';

@Component({
    selector: 'app-nature-list',
    templateUrl: './nature-list.component.html',
    styleUrls: ['./nature-list.component.scss']
})
export class NatureListComponent implements OnInit {

    natures: any;

    constructor(private natureService: NatureService) { }

    ngOnInit(): void {
        this.natureService.getEveryNature().subscribe(data => {
            this.natures = data
            this.replaceHyphens()
            console.log(this.natures.results);
        })
    }

    replaceHyphens() {
        let array = []

        for (let i = 0; i < this.natures.results.length; i++) {
            let natureName: string = this.natures.results[i].name

            if (natureName.includes("-")) {
                this.natures.results[i].name = natureName.replaceAll("-", " ")
                array.push(this.natures.results[i])
            } else {
                array.push(this.natures.results[i])
            }
        }

        this.natures.results = array
    }

}
