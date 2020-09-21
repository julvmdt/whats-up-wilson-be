
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

export interface CreateChatInput {
    userIds?: number[];
}

export interface SendMessageInput {
    chatId: number;
    message: string;
}

export interface User {
    id: number;
    userName: string;
}

export interface LoginResponse {
    token: string;
}

export interface Message {
    id: number;
    message: string;
    sender: User;
}

export interface Chat {
    id: number;
}

export interface IQuery {
    login(input: UserInput): LoginResponse | Promise<LoginResponse>;
    users(): User[] | Promise<User[]>;
}

export interface IMutation {
    createUser(input: CreateUserInput): User | Promise<User>;
    createChat(input: CreateChatInput): Chat | Promise<Chat>;
    sendMessage(input: SendMessageInput): Message | Promise<Message>;
}
