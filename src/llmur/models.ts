import {AzureOpenAiApiVersion} from "@/llmur/enums/azure-versions";
import {ProjectRole} from "@/llmur/enums/project-roles";
import {Provider} from "@/llmur/enums/providers";

/**
 * Appwrite Models
 */
export namespace Models {
    /**
     * Users List
     */
    export type UserList = {
        /**
         * Total number of users documents that matched your query.
         */
        total: number;
        /**
         * List of users.
         */
        users: User[];
    }
    /**
     * Project List
     */
    export type ProjectList = {
        /**
         * Total number of users documents that matched your query.
         */
        total: number;
        /**
         * List of users.
         */
        projects: Project[];
    }
    /**
     * Connection List
     */
    export type ConnectionList = {
        /**
         * Total number of users documents that matched your query.
         */
        total: number;
        /**
         * List of users.
         */
        connections: Connection[];
    }
    /**
     * Project Invite List
     */
    export type ProjectInviteList = {
        /**
         * Total number of users documents that matched your query.
         */
        total: number;
        /**
         * List of users.
         */
        invites: ProjectInvite[];
    }
    /**
     * Project Membership List
     */
    export type ProjectMembershipList = {
        /**
         * Total number of membership documents that matched your query.
         */
        total: number;
        /**
         * List of Memberships.
         */
        memberships: ProjectMembership[];
    }
    /**
     * Sessions List
     */
    export type SessionList = {
        /**
         * Total number of sessions documents that matched your query.
         */
        total: number;
        /**
         * List of sessions.
         */
        sessions: Session[];
    }
    /**
     * Teams List
     */
    export type TeamList<Preferences extends Models.Preferences> = {
        /**
         * Total number of teams documents that matched your query.
         */
        total: number;
        /**
         * List of teams.
         */
        teams: Team<Preferences>[];
    }
    /**
     * Deployments List
     */
    export type DeploymentList = {
        /**
         * Total number of deployments documents that matched your query.
         */
        total: number;
        /**
         * List of deployments.
         */
        deployments: Deployment[];
    }
    /**
     * Provider list
     */
    export type ProviderList = {
        /**
         * Total number of providers documents that matched your query.
         */
        total: number;
        /**
         * List of providers.
         */
        providers: Provider[];
    }
    /**
     * User
     */
    export type User = {
        /**
         * User ID.
         */
        id: string;
        /**
         * User name.
         */
        name: string;
        /**
         * User blocked status. `true` for blocked and `false` otherwise.
         */
        blocked: boolean;
        /**
         * User email address.
         */
        email: string;
        /**
         * Email verification status.
         */
        email_verified: boolean;
    }
    /**
     * User
     */
    export type IdRecord = {
        /**
         *  ID.
         */
        id: string;
    }
    /**
     * Preferences
     */
    export type Preferences = {
        [key: string]: any;
    }
    /**
     * Session
     */
    export type Session = {
        /**
         * Session ID.
         */
        $id: string;
        /**
         * Session Provider Access Token.
         */
        token: string;
        /**
         * The date of when the access token expires in ISO 8601 format.
         */
    }
    /**
     *  Connection
     */
    export type Connection = {
        /**
         * Id of the connection
         */
        id: string;
        /**
         * The alias of the connection.
         */
        alias: string;
        /**
         * The API endpoint for the connection.
         */
        api_endpoint: string;
        /**
         * The provider for the connection.
         */
        provider: Provider;
    };
    /**
     *  Project
     */
    export type Project = {
        /**
         * Id of the project
         */
        id: string;
        /**
         * The project name.
         */
        name: string;
    };
    /**
     *  Project Invite
     */
    export type ProjectInvite = {
        /**
         * Id of the project invite
         */
        id: string;
        /**
         * The project id.
         */
        project_id: string;
        /**
         * The project name.
         */
        project_name: string;
        /**
         * The invite code
         */
        code: string;
        /**
         * The Role that will be assigned to a user when he joins the team
         */
        assign_role: ProjectRole;
        /**
         * Timestamp that represents the until when the code is active. Utc
         */
        valid_until?: number;
    };
    /**
     *  Project
     */
    export type ProjectMembership = {
        /**
         * Id of the project membership
         */
        id: string;
        /**
         * Id of the project
         */
        project_id: string;
        /**
         * Id of the user
         */
        user_id: string;
        /**
         * Name of the project
         */
        project_name: string;
        /**
         * Name of the user
         */
        user_name: string;
        /**
         * The role the user has on the project
         */
        role: ProjectRole;
    };
    /**
     * Token
     */
    export type Token = {
        /**
         * Token ID.
         */
        $id: string;
        /**
         * Token creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * User ID.
         */
        userId: string;
        /**
         * Token secret key. This will return an empty string unless the response is returned using an API key or as part of a webhook payload.
         */
        secret: string;
        /**
         * Token expiration date in ISO 8601 format.
         */
        expire: string;
        /**
         * Security phrase of a token. Empty if security phrase was not requested when creating a token. It includes randomly generated phrase which is also sent in the external resource such as email.
         */
        phrase: string;
    }
    /**
     * Team
     */
    export type Team<Preferences extends Models.Preferences> = {
        /**
         * Team ID.
         */
        $id: string;
        /**
         * Team creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Team update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * Team name.
         */
        name: string;
        /**
         * Total number of team members.
         */
        total: number;
        /**
         * Team preferences as a key-value object
         */
        prefs: Preferences;
    }
    /**
     * Deployment
     */
    export type Deployment = {
        /**
         * Deployment ID.
         */
        id: string;
        /**
         * Deployment name
         */
        name: string;
        /**
         * Deployment project
         */
        project_id: string;
        /**
         * Deployment connections id
         */
        connections: string[];

    }
    /**
     * Headers
     */
    export type Headers = {
        /**
         * Header name.
         */
        name: string;
        /**
         * Header value.
         */
        value: string;
    }
}