# GuessWhoBestMove
Hey there its Joey G! I hope you enjoy this! Let me know if you find any bugs and good investigatin!

## How to use this
Go into your browser
Go into the develoepr tools (on google chrome right now right click and then hit develoepr tools)
Go into the command line
Copy all of the code form GuessWho.js into the command line and hti enter
Then copy this bit:
getAllGameStates(24,24) and hit enter
Right click the big object that it poops out and set it as a global variable. you will probably name it 'temp1'
You can now see the winning moves (or the reuslts of any move) for any game state like this:
temp1["04041"]
That will give you all of the moves and odds of winning for the current player (player 1 in this case)
The format is, the first 2 numbers are the number of windows player 1 has left. then next 2 are the numeber of windows player 2 has left. The final number is the turn.
I hope yous like it!

Also if you are playing the odd variant in which guessing does not lose you the game, use the MercyRules.js instead. Be careful Mark Rober is very good at this variant!