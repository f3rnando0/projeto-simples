"use client";

import { useProductsStore } from "@/components/Form/store";
import { XIcon } from "lucide-react";

export default function RemoveProduct({ id }: { id: string }) {
  const removeProduct = useProductsStore((state) => state.dispatch.removeProduct);

  return (
    <XIcon
      className="cursor-pointer"
      onClick={() => removeProduct(id)}
    />
  );
}
