import { burnCode, mintCode } from "./ztp20CodeGenerator/individualMainFunctions";
import { burn721Code } from "./ztp721CodeGenerator/individualMainFunctions";

/* ZTP20 Configuration of options & mapping */
export enum Ztp20Options {
    Mintable = "Allows the contract deployer to mint tokens. Click to add this function to the smart contract.",
    Burnable = "Allows the contract deployer to burn tokens. Click to add this function to the smart contract."
}
export const Ztp20OptionsCodeMap: Record<string, SmartContractCode> = {
    'Mintable': mintCode,
    'Burnable': burnCode,
}

/* ZTP721 Configuration of options & mapping */
export enum Ztp721Options {
    Burnable = "Allows the contract deployer to burn tokens. Click to add this function to the smart contract."
}
export const Ztp721OptionsCodeMap: Record<string, SmartContractCode> = {
    'Burnable': burn721Code,
}

/* ZTP1155 Configuration of options & mapping */
export enum Ztp1155Options {
    Mintable = "Allows the contract deployer to mint tokens.",
    Burnable = "Allows the contract deployer to burn tokens."
}

export type ZtpOptions = Ztp20Options | Ztp721Options | Ztp1155Options;
