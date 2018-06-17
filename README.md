# Poker Hands Kata

Taken from [here](https://codingdojo.org/kata/PokerHands/), the purpose of this kata is to create function which compares two poker hands and return a string informing you which player won and the hand they won with.

## Use

`compareHands(input);`

Where `input` is a string in the following format:

`<Player Name>: <Value><Suit> <Value><Suit> <Value><Suit> <Value><Suit> <Value><Suit>  <Player Name>: <Value><Suit> <Value><Suit> <Value><Suit> <Value><Suit> <Value><Suit>`

`<Value>` can be any number from 2 to 10, or `J`, `Q`, `K` or `A`.

`<Suit>` can be `C`, `D`, `H`, `S`.

Example inputs:

```
Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH
Black: 2H 4S 4C 2D 4H  White: 2S 8S AS QS 3S
Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C KH
Black: 2H 3D 5S 9C KD  White: 2D 3H 5C 9S KH
```

## To Do

* Handle hands of equal value consistently
* Refactor to refer to 'hand' and 'cards' consistently
* Remove boilerplate