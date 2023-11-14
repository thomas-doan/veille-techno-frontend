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


  currentState: string = '';
  originalState: string = '';


  constructor(private stateService: StateService) {
    this.stateService.states$.subscribe(states => this.states = states);
    this.stateService.selectedState$.subscribe(state => {
      if (state) {
        this.currentState = state;
        this.originalState = state;
      } else {
        this.currentState = '';
        this.originalState = '';
      }
    });
  }

/*  saveState() {
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
  }*/


  saveState(): void {
    if (this.currentState !== this.originalState) {
      this.stateService.updateState(this.originalState, this.currentState);
      //this.cancelEdit();
    }
    this.stateService.selectStateForEdit(null);
  }

  cancelEdit(): void {
    this.currentState = this.originalState;
    this.stateService.selectStateForEdit(null);
  }

  deleteState() {
    this.stateService.deleteState(this.originalState);
    this.cancelEdit();
  }
}
