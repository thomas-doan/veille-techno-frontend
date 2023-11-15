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

  addState(newState: string): boolean {
    const currentStates = this.statesSource.value;
    if (currentStates.includes(newState)) {
      return false; // L'état existe déjà
    } else {
      this.statesSource.next([...currentStates, newState]);
      return true; // L'état a été ajouté
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
