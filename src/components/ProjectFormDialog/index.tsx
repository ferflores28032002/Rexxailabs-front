import React, { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  ProjectFormFields,
  ProjectFormInputs,
} from "./components/ProjectFormFields";

interface ProjectFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: SubmitHandler<ProjectFormInputs>;
  initialValues?: Partial<ProjectFormInputs>;
  isEditing?: boolean;
  errorMessage?: string | null;
  isLoading?: boolean;
  clientsOptions: { id: number; name: string }[];
}

const ProjectFormDialog: React.FC<ProjectFormDialogProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  initialValues,
  isEditing = false,
  errorMessage,
  isLoading = false,
  clientsOptions,
}) => {
  const methods = useForm<ProjectFormInputs>();

  useEffect(() => {
    if (initialValues) {
      methods.reset(initialValues);
    } else if (!isOpen) {
      methods.reset();
    }
  }, [initialValues, methods, isOpen]);

  const handleFormSubmit: SubmitHandler<ProjectFormInputs> = (data) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] sm:max-h-[90vh] overflow-y-auto w-full rounded-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Proyecto" : "Agregar Nuevo Proyecto"}
            {errorMessage && (
              <div className="mt-2 text-sm text-red-500 font-medium">
                {errorMessage}
              </div>
            )}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
            <ProjectFormFields
              initialValues={initialValues}
              clientsOptions={clientsOptions}
            />
            <DialogFooter>
              <Button
                variant="destructive"
                type="button"
                className="sm:mt-0 mt-2"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" isLoading={isLoading}>
                {isEditing ? "Actualizar Proyecto" : "Agregar Proyecto"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
