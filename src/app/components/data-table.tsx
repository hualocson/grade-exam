"use client";

import { FC } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface IDataTableProps {
  data: Record<string, string>[];
}

const DataTable: FC<IDataTableProps> = ({ data }) => {
  const headerKeys = Object.keys(Object.assign({}, ...data));
  return (
    <Table>
      <TableCaption className="text-start">
        {data.length === 0 ? "No data" : "Rows: " + data.length}
      </TableCaption>
      <TableHeader>
        <TableRow>
          {headerKeys.map((headerKey) => (
            <TableHead key={headerKey} className="capitalize">
              {headerKey}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {headerKeys.map((headerKey) => (
              <TableCell key={headerKey}>{row[headerKey]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
