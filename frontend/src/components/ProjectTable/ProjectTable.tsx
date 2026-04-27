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

interface SetProject_id {
	OnSetProject_id: (id: number) => void;
	project_id?: number | null;
}

interface Project {
	id: number;
	name: string;
	description?: string;
}

interface ProjectTableProps extends SetProject_id {
	reloadProject: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeProjects(data: any): Project[] {
	if (Array.isArray(data)) return data;
	if (Array.isArray(data?.data)) return data.data;
	if (Array.isArray(data?.$values)) return data.$values;
	return [];
}

async function fetchProjects(): Promise<Project[]> {
	const response = await api.get("Project");

	console.log("API RAW:", response.data);

	return normalizeProjects(response.data);
}

function ProjectTable({
	OnSetProject_id,
	project_id,
	reloadProject,
}: ProjectTableProps) {
	const [projects, setProjects] = useState<Project[]>([]);

	useEffect(() => {
		fetchProjects()
			.then(setProjects)
			.catch((error) => {
				console.error("Error fetching projects:", error);
				setProjects([]);
			});
	}, [reloadProject]);

	const handleDelete = async (id: number) => {
		try {
			await api.delete(`Project/${id}`);

			const updated = await fetchProjects();
			setProjects(updated);

			OnSetProject_id(0);
		} catch (error) {
			console.error("Error deleting project:", error);
		}
	};

	return (
		<ScrollArea className="w-[350px] h-[400px] rounded-2xl bg-gray-800 text-white overflow-hidden">
			<ScrollAreaViewport className="w-full h-full p-3">
				<h3 className="text-2xl font-semibold mb-4">Projects</h3>

				{projects.length === 0 && (
					<p className="text-gray-400">Brak projektów</p>
				)}

				{projects.map((project) => (
					<Button
						key={`Project_${project.id}`}
						onClick={() => OnSetProject_id(project.id)}
						className={
							"bg-gray-600 rounded-2xl p-2 text-[18px] w-10/12 justify-between mb-3 flex items-center " +
							(project_id === project.id ? "bg-blue-500" : "")
						}
					>
						<span>{project.name}</span>

						<span
							onClick={(e) => {
								e.stopPropagation();
								handleDelete(project.id);
							}}
							className="bg-red-500 w-5 h-5 flex items-center justify-center text-white rounded-full cursor-pointer text-xs"
						>
							X
						</span>
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
