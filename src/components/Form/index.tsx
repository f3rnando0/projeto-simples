"use client";

import DataTable from "./components/Table";
import Create from "./components/Create";
import MoreInformation from "./components/MoreInformation";
import { useProductsStore } from "./store/index";
import { useMemo } from "react";
import productsTable, { columns } from "./hooks/useDataTable";

export default function Form() {
	const data = useProductsStore((state) => state.productData.products)

	const dataTable = useMemo(() => productsTable(data), [data]);

	return (
		<div className="p-4 flex flex-col gap-4">
			<MoreInformation />
			<Create />
			<DataTable columns={columns} data={dataTable} />
		</div>
	);
}
