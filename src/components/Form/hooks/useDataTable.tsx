import type { Product } from "../types";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import RemoveProduct from "../components/Table/components/RemoveProduct";

export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: "id",
		header: "Ações",
		cell: ({ row }) => <RemoveProduct id={row.getValue("id")} />,
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
		cell: ({ row }) => {
			const date: string = row.getValue("prazo_minimo");
			if (date) {
				const formatted = format(date, "PPP", { locale: ptBR });
				return <div>{formatted}</div>;
			}
			return <div>{date}</div>
		}
	},
	{
		accessorKey: "prazo_maximo",
		header: "Prazo máximo",
		cell: ({ row }) => {
			const date: string = row.getValue("prazo_minimo");
			if (date) {
				const formatted = format(date, "PPP", { locale: ptBR });
				return <div>{formatted}</div>;
			}
			return <div>{date}</div>

		}
	},
	{
		accessorKey: "descricao",
		header: "Descrição",
	},
];

export default function productsTable(data: Product[]) {
	return data;
};