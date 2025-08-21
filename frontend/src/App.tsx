import Head from "@/components/Head/Head";
import ProjectTable from "./components/ProjectTable/ProjectTable";
import TaskTable from "./components/TaskTable/TaskTable";
import { useState } from "react";
import NewProjectCard from "./components/Cards/NewProjectCard";
import NewTaskCard from "./components/Cards/NewTaskCard";

function App() {
	const [Project_id, SetProject_id] = useState<number | null>(null);
	const [showNewProjectCard, setShowNewProjectCard] = useState(false);
	const [showNewTaskCard, setShowNewTaskCard] = useState(false);

	return (
		<div className={"h-full w-full bg-gray-900 absolute "}>
			<NewProjectCard
				showNewProjectCard={showNewProjectCard}
				setShowNewProjectCard={setShowNewProjectCard}
			/>
			<NewTaskCard
				showNewTaskCard={showNewTaskCard}
				setShowNewTaskCard={setShowNewTaskCard}
				project_id={Project_id}
			/>
			<div className="h-1/2 w-3/4 ml-auto mr-auto flex flex-col  mt-15">
				<div className="">
					<Head setShowNewProjectCard={setShowNewProjectCard} />
				</div>
				<div className=" text-white justify-center items-center flex flex-row">
					<ProjectTable
						OnSetProject_id={SetProject_id}
						project_id={Project_id}
					/>
					<TaskTable
						project_id={Project_id}
						setShowNewTaskCard={setShowNewTaskCard}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
