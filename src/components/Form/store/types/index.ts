import type { Product } from "../../types";

export type State = {
	productData: {
		products: Product[];
	};
};

export type Action = {
	dispatch: {
		updateProducts: (products: Product) => void;
		removeProduct: (id: string) => void;
	};
};
