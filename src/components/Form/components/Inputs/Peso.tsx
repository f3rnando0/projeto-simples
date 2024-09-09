import { Input } from "@/components/ui/input";
import { Controller, useFormContext, type Path } from "react-hook-form";
import { NumericFormat } from 'react-number-format';
import type { z } from "zod";

type PesoInputProps<T extends z.ZodType> = {
    name: Path<z.infer<T>>;
};

export default function PesoInput<T extends z.ZodType>({ name }: PesoInputProps<T>) {
    const { control, setValue } = useFormContext();

    const onChangeInput = (value: string, onChange: (value: number) => void) => {
        const newValue = value ? Number.parseFloat(value.replace("kg", "").trim()) : 0.00;
        onChange(newValue);
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        setValue(name, newValue as any);
    };

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
