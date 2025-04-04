"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Button,
  DataTable,
  FeatureMessage,
  Loading,
  MaxWidthWrapper,
} from "@/components/";

import { useRedirectIfUnauthenticated } from "../../hooks/shared/useRedirectIfUnauthenticated";
import { useListClients } from "@/hooks/clients/useListClients";
import { useCreateClient } from "@/hooks/clients/useCreateClient";

import { ApiError } from "@/services/auth/LoginService";
import ClientFormDialog from "@/components/ClientFormDialog";
import { ClientsColumn } from "@/helpers/Clients/ClientsColumn";
import { ClientFormInputs } from "@/components/ClientFormDialog/components/ClientFormFields";

const Page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isCheckingAuth = useRedirectIfUnauthenticated();
  const router = useRouter();

  const { data, isLoading } = useListClients();
  const mutate = useCreateClient();

  const handleAddClientSubmit = (formData: ClientFormInputs) => {
    mutate.mutate(formData, {
      onSuccess: () => {
        setIsDialogOpen(false);
        setErrorMessage(null);
      },
      onError: (error: ApiError) => {
        setErrorMessage(error.response.data.message);
      },
    });
  };

  if (isLoading || isCheckingAuth) {
    return <Loading />;
  }

  return (
    <div>
      <MaxWidthWrapper>
        <FeatureMessage
          subtitle="Organiza a Tu Manera"
          description="Con nuestro sistema de gestión de clientes, podrás almacenar y organizar la información de tus clientes de manera eficiente y personalizada."
          title="Almacena y Organiza tus Clientes"
        />
        <div className="mb-4 flex gap-1 justify-center md:justify-end">
          <Button
            onClick={() => setIsDialogOpen(true)}
            variant="default"
            className="dark:text-white"
          >
            Agregar Cliente
          </Button>
          <Button
            onClick={() => router.push("/projects")}
            variant="default"
            className="dark:text-white"
          >
            Proyectos
          </Button>
        </div>

        <DataTable columns={ClientsColumn} data={data ? data : []} />

        <ClientFormDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleAddClientSubmit}
          isEditing={false}
          isLoading={mutate.isPending}
          errorMessage={errorMessage}
        />
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
