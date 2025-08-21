import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { api } from "@/lib/api";
import { useRef } from "react";
import useOnClickOutside from "@/Hooks/onClickOutside";

interface NewTaskCardProps {
	showNewTaskCard: boolean;
	setShowNewTaskCard: (show: boolean) => void;
}
interface ProjectID {
	project_id: number | null;
}

function NewTaskCard({
	showNewTaskCard,
	setShowNewTaskCard,
	project_id,
}: NewTaskCardProps & ProjectID) {
	const NewTitle = useRef<HTMLInputElement>(null);
	const NewDescription = useRef<HTMLInputElement>(null);
	const cardRef = useRef<HTMLDivElement>(
		null
	) as React.RefObject<HTMLDivElement>;

	useOnClickOutside(cardRef, () => {
		setShowNewTaskCard(false);
	});

	return (
		<Card
			className={
				"absolute z-10 top-20 left-1/2 transform -translate-x-1/2 " +
				(showNewTaskCard ? "block" : "hidden")
			}
			ref={cardRef}
		>
			<CardHeader className="text-center">
				<h2 className="text-2xl font-semibold">Create New Task</h2>
			</CardHeader>
			<CardContent>
				<Input ref={NewTitle} placeholder="Title"></Input>
				<Input ref={NewDescription} placeholder="Description"></Input>
				<Button
					className="mt-4 w-full bg-blue-500 hover:bg-blue-600 hover:cursor-pointer"
					onClick={() => {
						setShowNewTaskCard(false);

						api.post("Task", {
							Title: NewTitle.current?.value,
							Description: NewDescription.current?.value,
							State: false,
							project_id: project_id,
						});
					}}
				>
					Add New Task
				</Button>
			</CardContent>
		</Card>
	);
}
export default NewTaskCard;
