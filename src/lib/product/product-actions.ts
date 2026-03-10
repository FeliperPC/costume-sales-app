"use server";

import { FormState } from "@/sanity/types";
import { orderSchema } from "./product-validations";
import { writeClient } from "@/sanity/lib/client";
import { redirect } from "next/navigation";

export const orderProductAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const rawData = Object.fromEntries(formData.entries());
  let dataToValidate: Record<string, FormDataEntryValue | File[]> = rawData;
  if (!rawData.productName) {
    const {
      referenceImage_1,
      referenceImage_2,
      referenceImage_3,
      referenceImage_4,
      referenceImage_5,
      ...rest
    } = rawData;

    dataToValidate = {
      ...rest,
      referenceImages: [
        referenceImage_1,
        referenceImage_2,
        referenceImage_3,
        referenceImage_4,
        referenceImage_5,
      ].filter((file): file is File => file instanceof File && file.size > 0),
    };
  }

  const validated = orderSchema.safeParse(dataToValidate);

  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors;

    return {
      success: false,
      errors: errors,
      message: "Dados inválidos",
    };
  }

  try {
    if (!rawData.productName) {
      const uploadedImages = await Promise.all(
        validated.data.referenceImages?.map(async (file: File) => {
          const asset = await writeClient.assets.upload("image", file);
          return {
            _key: crypto.randomUUID(),
            _type: "image",
            asset: {
              _type: "reference",
              _ref: asset._id,
            },
          };
        }) ?? [],
      );
      const { _id } = await writeClient.create({
        _type: "order",
        ...validated.data,
        referenceImages: uploadedImages,
      });
      redirect(`/pedido/sucesso?orderId=${_id}`);
    }

    const { _id } = await writeClient.create({
      _type: "order",
      ...validated.data,
    });
    redirect(`/pedido/sucesso?orderId=${_id}`);
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    return {
      success: false,
      errors: { error: ["Erro ao enviar"] },
      message: "Falha ao fazer encomenda",
    };
  }
};
