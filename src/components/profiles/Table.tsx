import { useMemo } from "react";
import {
  MantineReactTable,
  MRT_Row,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { useGo } from "@refinedev/core";
type Profile = {
  id: string;
  name: string;
  phoneNumber: string;
};
import { FaEye } from "react-icons/fa";
const ProfileTable = (props: { profiles: Profile[] }) => {
  const go = useGo();
  const { profiles = [] } = props ?? {};

  const handleSeeDetail = (profileId: string) => {
    go({
      to: {
        resource: "profiles",
        action: "show",
        id: profileId,
      },
    });
  };

  const columns = useMemo<MRT_ColumnDef<Profile>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone Number",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: profiles,
    enableRowActions: true,
    renderRowActions: ({ row }: { row: MRT_Row<Profile> }) => {
      return (
        <div>
          <button
            className="text-lg"
            onClick={() => handleSeeDetail(row.original.id)}
          >
            <FaEye />
          </button>
        </div>
      );
    },
  });

  return <MantineReactTable table={table} />;
};

export default ProfileTable;
