import { safeTransferFromCode, setApprovalForAllCode, burn1155Code, mint1155Code, safeBatchTransferFromCode, setURICode } from './individualMainFunctions';
import { balanceOfCode, contractInfoCode, isApprovedForAllCode, balanceOfBatchCode, freezedCode, uriCode  } from './individualQueryFunctions';
import { baseCodePrefixes, utilityCode, initCode } from './baseFunctions';
// import { Ztp1155Options, Ztp1155OptionsCodeMap } from '../ztpOptions';
import { initCodeGenerator, mainCodeGenerator, queryCodeGenerator } from '../shared';

const ztp1155MainRecipe: SmartContractCode[] = [ 
    safeTransferFromCode, 
    setApprovalForAllCode, 
    burn1155Code, 
    mint1155Code, 
    safeBatchTransferFromCode, 
    setURICode
]

const ztp1155QueryRecipe: SmartContractCode[] = [
    balanceOfCode, 
    contractInfoCode, 
    isApprovedForAllCode, 
    balanceOfBatchCode, 
    freezedCode, 
    uriCode
]

export function completeZtp1155CodeAssembly(ztpContractInfo?: ZtpContractInfo): string {
// export function completeZtp1155CodeAssembly(ztp1155Options: Ztp1155Options[]): string {
    const fullMainRecipe = [...ztp1155MainRecipe];
    const fullQueryRecipe = [...ztp1155QueryRecipe];
    // fullMainRecipe.push(...ztp1155Options.filter(option => Ztp1155OptionsCodeMap[option]).map(option => Ztp1155OptionsCodeMap[option]));

    let ztp1155Code = ""
    ztp1155Code += baseCodePrefixes.code
    ztp1155Code += utilityCode.code
    ztp1155Code += fullMainRecipe.map(recipe => recipe.code).join('');
    ztp1155Code += fullQueryRecipe.map(recipe => recipe.code).join('');
    if (!ztpContractInfo) {
        ztp1155Code += initCode.code
    } else {
        ztp1155Code += initCodeGenerator(ztpContractInfo)
    }
    ztp1155Code += initCode.code
    ztp1155Code += mainCodeGenerator(fullMainRecipe)
    ztp1155Code += queryCodeGenerator(fullQueryRecipe)
    return ztp1155Code
}