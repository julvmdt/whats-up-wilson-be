
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
    userName: string;
}

export interface LoginResponse {
    token: string;
}

export interface IQuery {
    login(input: UserInput): LoginResponse | Promise<LoginResponse>;
}

export interface IMutation {
    createUser(input: CreateUserInput): User | Promise<User>;
}
