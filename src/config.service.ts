import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigService {
    readonly authSecret: string;

    constructor() {
        this.authSecret = process.env.AUTH_SECRET;
    }
}