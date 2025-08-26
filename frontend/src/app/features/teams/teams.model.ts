import {User} from '../../shared/user.model';

export interface Team {
  id: string;
  name: string;
  description?: string;
  manager: User;
  members: User[];
  imageUrl: string;
  // overallRisk: Risk;
}
