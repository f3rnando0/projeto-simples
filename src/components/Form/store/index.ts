import { create } from "zustand";
import type { Action, State } from "./types";
import type { Product } from "../types";

export const useProductsStore = create<State & Action>((set) => ({
	productData: {
		products: [],
	},
	dispatch: {
		updateProducts: (newProduct: Product) =>
			set((state) => ({
				productData: {
					...state.productData,
					products: [...state.productData.products, newProduct],
				},
			})),
		removeProduct: (id: string) =>
			set((state) => ({
				productData: {
					...state.productData,
					products: state.productData.products.filter(
						(product: Product) => product.id !== id,
					),
				},
			})),
	},
}));
