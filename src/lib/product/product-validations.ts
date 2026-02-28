import { z } from "zod";

export const orderSchema = z.object({
  // ========================
  // ORDER
  // ========================
  productName: z.string().optional(),
  productVersion: z.string().optional(),

  // ========================
  // CUSTOMER
  // ========================
  name: z.string().min(1, "Nome é obrigatório"),

  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),

  cellphone: z.string().min(1, "Contato é obrigatório"),

  gender: z
    .string()
    .min(1, "Gênero é obrigatório")
    .refine(
      (val) => ["masculino", "feminino", "outro"].includes(val),
      "Gênero inválido",
    ),

  // ========================
  // BODY INFO
  // ========================
  height: z.coerce
    .number({ message: "Altura deve ser um número válido" })
    .min(1, { message: "Altura é obrigatória" }),

  weight: z.coerce
    .number({ message: "Peso deve ser um número válido" })
    .min(1, { message: "Peso é obrigatório" }),

  shoeSize: z.coerce
    .number({ message: "Tamanho do calçado deve ser um número válido" })
    .min(1, { message: "Tamanho do calçado é obrigatório" }),
  // ========================
  // MEASUREMENTS
  // ========================
  chest: z.coerce.number().min(1, "Tórax é obrigatório"),
  waist: z.coerce.number().min(1, "Cintura é obrigatória"),
  hip: z.coerce.number().min(1, "Quadril é obrigatório"),
  thigh: z.coerce.number().min(1, "Coxa é obrigatória"),
  knee: z.coerce.number().min(1, "Joelho é obrigatório"),
  calf: z.coerce.number().min(1, "Panturrilha é obrigatória"),
  biceps: z.coerce.number().min(1, "Bíceps é obrigatório"),
  forearm: z.coerce.number().min(1, "Antebraço é obrigatório"),
  wrist: z.coerce.number().min(1, "Pulso é obrigatório"),

  // ========================
  // ADDRESS
  // ========================
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().min(1, "Complemento é obrigatório"),
  district: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  zipCode: z.string().min(1, "CEP é obrigatório"),

  // ========================
  // ORDER DETAILS
  // ========================
  deadline: z.string().optional(), // date vem como string do form
  notes: z.string().optional(),

  referenceImage_1: z
    .instanceof(File)
    .refine((file) => file.size <= 5_000_000, "Máx 5MB")
    .refine((file) => file.type.startsWith("image/"), "Apenas imagens")
    .optional(),

  referenceImage_2: z
    .instanceof(File)
    .refine((file) => file.size <= 5_000_000, "Máx 5MB")
    .refine((file) => file.type.startsWith("image/"), "Apenas imagens")
    .optional(),

  referenceImage_3: z
    .instanceof(File)
    .refine((file) => file.size <= 5_000_000, "Máx 5MB")
    .refine((file) => file.type.startsWith("image/"), "Apenas imagens")
    .optional(),

  referenceImage_4: z
    .instanceof(File)
    .refine((file) => file.size <= 5_000_000, "Máx 5MB")
    .refine((file) => file.type.startsWith("image/"), "Apenas imagens")
    .optional(),

  referenceImage_5: z
    .instanceof(File)
    .refine((file) => file.size <= 5_000_000, "Máx 5MB")
    .refine((file) => file.type.startsWith("image/"), "Apenas imagens")
    .optional(),
});
