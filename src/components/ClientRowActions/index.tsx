import { useState } from "react";
import Swal from "sweetalert2";

import { Button } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { useDeleteClient } from "@/hooks/clients/useDeleteClient";
import { useEditClient } from "@/hooks/clients/useEditClient";
import { ApiError } from "@/services/auth/LoginService";
import ClientFormDialog from "../ClientFormDialog";
import { ClientFormInputs } from "../ClientFormDialog/components/ClientFormFields";
import ClientDetailModal from "./components/ClientDetailModal";

const ClientRowActions = ({ row }: any) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const deleteClient = useDeleteClient();
  const updateClient = useEditClient();

  const handleEditSubmit = (formData: ClientFormInputs) => {
    const payload = {
      ...formData,
      id: row.original.id,
    };

    updateClient.mutate(
      { id: row.original.id, payload },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          setErrorMessage(null);
        },
        onError: (error: ApiError) => {
          console.log(error);
          setErrorMessage(error.response.data.message);
        },
      }
    );
  };

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, ¡elimínalo!",
      cancelButtonText: "No, ¡cancelar!",
      confirmButtonColor: "red",
      cancelButtonColor: "#2563EB",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteClient.mutate(row.original.id);
        Swal.fire({
          title: "¡Eliminado!",
          text: "Tu Cliente ha sido eliminado.",
          icon: "success",
          confirmButtonColor: "#2563EB",
        });
      }
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">
              Opciones del Cliente {row.original.title}
            </span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Opciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>Eliminar</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDetailModalOpen(true)}>
            Ver Detalle
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ClientFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleEditSubmit}
        errorMessage={errorMessage}
        initialValues={{
          email: row.original.email,
          name: row.original.name,
          phone: row.original.phone,
          image: row.original.image,
        }}
        isLoading={updateClient.isPending}
        isEditing={true}
      />
      <ClientDetailModal
        client={row.original}
        isOpen={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />
    </>
  );
};

export default ClientRowActions;
