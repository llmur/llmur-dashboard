import Link from 'next/link'
import Image from 'next/image'
import {Button} from "@/components/ui/button";
import {Provider} from "@/llmur";

interface ProviderProp {
    name: string;
    logo: string;
    provider: Provider;
}

interface ProviderCardsProps {
    providers: ProviderProp[];
    onSelect: (provider: Provider.AzureOpenAi | Provider.OpenAiV1) => void;
}

export function ProviderCards({onSelect, providers}: ProviderCardsProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-6 pb-6">
            {providers.map((provider) => (
                <Button
                    key={provider.name}
                    variant="ghost"
                    className="border-[1px] border-neutral-200 p-6 h-auto flex flex-col items-center space-y-2 hover:bg-transparent w-full transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg rounded-lg"
                    onClick={() => onSelect(provider.provider)}
                >
                    <div
                        className="relative rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105">
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
            ))}
        </div>
    )
}