"use client";

import type { ColumnDef } from "@tanstack/react-table";
import DataTable from "./components/Table";
import { XIcon } from "lucide-react";
import Create from "./components/Create";

type Product = {
	id: string;
	amount: number;
	valor_unitario: number;
	valor: number;
	peso: number;
	volume: number;
	prazo_minimo?: string;
	prazo_maximo?: string;
	descricao?: string;
};

export const produtos: Product[] = [
	{
		id: "728ed52f",
		amount: 100,
		valor_unitario: 19.99,
		valor: 1999,
		peso: 1.5,
		volume: 0.5,
		prazo_minimo: "15 dias",
		prazo_maximo: "30 dias",
		descricao: "Papel para escrita",
	},
];

export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: "id",
		header: "Ações",
		cell: ({ row }) => <XIcon className="cursor-pointer" />,
	},
	{
		accessorKey: "amount",
		header: "Quantidade",
	},
	{
		accessorKey: "valor_unitario",
		header: "Valor unitário",
	},
	{
		accessorKey: "valor",
		header: "Valor",
	},
	{
		accessorKey: "peso",
		header: "Peso",
	},
	{
		accessorKey: "volume",
		header: "Volume",
	},
	{
		accessorKey: "prazo_minimo",
		header: "Prazo mínimo",
	},
	{
		accessorKey: "prazo_maximo",
		header: "Prazo máximo",
	},
	{
		accessorKey: "descricao",
		header: "Descrição",
	},
];

export default function Form() {
	return (
		<div className="p-4 flex flex-col gap-4">
			<Create />
			<DataTable columns={columns} data={produtos} />
		</div>
	);
}
