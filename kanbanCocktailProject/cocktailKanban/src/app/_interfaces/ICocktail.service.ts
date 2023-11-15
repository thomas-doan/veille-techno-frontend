// icocktail.service.ts
import { Observable } from 'rxjs';
import { ICocktail } from './ICocktail.interface';
export interface ICocktailService {
  getCocktails(): Observable<ICocktail[]>;
  addCocktail(cocktail: ICocktail): void;
  updateCocktail(updatedCocktail: ICocktail): void;
  deleteCocktail(id: number): void;
  updateCocktailState(oldState: string, newState: string): void;
  deleteCocktailsByState(state: string): void;
}
