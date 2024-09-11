import type { Product } from "../types";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import RemoveProduct from "../components/Table/components/RemoveProduct";
import { moneyFormatter } from "@/lib/formatter";

export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: "id",
		header: "Ações",
		cell: ({ row }) => <RemoveProduct id={row.getValue("id")} />,
	},
	{
		accessorKey: "amount",
		header: "Quantidade",
		cell: ({ row }) => {
			const amount: string = row.getValue("amount");
			return <div>{`${amount} uni`}</div>;
		},
	},
	{
		accessorKey: "valor_unitario",
		header: "Valor unitário",
		cell: ({ row }) => {
			const valor: string = row.getValue("valor_unitario");
			const value = Number.parseInt(valor, 10);
			return <div>{moneyFormatter.format(value)}</div>;
		},
	},
	{
		accessorKey: "valor",
		header: "Valor",
		cell: ({ row }) => {
			const valor: string = row.getValue("valor");
			const value = Number.parseInt(valor, 10);
			return <div>{moneyFormatter.format(value)}</div>;
		},
	},
	{
		accessorKey: "peso",
		header: "Peso",
		cell: ({ row }) => {
			const volume: string = row.getValue("volume");
			return <div>{`${volume} kg`}</div>;
		},
	},
	{
		accessorKey: "volume",
		header: "Volume",
		cell: ({ row }) => {
			const volume: string = row.getValue("volume");
			return <div>{`${volume} uni`}</div>;
		},
	},
	{
		accessorKey: "prazo_minimo",
		header: "Prazo mínimo",
		cell: ({ row }) => {
			const date: string = row.getValue("prazo_minimo");
			if (date) {
				const formatted = format(date, "PPP", { locale: ptBR });
				return <div>{formatted}</div>;
			}
			return <div>{date}</div>;
		},
	},
	{
		accessorKey: "prazo_maximo",
		header: "Prazo máximo",
		cell: ({ row }) => {
			const date: string = row.getValue("prazo_maximo");
			if (date) {
				const formatted = format(date, "PPP", { locale: ptBR });
				return <div>{formatted}</div>;
			}
			return <div>{date}</div>;
		},
	},
	{
		accessorKey: "descricao",
		header: "Descrição",
	},
];

export default function productsTable(data: Product[]) {
	return data;
}
