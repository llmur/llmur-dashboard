"use client"

import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {StepProviderSelection} from "@/features/connections/components/step-provider-selection";
import {StepConnectionDetails} from "@/features/connections/components/step-connection-details";
import {StepAccessConfiguration} from "@/features/connections/components/step-access-configuration";
import {StepReview} from "@/features/connections/components/step-review";
import {formSchema} from "@/features/connections/schemas";
import {Breadcrumbs} from "@/features/connections/components/breadcrumbs";
import {AzureOpenAiApiVersion, Provider} from "@/llmur";
import {useCreateConnection} from "@/features/connections/api/use-create-connection";
import {useRouter} from "next/navigation";

const steps = [
    {id: 1, name: "Select Provider"},
    {id: 2, name: "Connection Details"},
    {id: 3, name: "Access Configuration"},
    {id: 4, name: "Review & Submit"},
];

export const CreateConnectionForm = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);

    const {mutate, isPending} = useCreateConnection();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            provider: Provider.OpenAiV1,
            openAiV1: {
                api_endpoint: "",
                api_key: "",
                model: ""
            },
            azureOpenAi: {
                api_endpoint: "",
                api_key: "",
                deployment_name: "",
                azure_openai_api_version: AzureOpenAiApiVersion.V2024_02_01,
            },
            accessConfig: {
                access: "private",
                projects: [],
            },
        },
    });
    const provider = form.watch("provider");

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("Submitting ", values);
        mutate({
            json: values
        }, {
            onSuccess: ({}) => {
                form.reset();
                router.push(`/admin/connections`);
            }
        })
    };

    const handleNext = async () => {
        let isValid = false;

        if (currentStep === 1) {
            isValid = await form.trigger("provider");
            form.setValue("openAiV1", undefined);
            form.setValue("azureOpenAi", undefined);
        } else if (currentStep === 2) {
            const provider = form.getValues("provider");
            if (provider === Provider.AzureOpenAi) {
                isValid = await form.trigger([
                    "azureOpenAi"
                ]);
            } else if (provider === Provider.OpenAiV1) {
                isValid = await form.trigger([
                    "openAiV1",
                ]);
            }
        } else if (currentStep === 3) {
            isValid = await form.trigger([
                "accessConfig.access"
            ]);
        } else {
            isValid = true;
        }

        if (isValid) {
            setCurrentStep((prev) => prev + 1);
        } else {
            console.log("Validation failed");
        }
    };

    const handleBack = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <StepProviderSelection/>;
            case 2:
                return <StepConnectionDetails provider={provider}/>;
            case 3:
                return <StepAccessConfiguration/>;
            case 4:
                return <StepReview/>;
            default:
                return null;
        }
    };

    return (
        <Card className="w-full h-full border-none shadow-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Breadcrumbs
                    steps={steps}
                    currentStep={currentStep}
                    onStepClick={(step) => {
                        if (step <= currentStep) {
                            setCurrentStep(step);
                        }
                    }}
                />
                <CardTitle className="py-6">
                    {steps.find((step) => step.id === currentStep)?.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
                <Form {...form}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        console.log("Form errors before submit:", form.formState.errors);
                        form.handleSubmit(onSubmit)(e);
                    }}>
                        <CardContent className="p-6">
                            {renderStep()}
                            <div className="flex justify-between mt-6">
                                {currentStep > 1 && (
                                    <Button type="button" variant="outline" onClick={handleBack}>
                                        Back
                                    </Button>
                                )}
                                {currentStep < steps.length && (
                                    <Button type="button" onClick={handleNext}>
                                        Next
                                    </Button>
                                )}
                                {currentStep === steps.length && <Button
                                    type="submit"
                                    disabled={isPending}
                                >Submit</Button>}
                            </div>
                        </CardContent>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}