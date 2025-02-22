"use client";

import { FC, useState } from "react";

import { Result } from "@/lib/grade-exam";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ITableResultProps {
  data: Result;
}

const TableResult: FC<ITableResultProps> = ({ data }) => {
  const [filter, setFilter] = useState<"all" | "correct" | "incorrect">("all");

  const filteredData = data.filter((row) => {
    if (filter === "all") return true;
    if (filter === "correct") return row.isCorrect;
    if (filter === "incorrect") return !row.isCorrect;
    return true;
  });

  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-bold">Result</h1>

        <Select
          onValueChange={(value) =>
            setFilter(value as "all" | "correct" | "incorrect")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="correct">Correct</SelectItem>
            <SelectItem value="incorrect">Incorrect</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableCaption className="text-start">
          {data.length === 0 ? "No data" : "Rows: " + data.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="capitalize">Question</TableHead>
            <TableHead className="capitalize">Correct answer</TableHead>
            <TableHead className="capitalize">Student Answer</TableHead>
            <TableHead className="capitalize">Is Correct</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.question}</TableCell>
              <TableCell>{row.correctAnswer}</TableCell>
              <TableCell>{row.studentAnswer}</TableCell>
              <TableCell>{row.isCorrect ? "True" : "False"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableResult;
