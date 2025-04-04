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

import { Project } from "@/services/projects/ListProjectService";
import { CalendarIcon, UserIcon, MailIcon } from "lucide-react";

type ProjectDetailModalProps = {
  project: Project;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const ProjectDetailModal = ({ project, isOpen, onOpenChange }: ProjectDetailModalProps) => {
  if (!project) return null;

  const formatDate = (date: string) =>
    format(new Date(date), "PPP", { locale: es });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[500px] "
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
      >
        <DialogHeader>
          <DialogTitle id="project-detail-title" className="text-2xl font-semibold">
            {project.name}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500 dark:text-white">Descripción</h4>
            <p className="text-sm text-gray-700 dark:text-white">
              {project.description || "Sin descripción"}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500 dark:text-white">Estado</h4>
            <p className="text-sm uppercase text-gray-700 dark:text-white">
              {project.status}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500 dark:text-white">Cliente</h4>
            <div className="flex items-center space-x-2">
              <UserIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-white">
                {project.client?.name || "N/A"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MailIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-white">
                {project.client?.email || "N/A"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500 dark:text-white">Fechas</h4>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-white">
                Inicio: {formatDate(project.startDate)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-white">
                Entrega: {formatDate(project.deliveryDate)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-white">
                Creado: {formatDate(project.createdAt)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-white">
                Actualizado: {formatDate(project.updatedAt)}
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

export default ProjectDetailModal;
