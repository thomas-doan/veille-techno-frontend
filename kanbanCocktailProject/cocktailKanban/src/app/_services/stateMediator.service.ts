import { Injectable } from '@angular/core';
import { StateSelectionService } from './stateSelection.service';
import { StateManagementService } from './stateManagement.service';
@Injectable({ providedIn: 'root' })
export class StateMediatorService {
  constructor(
    private stateSelectionService: StateSelectionService,
    private stateManagementService: StateManagementService
  ) {
    this.stateSelectionService.selectedState$.subscribe(state => {
      this.stateManagementService.setSelectedState(state);
    });
  }
}
