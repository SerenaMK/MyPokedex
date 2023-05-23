import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-small-game',
    templateUrl: './small-game.component.html',
    styleUrls: ['./small-game.component.scss']
})
export class SmallGameComponent implements OnInit {

    @Input() gameName!: string

    constructor() { }

    ngOnInit(): void {
    }

}
