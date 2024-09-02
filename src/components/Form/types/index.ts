export type Product = {
	id: string;
	amount: number;
	valor_unitario: number;
	valor: number;
	peso: number;
	volume: number;
	prazo_minimo?: string | Date;
	prazo_maximo?: string | Date;
	descricao?: string;
};
