import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageLabel from "../ImageLabel";
import ImagePreview from "../ImagePreview";
import { cn } from "@/lib/utils";

export type ClientFormInputs = {
  name: string;
  email: string;
  phone: string;
  image: File | null;
};

interface ClientFormFieldsProps {
  initialValues?: Partial<ClientFormInputs>;
}

export const ClientFormFields: React.FC<ClientFormFieldsProps> = ({
  initialValues = {},
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ClientFormInputs>();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialValues.image) {
      if (typeof initialValues.image === "string") {
        setImagePreview(initialValues.image);
      } else {
        setImagePreview(URL.createObjectURL(initialValues.image));
      }
    }
  }, [initialValues.image]);

  useEffect(() => {
    Object.entries(initialValues).forEach(([key, value]) => {
      if (value !== undefined) {
        setValue(key as keyof ClientFormInputs, value);
      }
    });
  }, [initialValues, setValue]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      setImagePreview(null);
      setValue("image", null, { shouldValidate: true });
      return;
    }

    const file = files[0];
    const validTypes = ["image/png", "image/jpeg"];

    if (!validTypes.includes(file.type)) {
      alert("Solo se permiten archivos PNG o JPG.");
      return;
    }

    setValue("image", file, { shouldValidate: true });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="mb-6">
        <Label htmlFor="name">Nombre</Label>
        <Input
          {...register("name", { required: "El nombre es requerido" })}
          type="text"
          defaultValue={initialValues.name || ""}
          className={cn({ "focus-visible:ring-red-500": !!errors.name })}
          placeholder="Nombre del cliente"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-6">
        <Label htmlFor="email">Correo</Label>
        <Input
          {...register("email", {
            required: "El correo es requerido",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Correo inválido",
            },
          })}
          type="email"
          defaultValue={initialValues.email || ""}
          className={cn({ "focus-visible:ring-red-500": !!errors.email })}
          placeholder="Correo electrónico"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-6">
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          {...register("phone", {
            required: "El teléfono es requerido",
            pattern: {
              value: /^[0-9]+$/,
              message: "Solo números",
            },
          })}
          type="tel"
          defaultValue={initialValues.phone || ""}
          className={cn({ "focus-visible:ring-red-500": !!errors.phone })}
          placeholder="Número de teléfono"
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div className="mb-6">
        <ImageLabel htmlFor="image" />
        <ImagePreview handleClick={handleClick} imagePreview={imagePreview} />
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </div>
    </>
  );
};
