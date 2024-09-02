import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../utils/formSchema";
import type { z } from "zod";
import { MoneyInput } from "@/components/ui/input-money";
import { useMemo } from "react";
import { useProductsStore } from "@/components/Form/store";
import { calcularValorTotal } from "./utils";

export default function MoreInformationForm() {
  const products = useProductsStore((state) => state.productData.products);

  const valorTotal = useMemo(() => {
    calcularValorTotal(products);
  }, [products])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      valor_frete: 0,
      desconto: 0,
      total_nota: 0,
      total_produtos: 0,
      total_volume: 0,
      total_peso: 0,
      obs: "",
      pedido_referencia: ""
    },
  });

  return (
    <div>
      <Form {...form}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-3">
              <MoneyInput form={form} label="Valor do Frete" name="valor_frete" />
            </div>
            <div className="flex flex-col gap-3">
              <MoneyInput form={form} label="Desconto" name="desconto" />
            </div>
            <div className="flex flex-col gap-3">
              <MoneyInput form={form} label="Total dos Produtos/Serviços" name="total_produtos" />
            </div>
            <div className="flex flex-col gap-3">
              <MoneyInput form={form} label="Total da Nota" name="total_nota" />
            </div>
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="total_peso"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso Total</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="total_volume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Volume Total</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="pedido_referencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pedido de referência</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/3 flex flex-col gap-3">
              <FormField
                control={form.control}
                name="obs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Obs.</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </Form>
    </div>
  )
}