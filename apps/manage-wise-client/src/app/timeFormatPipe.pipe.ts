import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
    transform(value: string): string {
        const myDate = new Date(value);
        const hours = myDate.getHours().toString().padStart(2, '0');
        const minutes = myDate.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
}