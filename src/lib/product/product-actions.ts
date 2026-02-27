"use server";

import { FormState } from "@/sanity/types";

export const orderProductAction = async (
  revState: FormState,
  formData: FormData,
): Promise<FormState> => {
  console.log(formData);
  
 return {
      success: false,
      errors: { error: ["Error on submit"] },
      message: "Failed to submit product",
    };
};
