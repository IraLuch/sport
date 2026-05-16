
function itemSetEvent(items){
    items.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const parentSelect = item.closest('.form-select');
            const btn = parentSelect.querySelector('.form-select-button');
            console.log(item.textContent);
            if (item.dataset.ratio) {
                btn.dataset.ratio = item.dataset.ratio;
            }
            
        });
    });
}

function getCalcData(container){
    const items = container.querySelectorAll('.form-select-button');
    let selectedGender = 'ж';
    let selectedRatio = 1.2;
    items.forEach(btn => {
        const text = btn.textContent;
    
        if (text === 'ж' || text === 'м') {
            selectedGender = text;
        } else 
            {
          
            const val = parseFloat(btn.dataset.ratio); 
            if(!isNaN(val)) selectedRatio = val;
        }
    });

    return { selectedGender, selectedRatio };
}

itemSetEvent(document.querySelectorAll('.form-select-item'));
//7 - виджет вода
const calcWaterBtn = document.querySelector('#calcWaterBtn');
calcWaterBtn.addEventListener('click', (e) => {
    
    const calcWater = calcWaterBtn.closest('#calcWater');
    const { selectedGender, selectedRatio } = getCalcData(calcWater);
    e.preventDefault();
    let selectedweight = parseFloat(calcWater.querySelector('.calc__row-input').value);
    const messElem = calcWater.querySelector('.calc__mess');
    if(isNaN(selectedweight) || selectedweight <= 0 ){
        messElem.classList.add('calc__mess--active');
        messElem.textContent = 'Введите ваш вес!';
        return;
    }

     messElem.classList.remove('calc__mess--active');
    const baseMl = selectedGender === 'м' ? 35 : 30; 
    const totalWater = (selectedweight * baseMl * selectedRatio) / 1000;
    calcWater.querySelector('.calc__res').classList.add('calc__res--active')
    calcWater.querySelector('.calc__res-info').textContent = 'Ваша норма: ' + totalWater.toFixed(2) + 'л.';

});

//8 - виджет Bmr


const calcBmrBtn = document.querySelector('#calcBmrBtn');
calcBmrBtn.addEventListener('click', (e) => {
    const calcBmr = calcBmrBtn.closest('#calcBmr');
     const { selectedGender, selectedRatio } = getCalcData(calcBmr);
    e.preventDefault();
    let selectedweight = calcBmr.querySelector('.calc__row-input-weight').value;
    let selectedAge = calcBmr.querySelector('.calc__row-input-age').value;
    let selectedHeight = calcBmr.querySelector('.calc__row-input-height').value;
    
    const messElem = calcBmr.querySelector('.calc__mess');
    if(isNaN(selectedweight) || selectedweight <= 0 ||
isNaN(selectedAge) || selectedAge <= 0 ||
    isNaN(selectedHeight) || selectedHeight <= 0){
        messElem.classList.add('calc__mess--active');
        messElem.textContent = 'Заполните все поля корректно!';
        return;
    }
    messElem.classList.remove('calc__mess--active');
    
    let bmr = 0;

    // 2. Расчет по формуле
    if (selectedGender === 'м') {
        bmr = (10 * selectedweight) + (6.25 * selectedHeight) - (5 * selectedAge) + 5;
    } else {
        bmr = (10 * selectedweight) + (6.25 * selectedHeight) - (5 * selectedAge) - 161;
    }
    calcBmr.querySelector('.calc__res').classList.add('calc__res--active')
    calcBmr.querySelector('.calc__res-info').textContent = "Ваша норма BMR: " +Math.round(bmr) +" ккал";
})


//9 - виджет белок
const calcProteinBtn = document.querySelector('#calcProteinBtn');
calcProteinBtn.addEventListener('click', (e) => {
    const calcProtein = calcProteinBtn.closest('#calcProtein');
      const { selectedGender, selectedRatio } = getCalcData(calcProtein);
    e.preventDefault();
    e.preventDefault();
    let selectedweight = parseFloat(calcProtein.querySelector('.calc__row-input').value);
    const messElem = calcProtein.querySelector('.calc__mess');
    if(isNaN(selectedweight) || selectedweight <= 0 ){
        messElem.classList.add('calc__mess--active');
        messElem.textContent = 'Введите ваш вес!';
        return;
    }

     messElem.classList.remove('calc__mess--active');
let genderBonus = (selectedGender === 'м') ? 0.2 : 0; 
const proteinNormal = (selectedRatio + genderBonus) * selectedweight;
    calcProtein.querySelector('.calc__res').classList.add('calc__res--active')
    calcProtein.querySelector('.calc__res-info').textContent = 'Ваша норма белка в день: ' + Math.round(proteinNormal) + 'г.';

});