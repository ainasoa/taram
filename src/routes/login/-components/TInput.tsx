import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Control, Controller, FieldValues } from "react-hook-form";

type Props = {
  control: Control<any, any, FieldValues>;
  name: string;
  label: string;
};
export default function TInput({ control, name, label }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="grid gap-2">
          <Label htmlFor={name}>{label}</Label>
          <Input
            id={name}
            type={name}
            
            value={field.value}
            onChange={field.onChange}
            placeholder={label}
          />
          {fieldState.error && (
            <div className="text-xs text-red-500">
              {fieldState.error?.message}
            </div>
          )}
        </div>
      )}
    />
  );
}
