export interface ITransition {
    transitionId: number;
    name: string;
    fromStatusId: number|null;
    toStatusId: number|null;
  }