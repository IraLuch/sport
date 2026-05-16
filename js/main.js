//1 карта - виджет
  const mapElem = document.querySelector('#map')

  
  const map = new maplibregl.Map({
    container: mapElem,
    style: 'https://tiles.openfreemap.org/styles/liberty', 
    center: [104.2964, 52.2869], // Иркутск
    zoom: 16
  }
  );
   new maplibregl.Marker()
    .setLngLat([104.3266, 52.2676])
    .setPopup(new maplibregl.Popup().setText("Байкальская 128"))
    .addTo(map)

//2 выделение в навигации
const links = document.querySelectorAll('.header__link')
links.forEach(link => {
    if (link.href == window.location.href){
        link.classList.add('header__link--active')
    }
})

//3 выпадающее меню 
document.querySelectorAll('.form-select-button').forEach(btn => {

    const parent = btn.closest('.form-select');

    const ulElem = parent.querySelector('.form-select-list');
    const items = parent.querySelectorAll('.form-select-item');
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        btn.classList.toggle('form-select-button--active');
        ulElem.classList.toggle('form-select-list--active')
    })
    items.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
    
            btn.textContent = e.currentTarget.textContent;
            btn.classList.remove('form-select-button--active');
            ulElem.classList.remove('form-select-list--active')
            
        })
    })
})





//6 скролл верх
document.querySelector('.footer__go-top').addEventListener('click', (e) =>{
    e.preventDefault();

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'})
})


//12 виджет - погода
window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
window.myWidgetParam.push({
    id: 23,
    cityid: '7536078',
    country: 'RU',
    appid: '520d605b857136808662744763642f16',
    units: 'metric',
    containerid: 'openweathermap-widget-23',
});
(function () {
    var script = document.createElement('script');
    script.async = true;
    script.charset = "utf-8";
    script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator-2.0.js";
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
})();
