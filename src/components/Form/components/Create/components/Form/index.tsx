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
import { v4 as uuidv4 } from 'uuid'
import { MoneyInput } from "@/components/ui/input-money";

export default function CreateForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: 0,
			valor_unitario: 0,
			valor: 0,
			peso: 0,
			volume: 0,
			prazo_maximo: undefined,
			prazo_minimo: undefined,
			descricao: undefined,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const { amount, peso, valor, valor_unitario, volume, descricao, prazo_maximo, prazo_minimo } = values;

		useProductsStore.getState().dispatch.updateProducts({ id: uuidv4(), amount, peso, valor, valor_unitario, volume, descricao, prazo_maximo, prazo_minimo });
	}


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
										<Input type="number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<MoneyInput form={form} label="Valor Unitário" name="valor_unitario" />
						<FormField
							control={form.control}
							name="peso"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Peso</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
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
											type="number"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<MoneyInput form={form} label="Valor" name="valor" />
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
							<Button type="submit" size="icon">
								<PlusIcon />
							</Button>
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
}
