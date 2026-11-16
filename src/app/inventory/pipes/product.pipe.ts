import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productFilter',
  standalone: true
})
export class ProductPipe implements PipeTransform {
  transform<T extends { product: string; code: string }>(items: T[] | null, query: string | null): T[] {
    if (!items) return [];
    if (!query || query.trim() === '') return items;

    const lowerQuery = query.toLowerCase().trim();
    return items.filter(item =>
      item.product.toLowerCase().includes(lowerQuery) ||
      item.code.toLowerCase().includes(lowerQuery)
    );
  }
}
