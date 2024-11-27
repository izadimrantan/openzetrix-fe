import { approveCode, burn721Code, mint721Code, safeTransferFromCode, setApprovalForAllCode, transferFromCode } from './individualMainFunctions';
import { getApprovedCode, balanceOfCode, contractInfoCode, isApprovedForAllCode, ownerOfCode, tokenURICode, totalSupplyCode } from './individualQueryFunctions';
import { baseCodePrefixes, utilityCode, initCode } from './baseFunctions';
import { Ztp721Options, Ztp721OptionsCodeMap } from '../ztpOptions';
import { initCodeGenerator, mainCodeGenerator, queryCodeGenerator } from '../shared';

const ztp721MainRecipe: SmartContractCode[] = [ 
    approveCode,
    mint721Code,
    safeTransferFromCode,
    setApprovalForAllCode,
    transferFromCode
]

const ztp721QueryRecipe: SmartContractCode[] = [
    getApprovedCode,
    balanceOfCode,
    contractInfoCode,
    isApprovedForAllCode,
    ownerOfCode,
    tokenURICode,
    totalSupplyCode
]

export function completeZtp721CodeAssembly(ztp721Options: Ztp721Options[], ztpContractInfo?: ZtpContractInfo): string {
    const fullMainRecipe = [...ztp721MainRecipe];
    const fullQueryRecipe = [...ztp721QueryRecipe];
    fullMainRecipe.push(...ztp721Options.filter(option => Ztp721OptionsCodeMap[option]).map(option => Ztp721OptionsCodeMap[option]));

    let ztp721Code = ""
    ztp721Code += baseCodePrefixes.code
    ztp721Code += utilityCode.code
    ztp721Code += fullMainRecipe.map(recipe => recipe.code).join('');
    ztp721Code += fullQueryRecipe.map(recipe => recipe.code).join('');
    if (!ztpContractInfo) {
        ztp721Code += initCode.code
    } else {
        ztp721Code += initCodeGenerator(ztpContractInfo)
    }
    ztp721Code += mainCodeGenerator(fullMainRecipe)
    ztp721Code += queryCodeGenerator(fullQueryRecipe)
    return ztp721Code
}