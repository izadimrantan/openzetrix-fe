"use client"

import ButtonSecondary from "@/components/button_secondary";
import Container from "@/components/container";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { completeZtp20CodeAssembly } from "@/libs/contractGenerator/ztp20CodeGenerator/assembleCode";
import { completeZtp721CodeAssembly } from "@/libs/contractGenerator/ztp721CodeGenerator/assembleCode";
import { completeZtp1155CodeAssembly } from "@/libs/contractGenerator/ztp1155CodeGenerator/assembleCode";
// import { ZtpOptions, Ztp20Options, Ztp721Options, Ztp1155Options } from "@/libs/contractGenerator/ztpOptions";
import { ZtpOptions, Ztp20Options, Ztp721Options } from "@/libs/contractGenerator/ztpOptions";
import { RadioGroup, Radio } from "@headlessui/react";
import { CheckCircleIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import Spinner from "@/components/spinner";
import Snackbar from "@/components/snackbar";
import ZtpForm from "@/components/ztpForm";
import { useAppContext } from "@/components/app";
import Chat from "@/components/chatbot/chat";

export default function Wizard() {
  const router = useRouter();
  const codeRef = useRef<HTMLElement>(null);  // Reference for the code block
  const { contractType, setContractType } = useAppContext()

  const [selectedOptions, setSelectedOptions] = useState<ZtpOptions[]>([]);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackBarMessage, setSnackbarMessage] = useState<string>("");
  const [ztpFormData, setZtpFormData] = useState<ZtpContractInfo>();

  const listOfContractTypes = ["ZTP20", "ZTP721", "ZTP1155"];

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (listOfContractTypes.includes(hash)) {
      setContractType(hash);
      setSelectedOptions([]);
      setGeneratedCode("");
    } else {
      router.replace(`/wizard/#${contractType}`);
    }
  }, [router]);

  useEffect(() => {
    if (codeRef.current) {
      delete codeRef.current.dataset.highlighted;
      hljs.highlightElement(codeRef.current);
    }
  }, [generatedCode]);

  useEffect(() => {
    if(ztpFormData) {
      generateCode(ztpFormData);
    } else {
      generateCode();
    }
  }, [selectedOptions, contractType]);

  const handleFormData = (formData: ZtpContractInfo) => {
    setZtpFormData(formData)
    generateCode(formData)
  }

  const copyToClipboard = async () => {
    if (generatedCode) {
      await navigator.clipboard.writeText(generatedCode);
      setSnackbarMessage("Code copied to clipboard!");
      setSnackbarOpen(true);

    }
  };

  const openZetrixIDE = () => {
    window.open("https://ide.zetrix.com", "_blank");
  };

  const downloadCode = () => {
    if (!generatedCode) return;
  
    const blob = new Blob([generatedCode], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "zetrixSmartContract.js";  // Name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);  // Clean up the URL object
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleContractTypeChange = (type: string) => {
    setContractType(type);
    setSelectedOptions([]);
    setGeneratedCode("");
    router.push(`/wizard/#${type}`);
  };

  const generateCode = (ztpContractInfo?: ZtpContractInfo) => {
    let code = "";
    if (contractType === "ZTP20") {
      if (ztpContractInfo) {
        code = completeZtp20CodeAssembly(selectedOptions as Ztp20Options[], ztpContractInfo);
      } else {
        code = completeZtp20CodeAssembly(selectedOptions as Ztp20Options[]);
      }
    } else if (contractType === "ZTP721") {
      if (ztpContractInfo) {
        code = completeZtp721CodeAssembly(selectedOptions as Ztp721Options[], ztpContractInfo);
      } else {
        code = completeZtp721CodeAssembly(selectedOptions as Ztp721Options[]);
      }
    } else if (contractType === "ZTP1155") {
      // code = completeZtp1155CodeAssembly(selectedOptions as Ztp1155Options[]);
      if (ztpContractInfo) {
        code = completeZtp1155CodeAssembly(ztpContractInfo);
      } else {
        code = completeZtp1155CodeAssembly();
      }
    }
    setGeneratedCode(code);
    setLoading(false);
  };

  // Mapping contract types to the appropriate options enum
  const getOptions = () => {
    switch (contractType) {
      case "ZTP20": return Ztp20Options;
      case "ZTP721": return Ztp721Options;
      // case "ZTP1155": return Ztp1155Options;
      default: return false;
    }
  };

  // Toggle selected option in the state
  const toggleOption = (option: ZtpOptions) => {
    setSelectedOptions(prev => 
      prev.includes(option) ? prev.filter(opt => opt !== option) : [...prev, option]
    );
    setSnackbarMessage("Updated smart contract!");
    setSnackbarOpen(true);

  };

  const options = getOptions();

  return (
    <Container activeKey="wizard">
      <div id="wizard-container" className="w-full max-w-none mt-6">
        <nav className="flex justify-between items-center mb-4">
          <div className="space-x-6">
            {listOfContractTypes.map((item) => (
              <button
                key={item}
                className={`font-medium hover:text-text_white ${
                  contractType === item
                    ? "text-text_white font-bold underline underline-offset-8 decoration-4"
                    : "text-text_secondary"
                }`}
                onClick={() => handleContractTypeChange(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex space-x-4">
            <ButtonSecondary onClick={copyToClipboard}>Copy to Clipboard</ButtonSecondary>
            <ButtonSecondary onClick={openZetrixIDE}>Deploy on Zetrix IDE</ButtonSecondary>
            <ButtonSecondary onClick={downloadCode}>Download</ButtonSecondary>
            <Chat />
            {snackbarOpen && (
              <Snackbar message={snackBarMessage} onClose={handleCloseSnackbar} />
            )}
          </div>
        </nav>

        <div className="flex space-x-4 mt-6">
          <div id="settings-section" className="w-1/5 bg-black">
            <h2 className="text-lg font-bold">Options</h2>

            <div className="w-full mt-2">
              <div className="mx-auto w-full max-w-md">
                <ZtpForm onSubmit={handleFormData}/>
              </div>
              <div className="mx-auto w-full max-w-md">
                <RadioGroup value={selectedOptions} className="space-y-2">
                  {options && Object.entries(options).map(([key, tooltip]) => (
                    <Radio
                      key={key}
                      value={key}
                      onClick={() => toggleOption(key as ZtpOptions)}
                      className="group relative flex cursor-pointer rounded-lg bg-white/5 py-4 px-5 text-white shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="text-sm font-semibold text-white">{key}</div>
                        {selectedOptions.includes(key as ZtpOptions) ? (
                          <CheckCircleIcon className="w-6 h-6 text-white opacity-100 transition" />
                        ) : (
                          <div className="relative group">
                            <QuestionMarkCircleIcon className="w-6 h-6 text-white/50 group-hover:text-white transition" />
                            <div className="absolute left-full top-1/2 ml-4 -translate-y-1/2 bg-black text-white text-sm rounded-lg w-40 h-30 px-4 py-2 shadow-lg border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 overflow-hidden">
                              {tooltip}
                            </div>
                          </div>
                        )}
                      </div>
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
          
          <div id="code-section" className="w-4/5 bg-black border rounded-md max-h-screen overflow-y-auto">
          {loading ? (
              <div className="flex items-center justify-center h-full">
                <Spinner className="w-8 h-8 text-white"/>
              </div>
            ) : (
              <pre className="overflow-x-auto rounded-md">
                <code ref={codeRef} className="language-javascript">
                  {generatedCode}
                </code>
              </pre>
            )}         
          </div>
        </div>
      </div>
    </Container>
  );
}