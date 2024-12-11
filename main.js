function start(){
    document.getElementById('game').innerHTML = `
    <h1>Please enter number of players</h1>
    <input class="boxthing" id="noplay" type="text">
    <h1>Please enter prompt ID (if applicable)</h1>
    <input class="boxthing" id="pidbox" type="text">
    <input type="button" value="click to begin" class="btn1" onclick="start2()">`
}

function start2(){
    prompts()
    var players = document.getElementById('noplay').value
    localStorage.setItem('playernum', players)
    document.getElementById('game').innerHTML = `
    <h4>Please enter name of player 1</h4>
    <input class="boxthing" id="play1" type="text">`
    for(var i = 2;+ i <= players; i++){
        document.getElementById('game').innerHTML += `
        <h4>Please enter name of player ${i}</h4>
        <input class="boxthing" id="play${i}" type="text">`
    }
    document.getElementById('game').innerHTML += `<div><img /></div><input type="button" value="click to proceed" class="btn1" onclick="start3()">`
}

function start3(){
    var ansType = Math.floor(Math.random() * 3)
    var players = localStorage.getItem('playernum')
    var playerArray = []
    var playerArray2 = []
    var answers = []
    var prmt = []
    for(var i = 1;+ i <= players; i++){
        var playerName = document.getElementById(`play${i}`).value
        playerArray.push(playerName)
        answers.push('null')
        prmt.push('null')
    }
    if(ansType == 0){
        var player1 = playerArray[0]
        for(var i = 2;+ i <= players; i++){
            var playerName = document.getElementById(`play${i}`).value
            playerArray2.push(playerName)
        }
        playerArray2.push(player1)
    }
    else if(ansType == 1){
        var player1 = playerArray[0]
        var player2 = playerArray[1]
        for(var i = 3;+ i <= players; i++){
            var playerName = document.getElementById(`play${i}`).value
            playerArray2.push(playerName)
        }
        playerArray2.push(player1)
        playerArray2.push(player2)
    }
    else if(ansType == 2){
        var playerN = playerArray[players-1]
        playerArray2.push(playerN)
        for(var i = 1; i < players; i++){
            var playerName = document.getElementById(`play${i}`).value
            playerArray2.push(playerName)
        }
    }
    else{
        var val = Math.floor(players/2)
        for(var i = val; i <= players; i++){
            var playerName = document.getElementById(`play${i}`).value
            playerArray2.push(playerName)
        }
        for(var i = 1; i < val; i++){
            var playerName = document.getElementById(`play${i}`).value
            playerArray2.push(playerName)
        }
    }
    localStorage.setItem("allPlayers", JSON.stringify(playerArray));
    localStorage.setItem("allPlayers2", JSON.stringify(playerArray2));
    localStorage.setItem("playanswers", JSON.stringify(answers));
    localStorage.setItem("playprompts", JSON.stringify(prmt));
    gameplay1(1)
}

function gameplay1(i){
    var Players = JSON.parse(localStorage.getItem("allPlayers"))
    var Player = i-1;
    var next = i
        document.getElementById('game').innerHTML = `
        <h1>${Players[Player]} is up</h1>
        <input type="button" value="click to proceed" class="btn1" onclick="gameplay2(${next})">`

}

function gameplay2(i){
    var Players = JSON.parse(localStorage.getItem("allPlayers"))
    var Player = i-1;
    var prompts = JSON.parse(localStorage.getItem("prompts"))
    var prompts2 = JSON.parse(localStorage.getItem("playprompts"))
    var prompt = Math.floor(Math.random() * prompts.length)
    prompts2[Player] = prompts[prompt]
    localStorage.setItem("playprompts", JSON.stringify(prompts2));
    var next = i
    document.getElementById('game').innerHTML = `
    <h1>${Players[Player]}, ${prompts[prompt]}</h1>
    <input class="boxthing" id="answ" type="text">
    <input type="button" value="click to submit" class="btn1" onclick="gameplay3(${next})">`
}

function gameplay3(i){
    var Player = i-1;
    var answers = JSON.parse(localStorage.getItem("playanswers"))
    var next = i + 1
    var max = localStorage.getItem("playernum")
    answers[Player] = document.getElementById(`answ`).value
    localStorage.setItem("playanswers", JSON.stringify(answers));
    if(next <= Math.floor(max)){
        gameplay1(next)
    }
    else{
        gameplay4("e")
    }
}

function gameplay4(i){
    if(i == "e"){
        var Players = JSON.parse(localStorage.getItem("allPlayers2"))
        var Player = Math.floor(Math.random() * Players.length)
        localStorage.setItem("total" , 1)
            document.getElementById('game').innerHTML = `
            <h1>${Players[Player]} is up</h1>
            <input type="button" value="click to proceed" class="btn1" onclick="gameplay5(${Player})">`
    }
    else{
        var index = i
        var Players = JSON.parse(localStorage.getItem("allPlayers"))
        var Players2 = JSON.parse(localStorage.getItem("allPlayers2"))
        var answers = JSON.parse(localStorage.getItem("playanswers"))
        var prompts = JSON.parse(localStorage.getItem("playprompts"))
        var next = Math.floor(localStorage.getItem("total")) + 1
        localStorage.setItem("total" , next)
        Players.splice(index, 1)
        Players2.splice(index, 1)
        answers.splice(index, 1)
        prompts.splice(index, 1)
        localStorage.setItem("allPlayers", JSON.stringify(Players));
        localStorage.setItem("allPlayers2", JSON.stringify(Players2));
        localStorage.setItem("playanswers", JSON.stringify(answers));
        localStorage.setItem("playprompts", JSON.stringify(prompts));
        var Player = Math.floor(Math.random() * Players.length)
        document.getElementById('game').innerHTML = `
        <h1>${Players2[Player]} is up</h1>
        <input type="button" value="click to proceed" class="btn1" onclick="gameplay5(${Player})">`
    }

}

function gameplay5(i){
    var Player = i
    var prompts = JSON.parse(localStorage.getItem("playprompts"))
    var answers = JSON.parse(localStorage.getItem("playanswers"))
    document.getElementById('game').innerHTML = `
    <h1>???, ${prompts[Player]}</h1>
    <h1 style="color:yellow">${answers[Player]}</h1>
    <input class="boxthing" id="answ" type="text">
    <input type="button" value="click to submit" class="btn1" onclick="gameplay6(${Player})">`
}

function gameplay6(i){
    var prompts = JSON.parse(localStorage.getItem("playprompts"))
    var Players = JSON.parse(localStorage.getItem("allPlayers"))
    var Player = i
    var answers = JSON.parse(localStorage.getItem("playanswers"))
    var max = localStorage.getItem("playernum")
    var total = localStorage.getItem("total")
    if(Math.floor(total) < Math.floor(max)){
        var nxtbtn = `gameplay4(${Player})`
    }
    else{
        var nxtbtn = `endgame()`
    }
    if(document.getElementById(`answ`).value == Players[Player]){
        document.getElementById('game').innerHTML = `
        <h1>${Players[Player]}, ${prompts[Player]}</h1>
        <h1 style="color:yellow">${answers[Player]}</h1>
        <h1 style="color:lime">${document.getElementById(`answ`).value} is CORRECT</h1>
        <input type="button" value="click to submit" class="btn1" onclick="${nxtbtn}">`
    }
    else{
        document.getElementById('game').innerHTML = `
        <h1>${Players[Player]}, ${prompts[Player]}</h1>
        <h1 style="color:yellow">${answers[Player]}</h1>
        <h1 style="color:red">${document.getElementById(`answ`).value} is INCORRECT</h1>
        <input type="button" value="click to submit" class="btn1" onclick="${nxtbtn}">`
    }
}

function endgame(){
    document.getElementById('game').innerHTML = `<h1> wow, that was fun! press f5 to play again.</h1>`
}
