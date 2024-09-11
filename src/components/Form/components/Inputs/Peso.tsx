import { Input } from "@/components/ui/input";
import { Controller, useFormContext, type Path } from "react-hook-form";
import { NumericFormat } from 'react-number-format';
import type { z } from "zod";
import { watchActions } from "./types";
import { Product } from "../../types";
import { useProductsStore } from "../../store";
import { useMemo } from "react";

type PesoInputProps<T extends z.ZodType> = {
    name: Path<z.infer<T>>;
    watchValues?: Path<z.infer<T>>[];
    watchAction?: watchActions;
};

function totalPesoValues(products: Product[]) {
    return products.reduce((acumulador, produto) => {
        return acumulador + (produto.amount * produto.peso);
    }, 0)
}

export default function PesoInput<T extends z.ZodType>({ name, watchValues, watchAction }: PesoInputProps<T>) {
    const { control, setValue } = useFormContext();

    const onChangeInput = (value: string, onChange: (value: number) => void) => {
        const newValue = value ? Number.parseFloat(value.replace("kg", "").trim()) : 0.00;
        onChange(newValue);
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        setValue(name, newValue as any);
    };

    switch (watchAction) {
        case watchActions.WholePesoValue: {
            const products = useProductsStore();
            const totalPesoValue = useMemo(() => {
                return totalPesoValues(products.productData.products);
            }, [products.productData.products])

            return <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange } }) => {
                    return (
                        <NumericFormat
                            value={totalPesoValue}
                            onValueChange={({ value }) => onChangeInput(value, onChange)}
                            suffix=" kg"
                            customInput={Input}
                            allowNegative={false}
                            thousandSeparator="."
                            decimalSeparator=","
                            decimalScale={2}
                        />
                    );
                }}
            />
        }
    }

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => {
                return (
                    <NumericFormat
                        value={value}
                        onValueChange={({ value }) => onChangeInput(value, onChange)}
                        suffix=" kg"
                        customInput={Input}
                        allowNegative={false}
                        decimalSeparator=","
                        decimalScale={2}
                    />
                );
            }}
        />
    );
}
