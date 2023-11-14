import {Component, OnInit} from '@angular/core';
import {StateService} from "../_services/state.service";
import {CocktailService} from "../_services/cocktail.service";
import {Observable, Subscription} from "rxjs";
import {ICocktail} from "../_interfaces/ICocktail.interface";


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
  editedStateValue: string = '';
  protected readonly HTMLSelectElement = HTMLSelectElement;


  constructor(private cocktailService: CocktailService, public stateService: StateService) {
    this.cocktails$ = this.cocktailService.cocktails$;
    this.states$ = this.stateService.states$;
    this.stateSub = this.stateService.selectedState$.subscribe(state => {
      this.editingState = state;
    });
  }

  ngOnInit() {

  }

  startEditState(state: string): void {
    this.editingState = state;
    this.editedStateValue = state;
  }

  applyEditState(oldState: string): void {
    if (this.editedStateValue && oldState !== this.editedStateValue) {
      this.stateService.updateState(oldState, this.editedStateValue);
      this.cancelEditState();
    }
  }

  editState(state: string): void {
    this.editingState = state;
    this.stateService.selectStateForEdit(state);
  }


  cancelEditState(): void {
    this.editingState = null;
    this.editedStateValue = '';
  }

  deleteCocktail(id: number) {
    this.cocktailService.deleteCocktail(id);
  }

  deleteState(state: string) {
    this.stateService.deleteState(state);
  }

  selectCocktail(cocktail: ICocktail): void {
    this.cocktailService.selectCocktail(cocktail);
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
