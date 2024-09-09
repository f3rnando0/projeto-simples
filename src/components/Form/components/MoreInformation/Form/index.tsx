import { Form, FormProvider, type SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../utils/formSchema";
import type { z } from "zod";
import { useProductsStore } from "@/components/Form/store";
import UnidadeInput from "../../Inputs/Unidade";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PesoInput from "../../Inputs/Peso";
import DinheiroInput from "../../Inputs/Dinheiro";
import TextInput from "../../Inputs/TextInput";

export default function MoreInformationForm() {
	const products = useProductsStore((state) => state.productData.products);

	const methods = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			total_volume: 0,
			total_peso: 0.00,
			total_produtos: 0.00,
			total_nota: 0.00,
			desconto: 0.00,
			valor_frete: 0.00,
			obs: "",
			pedido_referencia: "",
		},
	});

	const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
		console.log(data);
	}

	return (
		<FormProvider {...methods} >
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-4">
					<div className="flex flex-row gap-4">
						<div className="flex flex-col gap-2">
							<Label htmlFor="total_volume">Volume Total</Label>
							<UnidadeInput name="total_volume" />
						</div>
					</div>
					<div className="flex flex-row gap-4 w-full">
						<div className="flex flex-col gap-2">
							<Label htmlFor="pedido_referencia">Pedido de referência</Label>
							<TextInput name="pedido_referencia" />
						</div>
						<div className="flex flex-col gap-2 w-1/4">
							<Label htmlFor="obs">Obs.</Label>
							<TextInput name="obs" />
						</div>
					</div>
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</FormProvider>
	);
}
