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
    let otherPlayer = playerTurn==1 ? player2:player1;

    if (player.windows==1){
        return {'winrate':1,'possibleChoices':{futures:"Win",'winChance':1}};
    }
    let newName;
    if (playerTurn==1){
        newName = MakeGameStateName(player.windows-1,otherPlayer.windows,otherPlayer.p)
    }else{
        newName = MakeGameStateName(otherPlayer.windows,player.windows-1,otherPlayer.p)
    }
    logif(newName,"playerp is"+player.p)
    logif(newName,"checking old game: "+newName)
    logif(newName,"obj is"+allGameStates[newName])
    newWinRate = allGameStates[newName][player.p]
    logif(newName,newWinRate)
    logif(newName,1/player.windows)
    let guesswinRate = 1/player.windows+newWinRate*(player.windows-1)/player.windows;
    return {'winrate':guesswinRate,'possibleChoices':{'futures':("Win,"+(player.windows-1)+" "+guesswinRate),'winrate':guesswinRate}};
}
function question(player1,player2,playerTurn,allGameStates) {
    let player = playerTurn==1 ? player1:player2;
    let otherPlayer = playerTurn==1 ? player2:player1;
    let winrate = 0;
    let questionAsked=[0,0]
    if (player.windows<=3) {
        //If you can win then you should not ask questions
        //If guessing is the same as asking a question you should not ask questions
        //I could calculate the opponent's same state winchance here but its a waste of time
        //Though for some more complicated things it would be better to do that
        return {"winrate":0,"question":[0,0],"possibleChoices":[]}; 
    }
    let possibleChoices=[]
    for (firstFuture=2;firstFuture<=Math.floor(player.windows/2);firstFuture++){
        let secondFuture = player.windows - firstFuture
        let newName1;
        if (playerTurn==1){
            newName1 = MakeGameStateName(firstFuture,otherPlayer.windows,otherPlayer.p)
        }else{
            newName1 = MakeGameStateName(otherPlayer.windows,firstFuture,otherPlayer.p)
        }
        newWinRate1 = allGameStates[newName1][player.p]
        odds1=firstFuture/player.windows;
        
        

        let newName2;
        if (playerTurn==1){
            newName2 = MakeGameStateName(secondFuture,otherPlayer.windows,otherPlayer.p)
        }else{
            newName2 = MakeGameStateName(otherPlayer.windows,secondFuture,otherPlayer.p)
        }
        newWinRate2 = allGameStates[newName2][player.p]
        odds2=secondFuture/player.windows;

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
                if (GuessPower>QuestionPower) {
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