"use client";
import { useState } from "react";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
}

export default function DatePicker({
  value,
  onChange,
  placeholder = "اختر التاريخ",
}: DatePickerProps) {
  const [date, setDate] = useState<Date>(value || new Date());

  const startYear = getYear(new Date()) - 100;
  const endYear = getYear(new Date());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  const handleMonthChange = (month: string) => {
    const newDate = setMonth(date, months.indexOf(month));
    setDate(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = setYear(date, parseInt(year));
    setDate(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-right font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {value ? format(value, "dd/MM/yyyy") : <span>{placeholder}</span>}
          <CalendarIcon className="mr-auto h-4 w-4 text-mainColor" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex justify-between p-2">
          <Select onValueChange={handleMonthChange} value={months[getMonth(date)]}>
            <SelectTrigger className="w-[125px]">
              <SelectValue placeholder="الشهر" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={handleYearChange} value={getYear(date).toString()}>
            <SelectTrigger className="w-[125px]">
              <SelectValue placeholder="السنة" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Calendar
          mode="single"
          selected={value}
          onSelect={(selected) => {
            onChange(selected);
          }}
          initialFocus
          month={date}
          onMonthChange={setDate}
          components={{
            Caption: () => null,
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
