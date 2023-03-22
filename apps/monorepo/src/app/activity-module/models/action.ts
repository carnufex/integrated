export interface Action {
  name: string;
  icon: string;
  action: (callback: (result: unknown) => unknown) => void;
}
