import { Component } from '@angular/core';
import { StateService } from '../_services/state.service';

@Component({
  selector: 'app-state-add',
  templateUrl: './state-add.component.html'
})
export class StateAddComponent {
  newState: string = '';
  errorMessage: string = '';

  constructor(private stateService: StateService) {}

  addState(): void {
    if (!this.newState.trim()) {
      this.errorMessage = 'Le champ doit être complété';
      return;
    }

    if (this.stateService.addState(this.newState.trim())) {
      this.newState = ''; // Réinitialiser si l'ajout est réussi
      this.errorMessage = '';
    } else {
      this.errorMessage = 'L’étape est déjà créée';
    }
  }
}
