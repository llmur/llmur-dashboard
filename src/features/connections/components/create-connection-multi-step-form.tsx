"use client";

import {Provider} from "@/llmur";
import React, {useState} from "react";
import {
    AzureOpenAiConnectionCreateData,
    ConnectionCreateFormData, initialAzureOpenAiConnectionCreateData, initialOpenAiV1ConnectionCreateData,
    OpenAiV1ConnectionCreateData
} from "@/features/connections/types";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {ChevronRight} from 'lucide-react'
import {ProviderSelectionCardContent} from "@/features/connections/components/provider-selection-card-content";
import {CreateConnectionFormContent} from "@/features/connections/components/create-connection-form-content";
import {
    ReviewAndSubmitConnectionCardContent
} from "@/features/connections/components/review-and-submit-connection-card-content";
import {SetConnectionAccessCardContent} from "@/features/connections/components/set-connection-access-card-content";
import {useCreateProject} from "@/features/projects/api/use-create-project";
import {useCreateAzureOpenaiConnection} from "@/features/connection/api/use-create-azure-openai-connection";

interface CreateConnectionMultiStepFormProps {
    onCancel?: () => {},
}

export const CreateConnectionMultiStepForm = ({}: CreateConnectionMultiStepFormProps) => {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<ConnectionCreateFormData>({
        provider: "",
        access: "private",
        projects: []
    })

    const {mutate, isPending} = useCreateConnection();

    const handleSelection = (provider: Provider.AzureOpenAi | Provider.OpenAiV1) => {
        setFormData({...formData, provider})
        setStep(2)
    }

    const handleFormSubmit = (data: OpenAiV1ConnectionCreateData | AzureOpenAiConnectionCreateData) => {
        console.log('Form data for review:', data)

        if (formData.provider === Provider.AzureOpenAi) {
            setFormData({...formData, azure_openai: data as AzureOpenAiConnectionCreateData})
        } else {
            setFormData({...formData, openai_v1: data as OpenAiV1ConnectionCreateData})
        }
        setStep(3)
    }

    const handleAccessChange = (isPrivate: boolean, projects?: string[]) => {
        setFormData({...formData, access: isPrivate ? "private" : "public", projects: projects || []})
        setStep(4)
    }

    const handleSubmit = () => {
        console.log('Submitting data:', formData)
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href="#"
                                className={step === 1 ? 'font-bold' : ''}
                                onClick={() =>
                                    setStep(1)
                                }>
                                Selection
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <ChevronRight className="h-4 w-4"/>
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href="#"
                                className={step === 2 ? 'font-bold' : ''}
                                onClick={() =>
                                    formData.provider &&
                                    setStep(2)
                                }>
                                Form
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <ChevronRight className="h-4 w-4"/>
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href="#"
                                className={step === 3 ? 'font-bold' : ''}
                                onClick={() =>
                                    formData.provider &&
                                    (formData.openai_v1 || formData.azure_openai) &&
                                    setStep(3)
                                }>
                                Access
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <ChevronRight className="h-4 w-4"/>
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href="#"
                                className={step === 4 ? 'font-bold' : ''}
                                onClick={() =>
                                    formData.provider &&
                                    (formData.openai_v1 || formData.azure_openai) &&
                                    setStep(4)
                                }
                            >
                                Review
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <CardTitle className="py-6">
                    {step === 1 && 'Select Provider'}
                    {step === 2 && 'Create Connection'}
                    {step === 3 && 'Access Control'}
                    {step === 4 && 'Review & Submit'}
                </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
                {step === 1 && <ProviderSelectionCardContent onSelect={handleSelection}/>}
                {step === 2 && formData.provider && (
                    <CreateConnectionFormContent
                        onSubmit={handleFormSubmit}
                        provider={formData.provider}
                        initialData={
                            formData.provider === Provider.AzureOpenAi ?
                                formData.azure_openai || initialAzureOpenAiConnectionCreateData :
                                formData.openai_v1 || initialOpenAiV1ConnectionCreateData
                        }
                    />
                )}
                {step === 3 && (
                    <SetConnectionAccessCardContent
                        onSubmit={handleAccessChange}
                        initialData={{
                            isPrivate: formData.access === "private",
                            projects: formData.projects
                        }}
                        onBack={() => setStep(2)}
                    />
                )}
                {step === 4 && (
                    <ReviewAndSubmitConnectionCardContent
                        formData={formData}
                        onSubmit={handleSubmit}
                        onBack={() => setStep(3)}
                    />
                )}
            </CardContent>
        </Card>
    );
}