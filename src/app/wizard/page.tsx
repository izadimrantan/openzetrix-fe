"use client"
import ButtonSecondary from "@/components/button_secondary";
import Container from "@/components/container";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { completeZtp20CodeAssembly } from "@/libs/contractGenerator/ztp20CodeGenerator/assembleCode";
import { Ztp20Options } from "@/libs/contractGenerator/ztp20CodeGenerator/individualMainFunctions";
import OptionSelection from "@/components/option_select";

export default function Wizard() {
  const router = useRouter();
  const [contractType, setContractType] = useState<string>("ZTP20");
  const [selectedOptions, setSelectedOptions] = useState<Ztp20Options[]>([]);

  const listOfContractTypes = ["ZTP20", "ZTP721", "ZTP1155"];

  useEffect(() => {
    // Set the initial contract type based on the hash or default to 'ZTP20'
    const hash = window.location.hash.replace('#', '');
    if (listOfContractTypes.includes(hash)) {
      setContractType(hash);
    } else {
      router.replace('/wizard/#ztp20');
    }
  }, [router]);

  useEffect(() => {
    // Highlight the code whenever the contractType changes
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [contractType]);

  const handleContractTypeChange = (type: string) => {
    setContractType(type);
    router.push(`/wizard/#${type}`);
  };

  const generateCode = () => {
    return completeZtp20CodeAssembly(selectedOptions)
  };


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
            <ButtonSecondary>Copy to Clipboard</ButtonSecondary>
            <ButtonSecondary>Download</ButtonSecondary>
          </div>
        </nav>

        {/* Settings and Code Sections */}
        <div className="flex space-x-4 mt-6">
          <div id="settings-section" className="w-1/5 bg-black">
            {/* Settings for the selected contract type */}
            <h2 className="text-lg font-bold">Options</h2>
            {/* Add form elements for settings here */}
            <OptionSelection />
          </div>
          
          <div id="code-section" className="w-4/5 bg-black border rounded-md max-h-screen overflow-y-auto">
            {/* Generated Smart Contract Code */}
            <pre className="overflow-x-auto rounded-md">
              <code className="language-javascript">{generateCode()}</code>
            </pre>          
          </div>
        </div>
      </div>
    </Container>
  );
}