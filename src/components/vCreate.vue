<template>
   <html>
   <head>
      <title>Create | KahootClone</title>
      <link rel="stylesheet" href = "../css/create.css">
      <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
   </head>
   <body>
   <a id = "back"href = "../">Back</a>
   <h1 id = "title">Start a Kahoot Game</h1>
   <h4 id = "subtitle">Choose a Game Below or <a id = "link" href = "quiz-creator/">Create your Own!</a></h4>
   <div id = "game-list">

   </div>


   <script src = "../socket.io/socket.io.js"></script>
   <script src = "../../src/assets/js/create.js"></script>
   </body>
   </html>
</template>

<script>
   // import startGame from "../../public/js/create.js"

    export default {
        name: "vCreate"
    }
</script>

<style scoped>
    @keyframes bgcolor {
        100% {
            background-color: #864cbf
        }
    }

    body {
        -webkit-animation: bgcolor 20s infinite;
        animation: bgcolor 10s infinite;
        -webkit-animation-direction: alternate;
        animation-direction: alternate;
    }
    #title{
        color: white;
        text-align: center;
        font-size: 50px;
        font-family: 'Raleway', sans-serif;
    }
    #subtitle{
        color: white;
        text-align: center;
        font-size: 20px;
        font-family: 'Raleway', sans-serif;
    }
    #link{
        color: white;
    }
    #game-list{
        text-align: center;
    }
    #back{
        color: white;
        text-align: center;
    }
    #gameButton{
        font-size:80px;
    }
    #gameButton:hover{
        cursor: pointer;
    }
</style>
