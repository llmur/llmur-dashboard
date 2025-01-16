import {Provider} from "@/llmur";
import {Button} from "@/components/ui/button";
import Image from 'next/image'
import {ProviderCards} from "@/features/connections/components/provider-cards";

interface ProviderSelectionCardContentProps {
    onSelect: (provider: Provider.AzureOpenAi | Provider.OpenAiV1) => void;
};

export const ProviderSelectionCardContent = ({onSelect}: ProviderSelectionCardContentProps) => {
    return (
            <ProviderCards onSelect={onSelect} providers={[
                {name: 'Azure OpenAi', logo: '/azure-icon.svg', provider: Provider.AzureOpenAi},
                {name: 'Open Ai', logo: '/openai-icon.svg', provider: Provider.OpenAiV1},
            ]}/>

    )
}