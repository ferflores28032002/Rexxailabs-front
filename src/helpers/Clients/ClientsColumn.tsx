import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";


import ClientRowActions from "@/components/ClientRowActions";
import { Client } from "@/services/clients/ListClientService";

export const ClientsColumn: ColumnDef<Client>[] = [
  {
    accessorKey: "image",
    header: "Imagen",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image") as string;
      return (
        <div className="w-[40px] h-[40px] flex justify-center items-center overflow-hidden rounded-md">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Cliente"
              width={40}
              height={40}
              className="object-cover rounded-md w-full h-full"
            />
          ) : (
            <div className="w-[40px] h-[40px] flex justify-center items-center bg-gray-200 rounded-md">
              <span className="text-gray-500 text-xs">Sin Imagen</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Correo",
    cell: ({ row }) => (
      <div className="truncate max-w-[200px]" title={row.getValue("email")}>
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
    cell: ({ row }) => (
      <div className="truncate max-w-[120px]" title={row.getValue("phone")}>
        {row.getValue("phone")}
      </div>
    ),
  },
  {
    accessorKey: "user.name",
    header: "Creador",
    cell: ({ row }) => {
      const creatorName = row.original.user?.name || "N/A";
      return (
        <div className="truncate max-w-[150px]" title={creatorName}>
          {creatorName}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de Registro",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("createdAt")).toLocaleDateString()}</div>
    ),
  },
  {
    id: "Opciones",
    enableHiding: false,
    cell: ({ row }) => <ClientRowActions row={row} />,
  },
];
