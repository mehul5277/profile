import { TitleCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToSpaces',
  standalone: true
})
export class CamelCaseToSpacesPipe implements PipeTransform {

  constructor() { }

  transform(value: unknown): string {
    if (!value) return '';

    // pipe:cleanTitle Remove unwanted dash symbols from a string
    // const cleanString = value.replace(/-/g, ' ');

    // Inserts a space before any capital letter

    const cleanString = value.toString().replace(/([a-z])([A-Z])/g, '$1 $2');

    //var x = this.titleCasePipe.transform(cleanString);
    return value.toString().replace(/([a-z])([A-Z])/g, '$1 $2');
  }

}
