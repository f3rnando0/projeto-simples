"use client";

import type { z } from "zod";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formSchema } from "../utils/formSchema";
import { useProductsStore } from "@/components/Form/store";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import UnidadeInput from "../../../Inputs/Unidade";
import { Label } from "@radix-ui/react-label";
import DinheiroInput from "../../../Inputs/Dinheiro";
import PesoInput from "../../../Inputs/Peso";
import TextInput from "../../../Inputs/TextInput";
import { watchActions } from '@/components/Form/components/Inputs/types'

export default function CreateForm() {
	const { toast } = useToast();

	const methods = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: 0,
			valor_unitario: 0,
			valor: 0,
			volume: 0,
			peso: 0,
			prazo_maximo: undefined,
			prazo_minimo: undefined,
			descricao: undefined,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const {
			amount,
			peso,
			valor_unitario,
			volume,
			valor,
			descricao,
			prazo_maximo,
			prazo_minimo,
		} = values;

		useProductsStore.getState().dispatch.updateProducts({
			id: uuidv4(),
			amount,
			peso,
			valor,
			valor_unitario,
			volume,
			descricao,
			prazo_maximo,
			prazo_minimo,
		});

		toast({
			title: "Produto/Serviço criado",
			description: format(Date.now(), "PPPpp", { locale: ptBR }),
			duration: 2500,
		})
	}

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<div className="flex flex-col">
					<div className="w-full flex gap-4">
						<div className="flex flex-col gap-2">
							<Label htmlFor="amount">Quantidade</Label>
							<UnidadeInput<typeof formSchema>
								name="amount"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="valor_unitario">Valor Unitário</Label>
							<DinheiroInput<typeof formSchema>
								name="valor_unitario"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="peso">Peso</Label>
							<PesoInput<typeof formSchema>
								name="peso"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="volume">Volume</Label>
							<UnidadeInput<typeof formSchema>
								name="volume"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="valor">Valor</Label>
							<DinheiroInput<typeof formSchema>
								name="valor"
								watchValues={["amount", "valor_unitario"]}
								watchAction={watchActions.AMOUNTxUNIT}
							/>
						</div>
					</div>
					<div className="flex flex-row">
						<div className="flex flex-col gap-2 w-80">
							<Label htmlFor="descricao">Descrição</Label>
							<TextInput<typeof formSchema> name="descricao" />
						</div>
					</div>
				</div>
			</form>
		</FormProvider>
	);
}
