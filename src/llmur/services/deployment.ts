import { LLMurException, Client, type Payload } from '../client';
import type { Models } from '../models';

interface GetDeploymentParams {
    id: string
}

export class Deployment {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Get deployment by id
     *
     * Get a specific deployment.
     *
     * @throws {LLMurException}
     * @returns {Promise<Models.Connection<Preferences>>}
     */
    async get({id}: GetDeploymentParams): Promise<Models.Deployment> {
        const apiPath = `/internal/deployment/${id}`;
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