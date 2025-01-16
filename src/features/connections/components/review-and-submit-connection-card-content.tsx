import {ConnectionCreateFormData} from "@/features/connections/types";
import {Provider} from "@/llmur";
import {Button} from "@/components/ui/button";
import {useListProjects} from "@/features/projects/api/use-list-projects";
import {useState} from "react";
import { Eye, EyeOff } from 'lucide-react'
import {Badge} from "@/components/ui/badge";
import {DottedSeparator} from "@/components/dotted-separator";

interface ReviewAndSubmitConnectionCardContentProps {
    formData: ConnectionCreateFormData;
    onSubmit: () => void;
    onBack: () => void;
}

export const ReviewAndSubmitConnectionCardContent = ({formData, onSubmit, onBack}: ReviewAndSubmitConnectionCardContentProps) => {
    const [showApiKey, setShowApiKey] = useState(false);
    const toggleApiKey = () => setShowApiKey(!showApiKey)

    const {data} = useListProjects();

    const renderAzureOpenAiConnectionDetails = () => {
        return (
            <>
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500">API Endpoint</h3>
                    <p className="mt-1 text-sm text-gray-900">{formData.azure_openai?.api_endpoint}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500">API Version</h3>
                    <p className="mt-1 text-sm text-gray-900">{formData.azure_openai?.azure_openai_api_version}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Deployment Name</h3>
                    <p className="mt-1 text-sm text-gray-900">{formData.azure_openai?.deployment_name}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500">API Key</h3>
                    <div className="mt-1 flex items-center">
                        <p className="text-sm text-gray-900">
                            {showApiKey ? formData.azure_openai?.api_key : '••••••••••••••••'}
                        </p>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2"
                            onClick={toggleApiKey}
                        >
                            {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </>
        )
    }

    const renderOpenAiV1ConnectionDetails = () => {
        return (
            <>
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500">API Endpoint</h3>
                    <p className="mt-1 text-sm text-gray-900">{formData.openai_v1?.api_endpoint}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Model</h3>
                    <p className="mt-1 text-sm text-gray-900">{formData.openai_v1?.model}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500">API Key</h3>
                    <div className="mt-1 flex items-center">
                        <p className="text-sm text-gray-900">
                            {showApiKey ? formData.openai_v1?.api_key : '••••••••••••••••'}
                        </p>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2"
                            onClick={toggleApiKey}
                        >
                            {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </>
        )
    }

    const renderProjects = () => {
        if (formData.access === 'private' && formData.projects.length > 0) {
            return (
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Projects</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                        {formData.projects.map((projectId) => {
                            const project = data?.memberships.find((p) => p.project_id === projectId)
                            return project ? (
                                <Badge key={project.project_id} variant="secondary">
                                    {project.project_name}
                                </Badge>
                            ) : null
                        })}
                    </div>
                </div>
            )
        }
        return null
    }

    return (

        <>
            <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Provider</h3>
                <p className="mt-1 text-sm text-gray-900">{formData.provider}</p>
            </div>
            {formData.provider == Provider.AzureOpenAi ? renderAzureOpenAiConnectionDetails() : renderOpenAiV1ConnectionDetails()}
            <DottedSeparator/>
            <div className="my-4">
                <h3 className="text-sm font-medium text-gray-500">Access</h3>
                <p className="mt-1 text-sm text-gray-900 capitalize">{formData.access}</p>
            </div>
            {renderProjects()}
            <div className="flex justify-between">
                <Button variant="outline" onClick={onBack}>Back</Button>
                <Button onClick={onSubmit}>Submit</Button>
            </div>
        </>

    )
}