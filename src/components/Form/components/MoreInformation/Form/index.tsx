import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../utils/formSchema";
import type { z } from "zod";
import UnidadeInput from "../../Inputs/Unidade";
import { Label } from "@/components/ui/label";
import PesoInput from "../../Inputs/Peso";
import DinheiroInput from "../../Inputs/Dinheiro";
import TextInput from "../../Inputs/TextInput";
import { watchActions } from "../../Inputs/types";

export default function MoreInformationForm() {
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
							<Label htmlFor="valor_frete">Valor do Frete</Label>
							<DinheiroInput<typeof formSchema> name="valor_frete" />
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="desconto">Desconto</Label>
							<DinheiroInput<typeof formSchema> name="desconto" />
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="total_produtos">Total dos Produtos/Serviços</Label>
							<DinheiroInput<typeof formSchema> name="total_produtos" watchAction={watchActions.WholeProductValues} />
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="total_produtos">Total da Nota</Label>
							<DinheiroInput<typeof formSchema> name="total_nota" watchValues={["total_produtos", "valor_frete", "desconto"]} watchAction={watchActions.WholeNotaValue} />
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="total_produtos">Peso Total</Label>
							<PesoInput<typeof formSchema> name="total_peso" watchAction={watchActions.WholePesoValue} />
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="total_produtos">Volume Total</Label>
							<UnidadeInput<typeof formSchema> name="total_volume" watchAction={watchActions.WholeVolumeValue} />
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
				</div>
			</form>
		</FormProvider>
	);
}
