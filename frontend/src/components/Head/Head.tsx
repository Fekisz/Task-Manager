import { Button } from "@/components/ui/button";
interface NewProjectCardProps {
	setShowNewProjectCard: (show: boolean) => void;
}
function Head({ setShowNewProjectCard }: NewProjectCardProps) {
	return (
		<header className="flex items-center justify-between p-4 bg-gray-900 text-white">
			<h1 className="text-4xl font-bold">Task Manager</h1>
			<Button
				className="bg-blue-500 hover:bg-blue-600"
				onClick={() => {
					setShowNewProjectCard(true);
				}}
			>
				+ Add New Projects
			</Button>
		</header>
	);
}
export default Head;
