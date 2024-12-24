import { LLMurException, Client, type Payload } from '../client';
import type { Models } from '../models';

interface CreateParams {
    email: string;
    password: string;
}

interface CreateEmailPasswordSessionParams {
    email: string;
    password: string;
}

interface GetUserProjectsParams {
    id: string;
}

export class Account {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Get account
     *
     * Get the currently logged in user.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.User<Preferences>>}
     */
    async get(): Promise<Models.User> {
        const apiPath = '/internal/user/session';
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Create account
     *
     * Use this endpoint to allow a new user to register a new account in your project. After the user registration completes successfully, you can use the [/account/verfication](https://appwrite.io/docs/references/cloud/client-web/account#createVerification) route to start verifying the user email address. To allow the new user to login to their new account, you need to create a new [account session](https://appwrite.io/docs/references/cloud/client-web/account#createEmailSession).
     *
     * @param {string} userId
     * @param {string} email
     * @param {string} password
     * @param {string} name
     * @throws {AppwriteException}
     * @returns {Promise<Models.User<Preferences>>}
     */
    async create({email, password}: CreateParams): Promise<Models.User> {
        if (typeof email === 'undefined') {
            throw new LLMurException('Missing required parameter: "email"');
        }
        if (typeof password === 'undefined') {
            throw new LLMurException('Missing required parameter: "password"');
        }
        const apiPath = '/internal/auth/register';
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
    async createEmailPasswordSession({email, password}: CreateEmailPasswordSessionParams): Promise<Models.Session> {
        if (typeof email === 'undefined') {
            throw new LLMurException('Missing required parameter: "email"');
        }
        if (typeof password === 'undefined') {
            throw new LLMurException('Missing required parameter: "password"');
        }
        const apiPath = '/internal/auth/login';
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

    /**
     * Get all projects the user has access to
     *
     * @throws {LLMurException}
     * @returns {Promise<Models.ProjectList>}
     */
    async projects({id}: GetUserProjectsParams): Promise<Models.ProjectMembershipList> {
        const apiPath = `/internal/user/${id}/projects`;
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload,
        );
    }
}