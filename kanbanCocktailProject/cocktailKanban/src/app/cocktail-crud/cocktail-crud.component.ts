import { Component } from '@angular/core';
import { ICocktail } from '../_interfaces/ICocktail.interface';
import { CocktailService } from '../_services/cocktail.service';
import {StateService} from "../_services/state.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-cocktail-crud',
  templateUrl: './cocktail-crud.component.html',
  styleUrls: ['./cocktail-crud.component.scss']
})
export class CocktailCrudComponent {
  cocktails: ICocktail[] = [];
  editCocktail: ICocktail = { id: 0, name: '', img: '', description: '', state: '' };
  states$: Observable<string[]>;

  constructor(private cocktailService: CocktailService, private stateService: StateService) {
    this.cocktailService.cocktails$.subscribe(cocktails => this.cocktails = cocktails);
    this.states$ = this.stateService.states$;
  }

  ngOnInit(): void {
    this.cocktailService.selectedCocktail$.subscribe(cocktail => {
      if (cocktail) {
        this.editCocktail = cocktail;
      }
    });
  }

  saveCocktail() {
    if (this.editCocktail.id === 0) {
      const newId = this.cocktails.length > 0 ? Math.max(...this.cocktails.map(c => c.id)) + 1 : 1;
      this.editCocktail.id = newId;
      this.cocktailService.addCocktail({...this.editCocktail});
    } else {
      this.cocktailService.updateCocktail({...this.editCocktail});
    }
    this.resetEditCocktail();
  }

  startEdit(cocktail: ICocktail) {
    this.editCocktail = {...cocktail};
  }

  deleteCocktail(id: number) {
    this.cocktailService.deleteCocktail(id);
  }

  resetEditCocktail() {
    this.editCocktail = { id: 0, name: '', img: '', description: '', state: '' };
  }
}
