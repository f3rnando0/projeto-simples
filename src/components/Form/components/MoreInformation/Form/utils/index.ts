import type { Product } from "@/components/Form/types";

export function calcularValorTotal(products: Product[]): number | null {
  return products.reduce((total, product) => {
    return total + product.valor * product.volume;
  }, 0);
}
