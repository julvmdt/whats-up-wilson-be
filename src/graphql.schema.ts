
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

export interface ChatInput {
    chatId: number;
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
    createdAt: string;
    message: string;
    sender: User;
}

export interface Chat {
    id: number;
    messages?: Message[];
}

export interface IQuery {
    chat(input: ChatInput): Chat | Promise<Chat>;
    chats(): Chat[] | Promise<Chat[]>;
    login(input: UserInput): LoginResponse | Promise<LoginResponse>;
    users(): User[] | Promise<User[]>;
}

export interface IMutation {
    createUser(input: CreateUserInput): User | Promise<User>;
    createChat(input: CreateChatInput): Chat | Promise<Chat>;
    sendMessage(input: SendMessageInput): Message | Promise<Message>;
    hasSeenMessages(input: ChatInput): Chat | Promise<Chat>;
}
