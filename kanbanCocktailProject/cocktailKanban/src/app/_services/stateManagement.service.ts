import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StateManagementService {
  private statesSource = new BehaviorSubject<string[]>(['todo', 'progress', 'done']);
  states$ = this.statesSource.asObservable();

  private selectedStateSource = new BehaviorSubject<string | null>(null);
  selectedState$ = this.selectedStateSource.asObservable();

  private stateChangeNotifier = new Subject<{ oldState: string, newState: string }>();
  stateChange$ = this.stateChangeNotifier.asObservable();

  getStates(): Observable<string[]> {
    return this.statesSource.asObservable();
  }

  addState(newState: string): boolean {
    const currentStates = this.statesSource.value;
    if (currentStates.includes(newState)) {
      return false;
    } else {
      this.statesSource.next([...currentStates, newState]);
      return true;
    }
  }

  updateState(oldState: string, newState: string): boolean {
    const states = this.statesSource.value;

    if (!newState.trim() || states.includes(newState)) {
      console.log('updateState false', oldState, newState);
      return false;
    }

    if (states.includes(oldState)) {
      console.log('updateState true', oldState, newState);
      const updatedStates = states.map(state => state === oldState ? newState : state);
      this.statesSource.next(updatedStates);
      this.stateChangeNotifier.next({ oldState, newState });
      return true;
    }

    return false;
  }

  deleteState(stateToDelete: string): void {
    const filteredStates = this.statesSource.value.filter(state => state !== stateToDelete);
    this.statesSource.next(filteredStates);
  }

  setSelectedState(state: string | null): void {
    this.selectedStateSource.next(state);
  }

}
