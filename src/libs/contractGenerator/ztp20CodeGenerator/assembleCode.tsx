import { approveCode, transferCode, transferFromCode } from './individualMainFunctions';
import { allowanceCode, balanceOfCode, contractInfoCode } from './individualQueryFunctions';
import { baseCodePrefixes, utilityCode, initCode } from './baseFunctions';
import { Ztp20Options, Ztp20OptionsCodeMap } from '../ztpOptions';
import { initCodeGenerator, mainCodeGenerator, queryCodeGenerator } from '../shared';

const ztp20MainRecipe: SmartContractCode[] = [ 
    approveCode,
    transferCode,
    transferFromCode
]

const ztp20QueryRecipe: SmartContractCode[] = [
    allowanceCode,
    balanceOfCode,
    contractInfoCode
]

export function completeZtp20CodeAssembly(ztp20Options: Ztp20Options[], ztpContractInfo?: ZtpContractInfo): string {
    const fullMainRecipe = [...ztp20MainRecipe];
    const fullQueryRecipe = [...ztp20QueryRecipe];
    fullMainRecipe.push(...ztp20Options.filter(option => Ztp20OptionsCodeMap[option]).map(option => Ztp20OptionsCodeMap[option]));

    let ztp20Code = ""
    ztp20Code += baseCodePrefixes.code
    ztp20Code += utilityCode.code
    ztp20Code += fullMainRecipe.map(recipe => recipe.code).join('');
    ztp20Code += fullQueryRecipe.map(recipe => recipe.code).join('');
    if (!ztpContractInfo) {
        ztp20Code += initCode.code
    } else {
        ztp20Code += initCodeGenerator(ztpContractInfo)
    }
    ztp20Code += mainCodeGenerator(fullMainRecipe)
    ztp20Code += queryCodeGenerator(fullQueryRecipe)
    return ztp20Code
}