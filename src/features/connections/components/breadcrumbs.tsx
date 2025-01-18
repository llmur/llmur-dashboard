import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {ChevronRight} from "lucide-react";
import {Fragment} from "react";
import {cn} from "@/lib/utils";

interface BreadcrumbsProps {
    steps: { id: number; name: string }[];
    currentStep: number;
    onStepClick: (step: number) => void;
}

export const Breadcrumbs = ({
                                        steps,
                                        currentStep,
                                        onStepClick,
                                    }: BreadcrumbsProps) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {steps.map((step) => (
                    <Fragment key={`item-${step.id}`}>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href="#"
                                className={cn(step.id === currentStep ? 'font-bold' : '', 'text-white hover:text-neutral-200')}
                                onClick={() => onStepClick(step.id)}>
                                {step.name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {step.id < steps.length &&
                            <BreadcrumbSeparator>
                                <ChevronRight className="h-4 w-4 text-white"/>
                            </BreadcrumbSeparator>
                        }
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}