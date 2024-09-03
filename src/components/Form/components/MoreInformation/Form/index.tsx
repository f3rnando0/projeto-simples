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
import { useEffect, useMemo, useState } from "react";
import { useProductsStore } from "@/components/Form/store";

const moneyFormatter = Intl.NumberFormat("pt-BR", {
	currency: "BRL",
	currencyDisplay: "symbol",
	currencySign: "standard",
	style: "currency",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

export default function MoreInformationForm() {
	const products = useProductsStore((state) => state.productData.products);

	const totalNota = useMemo(() => {
		return products.reduce(
			(acc, product) => acc + product.valor_unitario * product.amount,
			0,
		);
	}, [products]);

	const totalVolume = useMemo(() => {
		return products.reduce((acc, product) => acc + product.volume, 0);
	}, [products]);

	const totalPeso = useMemo(() => {
		return products.reduce((acc, product) => acc + product.peso, 0);
	}, [products]);

	const [valorNota, setValorNota] = useState(totalNota);
	const [valorVolume, setTotalVolume] = useState(`${totalVolume} uni`);
	const [valorPeso, setTotalPeso] = useState(`${totalVolume} kg`);

	useEffect(() => {
		setValorNota(totalNota);
		setTotalVolume(`${totalVolume} uni`);
		setTotalPeso(`${totalPeso} kg`);
	}, [totalNota, totalVolume, totalPeso]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			valor_frete: 0,
			desconto: 0,
			obs: "",
			pedido_referencia: "",
		},
	});

	const handleValorNotaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const digits = e.target.value.replace(/\D/g, "");
		const realValue = Number(digits) / 100;

		setValorNota(realValue);
	};

	const handleValorVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const digits = e.target.value.replace(/\D/g, "");
		const realValue = Number(digits);

		setTotalVolume(`${realValue} uni`);
	};

	const handleValorPesoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const digits = e.target.value.replace(/\D/g, "");
		const realValue = Number(digits);

		setTotalPeso(`${realValue} kg`);
	};

	return (
		<div>
			<Form {...form}>
				<div className="flex flex-col gap-2">
					<div className="flex flex-row gap-4">
						<div className="flex flex-col gap-3">
							<MoneyInput
								form={form}
								label="Valor do Frete"
								name="valor_frete"
							/>
						</div>
						<div className="flex flex-col gap-3">
							<MoneyInput form={form} label="Desconto" name="desconto" />
						</div>
						<div className="flex flex-col gap-3">
							<FormField
								control={form.control}
								name="total_produtos"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Total dos Produtos/Serviços</FormLabel>
										<FormControl>
											<Input
												type="text"
												{...field}
												{...form.register("total_produtos")}
												value={`${moneyFormatter.format(valorNota)}`}
												onChange={handleValorNotaChange}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex flex-col gap-3">
							<FormField
								control={form.control}
								name="total_nota"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Total da Nota</FormLabel>
										<FormControl>
											<Input
												type="text"
												{...field}
												{...form.register("total_nota")}
												value={`${moneyFormatter.format(valorNota)}`}
												onChange={handleValorNotaChange}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex flex-col gap-3">
							<FormField
								control={form.control}
								name="total_peso"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Peso Total</FormLabel>
										<FormControl>
											<Input
												type="text"
												{...field}
												{...form.register("total_peso")}
												value={valorPeso}
												onChange={handleValorPesoChange}
											/>
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
											<Input
												type="text"
												{...field}
												{...form.register("total_volume")}
												value={valorVolume}
												onChange={handleValorVolumeChange}
											/>
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
	);
}
