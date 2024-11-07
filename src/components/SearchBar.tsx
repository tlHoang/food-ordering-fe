import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
  enableSuggestions?: boolean; // New prop
};

const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery, enableSuggestions = false }: Props) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  useEffect(() => {
    if (enableSuggestions && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=925299739953692628928x65897`);
        const data = await response.json();
        console.log(data);
        setSuggestions([data.alt.loc[0].prov]);
      });
    }
  }, [enableSuggestions]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue("searchQuery", suggestion);
    setSuggestions([]);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${form.formState.errors.searchQuery && "border-red-500"
          }`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-orange-500 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    className="border-none shadow-none text-xl focus-visible:ring-0"
                    placeholder={placeHolder}
                    autoComplete="off"
                  />
                  {enableSuggestions && suggestions.length > 0 && (
                    <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 w-auto max-w-full z-10">
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="p-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          onClick={handleReset}
          type="button"
          variant="outline"
          className="rounded-full"
        >
          Xoá
        </Button>
        <Button type="submit" className="rounded-full bg-orange-500">
          Tìm kiếm
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;