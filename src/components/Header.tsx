import { CpuIcon, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
	return (
		<div className="w-full p-4 border-b border-orange-400 flex flex-row items-center justify-between">
			<div className="flex flex-row items-center gap-2">
				<CpuIcon />
				<span className="text-2xl text-pretty font-bold">Projeto Simples</span>
			</div>
			<div>
				<Button variant="outline" size="icon">
					<Moon />
				</Button>
			</div>
		</div>
	);
}
