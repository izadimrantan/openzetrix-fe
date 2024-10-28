import { burnCode, mintCode } from "./ztp20CodeGenerator/individualMainFunctions";

export enum Ztp20Options {
    Mintable = "Allows the contract deployer to mint tokens. Click to add this function to the smart contract.",
    Burnable = "Allows the contract deployer to burn tokens. Click to add this function to the smart contract."
}
export const Ztp20OptionsCodeMap: Record<string, SmartContractCode> = {
    'Mintable': mintCode,
    'Burnable': burnCode,
}

export enum Ztp721Options {
    Mintable = "Allows the contract deployer to mint tokens.",
    Burnable = "Allows the contract deployer to burn tokens."
}

export enum Ztp1155Options {
    Mintable = "Allows the contract deployer to mint tokens.",
    Burnable = "Allows the contract deployer to burn tokens."
}

export type ZtpOptions = Ztp20Options | Ztp721Options | Ztp1155Options;
