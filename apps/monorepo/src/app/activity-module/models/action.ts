export interface Action {
  name: string;
  icon: string;
  action: (callback: (result: any) => any) => void;
}
