import {useState} from "react";
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { LockIcon, UnlockIcon } from 'lucide-react'
import {useListProjects} from "@/features/projects/api/use-list-projects";
import {Button} from "@/components/ui/button";

interface SetConnectionAccessCardContentProps {
    onSubmit: (isPrivate: boolean, projects?: string[]) => void;
    onBack: () => void;
    initialData: { isPrivate: boolean, projects: string[] };
}

export const SetConnectionAccessCardContent = ({
                                                   onSubmit,
                                                   onBack,
                                                   initialData
                                               }: SetConnectionAccessCardContentProps) => {
    const [isPrivate, setIsPrivate] = useState(initialData.isPrivate);
    const [selectedProjects, setSelectedProjects] = useState<string[]>([])

    const {data} = useListProjects();

    const togglePrivate = () => {
        setIsPrivate(!isPrivate)
    }
    const toggleProject = (projectId: string) => {
        setSelectedProjects(prev =>
            prev.includes(projectId)
                ? prev.filter(id => id !== projectId)
                : [...prev, projectId]
        )
    }

    return (
        <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <UnlockIcon className={`h-5 w-5 ${!isPrivate ? 'text-green-500' : 'text-gray-300'}`}/>
                    <span className={`text-sm font-medium ${!isPrivate ? 'text-green-500' : 'text-gray-500'}`}>
              Public
            </span>
                </div>
                <Switch
                    checked={isPrivate}
                    onCheckedChange={togglePrivate}
                    className="data-[state=checked]:bg-purple-500"
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
                                <TableBody>
                                    {data?.memberships.map(({project_id, project_name}) => (
                                        <TableRow key={project_id} className="hover:bg-muted/50 transition-colors">
                                            <TableCell className="text-center">
                                                <Checkbox
                                                    checked={selectedProjects.includes(project_id)}
                                                    onCheckedChange={() => toggleProject(project_id)}
                                                />
                                            </TableCell>
                                            <TableCell>{project_name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex justify-between mt-12">
                <Button variant="outline" onClick={onBack}>Back</Button>
                <Button onClick={() => onSubmit(isPrivate, selectedProjects)}>Submit</Button>
            </div>
        </CardContent>
    );
}