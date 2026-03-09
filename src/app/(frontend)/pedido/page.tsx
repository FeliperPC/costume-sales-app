"use client";

import { useActionState, useEffect, useState } from "react";
import { Ruler } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormState, PRODUCT_ORDER } from "@/sanity/types";
import Image from "next/image";
import { FormField } from "@/components/order/FormField";
import { orderProductAction } from "@/lib/product/product-actions";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Before the server action run this is the inital state, that is the value of state in the hook declaration
const initialState: FormState = {
  success: false,
  errors: undefined,
  message: "",
};

export default function OrderForm({
  productOrder,
}: {
  productOrder?: PRODUCT_ORDER;
}) {
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [state, formAction, isPending] = useActionState(
    orderProductAction,
    initialState,
  );

  const stepArray: number[] = productOrder ? [1, 2, 3, 4, 5] : [0,1, 2, 3, 4];

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    const remainingSlots = 5 - images.length;
    const filesToAdd = files.slice(0, remainingSlots);

    const newImages = filesToAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const CardHeaderContent = (index: number, title: string) => (
    <CardHeader>
      <CardTitle className="flex items-center gap-3">
        <span className="w-6 h-6 text-primary-foreground bg-primary rounded text-xs font-bold flex items-center justify-center">
          {index}
        </span>
        <span className="text-xl font-bold text-foreground">{title}</span>
      </CardTitle>
    </CardHeader>
  );

  const { errors, success } = state;

  useEffect(() => {
    if (!state) return;

    if (!success && errors) {
      toast.custom(() => (
        <div
          className="
      md:w-96
      bg-card
      border border-primary/50
      shadow-lg
      shadow-primary/10
      text-foreground
      rounded-xl
      p-4
    "
        >
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-destructive" />

            <div className="flex-1">
              <p className="font-semibold text-sm">Erro ao enviar formulário</p>

              <p className="text-xs text-muted-foreground mt-1">{state.message}</p>
            </div>
          </div>
        </div>
      ));
    }
  }, [state, success, errors]);

  return (
    <div className="pt-24 pb-20 bg-background text-foreground min-h-screen space-y-10">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto rotate-3 shadow-lg shadow-primary/20">
          <Ruler size={30} />
        </div>

        <h1 className="text-4xl font-black tracking-tight">
          FORMULÁRIO DE MEDIDAS
        </h1>

        <p className="text-muted-foreground mx-auto text-sm md:text-base">
          Precisamos dessas informações para que seu traje tenha o caimento
          perfeito. Utilize uma fita métrica maleável.
        </p>
      </div>
      {productOrder && (
        <div className="max-w-4xl mx-auto px-4 space-y-10">
          <Card className="bg-card border-border">
            {CardHeaderContent(stepArray[0], "Revisão do produto")}
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                {/* IMAGEM */}
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden bg-muted border border-border">
                  <Image
                    src={productOrder.img}
                    alt={productOrder.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* INFO */}
                <div className="text-center md:text-left space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">
                    {productOrder.name}
                  </h3>

                  <p className="text-sm text-primary font-semibold">
                    Versão: {productOrder.version}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Seu projeto já está quase saindo do papel! Me envie suas
                    informações para começarmos a criar algo incrível para você.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        <form className="space-y-8" action={formAction}>
          {/* Hidden inputs to send value */}
          {productOrder && (
            <>
              <input
                onChange={() => {}}
                hidden
                type="text"
                value={productOrder.name}
                name="productName"
              />
              <input
                onChange={() => {}}
                hidden
                type="text"
                value={productOrder.version}
                name="productVersion"
              />
            </>
          )}
          {/* 1 - Informações */}
          <Card className="bg-card border-border">
            {CardHeaderContent(stepArray[1], "Informações Pessoais")}

            <CardContent className="grid md:grid-cols-2 gap-6">
              <FormField
                name="name"
                placeholder="Seu nome"
                required
                id="name"
                error={errors?.name ?? []}
                label="Nome Completo"
                onChange={() => {}}
                type="text"
              />

              <FormField
                name="email"
                type="email"
                placeholder="exemplo@email.com"
                required
                id="email"
                error={errors?.email ?? []}
                label="Email"
                onChange={handleChange}
              />

              <FormField
                name="cellphone"
                type="tel"
                placeholder="(99) 99999-9999"
                required
                id="cellphone"
                error={errors?.cellphone ?? []}
                label="Telefone (WhatsApp)"
                onChange={handleChange}
              />

              <FormField
                select
                id="sexo"
                label="Sexo"
                name="gender"
                onChange={() => {}}
                error={errors?.gender ?? []}
              />
            </CardContent>
          </Card>

          {/* 2 - Medidas */}
          <Card className="bg-card border-border">
            {CardHeaderContent(stepArray[2], "Medidas Corporais (cm)")}

            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                // 📐 Medidas Gerais
                { label: "Altura Total (cm)", id: "height" },
                { label: "Peso (kg)", id: "weight" },
                { label: "Número do Pé (BR)", id: "shoeSize" },

                // 📏 Circunferências
                { label: "Tórax (Circunferência)", id: "chest" },
                { label: "Cintura (Circunferência)", id: "waist" },
                { label: "Quadril (Circunferência)", id: "hip" },
                { label: "Coxa (Circunferência)", id: "thigh" },
                { label: "Joelho (Circunferência)", id: "knee" },
                { label: "Panturrilha (Circunferência)", id: "calf" },
                { label: "Bíceps (Circunferência)", id: "biceps" },
                { label: "Antebraço (Circunferência)", id: "forearm" },
                { label: "Pulso (Circunferência)", id: "wrist" },
                { label: "Pescoço (Circunferência)", id: "neck" },
                {
                  label: "Palma da Mão (Circunferência)",
                  id: "palm_circumference",
                },
                { label: "Comprimento da Mão", id: "hand_length" },
              ].map((field) => (
                <FormField
                  error={errors?.[field.id] ?? []}
                  key={field.id}
                  type="number"
                  name={field.id}
                  placeholder="00"
                  required
                  onChange={handleChange}
                  id={field.id}
                  label={field.label}
                />
              ))}
            </CardContent>
          </Card>

          {/* 4 - Endereço */}
          <Card className="bg-card border-border">
            {CardHeaderContent(stepArray[3], "Endereço para Entrega")}

            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  name="street"
                  id="street"
                  label="Rua"
                  placeholder="Nome da rua"
                  error={errors?.street ?? []}
                  required
                  onChange={handleChange}
                  stretch={true}
                  type="text"
                />

                <FormField
                  name="number"
                  id="number"
                  label="Número"
                  placeholder="123"
                  error={errors?.number ?? []}
                  required
                  onChange={handleChange}
                  type="number"
                />

                <FormField
                  name="complement"
                  id="complement"
                  label="Complemento"
                  placeholder="Apartamento, bloco..."
                  error={errors?.complement ?? []}
                  onChange={handleChange}
                  type="text"
                  required={false}
                />

                <FormField
                  name="district"
                  id="district"
                  label="Bairro"
                  placeholder="Seu bairro"
                  error={errors?.district ?? []}
                  required
                  onChange={handleChange}
                  type="text"
                />

                <FormField
                  name="city"
                  id="city"
                  label="Cidade"
                  placeholder="Sua cidade"
                  error={errors?.city ?? []}
                  required
                  onChange={handleChange}
                  type="text"
                />

                <FormField
                  name="state"
                  id="state"
                  label="Estado (UF)"
                  placeholder="Ex: MG"
                  type="text"
                  error={errors?.state ?? []}
                  required
                  onChange={handleChange}
                />

                <FormField
                  name="zipCode"
                  id="zipCode"
                  label="CEP"
                  placeholder="00000-000"
                  error={errors?.zipCode ?? []}
                  required
                  type="number"
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* 3 - Projeto */}
          <Card className="bg-card border-border">
            {CardHeaderContent(stepArray[4], "Observações do Projeto")}

            <CardContent className="space-y-6">
              <FormField
                name="deadline"
                id="deadline"
                label="Data desejada (Prazo)"
                type="date"
                error={errors?.deadline}
                onChange={handleChange}
                required={false}
              />
              <FormField
                name="notes"
                id="notes"
                label="Notas adicionais"
                placeholder="Descreva modificações ou detalhes específicos..."
                error={errors?.notes}
                onChange={handleChange}
                textarea
                required={false}
                type="text"
              />
              {!productOrder && (
                <div className="space-y-3">
                  <Label className="text-xs font-bold text-muted-foreground uppercase">
                    Fotos de referência (máx. 5)
                  </Label>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {/* Imagens selecionadas */}
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="rounded-lg relative w-full aspect-square bg-muted border border-border overflow-hidden"
                      >
                        <img
                          src={img.preview}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />

                        {/* Botão remover */}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-background/70 text-foreground text-xs px-2 py-1 rounded hover:bg-destructive"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    {/* Botão + */}
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className={cn(
                          images.length != index ? "hidden" : "block",
                        )}
                      >
                        <label className="flex items-center justify-center w-full aspect-square bg-muted border border-dashed border-border cursor-pointer hover:border-primary rounded-lg">
                          <span className="text-3xl text-muted-foreground">+</span>

                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            name={"referenceImage_" + (index + 1)}
                          />
                        </label>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Você pode anexar até 5 imagens.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ACTIONS */}
          <div className="flex flex-col md:flex-row gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-foreground/10 text-primary-foreground border-border p-6 rounded-lg font-bold"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              className="flex-2 bg-primary p-6 rounded-lg font-black text-lg hover:bg-primary/90"
            >
              {isPending ? "ENCOMENDANDO ..." : "ENVIAR SOLICITAÇÃO"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
