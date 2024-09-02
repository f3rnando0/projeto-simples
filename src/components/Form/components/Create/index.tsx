"use client";

import CreateForm from "./components/Form";

export default function Create() {
	return (
		<div>
			<div>
				<span className="text-xl font-pretty">
					Descrição do Produto/Serviços
				</span>
				<CreateForm />
			</div>
		</div>
	);
}
