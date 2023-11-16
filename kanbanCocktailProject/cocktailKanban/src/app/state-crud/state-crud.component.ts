import { Component } from '@angular/core';
import {StateManagementService} from "../_services/stateManagement.service";
import {StateSelectionService} from "../_services/stateSelection.service";

@Component({
  selector: 'app-state-crud',
  templateUrl: './state-crud.component.html',
  styleUrls: ['./state-crud.component.scss']
})
export class StateCrudComponent {
  states: string[] = [];
  currentState: string = '';
  originalState: string = '';
  errorMessage: string = '';

  constructor(private stateManagementService: StateManagementService, private stateSelectionService: StateSelectionService) {
    this.stateManagementService.states$.subscribe(states => this.states = states);
    this.stateManagementService.selectedState$.subscribe(state => {
      if (state) {
        this.currentState = state;
        this.originalState = state;
      } else {
        this.currentState = '';
        this.originalState = '';
      }
    });
  }
  updateState(): void {
    if (this.stateManagementService.updateState(this.originalState, this.currentState)) {
      this.cancelEdit();
      this.errorMessage = '';
    } else {
      this.errorMessage = this.currentState.trim()
          ? 'L’étape est déjà créée'
          : 'Le champ doit être complété';
    }
  }


  cancelEdit(): void {
    this.currentState = this.originalState;
    this.errorMessage = '';
    this.stateSelectionService.selectStateForEdit(null);
  }

  deleteState() {
    this.stateManagementService.deleteState(this.originalState);
    this.cancelEdit();
  }
}
