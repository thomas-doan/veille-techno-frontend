// state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CocktailService } from './cocktail.service';

@Injectable({ providedIn: 'root' })
export class StateService {
  private statesSource = new BehaviorSubject<string[]>(['todo', 'progress', 'done']);
  states$ = this.statesSource.asObservable();

  private selectedStateSource = new BehaviorSubject<string | null>(null);
  selectedState$ = this.selectedStateSource.asObservable();

  constructor(private cocktailService: CocktailService) {}

  selectStateForEdit(state: string | null): void {
    this.selectedStateSource.next(state);
  }

  addState(state: string) {
    const currentStates = this.statesSource.value;
    if (!currentStates.includes(state)) {
      this.statesSource.next([...currentStates, state]);
    }
  }

  updateState(oldState: string, newState: string) {
    const states = this.statesSource.value.map(state => state === oldState ? newState : state);
    this.statesSource.next(states);
    this.cocktailService.updateCocktailState(oldState, newState);
  }

  deleteState(state: string) {
    const filteredStates = this.statesSource.value.filter(s => s !== state);
    this.statesSource.next(filteredStates);
    this.cocktailService.deleteCocktailsByState(state);
  }
}
