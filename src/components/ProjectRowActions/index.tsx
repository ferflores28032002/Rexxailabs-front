import { useMemo, useState } from "react";
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

import { useListClients } from "@/hooks/clients/useListClients";
import { useDeleteProject } from "@/hooks/projects/useDeleteProject";
import { useEditProject } from "@/hooks/projects/useEditProject";
import { ApiError } from "@/services/auth/LoginService";
import ProjectFormDialog from "../ProjectFormDialog";
import { ProjectFormInputs } from "../ProjectFormDialog/components/ProjectFormFields";
import ProjectDetailModal from "./components/ProjectDetailModal";
import { formatDate } from "@/helpers/shared/formatDate";

const ClientRowActions = ({ row }: any) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const deleteProject = useDeleteProject();
  const updateProject = useEditProject();
  const clients = useListClients();

  const handleEditSubmit = (formData: ProjectFormInputs) => {
    const payload = {
      ...formData,
      id: row.original.id,
    };

    updateProject.mutate(
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
        deleteProject.mutate(row.original.id);
        Swal.fire({
          title: "¡Eliminado!",
          text: "Tu Projecto ha sido eliminado.",
          icon: "success",
          confirmButtonColor: "#2563EB",
        });
      }
    });
  };

  const clientOptions = useMemo(() => {
    return (
      clients.data?.map((client) => ({
        id: client.id,
        name: client.name,
      })) || []
    );
  }, [clients.data]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">
              Opciones del Proyecto {row.original.title}
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

      <ProjectFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleEditSubmit}
        errorMessage={errorMessage}
        initialValues={{
          clientId: row.original.clientId,
          description: row.original.description,
          deliveryDate: formatDate(row.original.deliveryDate),
          name: row.original.name,
          status: row.original.status,
          startDate: formatDate(row.original.startDate),
        }}
        isLoading={updateProject.isPending}
        isEditing={true}
        clientsOptions={clientOptions}
      />
      <ProjectDetailModal
        project={row.original}
        isOpen={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />
    </>
  );
};

export default ClientRowActions;
