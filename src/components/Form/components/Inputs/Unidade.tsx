import { Input } from "@/components/ui/input";
import { Controller, useFormContext, type Path } from "react-hook-form";
import { NumericFormat } from 'react-number-format';
import type { z } from "zod";

type UnidadeProps<T extends z.ZodType> = {
    name: Path<z.infer<T>>;
};

export default function UnidadeInput<T extends z.ZodType>({ name }: UnidadeProps<T>) {
    const { control, setValue } = useFormContext();

    const onChangeInput = (value: string, onChange: (value: number) => void) => {
        const newValue = value ? Number.parseFloat(value.replace("uni", "").trim()) : 0;
        onChange(newValue);
        // biome-ignore lint/suspicious/noExplicitAny: <meaningless>
        setValue(name, newValue as any);
    };

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
