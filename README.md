
# Cadence

## Used tools

```bash
  Node version: 18.19.1
  Typescript version: 5.4.2
  Npm version: 10.2.4
```

## How to run

Enter on the folder /Cadence using the bash and enter:

```bash
  npm install -g typescript
  tsc SlotMachineCadence.ts
  node SlotMachineCadence.js
```

## Solution guide

    This project was made to create an Anticipation event on a slot machine based on a
    list of special symbols.
    The base of this event is on the amount of special symbols per round, so the steps
    to validate this task are the following:
        1- Check if there is the minimum requiriments to trigger Anticipation
        2- If the event will trigger:
            3- Get the start point of Anticipation
            4- Get the end point of Anticipation
            5- Construct an array of cadences (based on 3 and 4)
        6- If not
            7- Construct an array of cadences using the default cadence
        8- return array of cadences
    
    Example: 
        anticipateCadence: 2,
        defaultCadence: 0.25,

        specialSymbols: 
            { column: 0, row: 2 }, 
            { column: 1, row: 3 },
            { column: 3, row: 4 }

        Will produce an cadence of [ 0, 0.25, 2.25, 4.25, 4.5 ]

## Improvements

    1- The tests cases are assuming the correct order of the symbols array, so this
    should be assented on the begining.
    2- Code can be prepared to use not only anticipation, but also expectation events.
    3- Anticipation also should have rules to trigger coluns reveal at the same time.

# Winning combinations

## Used tools

```bash
  Node version: 18.19.1
  Npm version: 10.2.4
  Yarn version: 1.22.22
```

## How to run

Enter on the folder /Winning Combinations using the bash and enter:

```bash
  npm install --global yarn
  yarn
  yarn test
```

## Solution guide

    The solution must run all the current tests cases with the following rules:
        1- Payable symbols : [1, 2, 3, 4, 5, 6, 7, 8, 9]
        2- Wild symbol : 0
        3- Minimum amount of symbols to Payline : 3
        4- An full line of Wild is a payline : [0, 0, 0, 0, 0]
        5- Wild can count as a payline with other payable symbols : [0, 0, 2, 1, 3, 3]
        6- Wild can make payline with more than 1 symbol : [1, 2, 0, 0, 3, 3] 
    
    With this base, i created the following logic
        1- Create an auxiliar structure to process the paylines.
        2- Remove the non payable symbols
        3- Check if there is an full line if symbols
            3.1- Case true, return result
        4- Check if there is any wild
            4.1- Send the wilds to the other payable symbols to be used as such
            4.2- Remove the wild list
        5- Check if there is any payable symbol sequence left
            5.1- Validate sequence to avoid cases like {3, [1, 3, 4]}
            5.2- Desconsiderate multiple paylines of same symbol an process only the
                 biggest one
        6- Return results

    All current tests cases were correct validated using this method.
    

## Improvements

    1- Treat the multiple paylines of the same symbol cases
        1.1- Ex: [0, 4, 4, 1, 4, 4, 0] should return {{4, [0, 1, 2]} , {4, [4, 5, 6]}
    2- Reduce number of map usages.
    3- Add more non payable symbols tests cases
    4- Test cases should be on an separated file
