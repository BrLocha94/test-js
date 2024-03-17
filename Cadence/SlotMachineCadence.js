/**
 * Anticipator configuration. Has all information needed to check anticipator.
 * @param columnSize It's the number of columns the slot machine has.
 * @param minToAnticipate It's the minimum number of symbols to start anticipation.
 * @param maxToAnticipate It's the maximum number of symbols to end anticipation.
 * @param anticipateCadence It's the cadence value when has anticipation.
 * @param defaultCadence It's the cadence value when don't has anticipation.
 */
var anticipatorConfig = {
    columnSize: 5,
    minToAnticipate: 2,
    maxToAnticipate: 3,
    anticipateCadence: 2,
    defaultCadence: 0.25,
};
/**
 * Game rounds with special symbols position that must be used to generate the SlotCadences.
 */
var gameRounds = {
    roundOne: {
        specialSymbols: [
            { column: 0, row: 2 },
            { column: 1, row: 3 },
            { column: 3, row: 4 },
        ],
    },
    roundTwo: {
        specialSymbols: [
            { column: 0, row: 2 },
            { column: 0, row: 3 },
        ],
    },
    roundThree: {
        specialSymbols: [
            { column: 4, row: 2 },
            { column: 4, row: 3 },
        ],
    },
};
/**
 * This must be used to get all game rounds cadences.
 */
var slotMachineCadences = { roundOne: [], roundTwo: [], roundThree: [] };
function getCurrentCadence(index, startPoint, endPoint) {
    if (index >= endPoint || index < startPoint)
        return anticipatorConfig.defaultCadence;
    return anticipatorConfig.anticipateCadence;
}
/**
 * This function receives an array of coordinates relative to positions in the slot machine's matrix.
 * This array is the positions of the special symbols.
 * And it has to return a slot machine stop cadence.
 * @param symbols Array<SlotCoordinate> positions of the special symbols. Example: [{ column: 0, row: 2 }, { column: 2, row: 3 }]
 * @returns SlotCadence Array of numbers representing the slot machine stop cadence.
 */
function slotCadence(symbols) {
    console.log('Symbols ', symbols);
    var cadenceArray = [];
    var cadence = 0;
    //Factor to add cadence
    var extraCadence = anticipatorConfig.defaultCadence;
    //Check if there is any anticipation
    var hasAnticipation = symbols.length >= anticipatorConfig.minToAnticipate;
    console.log('Has anticipation ', hasAnticipation);
    if (hasAnticipation) {
        //Anticipation start point
        var startPoint = symbols[anticipatorConfig.minToAnticipate - 1].column;
        console.log('Start point ', startPoint);
        //Anticipation end point
        var endPoint = symbols.length >= anticipatorConfig.maxToAnticipate ?
            symbols[anticipatorConfig.maxToAnticipate - 1].column : anticipatorConfig.columnSize;
        console.log('End point ', endPoint);
        for (var i = 0; i < anticipatorConfig.columnSize; i++) {
            cadenceArray.push(cadence);
            extraCadence = getCurrentCadence(i, startPoint, endPoint);
            cadence += extraCadence;
        }
    }
    else {
        for (var i = 0; i < anticipatorConfig.columnSize; i++) {
            cadenceArray.push(cadence);
            cadence += extraCadence;
        }
    }
    return cadenceArray;
}
/**
 * Get all game rounds and return the final cadences of each.
 * @param rounds RoundsSymbols with contains all rounds special symbols positions.
 * @return RoundsCadences has all cadences for each game round.
 */
function handleCadences(rounds) {
    slotMachineCadences.roundOne = slotCadence(rounds.roundOne.specialSymbols);
    slotMachineCadences.roundTwo = slotCadence(rounds.roundTwo.specialSymbols);
    slotMachineCadences.roundThree = slotCadence(rounds.roundThree.specialSymbols);
    return slotMachineCadences;
}
console.log('CADENCES: ', handleCadences(gameRounds));
