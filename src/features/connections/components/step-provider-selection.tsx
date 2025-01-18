import Image from 'next/image'
import {Button} from "@/components/ui/button";
import {Provider} from "@/llmur";
import {FormField} from "@/components/ui/form";
import {useFormContext} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/features/connections/schemas";


export const StepProviderSelection = () => {
    const form = useFormContext<z.infer<typeof formSchema>>();
    const providers = [
        {name: 'Azure OpenAi', logo: '/azure-icon.svg', provider: Provider.AzureOpenAi},
        {name: 'Open Ai', logo: '/openai-icon.svg', provider: Provider.OpenAiV1},
    ];

    return (
        <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-6 pb-6">
                    {providers.map((provider) => {
                        // Check if the current provider is selected
                        const isSelected = field.value === provider.provider;

                        return (
                            <Button
                                key={provider.name}
                                variant="ghost"
                                className={`border-[1px] p-6 h-auto flex flex-col items-center space-y-2 w-full transition-all duration-300 ease-in-out rounded-lg ${
                                    isSelected
                                        ? "border-purple-500 bg-purple-50 hover:bg-purple-100"
                                        : "border-neutral-200 hover:bg-transparent hover:-translate-y-2 hover:shadow-lg"
                                }`}
                                onClick={() => {
                                    field.onChange(provider.provider); // Update the `provider` field in the form
                                }}
                            >
                                <div className="relative rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105">
                                    <Image
                                        src={provider.logo}
                                        alt={`${provider.name} logo`}
                                        height={200}
                                        width={200}
                                        className="object-cover"
                                    />
                                </div>
                                <span className="text-sm font-medium">{provider.name}</span>
                            </Button>
                        );
                    })}
                </div>
            )}
        />
    );
}