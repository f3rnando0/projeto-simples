import { z } from "zod";

export const formSchema = z.object({
	amount: z.preprocess(
		(a) => Number.parseInt(a as string, 10),
		z
			.number({ message: "O valor precisa ser um número" })
			.positive({ message: "O valor precisa ser positivo" }),
	),
	valor_unitario: z.preprocess(
		(a) => Number.parseInt(a as string, 10),
		z
			.number({ message: "O valor precisa ser um número" })
			.positive({ message: "O valor precisa ser positivo" }),
	),
	valor: z.preprocess(
		(a) => {
			if (typeof a === "string") {
				const b = (a as string)
					.replace("R$", "")
					.replaceAll(".", "")
					.replaceAll(",", "")
					.trim();
				return Number.parseInt(b as string, 10) / 100;
			}

			return Number.parseInt(a as string, 10);
		},
		z
			.number({ message: "O valor precisa ser um número" })
			.positive({ message: "O valor precisa ser positivo" }),
	),
	peso: z.preprocess(
		(a) => Number.parseInt(a as string, 10),
		z
			.number({ message: "O valor precisa ser um número" })
			.positive({ message: "O valor precisa ser positivo" }),
	),
	volume: z.preprocess(
		(a) => Number.parseInt(a as string, 10),
		z
			.number({ message: "O valor precisa ser um número" })
			.positive({ message: "O valor precisa ser positivo" }),
	),
	prazo_minimo: z.date().optional(),
	prazo_maximo: z.date().optional(),
	descricao: z.string().optional(),
});
