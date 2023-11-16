import { Observable } from 'rxjs';
export interface IStateSelectionService {
  getSelectedState(): Observable<string | null>;
  selectStateForEdit(state: string | null): void;
}
