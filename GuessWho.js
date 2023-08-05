// let player1 = {
//     windows: 24
// }
// let player2 = {
//     windows: 24
// }
let gameState = {
    1: .5,
    2: .5,
    bestOption: "Question",
    QuestionAsked: [1,7]
}

function guess(player1,player2,playerTurn,allGameStates) {
    let player = playerTurn==1 ? player1:player2;
    winrate = 1/player.windows;
    return {'winrate':winrate,'possibleChoices':{futures:"Guess",'winChance':winrate}};
}
function question(player1,player2,playerTurn,allGameStates) {
    console.log("Asking Question")
    let player = playerTurn==1 ? player1:player2;
    let otherPlayer = playerTurn==1 ? player2:player1;
    let winrate = 0;
    let questionAsked=[0,0]
    if (player.windows==1) {
        //You should never question at 1 window
        return {"winrate":0,"question":[0,0],"possibleChoices":[]}; 
    }
    let possibleChoices=[]
    for (firstFuture=1;firstFuture<=Math.floor(player.windows/2);firstFuture++){
        let secondFuture = player.windows - firstFuture
        let newName1;
        if (playerTurn==1){
            newName1 = MakeGameStateName(firstFuture,otherPlayer.windows,otherPlayer.p)
        }else{
            newName1 = MakeGameStateName(otherPlayer.windows,firstFuture,otherPlayer.p)
        }
        newWinRate1 = allGameStates[newName1][player.p]
        odds1=firstFuture/player.windows;
        
        console.log("Odds of Future with "+firstFuture+" windows is "+odds1)

        let newName2;
        if (playerTurn==1){
            newName2 = MakeGameStateName(secondFuture,otherPlayer.windows,otherPlayer.p)
        }else{
            newName2 = MakeGameStateName(otherPlayer.windows,secondFuture,otherPlayer.p)
        }
        newWinRate2 = allGameStates[newName2][player.p]
        odds2=secondFuture/player.windows;
        console.log("Odds of Future with "+firstFuture+" windows is "+odds2)
        combinedWinRate = newWinRate1*odds1+newWinRate2*odds2;
        if (combinedWinRate > winrate){
            winrate=combinedWinRate
            questionAsked=[firstFuture,secondFuture]
        }

        let futureName = ""+firstFuture+","+secondFuture
        possibleChoices.push({'futures':futureName,'winChance':combinedWinRate})
    }
    return {"winrate":winrate,"question":questionAsked,"possibleChoices":possibleChoices}
}
//Joey G was here ;) 

function mkstr(i){
    return (i).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
}

function MakeGameStateName(windows1,windows2,turn){
    return mkstr(windows1)+mkstr(windows2)+turn;
}
//24,24 for classic game
function getAllGameStates(maxp1Size,maxp2Size) {
    let allGameStates = [];
    for (let i=1;i<maxp1Size+1;i++){
        for (let j=1;j<maxp2Size+1;j++){
            for (let k=1;k<3;k++){
                let player1 = {
                    windows: i,
                    p:1
                }
                let player2 = {
                    windows: j,
                    p:2
                }
                GameStateName = MakeGameStateName(i,j,k)
                console.log("Solving for Game State: ",GameStateName,allGameStates[GameStateName])
                GuessObject= guess(player1,player2,k,allGameStates);
                GuessPower=GuessObject.winrate;
                GuessPossibility=GuessObject.possibleChoices;
                QuestionObject = question(player1,player2,k,allGameStates)
                QuestionPower = QuestionObject.winrate
                QuestionAsked = QuestionObject.question
                QuestionPossibilites = QuestionObject.possibleChoices.concat(GuessPossibility)
                console.log(GuessPossibility,QuestionObject.possibleChoices)
                //Its better to guess if all odds are the same so you have control and avoid stalling the game
                if (GuessPower>=QuestionPower) {
                    allGameStates[GameStateName]={
                        1: k==1 ? GuessPower:1-GuessPower,
                        2: k==2 ? GuessPower:1-GuessPower,
                        bestOption: "Guess",
                        QuestionAsked: false,
                        QuestionPossibilites:QuestionPossibilites
                    };
                }else{
                    allGameStates[GameStateName]={
                        1: k==1 ? QuestionPower:1-QuestionPower,
                        2: k==2 ? QuestionPower:1-QuestionPower,
                        bestOption: "Question",
                        QuestionAsked: QuestionAsked,
                        QuestionPossibilites:QuestionPossibilites,
                    };
                }
                //console.log("The Gamestate Name We solved is",GameStateName,allGameStates[GameStateName])
            }
        }
    }
    console.log(allGameStates)
}

function logif(input,output){
       // console.log(output)
}