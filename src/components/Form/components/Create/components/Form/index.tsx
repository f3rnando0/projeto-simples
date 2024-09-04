"use client";

import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formSchema } from "./utils/formSchema";
import { useProductsStore } from "@/components/Form/store";
import { v4 as uuidv4 } from "uuid";
import { MoneyInput } from "@/components/ui/input-money";
import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { moneyFormatter } from "@/components/utils/formatter";

export default function CreateForm() {
	const { toast } = useToast();

	const [pesoValue, setPesoValue] = useState("0 kg");
	const [volumeValue, setVolumeValue] = useState("0 uni");
	const [quantidadeValue, setQuantidadeValue] = useState("0 uni");

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: 0,
			valor_unitario: 0,
			valor: 0,
			prazo_maximo: undefined,
			prazo_minimo: undefined,
			descricao: undefined,
		},
		shouldUnregister: false,
	});

	const watcherAmount = form.watch("amount").toString();
	const watcherUnitValue = form.watch("valor_unitario");

	const valorTotal = useMemo(() => {
		return Number.parseInt(watcherAmount.replace(" uni", "")) * watcherUnitValue;
	}, [watcherAmount, watcherUnitValue]);

	const [valorValue, setValorValue] = useState(valorTotal);

	useEffect(() => {
		setValorValue(valorTotal);
	}, [valorTotal])

	useEffect(() => {
		form.setValue("valor", valorValue);
	}, [valorValue, form.setValue])

	function onSubmit(values: z.infer<typeof formSchema>) {
		const {
			amount,
			peso,
			valor,
			valor_unitario,
			volume,
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
	}

	const handlePesoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === "") {
			setPesoValue("0 kg");
			return form.setValue("peso", 0);
		}
		const parsed = Number.parseInt(e.target.value.replace(/\D/g, ""), 10);
		form.setValue("peso", parsed);
		setPesoValue(parsed ? `${parsed} kg` : "");
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === "") {
			setVolumeValue("0 uni");
			return form.setValue("volume", 0);
		}
		const parsed = Number.parseInt(e.target.value.replace(/\D/g, ""), 10);
		form.setValue("volume", parsed);
		setVolumeValue(parsed ? `${parsed} uni` : "");
	};

	const handleQuantidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === "") {
			setQuantidadeValue("0 uni");
			return form.setValue("amount", 0);
		}
		const parsed = Number.parseInt(e.target.value.replace(/\D/g, ""), 10);
		form.setValue("amount", parsed);
		setQuantidadeValue(parsed ? `${parsed} uni` : "");
	};

	const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const digits = e.target.value.replace(/\D/g, "");
		const realValue = Number(digits) / 100;

		setValorValue(realValue);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex flex-col">
					<div className="w-full flex gap-4">
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Quantidade</FormLabel>
									<FormControl>
										<Input
											type="text"
											{...field}
											{...form.register("amount")}
											value={quantidadeValue}
											onChange={handleQuantidadeChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<MoneyInput
							form={form}
							label="Valor Unitário"
							name="valor_unitario"
						/>
						<FormField
							control={form.control}
							name="peso"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Peso</FormLabel>
									<FormControl>
										<Input
											type="text"
											{...field}
											{...form.register("peso")}
											value={pesoValue}
											onChange={handlePesoChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="volume"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Volume</FormLabel>
									<FormControl>
										<Input
											type="text"
											{...field}
											{...form.register("volume")}
											value={volumeValue}
											onChange={handleVolumeChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="valor"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Total dos Produtos/Serviços</FormLabel>
									<FormControl>
										<Input
											type="text"
											{...field}
											{...form.register("valor")}
											value={`${moneyFormatter.format(valorValue)}`}
											onChange={handleValorChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="h-20 flex flex-row gap-4 items-end">
						<FormField
							control={form.control}
							name="descricao"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descricação</FormLabel>
									<FormControl>
										<Input type="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="prazo_minimo"
							render={({ field }) => (
								<FormItem className="flex flex-col mt-[10px]">
									<FormLabel>Prazo mínimo</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-[240px] pl-3 text-left font-normal",
														!field.value && "text-muted-foreground",
													)}
												>
													{field.value
														? format(field.value, "PPP", { locale: ptBR })
														: ""}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) =>
													date < new Date() || date < new Date("1900-01-01")
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="prazo_maximo"
							render={({ field }) => (
								<FormItem className="flex flex-col mt-[10px]">
									<FormLabel>Prazo máximo</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-[240px] pl-3 text-left font-normal",
														!field.value && "text-muted-foreground",
													)}
												>
													{field.value
														? format(field.value, "PPP", { locale: ptBR })
														: ""}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) =>
													date < new Date() || date < new Date("1900-01-01")
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div>
							<Button type="submit" size="icon" onClick={() => {
								toast({
									title: "Produto/Serviço criado",
									description: format(Date.now(), "PPPpp", { locale: ptBR }),
								})
							}}>
								<PlusIcon />
							</Button>
						</div>
					</div>
				</div>
			</form>
		</Form >
	);
}
