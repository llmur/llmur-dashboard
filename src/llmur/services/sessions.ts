import { LLMurException, Client, type Payload } from '../client';
import type { Models } from '../models';

interface CreateEmailPasswordSessionParams {
    email: string;
    password: string;
}

export class Sessions {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Create email password session
     *
     * Allow the user to login into their account by providing a valid email and password combination. This route will create a new session for the user.

     A user is limited to 10 active sessions at a time by default. [Learn more about session limits](https://appwrite.io/docs/authentication-security#limits).
     *
     * @param {string} email
     * @param {string} password
     * @throws {AppwriteException}
     * @returns {Promise<Models.Session>}
     */
    async createEmailPasswordSession({email, password}: CreateEmailPasswordSessionParams): Promise<Models.SessionToken> {
        if (typeof email === 'undefined') {
            throw new LLMurException('Missing required parameter: "email"');
        }
        if (typeof password === 'undefined') {
            throw new LLMurException('Missing required parameter: "password"');
        }
        const apiPath = '/admin/sessions';
        const payload: Payload = {};
        if (typeof email !== 'undefined') {
            payload['email'] = email;
        }
        if (typeof password !== 'undefined') {
            payload['password'] = password;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'post',
            uri,
            apiHeaders,
            payload,
        );
    }

}