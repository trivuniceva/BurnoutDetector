export type UserRole = 'EMPLOYEE' | 'MANAGER' | 'ADMINISTRATOR'


export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userRole: UserRole;
}
