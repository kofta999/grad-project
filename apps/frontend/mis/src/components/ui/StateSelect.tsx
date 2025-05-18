import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ErrorMessage } from "@/components/ui/error-message";
import { apiClient } from "@/lib/client";
import { useState, useEffect } from "react";

type State = {
  cityId: number;
  nameAr: string;
};

interface Props {
  name: string;
  countryCode: string;
  label: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function StateSelect({
  name,
  countryCode,
  label,
  value,
  error,
  touched,
  onChange,
  required,
}: Props) {
  const [stateList, setStateList] = useState<State[]>([]);

  const getStates = async (countryCode: string) => {
    try {
      const res = await apiClient.countries[":id"].$get({
        param: { id: countryCode },
      });
      const data = (await res.json()) as State[];
      setStateList(data);
    } catch {
      console.log("Failed to get states");
      setStateList([]);
    }
  };

  useEffect(() => {
    if (countryCode) getStates(countryCode);
  }, [countryCode]);

  return (
    <div>
      <Label className="mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="اختر المدينة" />
        </SelectTrigger>
        <SelectContent>
          {stateList.length === 0 ? (
            <SelectItem disabled value="لا يوجد مدن">
              لا يوجد مدن
            </SelectItem>
          ) : (
            stateList.map((state) => (
              <SelectItem key={state.cityId} value={state.cityId.toString()}>
                {state.nameAr}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {touched && error && <ErrorMessage message={error} />}
    </div>
  );
}
