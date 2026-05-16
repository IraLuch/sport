//5 анимация счетчика
function animationElem(elem, num){

    let currentValue = 0;
    const step = num / 50;
    const interval = setInterval(() => {
        if (currentValue < num){
            currentValue += step;
            currentValue = Math.ceil(currentValue);
            elem.textContent = currentValue;
        }
        if (currentValue >= num){
            
            elem.textContent = num
            clearInterval(interval)
        }
        
    }, 40)
    
    }

const entries = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting){
            animationElem(entry.target, entry.target.dataset.target)
            observer.unobserve(entry.target)
        }
    })
}
const observer = new IntersectionObserver(entries, {
    threshold: 0.5
})
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.coach__stat-digit').forEach(item =>{
        observer.observe(item);
    })
})

//14 вмджет - генерациия тренировки

async function loadData(){
    const responce = await fetch('json/train.json');
    const data = await responce.json();
    const targets = data.targets;
    const exercises=  data.exercises;
    return{targets, exercises};
}
function getRundomKey(obj){
    const keys = Object.keys(obj);
    return keys[Math.floor(Math.random() * keys.length)];

}

document.querySelector('.generator__button').addEventListener('click', async function (e) {
    const {targets, exercises} = await loadData();
    const targetId = getRundomKey(targets);
    const target = targets[targetId];
    console.log(target);
    const muscle = getRundomKey(exercises);
    const exercisesGroup = exercises[muscle].filter(e => e.type.includes(targetId));
    const container = document.querySelector('.generator__box');

    container.innerHTML = `
     <div class="generator__train">
            <div class="generator__header">
                <h3 class="generator__target-title">${target.title}</h3>
                <p class="generator__description">${target.description}</p>
            </div>
    
            <div class="generator__body">
                <div class="generator__scheme">
                    <span class="generator__label">Режим:</span>
                    <p class="generator__scheme-text">${target.scheme}</p>
                </div>
    
                <div class="generator__workout-list">
                    <span class="generator__label">Упражнения:</span>
                    <ul class="generator__list">
                        ${exercisesGroup.map(e => `
                            <li class="generator__list-item">
                                ${e.name}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
    
            <div class="generator__footer">
                <div class="generator__nutrition">
                    <span class="generator__label">Рекомендация по питанию:</span>
                    <p class="generator__nutrition-text">${target.nutrition}</p>
                </div>
            </div>
     </div>

`;



}

)

//16
const focusTips = {
    power: `
        <h3 class="advice__subtitle">Фундамент истинной силы</h3>
        <p class="advice__text">
            Сила — это не просто цифры на блинах, это способность твоего тела работать как единый, отлаженный механизм. 
            Ваш путь к вершине начинается с «золотой троицы»: классического жима лежа, глубокого приседа и мощной становой тяги. 
            Именно эти движения задействуют максимальное количество мышечных волокон и провоцируют мощный гормональный отклик.
        </p>
        <p class="advice__text">
            Помните о принципе прогрессии нагрузок: микропериодизация в 2.5 кг каждую неделю позволит вам стабильно расти, 
            избегая плато. Не забывайте про восстановление — центральная нервная система требует полноценного отдыха 
            между тяжелыми подходами, чтобы в каждой следующей итерации вы были сильнее, чем в предыдущей.
        </p>
    `,
    mobility: `
        <h3 class="advice__subtitle">Искусство долголетия и гибкости</h3>
        <p class="advice__text">
            Многие забывают, что мышцы должны быть не только сильными, но и эластичными. Правильная работа над мобильностью 
            — это ваш страховой полис против травм. Начинайте каждую сессию с динамической разминки: вращения, махи и 
            активация суставов подготовят связки к работе под нагрузкой.
        </p>
        <p class="advice__text">
            После того как основная работа проделана, уделите время статической растяжке и технике миофасциального релиза (МФР). 
            Прокатка на валике поможет снять триггерные точки и улучшить кровоток в тканях. И главное правило: слушайте свое тело. 
            Дискомфорт допустим, но резкая боль — это сигнал немедленно остановиться. Ваша цель — стать гибким атлетом, а не пациентом врача.
        </p>
    `,
    cut: `
        <h3 class="advice__subtitle">Скульптурирование тела и метаболизм</h3>
        <p class="advice__text">
            Рельеф — это математика, помноженная на дисциплину. Ни одно упражнение на пресс не поможет, если не соблюден 
            главный закон термодинамики: дефицит калорий. Вы должны тратить больше, чем потребляете, но делать это с умом, 
            чтобы сохранить с трудом набранную мышечную массу.
        </p>
        <p class="advice__text">
            Держите уровень белка высоким — не менее 2 грамм на килограмм веса. Это строительный материал, который не даст 
            телу «сжигать» мышцы вместо жира. Помимо зала, увеличивайте бытовую активность: долгие прогулки, подъем по лестнице 
            вместо лифта — именно эти мелочи создают тот самый финальный результат, который вы увидите в зеркале.
        </p>
    `
};
const buttons = document.querySelectorAll('.advice__button');  
buttons.forEach(item => {
    item.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('advice__button--active'));
        item.classList.add('advice__button--active');
        const container = document.querySelector('.advice__content');
        container.innerHTML =focusTips[item.dataset.desc];

    })
})

document.querySelectorAll('.form-select-item').forEach(item => {
    item.addEventListener('click', () => {
        const btn = document.querySelector('.form-select-button');
        if (item.dataset.min){
            btn.dataset.min = item.dataset.min;
        }
    })
})

document.querySelector('#calcBurnBtn').addEventListener('click', () => {
    const calcBurn = document.querySelector('#calcBurn');
    const selectedType =+calcBurn.querySelector('.form-select-button').dataset.min;
     const messElem = calcBurn.querySelector('.calc__mess');
     const selectedTime = +calcBurn.querySelector('#inputMin').value;
    const selectedWeigth = +calcBurn.querySelector('#inputWeigth').value;
    if( isNaN(selectedTime) || selectedTime <= 0 ||
        isNaN(selectedWeigth) || selectedWeigth <= 0){
        messElem.classList.add('calc__mess--active');
        messElem.textContent = 'Заполните все поля корректно!';
        return;
    }

     messElem.classList.remove('calc__mess--active');
 const calories = (selectedType * selectedTime * (selectedWeigth / 70)).toFixed(0);
      calcBurn.querySelector('.calc__res').classList.add('calc__res--active')
    calcBurn.querySelector('.calc__res-info').textContent = 'Вы сожгли: ' + calories + 'кк.';
})