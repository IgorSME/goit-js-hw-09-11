import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector(".form"),

}

refs.form.addEventListener("submit", onFoRmSubmit)
function onFoRmSubmit(e) {
  e.preventDefault();
  const inputValue = e.currentTarget.elements;
  let delay = +inputValue.delay.value;
  const step = +inputValue.step.value;
  const amount = +inputValue.amount.value;
  let position = 1;


  for (let i = 0; i < amount; i += 1) {
    createPromise(position, delay).then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    
    position += 1;
    delay += step;
  }
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
  } 
      reject({ position, delay });
    }, delay)
  })
}
// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
