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

  // create state method and check if state already exists
    createState(state: string): void {
        const states = this.statesSource.value;
        if (states.indexOf(state) === -1) {
        states.push(state);
        this.statesSource.next(states);
        }
    }

  updateState(oldState: string, newState: string): boolean {
    if (!newState.trim()) {
      return false;
    }

    const states = this.statesSource.value;
    if (states.includes(newState)) {
      return false;
    }

    const updatedStates = states.map(state => state === oldState ? newState : state);
    this.statesSource.next(updatedStates);
    this.cocktailService.updateCocktailState(oldState, newState);

    return true;
  }

  deleteState(state: string) {
    const filteredStates = this.statesSource.value.filter(s => s !== state);
    this.statesSource.next(filteredStates);
    this.cocktailService.deleteCocktailsByState(state);
  }
}
