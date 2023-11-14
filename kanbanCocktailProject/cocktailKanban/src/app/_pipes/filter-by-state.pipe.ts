// filter-by-state.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { ICocktail } from "../_interfaces/ICocktail.interface";

@Pipe({
  name: 'filterByState'
})
export class FilterByStatePipe implements PipeTransform {
  transform(cocktails: ICocktail[], state: string): ICocktail[] {
    return cocktails.filter(cocktail => cocktail.state === state);
  }
}
