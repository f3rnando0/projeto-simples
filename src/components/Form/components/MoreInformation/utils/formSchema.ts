import { z } from "zod";

export const formSchema = z.object({
  total_volume: z.preprocess(
    (a) => Number(a),
    z
      .number({ message: "O valor precisa ser um número" })
      .positive({ message: "O valor precisa ser positivo" }),
  ),
  total_peso: z.preprocess(
    (a) => Number(a),
    z
      .number({ message: "O valor precisa ser um número" })
      .positive({ message: "O valor precisa ser positivo" }),
  ),
  total_produtos: z.preprocess(
    (a) => Number(a),
    z
      .number({ message: "O valor precisa ser um número" })
      .positive({ message: "O valor precisa ser positivo" }),
  ),
  valor_frete: z.preprocess(
    (a) => Number(a),
    z
      .number({ message: "O valor precisa ser um número" })
      .positive({ message: "O valor precisa ser positivo" }),
  ),
  desconto: z.preprocess(
    (a) => Number(a),
    z
      .number({ message: "O valor precisa ser um número" })
      .positive({ message: "O valor precisa ser positivo" }),
  ),

  total_nota: z.preprocess(
    (a) => Number(a),
    z
      .number({ message: "O valor precisa ser um número" })
      .positive({ message: "O valor precisa ser positivo" }),
  ),
  pedido_referencia: z.string(),
  obs: z.string(),
});
