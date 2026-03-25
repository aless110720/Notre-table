let meals = [];

const randomMeals = [
  {name:'Pâtes tomate',price:3,kcal:500},
  {name:'Riz légumes',price:2.5,kcal:450},
  {name:'Omelette',price:3.2,kcal:550},
  {name:'Soupe maison',price:2,kcal:300}
];

const worldRecipes = {
  italien:[
    {name:'Lasagnes',price:6,kcal:700},
    {name:'Risotto',price:5,kcal:600}
  ],
  asiatique:[
    {name:'Nouilles sautées',price:4,kcal:500}
  ]
};

generateRandomWeek();
renderWorld();

function generateRandomWeek() {
  meals = [];
  const days = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];

  days.forEach(day => {
    meals.push({
      day,
      items: ['matin','midi','soir'].map(type => {
        const r = randomMeals[Math.floor(Math.random()*randomMeals.length)];
        return {...r,type};
      })
    });
  });

  renderWeek();
}

function renderWeek() {
  const el = document.getElementById('semaine');
  el.innerHTML = '';

  meals.forEach((d,di) => {
    const div = document.createElement('div');
    div.className = 'card';

    div.innerHTML = `<strong>${d.day}</strong>`;

    d.items.forEach((m,mi) => {
      const row = document.createElement('div');
      row.innerHTML = `
        ${m.type} - ${m.name} (${m.price}€)
        <button onclick="replaceMeal(${di},${mi})">🔄</button>
      `;
      div.appendChild(row);
    });

    el.appendChild(div);
  });
}

function replaceMeal(di, mi) {
  const r = randomMeals[Math.floor(Math.random()*randomMeals.length)];
  meals[di].items[mi] = {...r, type: meals[di].items[mi].type};
  renderWeek();
}

function renderWorld() {
  const el = document.getElementById('monde');

  Object.entries(worldRecipes).forEach(([country, recs]) => {
    const div = document.createElement('div');
    div.className = 'card';

    div.innerHTML = `<strong>${country}</strong>`;

    recs.forEach(r => {
      const row = document.createElement('div');
      row.innerHTML = `
        ${r.name} (${r.price}€)
        <button onclick="addMeal('${r.name}',${r.price},${r.kcal})">➕</button>
      `;
      div.appendChild(row);
    });

    el.appendChild(div);
  });
}

function addMeal(name, price, kcal) {
  meals[0].items.push({type:'soir', name, price, kcal});
  renderWeek();
}

function showTab(id) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
