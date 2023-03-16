import { Tag } from './tag';

export interface Activity {
  id?: string;
  activityNumber: string;
  topic: string;
  errandType: string;
  status: string;
  supervisor: string;
  supervisingGroup: string;
  tags: Tag[];
  date: Date;
}
