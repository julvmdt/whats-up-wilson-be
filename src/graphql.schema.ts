
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateUserInput {
    userName: string;
    password: string;
}

export interface UserInput {
    userName: string;
    password: string;
}

export interface User {
    id: number;
    userName: string;
}

export interface LoginResponse {
    token: string;
}

export interface IQuery {
    login(input: UserInput): LoginResponse | Promise<LoginResponse>;
    users(): User[] | Promise<User[]>;
}

export interface IMutation {
    createUser(input: CreateUserInput): User | Promise<User>;
}
