
type WinningCombinationsResult = [number, number[]][];
type AuxiliarHash = {[key:number]:number[]}

const wildSymbol : number = 0;
const payableSymbols : number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function preProcessLine(lines: number[]): AuxiliarHash{
  const hash :AuxiliarHash = {}

  for (let index = 0; index < lines.length; index++) {
    const element = lines[index];
    if(payableSymbols.includes(element) || wildSymbol === element){
      if(!hash[element]){
        hash[element] = [index];
      }
      else{
        hash[element].push(index);
      }
    }
  }

  return hash;
}

function checkWinningCombinations(hash : AuxiliarHash) : WinningCombinationsResult{
  let keys = Object.keys(hash);
  const combinations : WinningCombinationsResult = [];

  // Line composed only by wild symbol
  if(keys.length == 1 && parseInt(keys[0]) === wildSymbol){
    combinations.push([wildSymbol, hash[wildSymbol]]);
    return combinations;
  }

  // Remove WILD and distribute to the other keys
  if(hash[wildSymbol]){
    const wildArray = hash[wildSymbol]
    delete hash[wildSymbol];
    keys = Object.keys(hash);

    keys.map((key) => {
      const parsedKey = parseInt(key);
      hash[parsedKey].push(...wildArray);
      hash[parsedKey].sort();
    });
  }

  // Keep only the major sequence in the array
  keys.map((key) => {
    const parsedKey = parseInt(key);
    const array = hash[parsedKey];

    let majorSequence : number[] = [];
    let currentSequence : number[] = [];
    let current = undefined;

    for (let i = 0; i < array.length; i++) {
      if(current === undefined){
        current = array[i];
        currentSequence.push(current);
        continue;
      }

      if(array[i] === current + 1){
        current = array[i];
        currentSequence.push(current);
        continue;
      }

      if(currentSequence.length > majorSequence.length){
        majorSequence = currentSequence;
        current = array[i];
        currentSequence = [];
        currentSequence.push(current);
        continue;
      }
    }

    //SAFEGUARD
    if(currentSequence.length > majorSequence.length){
      majorSequence = currentSequence;
    }

    // Remove arrays without minimum size to form an payline
    if(majorSequence.length >= 3){
      combinations.push([parsedKey, majorSequence]);
    }
  });

  return combinations;
}


function call(lines: number[]): WinningCombinationsResult {

  const hash = preProcessLine(lines);
  const processedCombinations = checkWinningCombinations(hash);

  return processedCombinations;
}

export const WinningCombinations = { call };
