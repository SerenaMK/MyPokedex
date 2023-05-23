import { Component, Input, OnInit } from '@angular/core';
import { MachineService } from 'src/app/services/machine.service';

@Component({
    selector: 'app-small-machine',
    templateUrl: './small-machine.component.html',
    styleUrls: ['./small-machine.component.scss']
})
export class SmallMachineComponent implements OnInit {

    @Input() machineId!: number;
    machine: any

    constructor(private machineService: MachineService) { }

    ngOnInit(): void {
        this.machineService.getMachineById(this.machineId).subscribe(data => {
            this.machine = data
        })
    }

}
