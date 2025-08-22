import {
	ScrollArea,
	ScrollAreaViewport,
	ScrollAreaScrollbar,
	ScrollAreaThumb,
	ScrollAreaCorner,
} from "@radix-ui/react-scroll-area";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

async function fetchProjects(id?: number) {
	const response = await api.get(`Project/${id ? { id } : ""}`);
	if (response) {
		return response.data;
	} else {
		throw new Error("Failed to fetch projects");
	}
}

interface SetProject_id {
	OnSetProject_id: (id: number) => void;
	project_id?: number | null;
}
interface Project {
	id: number;
	name: string;
	description?: string;
	user_id?: number;
}
interface ProjectTableProps extends SetProject_id {
	reloadProject: number;
}

function ProjectTable({
	OnSetProject_id,
	project_id,
	reloadProject,
}: ProjectTableProps) {
	const [projects, SetProjects] = useState<Project[]>([]);

	useEffect(() => {
		fetchProjects()
			.then(SetProjects)
			.catch((error) => {
				console.error("Error fetching projects:", error);
			});
	}, [reloadProject]);

	return (
		<ScrollArea className="w-[350px] h-[400px] rounded-2xl bg-gray-800 text-white overflow-hidden">
			<ScrollAreaViewport className="w-full h-full p-3">
				<h3 className="text-2xl font-semibold mb-4">Projects</h3>

				{projects.map((project: Project) => (
					<Button
						onClick={() => OnSetProject_id(project.id)}
						className={
							"bg-gray-600 rounded-2xl p-2 text-[18px] hover:cursor-pointer w-10/12 justify-between mb-3 text-wrap " +
							(project_id === project.id ? "bg-blue-500" : "")
						}
						key={`Project_${project.id}`}
					>
						{project.name}
						<Button
							onClick={() => {
								api.delete(`Project/${project.id}`).then(() => {
									if (project_id) {
										fetchProjects().then(SetProjects);
									}
								});
							}}
							className="bg-red-500 h-2 w-0 p-2.5 flex  items-center justify-center text-white rounded-full"
						>
							X
						</Button>
					</Button>
				))}
			</ScrollAreaViewport>

			<ScrollAreaScrollbar
				orientation="vertical"
				className="flex select-none touch-none p-0.5 bg-gray-700 rounded-r-2xl"
			>
				<ScrollAreaThumb className="flex-1 bg-gray-500 rounded-full" />
			</ScrollAreaScrollbar>

			<ScrollAreaCorner className="bg-gray-700" />
		</ScrollArea>
	);
}

export default ProjectTable;
