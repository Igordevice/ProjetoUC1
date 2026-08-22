

let options = document.querySelectorAll(".options div");
let cup = document.querySelector(".cup");
let title = document.querySelector(".title");

function formatOption(option) {
    return option.toLowerCase().replace(/\s/g, "-");
}

options.forEach((option) => {
    option.addEventListener("click", function() {
        options.forEach((opt) => {
            cup.classList.remove(formatOption(opt.textContent));
        });
        cup.classList.add(formatOption(this.textContent));
        title.innerHTML = this.textContent;
    });
});


const drinks = [
  { name:"Espresso",    sub:"1 dose concentrada",        water:0,  milk:0,  espresso:38, crema:true },
  { name:"Doppio",      sub:"2 doses concentradas",       water:0,  milk:0,  espresso:60, crema:true },
  { name:"Cortado",     sub:"espresso · leite em partes iguais", water:0, milk:40, espresso:40, crema:false },
  { name:"Macchiato",   sub:"espresso · toque de leite",  water:0,  milk:12, espresso:42, crema:true },
  { name:"Cappuccino",  sub:"espresso · leite · espuma",  water:0,  milk:55, espresso:35, crema:false },
  { name:"Latte",       sub:"espresso · bastante leite",  water:0,  milk:70, espresso:28, crema:false },
  { name:"Flat White",  sub:"dose dupla · leite cremoso", water:0,  milk:50, espresso:45, crema:false },
  { name:"Black",       sub:"café coado, sem leite",      water:70, milk:0,  espresso:0,  crema:false },
  { name:"Café Au Lait",sub:"café coado · leite quente",  water:35, milk:40, espresso:0,  crema:false },
  { name:"Irish",       sub:"café · whisky · creme",      water:45, milk:15, espresso:20, crema:false },
  { name:"Con Panna",   sub:"espresso · chantilly",       water:0,  milk:0,  espresso:40, crema:true },
  { name:"Affogato",    sub:"espresso sobre sorvete",     water:0,  milk:20, espresso:35, crema:true },
  { name:"Mocha",       sub:"espresso · chocolate · leite",water:0, milk:45, espresso:35, crema:false },
  { name:"Americano",   sub:"espresso · água quente",     water:55, milk:0,  espresso:20, crema:true },
];

const ring = document.getElementById('ring');
const stage = document.getElementById('stage');
const N = drinks.length;
let radius = 0;

function computeRadius(){ radius = stage.clientWidth * 0.5 * 0.86; }
computeRadius();

const items = [];
drinks.forEach((d, i) => {
  const angle = (i / N) * 360;
  const el = document.createElement('div');
  el.className = 'item';
  el.textContent = d.name;
  el.addEventListener('click', () => selectDrink(i));
  ring.appendChild(el);
  items.push(el);

  const tick = document.createElement('div');
  tick.className = 'tick';
  ring.appendChild(tick);
  tick.style.transform = `rotate(${angle}deg) translate(0, ${radius*0.93}px)`;
});

function layout(){
  computeRadius();
  items.forEach((el, i) => {
    const angle = (i / N) * 360 - 90;
    const rad = angle * Math.PI / 180;
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;
    el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  });
}

let activeIndex = drinks.findIndex(d => d.name === "Americano");

function selectDrink(i){
  activeIndex = i;
  items.forEach((el, idx) => el.classList.toggle('active', idx === i));
  const d = drinks[i];
  const total = d.water + d.milk + d.espresso || 1;
  const scale = 78 / Math.max(total, 40);

  const backEl = document.getElementById('liquidBack');
  const frontEl = document.getElementById('liquidFront');
  const cremaEl = document.getElementById('crema');
  const tagBack = document.getElementById('tagBack');
  const tagFront = document.getElementById('tagFront');

  const backHeight = (d.water || d.milk) * scale;
  const frontHeight = d.espresso * scale;

  backEl.className = 'liquid ' + (d.milk > d.water ? 'milk' : 'water');
  backEl.style.height = backHeight + '%';
  frontEl.style.height = frontHeight + '%';
  cremaEl.style.bottom = frontHeight + '%';
  cremaEl.style.opacity = d.crema ? '1' : '0';
  tagFront.style.bottom = (frontHeight/2 - 2) + '%';
  tagFront.style.opacity = d.espresso > 8 ? '0.85' : '0';
  tagBack.style.bottom = (frontHeight + backHeight/2 - 2) + '%';
  tagBack.style.opacity = backHeight > 8 ? '0.85' : '0';
  tagBack.textContent = d.milk > d.water ? 'leite' : 'água';

  document.getElementById('drinkName').textContent = d.name;
  document.getElementById('drinkSub').textContent = d.sub;
}

layout();
selectDrink(activeIndex);

window.addEventListener('resize', () => {
  computeRadius();
  ring.querySelectorAll('.tick').forEach((t,i)=>{
    t.style.transform = `rotate(${(i/N)*360}deg) translate(0, ${radius*0.93}px)`;
  });
  layout();
});