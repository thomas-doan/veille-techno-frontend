import {Component, OnInit} from '@angular/core';
import { ICocktail } from '../_interfaces/ICocktail.interface';
import { CocktailService } from '../_services/cocktail.service';
import {StateManagementService} from "../_services/stateManagement.service";
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cocktail-crud',
  templateUrl: './cocktail-crud.component.html',
  styleUrls: ['./cocktail-crud.component.scss']
})
export class CocktailCrudComponent implements OnInit{
  editCocktailForm: FormGroup = new FormGroup({});
  cocktails: ICocktail[] = [];
  editCocktail: ICocktail = { id: 0, name: '', img: '', description: '', state: '' };
  states$: Observable<string[]>;
  errorMessage: string = '';

  constructor(private cocktailService: CocktailService, private stateManagement: StateManagementService) {
    this.cocktailService.cocktails$.subscribe(cocktails => this.cocktails = cocktails);
    this.states$ = this.stateManagement.states$;

  }

  ngOnInit(): void {
    this.cocktailService.selectedCocktail$.subscribe(cocktail => {
      if (cocktail) {
        this.editCocktail = cocktail;
      }
    });

    this.editCocktailForm = new FormGroup({
      name: new FormControl('', Validators.required),
      img: new FormControl(''), // Image n'est pas obligatoire
      description: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required)
    });
  }

  saveCocktail(): void {
    if (this.editCocktailForm.valid) {
      const newCocktail = this.editCocktailForm.value as ICocktail;
      newCocktail.id = this.cocktails.length > 0 ? Math.max(...this.cocktails.map(c => c.id)) + 1 : 1;
      this.cocktailService.addCocktail(newCocktail);
      this.editCocktailForm.reset();
    }
    this.resetEditCocktail();
  }

  resetEditCocktail() {
    this.editCocktail = { id: 0, name: '', img: '', description: '', state: '' };
  }
}
