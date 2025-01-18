import {useFormContext} from "react-hook-form";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectItem} from "@/components/ui/select";
import {z} from "zod";
import {formSchema} from "@/features/connections/schemas";
import {LockIcon, UnlockIcon} from "lucide-react";
import {Switch} from "@/components/ui/switch";
import {AnimatePresence, motion} from "framer-motion";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Checkbox} from "@/components/ui/checkbox";
import {useListProjects} from "@/features/projects/api/use-list-projects";

export const StepAccessConfiguration = ()=> {
    const form = useFormContext<z.infer<typeof formSchema>>();
    const isPrivate = form.watch("accessConfig.access") === "private"
    const {data} = useListProjects();

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <UnlockIcon className={`h-5 w-5 ${!isPrivate ? 'text-green-500' : 'text-gray-300'}`}/>
                    <span className={`text-sm font-medium ${!isPrivate ? 'text-green-500' : 'text-gray-500'}`}>
                        Public
                    </span>
                </div>
                <FormField
                    control={form.control}
                    name="accessConfig.access"
                    render={({field}) => (
                        <Switch
                            checked={isPrivate}
                            onCheckedChange={(checked) => {
                                field.onChange(checked ? "private" : "public");
                            }}
                            className="data-[state=checked]:bg-purple-500"
                        />)}
                />
                <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${isPrivate ? 'text-purple-500' : 'text-gray-500'}`}>
                      Private
                    </span>
                    <LockIcon className={`h-5 w-5 ${isPrivate ? 'text-purple-500' : 'text-gray-300'}`}/>
                </div>
            </div>
            <AnimatePresence>
                {isPrivate && (
                    <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: 'auto'}}
                        exit={{opacity: 0, height: 0}}
                        transition={{duration: 0.3}}
                    >
                        <p className="text-sm text-muted-foreground mb-4">
                            Select the projects you want to grant access to:
                        </p>
                        <ScrollArea className="h-[200px] w-full rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]"></TableHead>
                                        <TableHead>Project Name</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <FormField
                                    control={form.control}
                                    name="accessConfig.projects"
                                    render={({field}) => (
                                        <TableBody>
                                            {data?.memberships.map(({project_id, project_name}) => {
                                                // Check if the project is currently selected
                                                const isChecked = field.value?.includes(project_id);

                                                return (
                                                    <TableRow key={project_id}
                                                              className="hover:bg-muted/50 transition-colors">
                                                        <TableCell className="text-center">
                                                            <Checkbox
                                                                checked={isChecked}
                                                                onCheckedChange={(checked) => {
                                                                    if (checked) {
                                                                        // Add project_id to the array
                                                                        field.onChange([...field.value, project_id]);
                                                                    } else {
                                                                        // Remove project_id from the array
                                                                        field.onChange(field.value.filter((id: string) => id !== project_id));
                                                                    }
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>{project_name}</TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    )}
                                />
                            </Table>
                        </ScrollArea>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
