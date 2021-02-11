const $board = document.getElementById('board');
const $language = document.getElementById('language');
const $display = document.getElementById('display');
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const colors = ['blue', 'green', 'yeloow', 'red', 'gold', 'orange'];
const $audioTag = document.getElementById('audio');
const soundsUrls = {
    wrong: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/wronganswer.mp3',
    correct: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/rightanswer.mp3',
    he: {
        0: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_0.mp3',
        1: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_1.mp3',
        2: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_2.mp3',
        3: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_3.mp3',
        4: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_4.mp3',
        5: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_5.mp3',
        6: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_6.mp3',
        7: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_7.mp3',
        8: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_8.mp3',
        9: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_9.mp3'
    },
    en: {
        0: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_0.en.mp3',
        1: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_1.en.mp3',
        2: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_2.en.mp3',
        3: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_3.en.mp3',
        4: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_4.en.mp3',
        5: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_5.en.mp3',
        6: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_6.en.mp3',
        7: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_7.en.mp3',
        8: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_8.en.mp3',
        9: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_9.en.mp3'
    }
};

const playSound = (language, sound) => {
    $audioTag.src = soundsUrls[language][sound];
    $audioTag.play();
};

const selectedAnswer = ($event) => {

    const isLiElement = $event.target.localName === "li";
    if (!isLiElement) { return false; }

    const currentSelectedAnswer = $event.target.dataset.id;
    const correctAnswer = $board.dataset.answer;
    playSound($language.value, currentSelectedAnswer);

}
const shuffle = (numberArray) => {
    let counter = numberArray.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = numberArray[counter];
        numberArray[counter] = numberArray[index];
        numberArray[index] = temp;
    }
    return numberArray;
}
const createLevel = () => {
    $board.innerHTML = '';
    const random = Math.floor(Math.random() * 10);
    $board.dataset.answer = random;
    const randomNumbers = shuffle(numbers);
    randomNumbers.forEach((number) => {
        const liElement = document.createElement('li');
        liElement.innerText = number;
        liElement.dataset.id = number;
        $board.appendChild(liElement);
    });

    const colorButton = document.createElement('li');
    colorButton.classList.add('color-btn');
    colorButton.dataset.id = '';
    $board.appendChild(colorButton);
    colorButton.innerText = 'color';

}

const show = ($event) => {
    const currentSelectedAnswer = $event.target.dataset.id;
    $display.innerText = currentSelectedAnswer;
    sound = currentSelectedAnswer;

}
const changeColor = ($event) => {
    if ($event.target.dataset.id === '') {
        const randomNumber = Math.random() * colors.length;
        const randomIndex = Math.floor(randomNumber);
        $board.style.backgroundColor = colors[randomIndex];
        $board.style.color = colors[randomIndex];
        $display.style.color = colors[randomIndex];
    }

}
createLevel();
$board.addEventListener('click', selectedAnswer);
$board.addEventListener('click', show);
$board.addEventListener('click', changeColor);
