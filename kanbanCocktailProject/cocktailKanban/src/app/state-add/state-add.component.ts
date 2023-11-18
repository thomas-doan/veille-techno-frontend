import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { StateManagementService } from '../_services/stateManagement.service';
import {trimValidator} from "../_utility/validator.utility";
import {AddStateStrategy} from "../_services/addStateStrategy.service";

@Component({
  selector: 'app-state-add',
  templateUrl: './state-add.component.html'
})
export class StateAddComponent {
  stateForm: FormGroup;

  constructor(
    private addStateStrategy: AddStateStrategy,
    private stateService: StateManagementService
  ) {
    this.stateForm = new FormGroup({
      newState: new FormControl('', [Validators.required, trimValidator])
    });
  }

  addState(): void {
    if (this.stateForm.invalid) {
      return;
    }

    const newState = this.stateForm.get('newState')?.value;
    this.addStateStrategy.execute(newState);
    this.stateForm.reset();
  }

  get newStateControl() {
    return this.stateForm.get('newState');
  }
}
