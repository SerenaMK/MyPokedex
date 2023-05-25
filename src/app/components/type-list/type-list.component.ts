import { Component, OnInit } from '@angular/core';
import { TypeService } from 'src/app/services/type.service';

@Component({
    selector: 'app-type-list',
    templateUrl: './type-list.component.html',
    styleUrls: ['./type-list.component.scss']
})
export class TypeListComponent implements OnInit {

    types: any;

    constructor(private typeService: TypeService) { }

    ngOnInit(): void {
        this.typeService.getAllTypes().subscribe(data => {
            this.types = data
            // this.replaceHyphens()
            console.log(this.types.results);
        })
    }

}
