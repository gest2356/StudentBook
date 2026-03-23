
export default function messageUser(message, color) {
    const massageContainer = document.querySelector('#messages');
    const newMassageContainer = document.createElement('div');
    const massage = document.createElement('p');

    console.log('User registered successfully');

    newMassageContainer.setAttribute('id', 'massage-box');
    newMassageContainer.style.backgroundColor = color;

    massage.setAttribute('id', 'massage');
    massage.style.backgroundColor = color;
    massage.innerHTML = message;

    newMassageContainer.appendChild(massage);


    massageContainer.appendChild(newMassageContainer);

    setTimeout(() => {massageContainer.removeChild(newMassageContainer)}, 3000);
}