
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateUserInput {
    userName: string;
}

export interface UserInput {
    id: string;
}

export interface User {
    userName: string;
}

export interface IQuery {
    user(input: UserInput): User | Promise<User>;
}

export interface IMutation {
    createUser(input: CreateUserInput): User | Promise<User>;
}
