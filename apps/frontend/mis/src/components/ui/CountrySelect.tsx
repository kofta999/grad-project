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
import { useEffect, useState } from "react";

type Country = {
  countryId: number;
  nameAr: string;
};

interface Props {
  name: string;
  label: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function CountrySelect({
  name,
  label,
  value,
  error,
  touched,
  onChange,
  required,
}: Props) {
  const [countryList, setCountryList] = useState<Country[]>([]);

  const getCountries = async () => {
    try {
      const res = await apiClient.countries.$get();
      const data = await res.json();
      setCountryList(data);
    } catch {
      console.log("Failed to get countries");
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <>
      <Label className="mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="اختر الدولة" />
        </SelectTrigger>
        <SelectContent>
          {countryList &&
            countryList.map((country) => (
              <SelectItem key={country.countryId} value={country.countryId.toString()}>
                {country.nameAr}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      {touched && error && <ErrorMessage message={error} />}
    </>
  );
}
