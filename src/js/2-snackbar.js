import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const mainForm = document.querySelector('.form');

function userMessage(message, type = 'error') {
    if (type == 'error') {
        iziToast.error({
            message: message,
            position: 'center',
            imageWidth: 0,
        });
    } else {
         iziToast.success({
            message: message,
             position: 'center',
            imageWidth: 0,
        });
    }
}

function startPromise(delay, state) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
    
    promise.then(delay => {
        userMessage(`✅ Fulfilled promise in ${delay}ms`, 'success');
    })
        .catch(delay => {
        userMessage(`❌ Rejected promise in ${delay}ms`, 'error');
    });
}

mainForm.addEventListener('submit', event => {
    event.preventDefault();
    const delay = event.target.elements.delay.value;
    const state = event.target.elements.state.value;
    startPromise(delay, state);
    mainForm.reset();
});