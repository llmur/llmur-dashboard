import {LLMurException, Client, type Payload} from '../client';
import type {Models} from '../models';

interface CreateProjectParams {
    name: string;
}

interface PatchProjectParams {
    id: string;
    name?: string;
}

interface GetProjectParams {
    id: string;
}

interface DeleteProjectParams {
    id: string;
}

interface GetProjectMembershipsParams {
    id: string;
}

export class Project {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Create a new project
     *
     * @param {string} name
     * @throws {LLMurException}
     * @returns {Promise<Models.User<Preferences>>}
     */
    async create({name}: CreateProjectParams): Promise<Models.Project> {
        if (typeof name === 'undefined') {
            throw new LLMurException('Missing required parameter: "name"');
        }

        const apiPath = '/internal/project';
        const payload: Payload = {};

        if (typeof name !== 'undefined') {
            payload['name'] = name;
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
     * Updates a project
     *
     * @param {string} id
     * @param {string} name
     * @throws {LLMurException}
     * @returns {Promise<Models.Project>}
     */
    async patch({id, name}: PatchProjectParams): Promise<Models.Project> {
        const apiPath = `/internal/project/${id}`;

        const payload: Payload = {};

        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'patch',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Get a project with id
     *
     * @param {string} id
     * @throws {LLMurException}
     * @returns {Promise<Models.Project>}
     */
    async get({id}: GetProjectParams): Promise<Models.Project> {
        const apiPath = `/internal/project/${id}`;

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
     * Get all members of a given project
     *
     * @throws {LLMurException}
     * @returns {Promise<Models.ProjectList>}
     */
    async members({id}: GetProjectMembershipsParams): Promise<Models.ProjectMembershipList> {
        const apiPath = `/internal/project/${id}/members`;
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
     * Get a project with id
     *
     * @param {string} id
     * @throws {LLMurException}
     * @returns {Promise<Models.Project>}
     */
    async delete({id}: DeleteProjectParams): Promise<Models.Project> {
        const apiPath = `/internal/project/${id}`;

        const payload: Payload = {};

        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'delete',
            uri,
            apiHeaders,
            payload,
        );
    }

}