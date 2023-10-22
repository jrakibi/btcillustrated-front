import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractName'
})
export class ExtractNamePipe implements PipeTransform {
  transform(value: string): string {
    const match = value.match(/^(.*?)(?:\s\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2})?$/);
    return match && match[1] ? match[1] : value;
  }
}
