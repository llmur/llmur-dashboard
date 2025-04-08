import { LLMurException, Client, type Payload } from '../client';
import type { Models } from '../models';

interface CreateParams {
    email: string;
    password: string;
}

interface GetUserMembershipsParams {
    id: string;
}

interface GetUserParams {
    id: string;
}

export class Users {
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
    async me(): Promise<Models.User> {
        const apiPath = '/admin/users/me';
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
     * Get account
     *
     * Get the user with a specific id.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.User<Preferences>>}
     */
    async get({id}: GetUserParams): Promise<Models.User> {
        const apiPath = `/admin/users/${id}`;
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
        const apiPath = '/admin/users';
        const payload: Payload = {};

        if (typeof email !== 'undefined') {
            console.log("email: " + email);
            payload['email'] = email;
        }
        if (typeof password !== 'undefined') {
            console.log("password: " + password);
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
     * Get all user memberships the user has access to
     *
     * @throws {LLMurException}
     * @returns {Promise<Models.ProjectList>}
     */
    async memberships({id}: GetUserMembershipsParams): Promise<Models.MembershipList> {
        const apiPath = `/admin/users/${id}/memberships`;
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