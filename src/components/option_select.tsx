import { RadioGroup, Radio } from "@headlessui/react";
import { CheckCircleIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

enum ContractOptions {
  Mintable = 'Enables the contract issuer to mint tokens.',
  Burnable = 'Enables the contract issuer to burn tokens.',
}

interface Option {
  name: keyof typeof ContractOptions;
  tooltip: string;
}

export default function OptionSelection() {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const options: Option[] = Object.entries(ContractOptions).map(([name, tooltip]) => ({
    name: name as keyof typeof ContractOptions,
    tooltip,
  }));

  const toggleOption = (option: Option) => {
    setSelectedOptions((prev) =>
      prev.some((selected) => selected.name === option.name)
        ? prev.filter((selected) => selected.name !== option.name)
        : [...prev, option]
    );
  };

  return (
    <div className="w-full mt-4">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selectedOptions} className="space-y-2">
          {options.map((option) => (
            <Radio
              key={option.name}
              value={option}
              onClick={() => toggleOption(option)}
              className="group relative flex cursor-pointer rounded-lg bg-white/5 py-4 px-5 text-white shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
            >
              <div className="flex w-full items-center justify-between">
                <div className="text-sm font-semibold text-white">{option.name}</div>
                {selectedOptions.some((selected) => selected.name === option.name) ? (
                  <CheckCircleIcon className="w-6 h-6 text-white opacity-100 transition" />
                ) : (
                  <div className="relative group">
                    <QuestionMarkCircleIcon className="w-6 h-6 text-white/50 group-hover:text-white transition" />
                    <div className="absolute left-full top-1/2 ml-4 -translate-y-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                      {option.tooltip}
                    </div>
                  </div>
                )}
              </div>
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
