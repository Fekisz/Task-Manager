import {
	ScrollArea,
	ScrollAreaViewport,
	ScrollAreaScrollbar,
	ScrollAreaThumb,
	ScrollAreaCorner,
} from "@radix-ui/react-scroll-area";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

async function fetchTask(id?: number) {
	const response = await api.get(`Task/${id ? id : ""}`);
	if (response) {
		return response.data;
	} else {
		throw new Error("Failed to fetch tasks");
	}
}

interface Task {
	id: number;
	title: string;
	description?: string;
	state: boolean;
	project_id?: number;
}
interface ProjectID {
	project_id: number | null;
}
interface setShowNewTaskCard {
	setShowNewTaskCard: (show: boolean) => void;
}

function TaskTable({
	project_id,

	setShowNewTaskCard,
}: ProjectID & setShowNewTaskCard) {
	const [tasks, SetTasks] = useState([]);

	useEffect(() => {
		if (!project_id || project_id === null) {
			SetTasks([]);
			return;
		}
		fetchTask(project_id != null ? project_id : undefined)
			.then(SetTasks)
			.catch((error) => {
				console.error("Error fetching Tasks:", error);
			});
	}, [project_id]);
	tasks.sort((a: Task, b: Task) => a.id - b.id);
	return (
		<div className="p-4 w-">
			<ScrollArea className="w-[450px] h-[400px] rounded-2xl  bg-gray-800 text-white p-3">
				<ScrollAreaViewport className="w-full h-full p-3">
					<h2 className=" text-lg font-semibold text-white ml-1">Tasks </h2>

					{tasks.length > 0 ? (
						tasks.map((task: Task) => (
							<div
								className={
									"ml-5 rounded-2xl flex items-center gap-3 justify-between mb-3 pl-4 p-2 hover:cursor-pointer w-10/12  " +
									(task.state ? "bg-green-500" : "bg-gray-600")
								}
								key={`Project_${task.id}`}
								onClick={() => {
									api
										.patch(`Task/${task.id}`, { state: !task.state })
										.then(() => {
											if (project_id) {
												fetchTask(project_id).then(SetTasks);
											}
										});
								}}
							>
								<div id={`${task.description}`} className=" text-[18px]  ">
									{task.title}
								</div>
								<Button
									onClick={() => {
										api.delete(`Task/${task.id}`).then(() => {
											if (project_id) {
												fetchTask(project_id).then(SetTasks);
											}
										});
									}}
									className="bg-red-500 h-2 w-0 p-2.5 flex  items-center justify-center text-white rounded-full"
								>
									D
								</Button>
							</div>
						))
					) : (
						<p className="p-4">No tasks available.</p>
					)}
					{project_id !== null && project_id > 0 ? (
						<Button
							className="rounded-full bg-gray-600 w-5 h-5 right-2 bottom-2 absolute p-4 pt-3 text-2xl  "
							onClick={() => {
								setShowNewTaskCard(true);
							}}
						>
							+
						</Button>
					) : null}
				</ScrollAreaViewport>

				<ScrollAreaScrollbar
					orientation="vertical"
					className="flex select-none touch-none p-0.5 bg-gray-700 rounded-r-2xl"
				>
					<ScrollAreaThumb className="flex-1 bg-gray-500 rounded-full" />
				</ScrollAreaScrollbar>

				<ScrollAreaCorner className="bg-gray-700" />
			</ScrollArea>
		</div>
	);
}
export default TaskTable;
