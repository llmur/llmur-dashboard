import {cn} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Provider} from "@/llmur";

interface ProviderAvatarProps {
    provider: Provider;
    className?: string;
    fallbackClassName?: string;
};

export const ProviderAvatar = ({provider, className, fallbackClassName}: ProviderAvatarProps) => {
    const providerImages: Record<string, string> = {
        [Provider.AzureOpenAi]: "/azure-icon.svg", // Image path for AzureOpenAi
        [Provider.OpenAiV1]: "/openai-v1.png", // Image path for OpenAiV1
    };

    const imageSrc = providerImages[provider] || "";
    const fallbackText = provider.charAt(0).toUpperCase();

    return (
        <Avatar className={cn(
            "size-5 transition border border-neutral-300 rounded-full", className
        )}>
            <AvatarImage src={imageSrc} alt={`${provider} logo`} className="flex items-center justify-center"/>
            <AvatarFallback className={cn(
                "bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center",
                fallbackClassName
            )}>
                {fallbackText}
            </AvatarFallback>
        </Avatar>
    )
}