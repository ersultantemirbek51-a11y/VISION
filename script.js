// ---------- LOAD THEME ----------

if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark-theme");

}
// ---------- ГЛАВНАЯ СТРАНИЦА ----------

const startButton = document.getElementById("startButton");
const infoButton = document.getElementById("infoButton");
const heroLens = document.querySelector(".lens");

if (startButton) {
    startButton.addEventListener("click", () => {

        alert(
            "Добро пожаловать в Vision.\n\n" +
            "Сначала мы познакомимся с тем, как работает твоё зрение."
        );

    });
}

if (infoButton) {
    infoButton.addEventListener("click", () => {

        alert(
            "Разделы Vision:\n\n" +
            "• Vision Lab\n" +
            "• Vision Training\n" +
            "• Vision Care\n" +
            "• My Vision"
        );

    });
}

if (heroLens) {

    document.addEventListener("mousemove", (event) => {

        const x = event.clientX / window.innerWidth;
        const y = event.clientY / window.innerHeight;

        heroLens.style.transform =
            `translate(${x * 20}px, ${y * 20}px)`;

    });

}



// ---------- КАК УСТРОЕН ГЛАЗ ----------

const frontEye = document.querySelector(".front-eye");
const backEye = document.querySelector(".back-eye");

const title = document.getElementById("partTitle");
const text = document.getElementById("partText");
const hint = document.querySelector(".hint");

function clearActive() {

    document.querySelectorAll(".hotspot").forEach(item => {

        item.classList.remove("active");

    });

}

if (frontEye) {

    frontEye.addEventListener("click", () => {

        clearActive();

        frontEye.classList.add("active");

        if (hint) {
            hint.style.display = "none";
        }

        if (title) {
            title.textContent = "Передняя часть глаза";
        }

        if (text) {

            text.innerHTML = `
<b>Роговица</b><br>
Прозрачная передняя оболочка глаза. Она защищает глаз и первой преломляет свет.<br><br>

<b>Радужка</b><br>
Цветная часть глаза. Она регулирует количество света, которое попадает внутрь глаза.<br><br>

<b>Зрачок</b><br>
Отверстие в центре радужки, через которое проходит свет.
`;

        }

    });

}

if (backEye) {

    backEye.addEventListener("click", () => {

        clearActive();

        backEye.classList.add("active");

        if (hint) {
            hint.style.display = "none";
        }

        if (title) {
            title.textContent = "Задняя часть глаза";
        }

        if (text) {

            text.innerHTML = `
<b>Сетчатка</b><br>
Воспринимает свет и преобразует его в нервные сигналы.<br><br>

<b>Зрительный нерв</b><br>
Передаёт сигналы в головной мозг, где формируется изображение.
`;

        }

    });

}




// ---------- Проверка ответов ----------


function checkAnswer(button, correct) {


    if (correct) {

        button.style.background = "#8ed6a5";
        button.style.color = "#164d2a";


    } else {

        button.style.background = "#f3a0a0";
        button.style.color = "#5c1717";

    }



    button.parentElement
    .querySelectorAll("button")
    .forEach(btn => {

        btn.disabled = true;

    });

}





// ---------- Страница "Цветовое зрение" ----------


const cones = document.querySelectorAll(".cone");

const infoTitle = document.querySelector(".color-info h3");
const infoText = document.querySelector(".color-info p");


let studiedCones = new Set();



if (cones.length > 0) {


    cones.forEach(cone => {


        cone.addEventListener("click", () => {


            if (infoTitle && infoText) {


                infoTitle.textContent = cone.dataset.title;

                infoText.textContent = cone.dataset.text;


            }



            studiedCones.add(cone);



            if (studiedCones.size === 3) {


                setTimeout(() => {


                    const conesBlock =
                    document.querySelector(".color-cones");


                    const brainSection =
                    document.querySelector(".brain-color-section");



                    if (conesBlock) {

                        conesBlock.classList.add("hide-cones");

                    }



                    if (brainSection) {

                        brainSection.classList.add("show");

                    }



                }, 1000);


            }


        });


    });


}

let movementFrame = null;

const startFocus =
document.getElementById("startFocus");

const trainingList =
document.querySelector(".training-list");

const trainingWarning =
document.querySelector(".training-warning");

const articleHeader =
document.querySelector(".article-header");

const focusTraining =
document.getElementById("focusTraining");

const countdown =
document.getElementById("countdown");

const prepareStage =
document.getElementById("prepareStage");

const exerciseStage =
document.getElementById("exerciseStage");

const resultStage =
document.getElementById("resultStage");

const target =
document.getElementById("focusTarget");

const resultScore =
document.getElementById("resultScore");

let clearTime = null;
let canClick = false;


if (startFocus) {

    startFocus.onclick = () => {

        if (articleHeader) {
            articleHeader.style.display = "none";
        }

        if (trainingWarning) {
            trainingWarning.style.display = "none";
        }

        if (trainingList) {
            trainingList.style.display = "none";
        }

        if (focusTraining) {
            focusTraining.classList.add("active");
        }

        if (prepareStage) {
            prepareStage.style.display = "flex";
        }

        if (exerciseStage) {
            exerciseStage.style.display = "none";
        }

        if (resultStage) {
            resultStage.classList.remove("active");
        }

        startCountdown();

    };

}


function startCountdown() {

    let time = 2;

    countdown.textContent = time;

    const timer = setInterval(() => {

        time--;

        countdown.textContent = time;

        if (time <= 0) {

            clearInterval(timer);

            prepareStage.style.display = "none";

            startExercise();

        }

    }, 1000);

}





function startExercise(){

    exerciseStage.style.display = "block";

    startTargetMovement();

    target.style.filter = "blur(10px)";
    target.style.opacity = ".7";

    canClick = false;

    const selected =
    document.querySelector(
        'input[name="focus-time"]:checked'
    ).value;

    let min;
    let max;

    if(selected === "10"){

        min = 3000;
        max = 7000;

    }
    else if(selected === "20"){

        min = 8000;
        max = 15000;

    }
    else{

        min = 15000;
        max = 25000;

    }

    const moment =
    Math.random() * (max - min) + min;

    setTimeout(()=>{

        target.style.filter = "blur(0px)";
        target.style.opacity = "1";

        clearTime = Date.now();

        canClick = true;

    }, moment);


    setTimeout(()=>{

        target.style.filter = "blur(10px)";
        target.style.opacity = ".7";

        canClick = false;

    }, moment + 2000);

}







if (target) {

    target.onclick = () => {

        if (!canClick) {

            console.log("Рано");
            return;

        }

        const clickTime = Date.now();

        const result =
        Math.abs(clickTime - clearTime);

        exerciseStage.style.display = "none";

        resultStage.classList.add("active");

        resultScore.textContent =
        result + " мс";

        canClick = false;

localStorage.setItem(
"firstTraining",
"true"
);

saveTraining(1);
saveHistory("Фокус");

if(movementFrame){

    cancelAnimationFrame(movementFrame);

    movementFrame=null;

}

    };

}

const repeatTraining =
document.getElementById("repeatTraining");


if (repeatTraining) {

    repeatTraining.onclick = () => {

        resultStage.classList.remove("active");

        exerciseStage.style.display = "block";

        startExercise();

    };

}



function startTargetMovement() {

    if (movementFrame) {

        cancelAnimationFrame(movementFrame);

    }

    let x = 100;
    let y = 100;

    let speedX = 1.2;
    let speedY = 0.9;

    function move() {

        x += speedX;
        y += speedY;

        const area =
        document.querySelector(".focus-area");

        if (!area) return;

        const maxX =
        area.clientWidth - target.offsetWidth;

        const maxY =
        area.clientHeight - target.offsetHeight;

        if (x <= 0 || x >= maxX) {

            speedX *= -1;

        }

        if (y <= 0 || y >= maxY) {

            speedY *= -1;

        }

        target.style.transform =
        `translate(${x}px, ${y}px)`;

        movementFrame =
        requestAnimationFrame(move);

    }

    move();

}



const backTraining =
document.getElementById("backTraining");


if (backTraining) {

    backTraining.onclick = () => {

        resultStage.classList.remove("active");

        focusTraining.classList.remove("active");

        articleHeader.style.display = "block";

        trainingWarning.style.display = "block";

        trainingList.style.display = "flex";

        prepareStage.style.display = "flex";

        exerciseStage.style.display = "none";

    };

}
// ---------- COLOR TRAINING ----------

const startColor =
document.getElementById("startColor");

const colorTraining =
document.getElementById("colorTraining");


if (startColor) {

    startColor.onclick = () => {

        const selectedLevel =
        document.querySelector(
            'input[name="color-level"]:checked'
        );

        if (!selectedLevel) return;

        colorMaxLevel =
        Number(selectedLevel.value);

        colorLevel = 1;
        colorMistakes = 0;

        if (articleHeader) {
            articleHeader.style.display = "none";
        }

        if (trainingWarning) {
            trainingWarning.style.display = "none";
        }

        if (trainingList) {
            trainingList.style.display = "none";
        }

        focusTraining.classList.remove("active");

        colorTraining.classList.add("active");

        colorGame.classList.remove("active");
        colorResult.classList.remove("active");

        startColorCountdown();

    };

}


// ---------- COLOR COUNTDOWN ----------


const colorPrepare =
document.getElementById("colorPrepare");


const colorCountdown =
document.getElementById("colorCountdown");


const colorGame =
document.getElementById("colorGame");



function startColorCountdown(){

    let time = 3;

    colorPrepare.style.display = "block";

    colorGame.classList.remove("active");

    colorCountdown.textContent = time;

    const timer = setInterval(() => {

        time--;

        colorCountdown.textContent = time;

        if (time <= 0) {

            clearInterval(timer);

            colorPrepare.style.display = "none";

            colorGame.classList.add("active");

            colorStartTime = Date.now();

            startColorLevel();

        }

    }, 1000);

}
// ---------- COLOR GAME ----------


const colorGrid =
document.getElementById("colorGrid");


const colorLevelText =
document.getElementById("colorLevel");


const colorMistakesText =
document.getElementById("colorMistakes");



let colorLevel = 1;
let colorMistakes = 0;
let lastSpecialIndex = -1;
let colorMaxLevel = 12;





function startColorLevel(){

    colorLevelText.textContent = colorLevel;
    colorMistakesText.textContent = colorMistakes;

    colorGrid.innerHTML = "";

    let difference;

    if (colorLevel === 1) {

        difference = 30;

    } else if (colorLevel === 2) {

        difference = 27;

    } else if (colorLevel === 3) {

        difference = 23;

    } else if (colorLevel === 4) {

        difference = 17;

    } else if (colorLevel === 5) {

        difference = 13;

    } else if (colorLevel === 6) {

        difference = 10;

    } else if (colorLevel === 7) {

        difference = 8;

    } else {

        difference = 5;

    }

    const amount = 9;

    let specialIndex;

    do {

        specialIndex =
        Math.floor(Math.random() * amount);

    } while (specialIndex === lastSpecialIndex);

    lastSpecialIndex = specialIndex;

    const baseColor =
    Math.floor(Math.random() * 360);



for (let i = 0; i < amount; i++) {

    const circle =
    document.createElement("div");

    circle.className = "color-circle";

    if (i === specialIndex) {

        circle.style.background =
        `hsl(${baseColor},70%,${50 + difference / 2}%)`;

    } else {

        circle.style.background =
        `hsl(${baseColor},70%,50%)`;

    }

    circle.onclick = () => {

        if (i === specialIndex) {

            colorLevel++;

            if (colorLevel > colorMaxLevel) {

                finishColorTraining();
                return;

            }

            startColorLevel();

        } else {

            colorMistakes++;

            colorMistakesText.textContent =
            colorMistakes;

        }

    };

    colorGrid.appendChild(circle);

}


}
// ---------- COLOR RESULT ----------


const colorResult =
document.getElementById("colorResult");


const colorFinished =
document.getElementById("colorFinished");


const colorErrors =
document.getElementById("colorErrors");


const colorTime =
document.getElementById("colorTime");



let colorStartTime = null;



function finishColorTraining(){

    colorGame.classList.remove("active");

    colorResult.classList.add("active");

    // открываем первое достижение
localStorage.setItem(
    "firstTraining",
    "true"
);

saveTraining(1);
saveHistory("Цветовое внимание");

    colorFinished.textContent =
    String(colorMaxLevel);

    colorErrors.textContent =
    colorMistakes;

    const totalTime =
    Math.floor(
        (Date.now() - colorStartTime) / 1000
    );

    colorTime.textContent =
    totalTime + " сек";

}
// ---------- COLOR BUTTONS ----------

const repeatColor =
document.getElementById("repeatColor");

const backColor =
document.getElementById("backColor");


if (repeatColor) {

    repeatColor.onclick = () => {

        colorResult.classList.remove("active");

        colorLevel = 1;
        colorMistakes = 0;

        colorPrepare.style.display = "block";

        startColorCountdown();

    };

}


if (backColor) {

    backColor.onclick = () => {

        colorResult.classList.remove("active");

        colorTraining.classList.remove("active");

        if (articleHeader) {
            articleHeader.style.display = "block";
        }

        if (trainingWarning) {
            trainingWarning.style.display = "block";
        }

        if (trainingList) {
            trainingList.style.display = "flex";
        }

    };

}

// ---------- SAVE TRAINING ----------

function saveTraining(minutes){

    let trainings =
    Number(localStorage.getItem("totalTrainings") || 0);

    let totalMinutes =
    Number(localStorage.getItem("totalMinutes") || 0);

    trainings++;
    totalMinutes += minutes;

    localStorage.setItem(
        "totalTrainings",
        trainings
    );

    localStorage.setItem(
        "totalMinutes",
        totalMinutes
    );

    localStorage.setItem(
        "lastTraining",
        "Сегодня"
    );

}
// ---------- SAVE HISTORY ----------

function saveHistory(type){

    let history =
    JSON.parse(
        localStorage.getItem("trainingHistory") || "[]"
    );


    history.unshift({

        name: type,

        date: "Сегодня"

    });


    // максимум 50 записей

    if(history.length > 50){

        history = history.slice(0,50);

    }


    localStorage.setItem(
        "trainingHistory",
        JSON.stringify(history)
    );

}

// ---------- MY VISION GOAL ----------

const goalInput =
document.querySelector(".goal-input");

if (goalInput) {

    goalInput.value =
    localStorage.getItem("visionGoal") || "";

    goalInput.addEventListener("input", () => {

        localStorage.setItem(
            "visionGoal",
            goalInput.value
        );

    });

}



// ---------- MY VISION ACHIEVEMENTS ----------

const achievements =
document.getElementById("achievements");


if(achievements){

    const trainings =
    Number(
        localStorage.getItem("totalTrainings") || 0
    );


    let result = "";


    if(trainings >= 1){

       result += `
    <div class="achievement-item">
        <strong>Первые шаги</strong>
        <p>
            Ты завершил свою первую тренировку.
        </p>
    </div>
`;

    }


    if(trainings >= 5){

       result += `
    <div class="achievement-item">
        <strong>Начало привычки</strong>
        <p>
            Ты начал формировать привычку
        </p>
    </div>
`;

    }


    if(trainings >= 10){

        result += `
    <div class="achievement-item">
        <strong>Постоянство</strong>
        <p>
            Ты прошел 10 тренировок
        </p>
    </div>
`;

    }


    if(result === ""){

        result = `
            <p>
                Пока нет открытых достижений.
            </p>
        `;

    }


    achievements.innerHTML = result;

}

// ---------- MY VISION STATS ----------

const totalTrainings =
document.getElementById("totalTrainings");

const totalMinutes =
document.getElementById("totalMinutes");

const lastTraining =
document.getElementById("lastTraining");


if (totalTrainings && totalMinutes && lastTraining) {

    totalTrainings.textContent =
    localStorage.getItem("totalTrainings") || "0";

    totalMinutes.textContent =
    (localStorage.getItem("totalMinutes") || "0") + " минут";

    lastTraining.textContent =
    localStorage.getItem("lastTraining") || "—";

}
// ---------- MY VISION HISTORY ----------

const trainingHistory =
document.getElementById("trainingHistory");


if(trainingHistory){

    const history =
    JSON.parse(
        localStorage.getItem("trainingHistory") || "[]"
    );


    if(history.length > 0){

        trainingHistory.innerHTML = "";


        history.forEach(item => {


            trainingHistory.innerHTML += `

                <p>
                    <strong>${item.date}</strong><br>
                    • ${item.name}
                </p>

            `;


        });


    }else{

        trainingHistory.innerHTML = `

            <p>
                Пока нет тренировок.
            </p>

        `;

    }

}
// ---------- CLEAR HISTORY ----------

const clearHistory =
document.getElementById("clearHistory");


if(clearHistory){

    clearHistory.onclick = ()=>{


        localStorage.removeItem(
            "trainingHistory"
        );


        trainingHistory.innerHTML = `

            <p>
                Пока нет тренировок.
            </p>

        `;


    };

}
// ---------- SETTINGS PANEL ----------

const settingsButton =
document.querySelector(".profile-settings");


const settingsPanel =
document.getElementById("settingsPanel");


if(settingsButton && settingsPanel){

    settingsButton.onclick = ()=>{

        settingsPanel.classList.toggle("active");

    };

}
// ---------- TEXT SIZE SETTING ----------

const normalText =
document.getElementById("normalText");

const largeText =
document.getElementById("largeText");


if(normalText && largeText){


    if(localStorage.getItem("textSize") === "large"){

        document.body.classList.add("large-text");

    }


    normalText.onclick = ()=>{

        document.body.classList.remove("large-text");

        localStorage.setItem(
            "textSize",
            "normal"
        );

    };


    largeText.onclick = ()=>{

        document.body.classList.add("large-text");

        localStorage.setItem(
            "textSize",
            "large"
        );

    };


}
// ---------- THEME SETTING ----------

const lightTheme =
document.getElementById("lightTheme");

const darkTheme =
document.getElementById("darkTheme");


if(lightTheme && darkTheme){


    if(localStorage.getItem("theme") === "dark"){

        document.body.classList.add("dark-theme");

    }


    lightTheme.onclick = ()=>{

        document.body.classList.remove("dark-theme");


        localStorage.setItem(
            "theme",
            "light"
        );

    };


 darkTheme.onclick = ()=>{

    document.body.classList.add("dark-theme");

    localStorage.setItem(
        "theme",
        "dark"
    );

};

}

// ---------- SETTINGS : REMINDERS + MUSIC ----------

// Напоминания

if (localStorage.getItem("reminders") === null) {
    localStorage.setItem("reminders", "on");
}

const remindersOn = document.getElementById("remindersOn");
const remindersOff = document.getElementById("remindersOff");

if (remindersOn) {

    remindersOn.onclick = () => {

        localStorage.setItem("reminders", "on");

    };

}

if (remindersOff) {

    remindersOff.onclick = () => {

        localStorage.setItem("reminders", "off");

    };

}




// ---------- BREAK REMINDER ----------

const reminderOverlay =
document.getElementById("reminderOverlay");

const closeReminder =
document.getElementById("closeReminder");


if(reminderOverlay && closeReminder){

    function showReminder(){

        if(localStorage.getItem("reminders") !== "off"){

            reminderOverlay.classList.add("show");

        }

    }


    closeReminder.onclick = ()=>{

        reminderOverlay.classList.remove("show");

    };


    setInterval(showReminder, 5*60*1000);

}