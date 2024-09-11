import { Input } from "@/components/ui/input";
import { Controller, useFormContext, type Path } from "react-hook-form";
import { NumericFormat } from 'react-number-format';
import type { z } from "zod";
import { watchActions } from "./types";
import { useProductsStore } from "../../store";
import { useMemo } from "react";
import { Product } from "../../types";

type UnidadeProps<T extends z.ZodType> = {
    name: Path<z.infer<T>>;
    watchValues?: Path<z.infer<T>>[];
    watchAction?: watchActions;
};

function totalVolume(products: Product[]) {
    return products.reduce((acumulador, produto) => {
        return acumulador + (produto.volume);
    }, 0)
}

export default function UnidadeInput<T extends z.ZodType>({ name, watchAction }: UnidadeProps<T>) {
    const { control, setValue } = useFormContext();

    const onChangeInput = (value: string, onChange: (value: number) => void) => {
        const newValue = value ? Number.parseFloat(value.replace("uni", "").trim()) : 0;
        onChange(newValue);
        // biome-ignore lint/suspicious/noExplicitAny: <meaningless>
        setValue(name, newValue as any);
    };

    switch (watchAction) {
        case watchActions.WholeVolumeValue: {
            const products = useProductsStore();
            const totalPesoValue = useMemo(() => {
                return totalVolume(products.productData.products);
            }, [products.productData.products])

            return <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange } }) => {
                    return (
                        <NumericFormat
                            value={totalPesoValue}
                            onValueChange={({ value }) => onChangeInput(value, onChange)}
                            suffix=" uni"
                            customInput={Input}
                            allowNegative={false}
                            thousandSeparator={false}
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
            render={({ field: { value, onChange } }) => (
                <NumericFormat
                    value={value}
                    onValueChange={({ value }) => onChangeInput(value, onChange)}
                    suffix=" uni"
                    customInput={Input}
                    allowNegative={false}
                    thousandSeparator={false}
                />
            )}
        />
    );
}
