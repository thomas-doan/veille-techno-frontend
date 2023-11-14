import { ICocktail } from "./ICocktail.interface";

export interface ICocktailService {
  getCocktails(): ICocktail[];
  getCocktailsByState(state: string): ICocktail[];
}
