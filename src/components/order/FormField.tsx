import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FormFieldProps {
  label: string;
  name: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  error?: string[];
  textarea?: boolean;
  select?: boolean;
  type?: React.HTMLInputTypeAttribute;
  stretch?: boolean;
}

export const FormField = ({
  label,
  name,
  id,
  placeholder,
  required = false,
  onChange,
  error = [],
  textarea = false,
  select = false,
  type = "text",
  stretch = false,
}: FormFieldProps) => {
  const fieldsStyle =
    "w-full bg-muted border border-border p-4 focus:outline-none focus:border-ring text-foreground";

  return (
    <div className={cn("space-y-2", stretch && "md:col-span-2")}>
      <Label
        className="text-xs font-bold text-muted-foreground uppercase"
        htmlFor={id}
      >
        {label}
      </Label>

      {textarea ? (
        <Textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void
          }
          className={fieldsStyle}
        />
      ) : select ? (
        <Select
          name={name}
          onValueChange={(value) =>
            onChange({
              target: { name, value },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        >
          <SelectTrigger className={fieldsStyle}>
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="masculino">Masculino</SelectItem>
              <SelectItem value="feminino">Feminino</SelectItem>
              <SelectItem value="outro">Outro</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <Input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLInputElement>) => void
          }
          className={fieldsStyle}
        />
      )}

      {error.length > 0 && (
        <p className="text-sm text-destructive">{error.join(", ")}</p>
      )}
    </div>
  );
};
