import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { api } from "@/lib/api";
import { useRef } from "react";
import useOnClickOutside from "@/Hooks/onClickOutside";

interface NewProjectCardProps {
	showNewProjectCard: boolean;
	setShowNewProjectCard: (show: boolean) => void;
	setreloadProject: (value: number) => void;
}
let i = 1;
function NewProjectCard({
	showNewProjectCard,
	setShowNewProjectCard,
	setreloadProject,
}: NewProjectCardProps) {
	const NewTitle = useRef<HTMLInputElement>(null);
	const NewDescription = useRef<HTMLInputElement>(null);
	const cardRef = useRef<HTMLDivElement>(
		null
	) as React.RefObject<HTMLDivElement>;

	useOnClickOutside(cardRef, () => {
		setShowNewProjectCard(false);
	});
	return (
		<Card
			className={
				"absolute z-10 top-20 left-1/2 transform -translate-x-1/2 " +
				(showNewProjectCard ? "block" : "hidden")
			}
			ref={cardRef}
		>
			<CardHeader className="text-center">
				<h2 className="text-2xl font-semibold">Create New Project</h2>
			</CardHeader>
			<CardContent>
				<Input ref={NewTitle} placeholder="Titl"></Input>
				<Input ref={NewDescription} placeholder="Description"></Input>
				<Button
					className="mt-4 w-full bg-blue-500 hover:bg-blue-600 hover:cursor-pointer"
					onClick={() => {
						setShowNewProjectCard(false);

						api
							.post("Project", {
								name: NewTitle.current?.value,
								description: NewDescription.current?.value,
								user_id: 1,
							})
							.then(() => {
								setreloadProject(i++);
							});
					}}
				>
					Add New Project
				</Button>
			</CardContent>
		</Card>
	);
}
export default NewProjectCard;
