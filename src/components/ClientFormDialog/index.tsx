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
  ClientFormFields,
  ClientFormInputs,
} from "./components/ClientFormFields";

interface ClientFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: SubmitHandler<ClientFormInputs>;
  initialValues?: Partial<ClientFormInputs>;
  isEditing?: boolean;
  errorMessage?: string | null;
  isLoading?: boolean;
}

const ClientFormDialog: React.FC<ClientFormDialogProps> = (props) => {
  const {
    isOpen,
    onOpenChange,
    onSubmit,
    initialValues,
    isEditing = false,
    errorMessage,
    isLoading = false,
  } = props;
  const methods = useForm<ClientFormInputs>();

  useEffect(() => {
    if (initialValues) {
      methods.reset(initialValues);
    } else if (!isOpen) {
      methods.reset();
    }
  }, [initialValues, methods, isOpen]);

  const handleFormSubmit: SubmitHandler<ClientFormInputs> = (data) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] sm:max-h-[90vh] overflow-y-auto w-full rounded-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Cliente" : "Agregar Nuevo Cliente"} <br />
            {errorMessage && (
              <span className="mt-2 text-sm text-red-500 font-medium">
                {errorMessage}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
            <ClientFormFields initialValues={initialValues} />
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
                {isEditing ? "Actualizar Cliente" : "Agregar Cliente"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ClientFormDialog;
