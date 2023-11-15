// cocktail.service.ts
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { ICocktail } from '../_interfaces/ICocktail.interface';
import {ICocktailService} from "../_interfaces/ICocktail.service";

@Injectable({ providedIn: 'root' })
export class CocktailService implements ICocktailService {
  private initialCocktails: ICocktail[] = [
    {
      id : 1,
      name : "Mojito",
      img : "https://www.thecocktaildb.com/images/media/drink/rxtqps1478251029.jpg",
      description : "A refreshing Cuban cocktail, the Mojito is a combination of rum, lime and mint.",
      state : "todo"
    },
    {
      id : 2,
      name : "Old Fashioned",
      img : "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg",
      description : "The Old Fashioned is a cocktail made by muddling sugar with bitters and water, adding whiskey or, less commonly, brandy, and garnishing with orange slice or zest and a cocktail cherry.",
      state : "todo"
    },
    {
      id: 3,
      name: "Cosmopolitan",
      img: "https://www.thecocktaildb.com/images/media/drink/kpsajh1504368362.jpg",
      description: "A delicious recipe for Cosmopolitan, with vodka, triple sec, Rose's® lime juice and cranberry juice.",
      state: "progress"
    },
    {
      id: 4,
      name: "Moscow Mule",
      img: "https://www.thecocktaildb.com/images/media/drink/3pylqc1504370988.jpg",
      description: "A Moscow mule is a cocktail made with vodka, spicy ginger beer, and lime juice, garnished with a slice or wedge of lime.",
      state: "done"
    }
  ];

  private cocktailsSource = new BehaviorSubject<ICocktail[]>(this.initialCocktails);
  private selectedCocktailSource = new BehaviorSubject<ICocktail | null>(null);

  cocktails$ = this.cocktailsSource.asObservable();
  selectedCocktail$ = this.selectedCocktailSource.asObservable();


  getCocktails(): Observable<ICocktail[]> {
    return this.cocktailsSource.asObservable();
  }

  addCocktail(cocktail: ICocktail) {
    const currentCocktails = this.cocktailsSource.value;
    this.cocktailsSource.next([...currentCocktails, cocktail]);
  }

  updateCocktail(updatedCocktail: ICocktail) {
    const cocktails = this.cocktailsSource.value.map(cocktail =>
      cocktail.id === updatedCocktail.id ? updatedCocktail : cocktail
    );
    this.cocktailsSource.next(cocktails);
  }

  deleteCocktail(id: number) {
    const filteredCocktails = this.cocktailsSource.value.filter(cocktail => cocktail.id !== id);
    this.cocktailsSource.next(filteredCocktails);
  }

  updateCocktailState(oldState: string, newState: string) {
    const updatedCocktails = this.cocktailsSource.value.map(cocktail => {
      if (cocktail.state === oldState) {
        return { ...cocktail, state: newState };
      }
      return cocktail;
    });
    this.cocktailsSource.next(updatedCocktails);
  }

  deleteCocktailsByState(state: string) {
    const filteredCocktails = this.cocktailsSource.value.filter(cocktail => cocktail.state !== state);
    this.cocktailsSource.next(filteredCocktails);
  }
}
