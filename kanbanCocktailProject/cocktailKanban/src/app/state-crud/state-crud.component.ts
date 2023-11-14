import { Component } from '@angular/core';
import {StateService} from "../_services/state.service";

@Component({
  selector: 'app-state-crud',
  templateUrl: './state-crud.component.html',
  styleUrls: ['./state-crud.component.scss']
})
export class StateCrudComponent {
  states: string[] = [];
  editState: string = '';
  originalState: string = '';

  constructor(private stateService: StateService) {
    this.stateService.states$.subscribe(states => this.states = states);
  }

  saveState() {
    if (this.originalState) {
      this.stateService.updateState(this.originalState, this.editState);
    } else {
      this.stateService.addState(this.editState);
    }
    this.resetEditState();
  }

  startEdit(state: string) {
    this.editState = state;
    this.originalState = state;
  }

  deleteState(state: string) {
    this.stateService.deleteState(state);
  }

  resetEditState() {
    this.editState = '';
    this.originalState = '';
  }
}
