"use client";

import { ChangeEventHandler, MouseEventHandler, useState } from "react";

import gradeExam, { Result } from "@/lib/grade-exam";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import DataTable from "./components/data-table";
import TableResult from "./components/table-result";

const csvFileToArray = (csvString: string): Record<string, string>[] => {
  const [headerLine, ...rows] = csvString.trim().split("\n");
  const headers = headerLine.replace(/\r$/, "").split(",");

  return rows.map((row) => {
    const values = row.replace(/\r$/, "").split(",");
    return Object.fromEntries(
      headers.map((header, index) => [header, values[index] || ""])
    );
  });
};

export default function Home() {
  const [ansFile, setAnsFile] = useState<File>();
  const [ansData, setAnsData] = useState<Record<string, string>[]>([]);
  const [gradeResult, setGradeResult] = useState<Result>([]);

  const [exFile, setExFile] = useState<File>();
  const [exData, setExData] = useState<Record<string, string>[]>([]);

  const [showTable, setShowTable] = useState({
    ans: true,
    ex: true,
  });

  const handleOnChange: (
    fileType: "ans" | "ex"
  ) => ChangeEventHandler<HTMLInputElement> = (fileType) => (e) => {
    const files = e.target.files;
    if (!files) return;
    if (fileType === "ans") setAnsFile(files[0]);
    if (fileType === "ex") setExFile(files[0]);
  };

  const handleOnSubmit: (
    fileType: "ans" | "ex"
  ) => MouseEventHandler<HTMLButtonElement> = (fileType) => (e) => {
    e.preventDefault();

    if (ansFile) {
      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        if (!event.target) return;

        const text = event.target.result as string;
        const arr = csvFileToArray(text);
        if (fileType === "ans") setAnsData(arr);
      };

      fileReader.readAsText(ansFile);
    }

    if (exFile) {
      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        if (!event.target) return;

        const text = event.target.result as string;
        const arr = csvFileToArray(text);
        if (fileType === "ex") setExData(arr);
      };

      fileReader.readAsText(exFile);
    }
  };

  return (
    <div className="container mx-auto grid max-w-screen-lg grid-cols-2 gap-2 p-12">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Answers file</Label>
        <Input
          id="picture"
          type="file"
          accept=".csv"
          onChange={handleOnChange("ans")}
        />
        <Button onClick={handleOnSubmit("ans")}>Import</Button>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Student file</Label>
        <Input
          id="picture"
          type="file"
          accept=".csv"
          onChange={handleOnChange("ex")}
        />
        <Button onClick={handleOnSubmit("ex")}>Import ex</Button>
      </div>
      {/* read file */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold">Answers sheet</h1>
          <Switch
            checked={showTable.ans}
            onCheckedChange={(checked) =>
              setShowTable((prev) => ({
                ...prev,
                ans: checked,
              }))
            }
          />
        </div>

        {showTable.ans && <DataTable data={ansData} />}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold">Student answers sheet</h1>
          <Switch
            checked={showTable.ex}
            onCheckedChange={(checked) =>
              setShowTable((prev) => ({
                ...prev,
                ex: checked,
              }))
            }
          />
        </div>
        {showTable.ex && <DataTable data={exData} />}
      </div>

      <Button
        onClick={() => {
          const result = gradeExam(ansData, exData);
          setGradeResult(result);
        }}
        className="col-span-2"
      >
        Grade
      </Button>

      <div className="col-span-2">
        <TableResult data={gradeResult} />
      </div>
    </div>
  );
}
