<template>
    <html>
    <head>
        <title>Join | jknjknkjnk</title>
        <link rel = "stylesheet" href = "css/index.css">
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
    <h1 id = "title">Join a kmlklm</h1>
    <form action="/player/">
        <div class="form-field">
            <label id = "label">Display Name</label>
            <input id = "name" type = "text" name="name" autofocus/>
        </div>
        <br>
        <div class="form-field">
            <label id = "label">Game Pin</label>
            <input id = "pin" type="number" name="pin"/>
        </div>
        <br>
        <div class="form-field">
            <button id = "joinButton">Join</button>
        </div>
    </form>
    <br/>
    <center><a href = "/create/" id = "host">Click here to host a Kahoot!</a></center>
    </body>
    </html>
</template>

<script>
    export default {
        name: "index"
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
        font-family: 'Raleway', sans-serif;
        text-align: center;
        font-size: 50px;
        color: white;
    }
    #name{
        width: 50%;
        padding: 12px 0px;
        margin: 8px 0;
        display: block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        margin-right: auto;
        margin-left: auto;
        font-size: 20px;
        text-align: center;
    }
    #pin{
        width: 50%;
        padding: 12px 0px;
        margin: 8px 0;
        display: block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        margin-right: auto;
        margin-left: auto;
        font-size: 20px;
        text-align: center;
    }
    #label{
        display: block;
        text-align: center;
        font-size: 25px;
        font-family: 'Raleway', sans-serif;
        color: white;
    }
    #host{
        color: white;
        text-decoration: none;
    }
    #host:hover{
        text-decoration:underline;
    }
    #joinButton{
        width: 50%;
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        display: block;
        margin-right: auto;
        margin-left: auto;
        font-size: 20px;
        background-color: #3A3B3A;
        font-family: 'Raleway', sans-serif;
    }
</style>