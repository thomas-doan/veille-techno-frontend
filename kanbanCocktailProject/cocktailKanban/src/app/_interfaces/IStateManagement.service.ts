import { Observable } from 'rxjs';
export interface IStateManagementService {
  getStates(): Observable<string[]>;
  addState(newState: string): boolean;
  updateState(oldState: string, newState: string): boolean;
  deleteState(stateToDelete: string): void;
  setSelectedState(state: string | null): void;
}



