import { Description, Field, Fieldset, Input, Label, Legend, Button, Textarea } from '@headlessui/react'
import clsx from 'clsx'
import { useAppContext } from './app'
import { useState, useEffect } from 'react'
import Snackbar from "@/components/snackbar";

interface ZtpFormProps {
  onSubmit: (formData: ZtpContractInfo) => void
}

export default function ZtpForm({ onSubmit }: ZtpFormProps) {
  const { contractType, setContractType } = useAppContext()
  const [name, setName] = useState<string>('')
  const [symbol, setSymbol] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [decimal, setDecimal] = useState<string>('')
  const [version, setVersion] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackBarMessage, setSnackbarMessage] = useState<string>("");
  const [hasDecimals, setHasDecimals] = useState<boolean>(false)
  const [isFormValid, setIsFormValid] = useState<boolean>(false)

  useEffect(() => {
    setHasDecimals(contractType === "ZTP20" || contractType === "ZTP1155");
    setName('');
    setSymbol('');
    setDescription('');
    setDecimal('');
    setVersion('');
  }, [contractType]);
  
  useEffect(() => {
    const requiredFieldsFilled = name && symbol && description && version
    const allFieldsFilled = hasDecimals ? requiredFieldsFilled && decimal : requiredFieldsFilled
    setIsFormValid(allFieldsFilled)
  }, [name, symbol, description, decimal, version, hasDecimals])

  const updateSmartContract = () => {
    // Call the onSubmit function passed from the parent
    onSubmit({
      name,
      symbol,
      description,
      decimals: hasDecimals ? decimal : undefined,
      version
    })
    setSnackbarMessage("Added contract initialization info!");
    setSnackbarOpen(true);
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="w-full max-w-lg mb-2">
      <Fieldset className="space-y-2 rounded-xl bg-white/5 p-5 sm:p-4">
        <Legend className="text-base/7 font-semibold text-white">Contract Info</Legend>
        <Field>
            <Description className="text-sm/6 text-white/50">
                These are the fields that will be used during the initialization of the contract.
            </Description>
        </Field>
        <Field>
          <Label className="text-sm/6 font-medium text-white">Name</Label>
          <Description className="text-sm/6 text-white/50">
                Name of your token.
            </Description>
          <Input
            className={clsx(
              'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
        <Field>
          <Label className="text-sm/6 font-medium text-white">Symbol</Label>
          <Description className="text-sm/6 text-white/50">
                Your token symbol of choice in alphanumeric.
            </Description>
          <Input
            className={clsx(
              'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </Field>
        <Field>
          <Label className="text-sm/6 font-medium text-white">Description</Label>
          <Description className="text-sm/6 text-white/50">
                A description of your token.
          </Description>
          <Textarea
          className={clsx(
            'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
          )}
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </Field>
        {hasDecimals && <Field>
          <Label className="text-sm/6 font-medium text-white">Decimals</Label>
          <Description className="text-sm/6 text-white/50">
            The number of decimal places your token will have.
          </Description>
          <Input
            className={clsx(
              'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            value={decimal}
            onChange={(e) => setDecimal(e.target.value)}
          />
        </Field>}
        <Field>
          <Label className="text-sm/6 font-medium text-white">Version</Label>
          <Description className="text-sm/6 text-white/50">
            Your token version.
          </Description>
          <Input
            className={clsx(
              'mb-3 mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          />
        </Field>
        <div className="text-left">
          <Button
            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
            onClick={updateSmartContract}
            disabled={!isFormValid}
          >
            Update Smart Contract
          </Button>
          {snackbarOpen && (
              <Snackbar message={snackBarMessage} onClose={handleCloseSnackbar} />
          )}
        </div>
      </Fieldset>

    </div>
  )
}
