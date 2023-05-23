import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-small-type',
    templateUrl: './small-type.component.html',
    styleUrls: ['./small-type.component.scss']
})
export class SmallTypeComponent implements OnInit {

    @Input() typeName!: string

    constructor() { }

    ngOnInit(): void {
    }

}
