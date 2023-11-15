import {Component, Inject, OnInit} from '@angular/core';
import {StateService} from "../_services/state.service";
import {Observable, Subscription} from "rxjs";
import {ICocktail} from "../_interfaces/ICocktail.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ICocktailService} from "../_interfaces/ICocktail.service";
import {CocktailService} from "../_services/cocktail.service";


@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  cocktails$: Observable<ICocktail[]>;
  states$: Observable<string[]>;
  editingState: string | null = null;
  private stateSub: Subscription;
  selectedCocktail: ICocktail | null = null;
  editCocktailForm: FormGroup;
  isFormModified: boolean = false;
  editingCocktailId: number | null = null;

  constructor(  private cocktailService: CocktailService, public stateService: StateService) {
    this.cocktails$ = this.cocktailService.getCocktails();
    this.states$ = this.stateService.states$;
    this.stateSub = this.stateService.selectedState$.subscribe(state => {
      this.editingState = state;
    });
    this.editCocktailForm = new FormGroup({
      name: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.editCocktailForm.valueChanges.subscribe(() => {
      this.isFormModified = this.editCocktailForm.dirty;
    });
  }

  ngOnInit() {
  }

  editState(state: string): void {
    this.editingState = state;
    this.stateService.selectStateForEdit(state);
  }

  startEdit(cocktail: ICocktail): void {
    if (this.editingCocktailId === cocktail.id) {
      this.editingCocktailId = null;
    } else {
      this.editingCocktailId = cocktail.id;
      this.editCocktailForm.reset(cocktail);
      this.isFormModified = false;
    }
  }

  isEditing(cocktail: ICocktail): boolean {
    return cocktail.id === this.editingCocktailId;
  }



  selectCocktail(cocktail: ICocktail): void {
    this.selectedCocktail = cocktail;
    this.editCocktailForm.setValue({
      name: cocktail.name,
      img: cocktail.img,
      description: cocktail.description
    });
  }

  saveCocktailChanges(): void {
    if (this.editCocktailForm.valid && this.selectedCocktail) {
      const updatedCocktail = {
        ...this.selectedCocktail,
        ...this.editCocktailForm.value
      };
      this.cocktailService.updateCocktail(updatedCocktail);
      this.selectedCocktail = null;
    }
    this.editingCocktailId = null;
  }

  cancelEditCocktail(): void {
    this.selectedCocktail = null;
    this.editingCocktailId = null;
  }
  deleteCocktail(id: number) {
    this.cocktailService.deleteCocktail(id);
  }

  changeCocktailState(cocktail: ICocktail, newState: EventTarget | null): void {
    const selectElement = newState as HTMLSelectElement;
    if (selectElement && selectElement.value && cocktail.state !== selectElement.value) {
      const updatedCocktail = { ...cocktail, state: selectElement.value };
      this.cocktailService.updateCocktail(updatedCocktail);
    }
  }

  ngOnDestroy(): void {
    this.stateSub.unsubscribe();
  }

}
