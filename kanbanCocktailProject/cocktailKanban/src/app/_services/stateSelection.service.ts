import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {StateManagementService} from "./stateManagement.service";
import {IStateSelectionService} from "../_interfaces/IStateSelection.service";

@Injectable({ providedIn: 'root' })
export class StateSelectionService implements IStateSelectionService{
  constructor(private stateManagementService: StateManagementService) {}

  private selectedStateSource = new BehaviorSubject<string | null>(null);
  selectedState$ = this.selectedStateSource.asObservable();

  getSelectedState(): Observable<string | null> {
    return this.selectedStateSource.asObservable();
  }

  selectStateForEdit(state: string | null): void {
    this.stateManagementService.setSelectedState(state);
  }

}
