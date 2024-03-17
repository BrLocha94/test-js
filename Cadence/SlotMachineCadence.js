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
/**
 * This function returns the current cadence for every index based on the anticipation points
 * @param index symbols array index
 * @param startPoint anticipation start index
 * @param endPoint anticipation end index
 * @returns number to be added on the current slot cadence
 */
function getCurrentCadence(index, startPoint, endPoint) {
    if (index >= endPoint || index < startPoint)
        return anticipatorConfig.defaultCadence;
    return anticipatorConfig.anticipateCadence;
}
/**
 * Checks if any Array<SlotCoordinate> has the minimum conditions to trigger the anticipation effect
 * @param symbols Array<SlotCoordinate> positions of the special symbols. Example: [{ column: 0, row: 2 }, { column: 2, row: 3 }]
 * @returns boolean indicating if the @param symbols will trigger the effect
 */
function hasAnticipation(symbols) {
    return symbols.length >= anticipatorConfig.minToAnticipate;
}
/**
 * Returns on witch column the anticipation will start
 * @param symbols  Array<SlotCoordinate> positions of the special symbols. Example: [{ column: 0, row: 2 }, { column: 2, row: 3 }]
 * @returns number representing the target symbol column that will trigger the anticipation
 */
function getAnticipationStartPoint(symbols) {
    return symbols[anticipatorConfig.minToAnticipate - 1].column;
}
/**
 * Returns on witch column the anticipation will end
 * If cant end anticipation, will return the index of the last slots columns
 * @param symbols Array<SlotCoordinate> positions of the special symbols. Example: [{ column: 0, row: 2 }, { column: 2, row: 3 }]
 * @returns number representing the target symbol column that will end the anticipation
 */
function getAnticipationEndPoint(symbols) {
    if (symbols.length >= anticipatorConfig.maxToAnticipate)
        return symbols[anticipatorConfig.maxToAnticipate - 1].column;
    return anticipatorConfig.columnSize;
}
/**
 * This function receives an array of coordinates relative to positions in the slot machine's matrix.
 * This array is the positions of the special symbols.
 * And it has to return a slot machine stop cadence.
 * @param symbols Array<SlotCoordinate> positions of the special symbols. Example: [{ column: 0, row: 2 }, { column: 2, row: 3 }]
 * @returns SlotCadence Array of numbers representing the slot machine stop cadence.
 */
function slotCadence(symbols) {
    var cadenceArray = [];
    var cadence = 0;
    //Factor to add cadence
    var extraCadence = anticipatorConfig.defaultCadence;
    if (hasAnticipation(symbols)) {
        var startPoint = getAnticipationStartPoint(symbols);
        var endPoint = getAnticipationEndPoint(symbols);
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
