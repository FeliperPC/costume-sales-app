"use client";

import { useState } from "react";
import { Ruler } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PRODUCT_ORDER } from "@/sanity/types";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrderForm({
  productOrder,
}: {
  productOrder?: PRODUCT_ORDER;
}) {
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);

  const removeImage = (index:number) => {
  setImages((prev) => prev.filter((_, i) => i !== index));
};

const handleImageChange = (e:any) => {
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
    <CardTitle className="flex items-center gap-3">
      <span className="w-6 h-6 text-white bg-purple-600 rounded text-xs font-bold flex items-center justify-center">
        {index}
      </span>
      <span className="text-xl font-bold text-white">{title}</span>
    </CardTitle>
  );

  const fieldsStyle =
    "w-full bg-zinc-800 border border-zinc-700 p-4 focus:outline-none focus:border-purple-500 text-white";

  const LabelContent = (title: string) => (
    <Label className="text-xs font-bold text-gray-500 uppercase">{title}</Label>
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
            <CardHeader>
              {CardHeaderContent(1, "Revisão do produto")}
            </CardHeader>

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
                    Você está solicitando este traje personalizado.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        {/* HEADER */}

        <form className="space-y-8">
          {/* 1 - Informações */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              {CardHeaderContent(2, "Informações Pessoais")}
            </CardHeader>

            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                {LabelContent("Nome Completo")}
                <Input
                  name="name"
                  placeholder="Seu nome"
                  required
                  className={fieldsStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                {LabelContent("Email")}
                <Input
                  type="email"
                  name="email"
                  placeholder="exemplo@email.com"
                  required
                  className={fieldsStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                {LabelContent("Telefone (What's app)")}
                <Input
                  type="number"
                  name="cellphone"
                  placeholder="(99) 99999-9999"
                  required
                  className={fieldsStyle}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                {LabelContent("Sexo")}
                <Select>
                  <SelectTrigger className={fieldsStyle}>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="light">Masculino</SelectItem>
                      <SelectItem value="dark">Feminino</SelectItem>
                      <SelectItem value="system">Outro</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* 2 - Medidas */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              {CardHeaderContent(3, "Medidas Corporais (cm)")}
            </CardHeader>

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
                <div key={field.id} className="space-y-2">
                  {LabelContent(field.label)}
                  <Input
                    type="number"
                    min="0"
                    name={field.id}
                    placeholder="00"
                    required
                    className={fieldsStyle}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 4 - Endereço */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              {CardHeaderContent(4, "Endereço para Entrega")}
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  {LabelContent("Rua")}
                  <Input
                    name="street"
                    placeholder="Nome da rua"
                    required
                    className={fieldsStyle}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  {LabelContent("Número")}
                  <Input
                    name="number"
                    placeholder="123"
                    required
                    className={fieldsStyle}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  {LabelContent("Complemento")}
                  <Input
                    name="complement"
                    placeholder="Apartamento, bloco..."
                    className={fieldsStyle}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  {LabelContent("Bairro")}
                  <Input
                    name="district"
                    placeholder="Seu bairro"
                    required
                    className={fieldsStyle}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  {LabelContent("Cidade")}
                  <Input
                    name="city"
                    placeholder="Sua cidade"
                    required
                    className={fieldsStyle}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  {LabelContent("Estado (UF)")}
                  <Input
                    name="state"
                    placeholder="Ex: MG"
                    required
                    maxLength={2}
                    className={fieldsStyle}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  {LabelContent("CEP")}
                  <Input
                    name="zipCode"
                    placeholder="00000-000"
                    required
                    className={fieldsStyle}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3 - Projeto */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              {CardHeaderContent(4, "Observações do Projeto")}
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                {LabelContent("Data desejada (Prazo)")}
                <Input
                  type="date"
                  name="deadline"
                  onChange={handleChange}
                  className={fieldsStyle}
                />
              </div>

              <div className="space-y-2">
                {LabelContent("Notas adicionais")}
                <Textarea
                  rows={4}
                  name="notes"
                  placeholder="Descreva modificações ou detalhes específicos..."
                  onChange={handleChange}
                  className={fieldsStyle}
                />
              </div>

              <div className="space-y-3">
      {LabelContent("Fotos de referência (máx. 5)")}

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {/* Imagens selecionadas */}
        {images.map((img, index) => (
          <div
            key={index}
            className="relative w-full aspect-square bg-zinc-800 border border-zinc-700 overflow-hidden"
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
          <label className="flex items-center justify-center w-full aspect-square bg-zinc-800 border border-dashed border-zinc-700 cursor-pointer hover:border-purple-500">
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
              className="flex-[2] bg-purple-600 p-6 rounded-lg font-black text-lg hover:bg-purple-800"
            >
              ENVIAR SOLICITAÇÃO
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
