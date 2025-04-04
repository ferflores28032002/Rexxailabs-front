import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ProjectPayload } from "@/services/projects/EditProjectService";

export type ProjectFormInputs = ProjectPayload;

interface ProjectFormFieldsProps {
  initialValues?: Partial<ProjectFormInputs>;
  clientsOptions: { id: number; name: string }[];
}

export const ProjectFormFields = ({
  initialValues = {},
  clientsOptions,
}: ProjectFormFieldsProps) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ProjectFormInputs>();

  useEffect(() => {
    Object.entries(initialValues).forEach(([key, value]) => {
      if (value !== undefined) {
        setValue(key as keyof ProjectFormInputs, value);
      }
    });
  }, [initialValues, setValue]);

  return (
    <>
      <div className="mb-6">
        <Label htmlFor="name">Nombre</Label>
        <Input
          {...register("name", { required: "El nombre es requerido" })}
          type="text"
          className={cn({ "focus-visible:ring-red-500": !!errors.name })}
          placeholder="Nombre del proyecto"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-6">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          {...register("description", {
            required: "La descripción es requerida",
          })}
          className={cn(
            "w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none",
            { "focus-visible:ring-red-500": !!errors.description }
          )}
          placeholder="Descripción del proyecto"
          rows={4}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="mb-6">
        <Label htmlFor="status">Estado</Label>
        <select
          {...register("status", { required: "El estado es requerido" })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="">Seleccionar estado</option>
          <option value="pending">Pendiente</option>
          <option value="in_progress">En progreso</option>
          <option value="completed">Completado</option>
        </select>
        {errors.status && (
          <p className="text-sm text-red-500">{errors.status.message}</p>
        )}
      </div>

      <div className="mb-6">
        <Label htmlFor="startDate">Fecha de inicio</Label>
        <Input
          {...register("startDate", {
            required: "La fecha de inicio es requerida",
          })}
          type="date"
          className={cn({ "focus-visible:ring-red-500": !!errors.startDate })}
        />
        {errors.startDate && (
          <p className="text-sm text-red-500">{errors.startDate.message}</p>
        )}
      </div>

      <div className="mb-6">
        <Label htmlFor="deliveryDate">Fecha de entrega</Label>
        <Input
          {...register("deliveryDate", {
            required: "La fecha de entrega es requerida",
          })}
          type="date"
          className={cn({
            "focus-visible:ring-red-500": !!errors.deliveryDate,
          })}
        />
        {errors.deliveryDate && (
          <p className="text-sm text-red-500">{errors.deliveryDate.message}</p>
        )}
      </div>

      <div className="mb-6">
        <Label htmlFor="clientId">Cliente</Label>
        <select
          {...register("clientId", { required: "El cliente es requerido" })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="">Seleccionar cliente</option>
          {clientsOptions.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        {errors.clientId && (
          <p className="text-sm text-red-500">{errors.clientId.message}</p>
        )}
      </div>
    </>
  );
};
