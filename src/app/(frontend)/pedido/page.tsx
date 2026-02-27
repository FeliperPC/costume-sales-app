"use client";

import { useState } from "react";
import { Ruler } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PRODUCT_ORDER } from "@/sanity/types";
import Image from "next/image";
import { FormField } from "@/components/order/FormField";

export default function OrderForm({
  productOrder,
}: {
  productOrder?: PRODUCT_ORDER;
}) {
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  let step = 0;

  const nextStep = () => {
    step += 1;
    return step;
  };

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
      preview: URL.createObjectURL(file), // agora é File (extends Blob)
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
        <span className="w-6 h-6 text-white bg-purple-600 rounded text-xs font-bold flex items-center justify-center">
          {index}
        </span>
        <span className="text-xl font-bold text-white">{title}</span>
      </CardTitle>
    </CardHeader>
  );

  return (
    <div className="pt-24 pb-20 bg-zinc-950 text-white min-h-screen space-y-10">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto rotate-3 shadow-lg shadow-purple-900/30">
          <Ruler size={30} />
        </div>

        <h1 className="text-4xl font-black tracking-tight">
          FORMULÁRIO DE MEDIDAS
        </h1>

        <p className="text-zinc-400 mx-auto text-sm md:text-base">
          Precisamos dessas informações para que seu traje tenha o caimento
          perfeito. Utilize uma fita métrica maleável.
        </p>
      </div>
      {productOrder && (
        <div className="max-w-4xl mx-auto px-4 space-y-10">
          <Card className="bg-zinc-900 border-zinc-800">
            {CardHeaderContent(nextStep(), "Revisão do produto")}
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                {/* IMAGEM */}
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700">
                  <Image
                    src={productOrder.img}
                    alt={productOrder.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* INFO */}
                <div className="text-center md:text-left space-y-2">
                  <h3 className="text-2xl font-bold text-white">
                    {productOrder.name}
                  </h3>

                  <p className="text-sm text-purple-400 font-semibold">
                    Versão: {productOrder.version}
                  </p>

                  <p className="text-sm text-zinc-400">
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
        <form className="space-y-8">
          {/* 1 - Informações */}
          <Card className="bg-zinc-900 border-zinc-800">
            {CardHeaderContent(nextStep(), "Informações Pessoais")}

            <CardContent className="grid md:grid-cols-2 gap-6">
              <FormField
                name="name"
                placeholder="Seu nome"
                required
                id="name"
                error={[]}
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
                error={[]}
                label="Email"
                onChange={handleChange}
              />

              <FormField
                name="cellphone"
                type="tel"
                placeholder="(99) 99999-9999"
                required
                id="cellphone"
                error={[]}
                label="Telefone (WhatsApp)"
                onChange={handleChange}
              />

              <FormField
                select
                id="sexo"
                label="Sexo"
                name="gender"
                onChange={() => {}}
              />
            </CardContent>
          </Card>

          {/* 2 - Medidas */}
          <Card className="bg-zinc-900 border-zinc-800">
            {CardHeaderContent(nextStep(), "Medidas Corporais (cm)")}

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
              ].map((field) => (
                <FormField
                  error={[]}
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
          <Card className="bg-zinc-900 border-zinc-800">
            {CardHeaderContent(nextStep(), "Endereço para Entrega")}

            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  name="street"
                  id="street"
                  label="Rua"
                  placeholder="Nome da rua"
                  required
                  error={[]}
                  onChange={handleChange}
                  stretch={true}
                  type="text"
                />

                <FormField
                  name="number"
                  id="number"
                  label="Número"
                  placeholder="123"
                  required
                  error={[]}
                  onChange={handleChange}
                  type="number"
                />

                <FormField
                  name="complement"
                  id="complement"
                  label="Complemento"
                  placeholder="Apartamento, bloco..."
                  error={[]}
                  onChange={handleChange}
                  type="text"
                  required={false}
                />

                <FormField
                  name="district"
                  id="district"
                  label="Bairro"
                  placeholder="Seu bairro"
                  required
                  error={[]}
                  onChange={handleChange}
                  type="text"
                />

                <FormField
                  name="city"
                  id="city"
                  label="Cidade"
                  placeholder="Sua cidade"
                  required
                  error={[]}
                  onChange={handleChange}
                  type="text"
                />

                <FormField
                  name="state"
                  id="state"
                  label="Estado (UF)"
                  placeholder="Ex: MG"
                  required
                  type="text"
                  error={[]}
                  onChange={handleChange}
                />

                <FormField
                  name="zipCode"
                  id="zipCode"
                  label="CEP"
                  placeholder="00000-000"
                  required
                  error={[]}
                  type="number"
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* 3 - Projeto */}
          <Card className="bg-zinc-900 border-zinc-800">
            {CardHeaderContent(nextStep(), "Observações do Projeto")}

            <CardContent className="space-y-6">
              <FormField
                name="deadline"
                id="deadline"
                label="Data desejada (Prazo)"
                type="date"
                error={[]}
                onChange={handleChange}
                required={false}
              />
              <FormField
                name="notes"
                id="notes"
                label="Notas adicionais"
                placeholder="Descreva modificações ou detalhes específicos..."
                error={[]}
                onChange={handleChange}
                textarea
                required={false}
                type="text"
              />
              {!productOrder && (
                <div className="space-y-3">
                  <Label className="text-xs font-bold text-gray-500 uppercase">
                    Fotos de referência (máx. 5)
                  </Label>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {/* Imagens selecionadas */}
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="rounded-lg relative w-full aspect-square bg-zinc-800 border border-zinc-700 overflow-hidden"
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
                          className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    {/* Botão + */}
                    {images.length < 5 && (
                      <label className="flex items-center justify-center w-full aspect-square bg-zinc-800 border border-dashed border-zinc-700 cursor-pointer hover:border-purple-500 rounded-lg">
                        <span className="text-3xl text-zinc-400">+</span>

                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  <p className="text-xs text-zinc-500">
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
              className="flex-1 bg-primary text-white border-zinc-700 p-6 rounded-lg font-bold"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              className="flex-2 bg-purple-600 p-6 rounded-lg font-black text-lg hover:bg-purple-800"
            >
              ENVIAR SOLICITAÇÃO
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
