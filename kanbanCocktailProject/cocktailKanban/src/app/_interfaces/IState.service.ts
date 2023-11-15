// istate.service.ts
import { Observable } from 'rxjs';

export interface IStateService {
    getStates(): Observable<string[]>;
    getSelectedState(): Observable<string | null>;
    addState(newState: string): boolean;
    updateState(oldState: string, newState: string): boolean;
    deleteState(state: string): void;
    selectStateForEdit(state: string | null): void;
}
