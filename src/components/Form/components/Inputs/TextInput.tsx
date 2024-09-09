import { Input } from "@/components/ui/input";
import { Controller, useFormContext, type Path } from "react-hook-form";
import type { z } from "zod";

type TextInputProps<T extends z.ZodType> = {
    name: Path<z.infer<T>>;
};

export default function TextInput<T extends z.ZodType>({ name }: TextInputProps<T>) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => {
                return (
                    <Input
                        type="text"
                        value={value}
                        onChange={onChange}
                    />
                );
            }}
        />
    );
}
