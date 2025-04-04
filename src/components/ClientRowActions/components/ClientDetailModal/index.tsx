import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Client } from "@/services/clients/ListClientService";
import { CalendarIcon, MailIcon, PhoneIcon, UserIcon } from "lucide-react";

type ClientDetailModalProps = {
  client: Client;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const ClientDetailModal = (props: ClientDetailModalProps) => {
  const { client, isOpen, onOpenChange } = props;
  if (!client) return null;

  const formatDate = (date: string) =>
    format(new Date(date), "PPP", { locale: es });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] sm:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {client.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          <div className="w-32 h-32 flex items-center justify-center cursor-pointer">
            {client.image ? (
              <img
                src={client.image}
                alt="Imagen del cliente"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-sm text-gray-500 dark:text-white">
                  Sin imagen
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500 dark:text-white">
              Datos del Cliente
            </h4>
            <div className="flex items-center space-x-2">
              <MailIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-white">
                {client.email}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <PhoneIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-white">
                {client.phone}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500 dark:text-white">
              Creador
            </h4>
            <div className="flex items-center space-x-2">
              <UserIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-white">
                {client.user?.name || "N/A"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MailIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-white">
                {client.user?.email || "N/A"}
              </span>
            </div>
          </div>

          <div>
            {client.projects && client.projects.length > 0 ? (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-500 dark:text-white">
                  Proyectos
                </h4>
                {client.projects.map((project) => (
                  <div key={project.id} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700 dark:text-white">
                      {project.name} - {project.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-white">
                Sin proyectos asignados
              </p>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500 dark:text-white">
              Fechas
            </h4>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-gray-400 dark:text-white" />
              <span className="text-sm text-gray-700 dark:text-white">
                Creado: {formatDate(client.createdAt)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-gray-400 dark:text-white" />
              <span className="text-sm text-gray-700 dark:text-white">
                Actualizado: {formatDate(client.updatedAt)}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientDetailModal;
