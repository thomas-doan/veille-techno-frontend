import {ICocktail} from "./ICocktail.interface";
import {Observable} from "rxjs";

export interface ICocktailService {
    getCocktails(): Observable<ICocktail[]>;
    addCocktail(cocktail: ICocktail): void;
    updateCocktail(updatedCocktail: ICocktail): void;
  deleteCocktail(id: number): void;
   updateCocktailsState(oldState: string, newState: string): void;
}

