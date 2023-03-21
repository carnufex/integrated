import { Activity } from './activity';

export interface Action {
  name: string;
  icon: string;
  action: (activity: Activity) => void;
}
