"use server";

import { FormState } from "@/sanity/types";
import { orderSchema } from "./product-validations";
import { writeClient } from "@/sanity/lib/client";

export const orderProductAction = async (
  revState: FormState,
  formData: FormData,
): Promise<FormState> => {
  console.log('formData: '+formData);
  
  const rawData = Object.fromEntries(formData.entries()) as Record<string, unknown>;
  console.log('rawDtat: '+rawData);

  const validatedData = orderSchema.safeParse(rawData);

  // console.log(validatedData);
  
  if (!validatedData.success) {
    // this returns an object of arrays, the keys are the fields and the values are the errors messages ex : [{name:['name is required']}]
    const errors = validatedData.error.flatten().fieldErrors;
    return {
      success: false,
      errors: errors,
      message: "Dados do formulário inválido",
    };
  }
  return {
  success: true,
  message: "Encomenda criada com sucesso ! Entraremos em contato em breve.",
  };
  // try {
  //   const parsed = orderSchema.parse(validatedData.data);
  //   const sanityResponse = await writeClient.create({
  //     _type: "order",
  //     ...parsed,
  //   });
  //   // console.log(sanityResponse);
  // } catch (error) {
  //   console.log(error);
  //   return {
  //     success: false,
  //     errors: { error: ["Erro ao enviar"] },
  //     message: "Falha ao fazer encomenda",
  //   };
  // }
  // return {
  //   success: true,
  //   message: "Encomenda criada com sucesso ! Entraremos em contato em breve.",
  // };
};
