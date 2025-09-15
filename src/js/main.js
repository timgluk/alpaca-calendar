import 'modern-normalize/modern-normalize.css';
import '@/scss/main.scss';

const days = [...document.querySelectorAll('.calendar__day')];

let first = null; // индекс первого клика

function clearAll() {
  days.forEach(d => d.classList.remove(
    'calendar__day--active',
    'calendar__day--start',
    'calendar__day--between',
    'calendar__day--end',
    'calendar__day--inrange'
  ));
}

function paintRange(a, b) {
  const start = Math.min(a, b);
  const end   = Math.max(a, b);

  for (let i = start; i <= end; i++) {
    const el = days[i];
    el.classList.add('calendar__day--inrange');
    if (i === start) el.classList.add('calendar__day--start');
    if (i === end) el.classList.add('calendar__day--end');
    if (i > start && i < end) el.classList.add('calendar__day--between');
  }
}

days.forEach((day, index) => {
  day.addEventListener('click', () => {
    // первый клик
    if (first === null) {
      clearAll();
      first = index;
      day.classList.add('calendar__day--active');
      return;
    }

    // повторный клик по той же дате → снять выделение
    if (first === index) {
      clearAll();
      first = null;
      return;
    }

    // второй клик по другой дате → диапазон
    const second = index;
    clearAll();
    paintRange(first, second);

    // сбросить для следующего выбора
    first = null;
  });
});

// Dark mode switcher 
const body = document.querySelector('body');
const switcher = document.querySelector('#switcher');
switcher.addEventListener('click', () => {
  if (body.classList.contains('dark')) {
    document.body.classList.remove('dark');
  } else {
    document.body.classList.add('dark');
  }
});