import { fetch, FormData, File } from 'node-fetch-native-with-agent';
import { createAgent } from 'node-fetch-native-with-agent/agent';

import { Models } from './models';

type Payload = {
    [key: string]: any;
}

type UploadProgress = {
    $id: string;
    progress: number;
    sizeUploaded: number;
    chunksTotal: number;
    chunksUploaded: number;
}

type Headers = {
    [key: string]: string;
}

class LLMurException extends Error {
    code: number;
    response: string;
    type: string;
    constructor(message: string, code: number = 0, type: string = '', response: string = '') {
        super(message);
        this.name = 'LLMurException';
        this.message = message;
        this.code = code;
        this.type = type;
        this.response = response;
    }
}

class Client {
    static CHUNK_SIZE = 1024 * 1024 * 5;

    config = {
        endpoint: '',
        selfSigned: false,
        key: '',
        session: '',
    };
    headers: Headers = {
        'x-sdk-name': 'Node.js',
        'x-sdk-language': 'nodejs',
        'x-sdk-version': '0.0.1'
    };

    /**
     * Set Endpoint
     *
     * Your LLMur proxy endpoint
     *
     * @param {string} endpoint
     *
     * @returns {this}
     */
    setEndpoint(endpoint: string): this {
        this.config.endpoint = endpoint;

        return this;
    }

    /**
     * Set self-signed
     *
     * @param {boolean} selfSigned
     *
     * @returns {this}
     */
    setSelfSigned(selfSigned: boolean): this {
        // @ts-ignore
        if (typeof globalThis.EdgeRuntime !== 'undefined') {
            console.warn('setSelfSigned is not supported in edge runtimes.');
        }

        this.config.selfSigned = selfSigned;

        return this;
    }

    /**
     * Add header
     *
     * @param {string} header
     * @param {string} value
     *
     * @returns {this}
     */
    addHeader(header: string, value: string): this {
        this.headers[header.toLowerCase()] = value;

        return this;
    }

    /**
     * Set Key
     *
     * Your secret API key
     *
     * @param value string
     *
     * @return {this}
     */
    setKey(value: string): this {
        this.headers['X-LLMur-Key'] = value;
        this.config.key = value;
        return this;
    }
    /**
     * Set Session
     *
     * The user session to authenticate with
     *
     * @param value string
     *
     * @return {this}
     */
    setSession(value: string): this {
        this.headers['X-LLMur-Session'] = value;
        this.config.session = value;
        return this;
    }

    prepareRequest(method: string, url: URL, headers: Headers = {}, params: Payload = {}): { uri: string, options: RequestInit } {
        method = method.toUpperCase();

        headers = Object.assign({}, this.headers, headers);

        let options: RequestInit = {
            method,
            headers,
            ...createAgent(this.config.endpoint, { rejectUnauthorized: !this.config.selfSigned }),
        };

        if (method === 'GET') {
            for (const [key, value] of Object.entries(Client.flatten(params))) {
                url.searchParams.append(key, value);
            }
        } else {
            switch (headers['content-type']) {
                case 'application/json':
                    options.body = JSON.stringify(params);
                    break;

                case 'multipart/form-data':
                    const formData = new FormData();

                    for (const [key, value] of Object.entries(params)) {
                        if (value instanceof File) {
                            formData.append(key, value, value.name);
                        } else if (Array.isArray(value)) {
                            for (const nestedValue of value) {
                                formData.append(`${key}[]`, nestedValue);
                            }
                        } else {
                            formData.append(key, value);
                        }
                    }

                    options.body = formData;
                    delete headers['content-type'];
                    break;
            }
        }

        return { uri: url.toString(), options };
    }

    async chunkedUpload(method: string, url: URL, headers: Headers = {}, originalPayload: Payload = {}, onProgress: (progress: UploadProgress) => void) {
        const file = Object.values(originalPayload).find((value) => value instanceof File);

        if (!file) {
            return null;
        }

        if (file.size <= Client.CHUNK_SIZE) {
            return await this.call(method, url, headers, originalPayload);
        }

        let start = 0;
        let response = null;

        while (start < file.size) {
            let end = start + Client.CHUNK_SIZE; // Prepare end for the next chunk
            if (end >= file.size) {
                end = file.size; // Adjust for the last chunk to include the last byte
            }

            headers['content-range'] = `bytes ${start}-${end-1}/${file.size}`;
            const chunk = file.slice(start, end);

            let payload = { ...originalPayload, file: new File([chunk], file.name)};

            response = await this.call(method, url, headers, payload);

            if (onProgress && typeof onProgress === 'function') {
                onProgress({
                    $id: response.$id,
                    progress: Math.round((end / file.size) * 100),
                    sizeUploaded: end,
                    chunksTotal: Math.ceil(file.size / Client.CHUNK_SIZE),
                    chunksUploaded: Math.ceil(end / Client.CHUNK_SIZE)
                });
            }

            if (response && response.$id) {
                headers['x-llmur-id'] = response.$id;
            }

            start = end;
        }

        return response;
    }

    async redirect(method: string, url: URL, headers: Headers = {}, params: Payload = {}): Promise<string> {
        const { uri, options } = this.prepareRequest(method, url, headers, params);

        const response = await fetch(uri, {
            ...options,
            redirect: 'manual'
        });

        if (response.status !== 301 && response.status !== 302) {
            throw new LLMurException('Invalid redirect', response.status);
        }

        return response.headers.get('location') || '';
    }

    async call(method: string, url: URL, headers: Headers = {}, params: Payload = {}, responseType = 'json'): Promise<any> {
        const { uri, options } = this.prepareRequest(method, url, headers, params);

        let data: any = null;

        const response = await fetch(uri, options);

        const warnings = response.headers.get('x-appwrite-warning');
        if (warnings) {
            warnings.split(';').forEach((warning: string) => console.warn('Warning: ' + warning));
        }

        if (response.headers.get('content-type')?.includes('application/json')) {
            data = await response.json();
        } else if (responseType === 'arrayBuffer') {
            data = await response.arrayBuffer();
        } else {
            data = {
                message: await response.text()
            };
        }

        if (400 <= response.status) {
            throw new LLMurException(data?.message, response.status, data?.type, data);
        }

        return data;
    }

    static flatten(data: Payload, prefix = ''): Payload {
        let output: Payload = {};

        for (const [key, value] of Object.entries(data)) {
            let finalKey = prefix ? prefix + '[' + key +']' : key;
            if (Array.isArray(value)) {
                output = { ...output, ...Client.flatten(value, finalKey) };
            } else {
                output[finalKey] = value;
            }
        }

        return output;
    }
}

export { Client, LLMurException };
export type { Models, Payload, UploadProgress };
