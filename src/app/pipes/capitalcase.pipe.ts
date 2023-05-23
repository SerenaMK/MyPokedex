import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalcase'
})
export class CapitalcasePipe implements PipeTransform {

    transform(value: string, ...args: unknown[]): unknown {

        const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
        return capitalized;
    }

}
