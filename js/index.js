//4 галерея
let currentPage = 1;
const itemsPerPage = 4;
const itemElem = document.querySelectorAll('.gallery__img');
const pageCount = Math.ceil(itemElem.length / itemsPerPage);

function render(page){
   const start = (page - 1) * itemsPerPage;
   const end = start + itemsPerPage;
    itemElem.forEach(img => {
                img.classList.add('gallery__img--hidden');
            })
    for (let i = start; i < end; i++) {
        console.log( itemElem[i])
        itemElem[i].classList.remove('gallery__img--hidden')
            }

}
  
document.querySelectorAll('.gallery__arrow').forEach(item => {
    item.addEventListener('click', (e) => {

        e.preventDefault();
        console.log(currentPage, pageCount)

        if (item.dataset.action === 'next') {
            if (currentPage >= pageCount) {
                currentPage = 1;}
            else{
                currentPage++;

            }
        }

        if (item.dataset.action === 'prev') {
        if (currentPage > 1) {
            currentPage -= 1;
        }
        else{
            currentPage = pageCount;
        }
    }
    render(currentPage);
})
})

//10 виджет - совет
let tips = [];
async function Init() {
    const request = await fetch('json/tips.json');
    tips = await request.json();
    console.log(tips);
    ShowTip();
    
}

function ShowTip(){
    if (!tips || tips.length === 0) {
        console.warn("Данные советов еще не загружены");
        return; 
    }
    const text = document.querySelector('.tip-widget__text');
    
    const tip = tips[Math.floor(Math.random() * tips.length)];
    setTimeout(() => {
        text.textContent = tip.text;
       
    },  3000)
}

Init()
setInterval(ShowTip, 5000);


//13 виджет - карта мышц
const muscleData = {
    // 1. ГРУДЬ
    chest: {
        title: "Грудные мышцы",
        exercises: [
            "Жим штанги лежа (горизонтальный/наклонный)",
            "Отжимания на брусьях (акцент на низ груди)",
            "Разводка гантелей или сведения в пэке-дэке"
        ],
        nutrition: "Сывороточный протеин (WHEY) сразу после тренировки для быстрого закрытия анаболического окна и восстановления волокон."
    },

    // 2. РУКИ (Бицепс, Трицепс, Предплечья)
    arms: {
        title: "Мышцы рук",
        exercises: [
            "Подъем штанги на бицепс стоя",
            "Жим лежа узким хватом или 'Французский жим' (для трицепса)",
            "Молотковые сгибания с гантелями"
        ],
        nutrition: "Комплекс аминокислот BCAA во время тренировки для защиты мышц от катаболизма и снижения усталости."
    },

    // 3. НОГИ (Квадрицепсы, Бицепс бедра, Икры)
    legs: {
        title: "Мышцы ног",
        exercises: [
            "Приседания со штангой (базовое упражнение)",
            "Жим ногами в платформе",
            "Мертвая тяга (для задней поверхности бедра)"
        ],
        nutrition: "Креатин моногидрат для увеличения силы и объема мышц, а также сложные углеводы за 2 часа до тренировки ног для энергии."
    },

    // 4. ПРЕСС (Прямая и косые мышцы живота)
    abs: {
        title: "Мышцы пресса",
        exercises: [
            "Скручивания на полу или в тренажере",
            "Подъем ног в висе (для нижнего пресса)",
            "Планка (статическая нагрузка)"
        ],
        nutrition: "L-карнитин перед тренировкой для ускорения жиросжигания и строгое соблюдение дефицита калорий для видимости 'кубиков'."
    }
};

function getHtmlForItem(data){
    return `<h3 class="muscle-map__title title"> ${data.title}</h3>
            <span class="muscle-map__subtitle">Упражнения:</span>
            <ul class="muscle-map__exercises">
                ${data.exercises.map(e => `<li class="muscle-map__desc"> ${e}</li>`).join('')}
            </ul>
            <span class="muscle-map__subtitle">Питание:
            </span>
            <p class="muscle-map__desc">${data.nutrition}</p>
            `
}

document.querySelectorAll('.muscle-map__group').forEach(item => {
    item.addEventListener('click', () => {
        const mapElem = document.querySelector('.muscle-map__info');
        if(item.classList.contains('muscle-map__chest')){
            mapElem.innerHTML = getHtmlForItem( muscleData['chest'])
        }
         if(item.classList.contains('muscle-map__arms')){
            mapElem.innerHTML = getHtmlForItem( muscleData['arms'])
        }
          if(item.classList.contains('muscle-map__abs')){
            mapElem.innerHTML = getHtmlForItem( muscleData['abs'])
        }
          if(item.classList.contains('muscle-map__legs')){
            mapElem.innerHTML = getHtmlForItem( muscleData['legs'])
        }
        
    })
})


document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'ironWill_checklists';
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

    const inputs = document.querySelectorAll('.checklist__input');
    inputs.forEach(input => {
        const id = input.dataset.item;

        if(saved[id]){
            input.checked = true;
        }
        input.addEventListener('change', () => {
            saved[id] = input.checked;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
        })
            
    })
    
    document.querySelectorAll('.checklist__reset').forEach(item => {
    
        item.addEventListener('click' , () => {
            const box = item.closest('.checklist__box');
            const inputs = box.querySelectorAll('.checklist__input');
            inputs.forEach(input => {
                 const id = input.dataset.item;
                input.checked = false
                 saved[id] = input.checked;
               localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
            })
    })
    })
})


 VK.Widgets.Playlist('vk_playlist_-147845620_5', -147845620, 5, 'c09c1c34cdf7190efb');
    VK.Widgets.App('vk_app_51543288', 51543288, {"mode":1});