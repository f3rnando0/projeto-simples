import { Input } from "@/components/ui/input";
import { useMemo } from "react";
import { useFormContext, Controller, type Path, useWatch } from "react-hook-form";
import { NumericFormat } from 'react-number-format';
import type { z } from "zod";
import { watchActions } from "./types";

function RefTotalValue(numbers: number[]) {
    if (numbers.length === 0) return 0;
    return numbers.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
}

type DinheiroInputProps<T extends z.ZodType> = {
    name: Path<z.infer<T>>;
    watchValues?: Path<z.infer<T>>[];
    watchAction?: watchActions;
};

export default function DinheiroInput<T extends z.ZodType>({ name, watchValues, watchAction }: DinheiroInputProps<T>) {
    const { control, setValue } = useFormContext();

    const onChangeInput = (value: string, onChange: (value: number) => void) => {
        const newValue = value ? Number.parseFloat(value.replace(/[^\d,.-]/g, "").replace(",", ".")) : 0;
        onChange(newValue);
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        setValue(name, newValue as any);
    };

    const watchedValues = watchValues?.map(watch => useWatch({ name: watch, control })) || [];

    if (watchAction && watchValues) {
        switch (watchAction) {
            case watchActions.AMOUNTxUNIT: {
                const currentVal = useMemo(() => {
                    const numbers = watchedValues.map(value => Number(value) || 0);
                    return RefTotalValue(numbers);
                }, [watchedValues]);
                return <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => (
                        <NumericFormat
                            value={watchValues ? currentVal : value}
                            onValueChange={({ value }) => onChangeInput(value, onChange)}
                            prefix="R$ "
                            customInput={Input}
                            allowNegative={false}
                            thousandSeparator="."
                            decimalSeparator=","
                            decimalScale={2}
                        />
                    )}
                />
            }
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
                    prefix="R$ "
                    customInput={Input}
                    allowNegative={false}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                />
            )}
        />
    );
}
