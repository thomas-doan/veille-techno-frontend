import {StateStrategy} from "../_interfaces/IStateStrategy.interface";
import {StateManagementService} from "./stateManagement.service";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AddStateStrategy implements StateStrategy {
  constructor(private stateService: StateManagementService) {}

  execute(newState: string): void {
    const success = this.stateService.addState(newState);
    if (!success) {
      throw new Error('L’étape est déjà créée');
    }
  }
}
