import {Component, OnInit} from '@angular/core';
import {StateService} from "../_services/state.service";
import {CocktailService} from "../_services/cocktail.service";
import {Observable} from "rxjs";
import {ICocktail} from "../_interfaces/ICocktail.interface";


@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  cocktails$: Observable<ICocktail[]>;
  states$: Observable<string[]>;
  protected readonly HTMLSelectElement = HTMLSelectElement;


  constructor(private cocktailService: CocktailService, private stateService: StateService) {
    this.cocktails$ = this.cocktailService.cocktails$;
    this.states$ = this.stateService.states$;
  }

  ngOnInit() {

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

}
