import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateType',
  standalone: true
})
export class TranslateTypePipe implements PipeTransform {
  transform(value: string): string {
    switch(value) {
      case 'tshirt':
        return 'футболка';
      case 'pants':
        return 'штани';
      case 'hoodie':
        return 'худі';
      case 'zipka':
        return 'зіпка';
      case 'sweater':
        return 'светр';
      case 'scarf':
        return 'шарф';
      case 'cap':
        return 'кепка';
      case 'accessories':
        return 'аксесуар';

      default:
        return value;
    }
  }

}
