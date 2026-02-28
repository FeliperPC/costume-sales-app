"use server";

import { FormState } from "@/sanity/types";
import { orderSchema } from "./product-validations";
import { writeClient } from "@/sanity/lib/client";

export const orderProductAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
   return {
    success: true,
    message: "Encomenda criada com sucesso! Entraremos em contato em breve.",
  };
  // const rawData = Object.fromEntries(formData.entries());
  // let dataToValidate = rawData;
  // if (!rawData.productName) {
  //   const {
  //     referenceImage_1,
  //     referenceImage_2,
  //     referenceImage_3,
  //     referenceImage_4,
  //     referenceImage_5,
  //     ...rest
  //   } = rawData as any;

  //   dataToValidate = {
  //     ...rest,
  //     referenceImages: [
  //       referenceImage_1,
  //       referenceImage_2,
  //       referenceImage_3,
  //       referenceImage_4,
  //       referenceImage_5,
  //     ].filter((file: File) => file?.size > 0),
  //   };
  // }

  // const validated = orderSchema.safeParse(dataToValidate);

  // if (!validated.success) {
  //   const errors = validated.error.flatten().fieldErrors;

  //   return {
  //     success: false,
  //     errors,
  //     message: "Dados do formulário inválido",
  //   };
  // }

  // try {
  //   if (!rawData.productName) {
  //     const uploadedImages = await Promise.all(
  //       validated.data.referenceImages?.map(async (file: File) => {
  //         const asset = await writeClient.assets.upload("image", file);
  //         return {
  //           _key: crypto.randomUUID(),
  //           _type: "image",
  //           asset: {
  //             _type: "reference",
  //             _ref: asset._id,
  //           },
  //         };
  //       }) ?? [],
  //     );
  //     await writeClient.create({
  //       _type: "order",
  //       ...validated.data,
  //       referenceImages: uploadedImages,
  //     });
  //   }

  //   await writeClient.create({
  //     _type: "order",
  //     ...validated.data,
  //   });
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
  //   message: "Encomenda criada com sucesso! Entraremos em contato em breve.",
  // };
};
