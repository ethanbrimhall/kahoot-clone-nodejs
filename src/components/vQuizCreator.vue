<template>
    <body onload = "setBGColor()">
    <h1 id = "title">Kahoot Quiz Creator Studio</h1>

    <div class="form-field">
        <label id = "quizTitle">Quiz Title</label>
        <input id = "name" type = "text" name="name" autofocus/>
    </div>
    <br>
    <br>
    <div id = "allQuestions">
        <div id="question-field">
            <label>Question 1: </label>
            <input class = "question" id = "q1" type = "text" autofocus/>
            <br>
            <br>
            <label>Answer 1: </label>
            <input id = "1a1" type = "text" autofocus/>
            <label>Answer 2: </label>
            <input id = "1a2" type = "text" autofocus/>
            <br>
            <br>
            <label>Answer 3: </label>
            <input id = "1a3"  type = "text" autofocus/>
            <label>Answer 4: </label>
            <input id = "1a4"  type = "text" autofocus/>
            <br>
            <br>
            <label>Correct Answer (1-4) :</label>
            <input class = "correct" id = "correct1"  type = "number" autofocus/>
        </div>
    </div>
    <br>
    <button onclick = "this.addQuestion()">Add another question</button>

    <br>
    <br>

    <div class="form-field">
        <button onclick = "this.updateDatabase()">Create Quiz</button>
    </div>

    <br>

    <button onclick = 'this.cancelQuiz()'>Cancel quiz and return to quiz selection</button>
    </body>
</template>

<script>
    var socket = this.io()
    var questionNum = 1

    export default {
        name: "vquizCreator",

        methods: {

            updateDatabase(){
                var questions = [];
                var name = document.getElementById('name').value;

                for(var i = 1; i <= questionNum; i++){
                    var question = document.getElementById('q' + i).value;
                    var answer1 = document.getElementById(i + 'a1').value;
                    var answer2 = document.getElementById(i + 'a2').value;
                    var answer3 = document.getElementById(i + 'a3').value;
                    var answer4 = document.getElementById(i + 'a4').value;
                    var correct = document.getElementById('correct' + i).value;
                    var answers = [answer1, answer2, answer3, answer4];
                        questions.push({"question": question, "answers": answers, "correct": correct
                    })
                }
                var quiz = {id: 0, "name": name, "questions": questions};
                socket.emit('newQuiz', quiz);
            },

            addQuestion() {
                questionNum += 1;

                var questionsDiv = document.getElementById('allQuestions');

                var newQuestionDiv = document.createElement("div");
                var questionLabel = document.createElement('label');
                var questionField = document.createElement('input');

                var answer1Label = document.createElement('label');
                var answer1Field = document.createElement('input');

                var answer2Label = document.createElement('label');
                var answer2Field = document.createElement('input');

                var answer3Label = document.createElement('label');
                var answer3Field = document.createElement('input');

                var answer4Label = document.createElement('label');
                var answer4Field = document.createElement('input');

                var correctLabel = document.createElement('label');
                var correctField = document.createElement('input');

                questionLabel.innerHTML = "Question " + String(questionNum) + ": ";
                questionField.setAttribute('class', 'question');
                questionField.setAttribute('id', 'q' + String(questionNum));
                questionField.setAttribute('type', 'text');

                answer1Label.innerHTML = "Answer 1: ";
                answer2Label.innerHTML = " Answer 2: ";
                answer3Label.innerHTML = "Answer 3: ";
                answer4Label.innerHTML = " Answer 4: ";
                correctLabel.innerHTML = "Correct Answer (1-4): ";

                answer1Field.setAttribute('id', String(questionNum) + "a1");
                answer1Field.setAttribute('type', 'text');
                answer2Field.setAttribute('id', String(questionNum) + "a2");
                answer2Field.setAttribute('type', 'text');
                answer3Field.setAttribute('id', String(questionNum) + "a3");
                answer3Field.setAttribute('type', 'text');
                answer4Field.setAttribute('id', String(questionNum) + "a4");
                answer4Field.setAttribute('type', 'text');
                correctField.setAttribute('id', 'correct' + String(questionNum));
                correctField.setAttribute('type', 'number');

                newQuestionDiv.setAttribute('id', 'question-field');//Sets class of div

                newQuestionDiv.appendChild(questionLabel);
                newQuestionDiv.appendChild(questionField);
                newQuestionDiv.appendChild(document.createElement('br'));
                newQuestionDiv.appendChild(document.createElement('br'));
                newQuestionDiv.appendChild(answer1Label);
                newQuestionDiv.appendChild(answer1Field);
                newQuestionDiv.appendChild(answer2Label);
                newQuestionDiv.appendChild(answer2Field);
                newQuestionDiv.appendChild(document.createElement('br'));
                newQuestionDiv.appendChild(document.createElement('br'));
                newQuestionDiv.appendChild(answer3Label);
                newQuestionDiv.appendChild(answer3Field);
                newQuestionDiv.appendChild(answer4Label);
                newQuestionDiv.appendChild(answer4Field);
                newQuestionDiv.appendChild(document.createElement('br'));
                newQuestionDiv.appendChild(document.createElement('br'));
                newQuestionDiv.appendChild(correctLabel);
                newQuestionDiv.appendChild(correctField);

                questionsDiv.appendChild(document.createElement('br'));//Creates a break between each question
                // questionsDiv.appendChild(newQuestionDiv);//Adds the question div to the screen

                newQuestionDiv.style.backgroundColor = this.randomColor();
            },

            //Called when user wants to exit quiz creator
            cancelQuiz(){
                if (confirm("Are you sure you want to exit? All work will be DELETED!")) {
                    window.location.href = "../";
                }
            },

            randomColor(){
                var colors = ['#4CAF50', '#f94a1e', '#3399ff', '#ff9933'];
                var randomNum = Math.floor(Math.random() * 4);
                return colors[randomNum];
            },

/*            setBGColor(){
                var randColor = randomColor();
                document.getElementById('question-field').style.backgroundColor = randomColor();
            }*/
        }
    }



</script>

<style scoped>
    #question-field{
        border-style: groove;
        border-width: 1px;
        padding: 10px;
        font-family: 'Raleway', sans-serif;
    }
    .question{
        width: 400px;
        font-family: 'Raleway', sans-serif;
    }
    .correct{
        width: 50px;
        text-align: center;
        font-family: 'Raleway', sans-serif;
    }
    #title{
        text-align: center;
        font-family: 'Raleway', sans-serif;
    }
    #quizTitle{
        font-family: 'Raleway', sans-serif;
    }

</style>