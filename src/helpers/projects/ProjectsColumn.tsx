import ProjectRowActions from "@/components/ProjectRowActions";

import { ColumnDef } from "@tanstack/react-table";
import { Project } from "@/services/projects/ListProjectService";
import Image from "next/image";

export const ProjectsColumn: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="font-medium capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => (
      <div
        className="truncate max-w-[250px]"
        title={row.getValue("description")}
      >
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span className="uppercase text-sm px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "client.name",
    header: "Cliente",
    cell: ({ row }) => {
      const client = row.original.client;
      const imageUrl = client?.image;

      return (
        <div
          className="flex items-center gap-3 max-w-[200px] truncate"
          title={client?.name}
        >
          <div className="w-9 h-9 rounded-full overflow-hidden shadow-md ring-1 ring-gray-300 dark:ring-gray-600">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={`Imagen de ${client?.name}`}
                width={36}
                height={36}
                className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-500 dark:text-white">
                Sin imagen
              </div>
            )}
          </div>
          <span className="text-sm font-medium truncate">
            {client?.name || "Sin cliente"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Inicio",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("startDate")).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "deliveryDate",
    header: "Entrega",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("deliveryDate")).toLocaleDateString()}</div>
    ),
  },
  {
    id: "Opciones",
    enableHiding: false,
    cell: ({ row }) => <ProjectRowActions row={row} />,
  },
];
