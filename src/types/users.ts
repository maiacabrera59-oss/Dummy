export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
}

export interface UsersResponse {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}
