
//start button begin quiz
function handleStart() {
    $(".js-start-btn").on('click', function(event) {
        console.log("Start");
        renderQuestion();
    });
}

//update score
function showScore() {
    $(".progress .score").text(`Score: ${STORE.score}/${STORE.questions.length}`); 
}
//update question number
function questionCount() {
    $(".progress .question-count").text(`Question ${STORE.numberQuestion + 1} of ${STORE.questions.length}`);
}

function renderOption() {
    let question = STORE.questions[STORE.numberQuestion];
    for (let i = 0; i < question.options.length; i++) {
        $('.options').append(`
        <input id="option${i+1}" type="radio" name="option1" value= "${question.options[i]}">
        <label for="option${i+1}"> ${question.options[i]}
        </label> <br/>
        <span id="js-r${i+1}"></span>
        `);
    }
    console.log('renderOption');
}

function renderQuestion() {
    let question = STORE.questions[STORE.numberQuestion];
    showScore();
    questionCount();
    const html = $(`
    <form id="js-question" class="question-form">\
        <legend> ${question.question}</legend>\
        <hr>\
        <div class="options">\
        </div>\
        <button type="submit" id="answer" value="Submit" class="submit-btn js-submit-btn">Submit</button>\
        <button type="button" id="next-question"> Next </button>\
    </form>`)
    console.log('renderQuestion');
    $("main").html(html);
    renderOption();
    $("#next-question").hide();
}

//show score
function finalResults() {
    let final = $(`
    <h4></h4>
    <section class="correct">
        <span class="count"></span>
    </section>
    <section class="incorrect">
        <span class="count"></span>
    </section>
    <input type="button" id="restart" class="restart-btn js-restart-btn" value="Restart">`)
    $("main").html(final);
    $("h4").text("Score: " + ((STORE.score / STORE.numberQuestion) * 100));
    $(".correct .count").text("Correct: " + STORE.score);
    $(".incorrect .count").text("Incorrect: " + (STORE.numberQuestion - STORE.score));
}

//make submit button work
function submitAnswer() {
    $('body').on('click', '#next-question', (event) => {
        console.log("Submit");
        STORE.numberQuestion === STORE.questions.length?
        finalResults() : renderQuestion();
    });
    console.log('submitAnswer');
}

//check if answer selected is right or wrong
function verifyAnswer() {
    $('body').on("submit", '#js-question', function(event) {
        event.preventDefault();
        let currentQues = STORE.questions[STORE.numberQuestion];
        var radioValue = $("input[name=option1]:checked").val();
        if (!radioValue) {
            alert("Choose an option");
            return;
        }
        let id_num = currentQues.options.findIndex(i => i === radioValue);
        let id = "#js-r" + ++id_num;
        if(radioValue === currentQues.answer) {
            STORE.score++;
            $(`${id}`).append('Correct!');
            $(`${id}`).addClass("right");
        }
        else{
            $(`${id}`).append(`Wrong answer <br/> The answer is '${currentQues.answer}'<br/>`);
            $(`${id}`).addClass("wrong");
        }

        STORE.numberQuestion++
        $(".score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
        $('#answer').hide();
        $("input[type=radio]").attr('disabled', true);
        $('#next-question').show();
    });
    console.log('verifyAnswer');
}

//erase score and question number
function startAgain() {
    STORE.numberQuestion = 0;
    STORE.score = 0;
}
//restart quiz with button
function restart() {
    $("body").on("click", '#restart', (event) => {
        startAgain();
        renderQuestion();
    })
}
//function to run all functions
function runAll() {
    handleStart();
    submitAnswer();
    verifyAnswer();
    restart();
}

$(runAll);