"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Button,
  DataTable,
  FeatureMessage,
  Loading,
  MaxWidthWrapper,
} from "@/components/";

import { useRedirectIfUnauthenticated } from "../../hooks/shared/useRedirectIfUnauthenticated";
import { useCreateProject } from "@/hooks/projects/useCreateProject";
import { useListProjects } from "@/hooks/projects/useListProjects";
import { useListClients } from "@/hooks/clients/useListClients";

import ProjectFormDialog from "@/components/ProjectFormDialog";
import { ProjectFormInputs } from "@/components/ProjectFormDialog/components/ProjectFormFields";
import { ProjectsColumn } from "@/helpers/projects/ProjectsColumn";
import { ApiError } from "@/services/auth/LoginService";

const Page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isCheckingAuth = useRedirectIfUnauthenticated();
  const router = useRouter();

  const { data, isLoading } = useListProjects();
  const { data: clientsData } = useListClients();
  const mutate = useCreateProject();

  const handleAddProjectSubmit = (formData: ProjectFormInputs) => {
    mutate.mutate(
      {
        clientId: formData.clientId!,
        name: formData.name!,
        description: formData.description!,
        startDate: formData.startDate!,
        deliveryDate: formData.deliveryDate!,
        status: formData.status!,
      },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          setErrorMessage(null);
        },
        onError: (error: ApiError) => {
          setErrorMessage(error.response.data.message);
        },
      }
    );
  };

  const clientOptions = useMemo(() => {
    return (
      clientsData?.map((client) => ({
        id: client.id,
        name: client.name,
      })) || []
    );
  }, [data]);

  if (isLoading || isCheckingAuth) {
    return <Loading />;
  }

  return (
    <div>
      <MaxWidthWrapper>
        <FeatureMessage
          subtitle="Gestiona tus Proyectos con Facilidad"
          description="Con nuestro sistema de gestión de proyectos, podrás organizar, monitorear y actualizar cada uno de tus proyectos de forma eficiente y centralizada."
          title="Control Total de tus Proyectos"
        />

        <div className="mb-4 flex gap-1 justify-center md:justify-end">
          <Button
            onClick={() => setIsDialogOpen(true)}
            variant="default"
            className="dark:text-white"
          >
            Agregar Proyecto
          </Button>
          <Button
            onClick={() => router.push("/clients")}
            variant="default"
            className="dark:text-white"
          >
            Clientes
          </Button>
        </div>

        <DataTable columns={ProjectsColumn} data={data ? data : []} />

        <ProjectFormDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleAddProjectSubmit}
          isEditing={false}
          isLoading={mutate.isPending}
          clientsOptions={clientOptions}
          errorMessage={errorMessage}
        />
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
