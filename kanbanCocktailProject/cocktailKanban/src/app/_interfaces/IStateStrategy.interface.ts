export interface StateStrategy {
  execute(newState: string): void;
}
