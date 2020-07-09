//Make Start button function.
function startQuiz() {
    $("#start").on("click", function(event) {
        console.log("Start")
        nextQuestions();
    });
}

function totalScore() {

}

//update question number and score.
function questionNumber() {
    STORE.numberQuestion = numberQuestion++;
    $("questionNumber").text(STORE.score);
}

//Display question from STORE.
function nextQuestions() {
    let question = STORE.questions[STORE.numberQuestion];
    questionNumber();
    totalScore();
    const questionHtml = $(`<form id="question-container" class="hide">
    <div id="question">${questions.question}</div>
    <div id="answer-buttons" class="btn-grid">
        <button class="btn">Answer 1</button>
        <button class="btn">Answer 2</button>
        <button class="btn">Answer 3</button>
        <button class="btn">Answer 4</button>
    </div>
</form>`)

    }
}


//Display options.


//display total score and restart quiz button.


//determine if chosen answer is correct or wrong with feedback.


//function to call al functions.