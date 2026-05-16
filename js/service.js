//11 - виджет квиз
const quizData = [
    {
        question: "Какая ваша основная цель?",
        options: ["Похудеть", "Набрать массу", "Поддерживать форму"],
    },
    {
        question: "Сколько раз в неделю планируете заниматься?",
        options: ["1-2 раза", "3-4 раза", "5 и более"],
    },
    {
        question: "Нужна ли вам помощь с питанием?",
        options: ["Да, обязательно", "Справлюсь сам", "Хочу только консультацию"],
    }
];

let currentStep = 0;
const container = document.querySelector('.quiz__card');
const btnElem = document.querySelector('.quiz__button');

function showQuestion() {
    const data = quizData[currentStep];
    container.innerHTML = `<h3 class="quiz__question">${data.question}</h3>
    <div class="quiz__options">
    ${data.options.map(o => `<button class="quiz__opt-btn">${o}</button>`).join('')}
    </div>`;
    document.querySelectorAll('.quiz__opt-btn').forEach(btn => btn.addEventListener('click', nextClick));

}
function nextClick() {
    currentStep++;
    if (currentStep >= quizData.length) {
        container.innerHTML = `<h3 class="quiz__title">Ваш идеальный вариант:</h3>
<p class="quiz__result-text">На основе ваших ответов, мы рекомендуем тариф <strong>"Безлимит"</strong> и консультацию нутрициолога.</p>
    <button class="button quiz__button" onclick="location.reload()"=>Пройти еще раз</button>`;
        currentStep = 0;
        return;
    };

    showQuestion();
}
btnElem.addEventListener('click', showQuestion);




const btnCost = document.querySelector('#calcCostBtn');
const calcCost = btnCost.closest('#calcCost');
document.querySelectorAll('.form-select-item').forEach(item => {
    item.addEventListener('click', (e) => {
        const btn = calcCost.querySelector('.form-select-button');
        console.log(item.dataset.price)
        if (item.dataset.price) {
            btn.dataset.price = item.dataset.price
        }

    })
})
//13
btnCost.addEventListener('click', () => {
    const selectedPrice = +calcCost.querySelector('.form-select-button').dataset.price;
    const selectedMonth = calcCost.querySelector('.calc__row-input').value;
     console.log(selectedMonth, selectedPrice)
    const messElem = calcCost.querySelector('.calc__mess');
    if (selectedMonth <= 0) {
        messElem.classList.add('calc__mess--active');
        messElem.textContent = 'Введите корректное число!';
        return;
    }
    messElem.classList.remove('calc__mess--active');
        const cost = selectedMonth * selectedPrice;
    calcCost.querySelector('.calc__res').classList.add('calc__res--active')
    calcCost.querySelector('.calc__res-info').textContent = `Цена за ${selectedMonth} месяцев - ${cost}р.`;

})