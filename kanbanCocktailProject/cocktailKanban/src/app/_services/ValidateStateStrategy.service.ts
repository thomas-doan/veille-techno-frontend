import {Injectable} from "@angular/core";
import {StateStrategy} from "../_interfaces/IStateStrategy.interface";

@Injectable({ providedIn: 'root' })
export class ValidateStateStrategy implements StateStrategy {
  execute(newState: string): void {
    if (!newState.trim()) {
      throw new Error('' +
        'Le champ doit être complété');
    }
  }
}
