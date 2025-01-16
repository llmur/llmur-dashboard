import { LLMurException, Client, type Payload } from '../client';
import type { Models } from '../models';
import {AzureOpenAiApiVersion} from "@/llmur/enums/azure-versions";

interface CreateAzureOpenAiConnectionParams {
    deployment_name: string,
    api_endpoint: string,
    api_key: string,
    api_version: AzureOpenAiApiVersion
}

interface GetConnectionParams {
    id: string
}

interface ListConnectionParams {}

export class Connection {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Get account
     *
     * Get a specific connection.
     *
     * @throws {LLMurException}
     * @returns {Promise<Models.Connection<Preferences>>}
     */
    async get({id}: GetConnectionParams): Promise<Models.Connection> {
        const apiPath = `/internal/connection/${id}`;
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
     * Get list of connections
     *
     * @throws {LLMurException}
     * @returns {Promise<Models.Connection<Preferences>>}
     */
    async list({}: ListConnectionParams): Promise<Models.ConnectionList> {
        const apiPath = `/internal/connection`;
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
     * Create an Azure OpenAI connection
     *
     * Use this endpoint to create a new connection to an Azure OpenAI service.
     *
     * @param {string} deployment_name
     * @param {string} api_key
     * @param {string} password
     * @param {string} name
     * @throws {LLMurException}
     * @returns {Promise<Models.User<Preferences>>}
     */
    async createAzureOpenAiConnection({deployment_name, api_key, api_version, api_endpoint}: CreateAzureOpenAiConnectionParams): Promise<Models.Connection> {
        if (typeof deployment_name === 'undefined') {
            throw new LLMurException('Missing required parameter: "deployment_name"');
        }
        if (typeof api_key === 'undefined') {
            throw new LLMurException('Missing required parameter: "api_key"');
        }
        if (typeof api_version === 'undefined') {
            throw new LLMurException('Missing required parameter: "api_version"');
        }
        if (typeof api_endpoint === 'undefined') {
            throw new LLMurException('Missing required parameter: "api_endpoint"');
        }
        const apiPath = '/internal/connection';
        const payload: Payload = {};

        if (typeof deployment_name !== 'undefined') {
            payload['deployment_name'] = deployment_name;
        }
        if (typeof api_key !== 'undefined') {
            payload['api_key'] = api_key;
        }
        if (typeof api_version !== 'undefined') {
            payload['api_version'] = api_version;
        }
        if (typeof api_endpoint !== 'undefined') {
            payload['api_endpoint'] = api_endpoint;
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