import { UserDepartment, UserRole } from "../enums";

export interface User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    department: UserDepartment;
}