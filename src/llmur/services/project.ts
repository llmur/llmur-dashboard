import {LLMurException, Client, type Payload} from '../client';
import type {Models} from '../models';
import {ProjectRole} from "@/llmur";

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

interface GetProjectDeploymentsParams {
    id: string;
}

interface DeleteProjectParams {
    id: string;
}

interface DeleteProjectInviteParams {
    id: string;
}

interface GetProjectMembershipsParams {
    id: string;
}

interface GetProjectInvitesParams {
    id: string;
}

interface GetInviteWithCodeParams {
    code: string;
}

interface JoinProjectParams {
    code: string;
}

interface CreateProjectInviteParams {
    projectId: string;
    validity?: string;
    role?: ProjectRole;
    codeLength?: number;
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

    /**
     * Get a project with id
     *
     * @param {string} id
     * @throws {LLMurException}
     * @returns {Promise<Models.Project>}
     */
    async delete_invite({id}: DeleteProjectInviteParams): Promise<Models.IdRecord> {
        const apiPath = `/internal/project/invite/${id}`;

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

    /**
     * Create a new project invite code
     *
     * @param {string} id
     * @throws {LLMurException}
     * @returns {Promise<Models.User<Preferences>>}
     */
    async create_invite_code({projectId, role, validity, codeLength}: CreateProjectInviteParams): Promise<Models.ProjectInvite> {
        if (typeof projectId === 'undefined') {
            throw new LLMurException('Missing required parameter: "projectId"');
        }

        const apiPath = `/internal/project/${projectId}/invite`;
        const payload: Payload = {};

        if (typeof role !== 'undefined') {
            payload['role'] = role;
        }
        if (typeof validity !== 'undefined') {
            payload['validity'] = validity;
        }
        if (typeof codeLength !== 'undefined') {
            payload['code_length'] = codeLength;
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
     * Get all invite codes of a given project
     *
     * @throws {LLMurException}
     * @returns {Promise<Models.ProjectList>}
     */
    async invite_codes({id}: GetProjectInvitesParams): Promise<Models.ProjectInviteList> {
        const apiPath = `/internal/project/${id}/invites`;
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
     * Get all invite codes of a given project
     *
     * @throws {LLMurException}
     * @returns {Promise<Models.ProjectList>}
     */
    async get_invite_with_code({code}: GetInviteWithCodeParams): Promise<Models.ProjectInvite> {
        const apiPath = `/internal/project/invite?code=${code}`;
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
     * Join a project with a code
     *
     * @param {string} code
     * @throws {LLMurException}
     * @returns {Promise<Models.User<Preferences>>}
     */
    async join_with_code({code}: JoinProjectParams): Promise<Models.ProjectMembership> {
        if (typeof code === 'undefined') {
            throw new LLMurException('Missing required parameter: "code"');
        }

        const apiPath = `/internal/project/join`;
        const payload: Payload = {};

        if (typeof code !== 'undefined') {
            payload['code'] = code;
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

    async deployments({id}: GetProjectDeploymentsParams): Promise<Models.DeploymentList> {
        const apiPath = `/internal/project/${id}/deployments`;
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