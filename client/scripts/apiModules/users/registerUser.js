// form
const registerForm = document.getElementById('register-form');

// inputs
const firstNameInput = document.getElementById('register-user-first-name-input');
const lastNameInput = document.getElementById('register-user-last-name-input');
const ageInput = document.getElementById('register-user-age-input');
const genderInput = document.getElementById('register-user-gender-input');
const passwordInput = document.getElementById('register-user-pass-input');
const passwordConfirm = document.getElementById('register-user-pass-confirm-input');

// button
const submitButton = document.getElementById('register-user-submit-button');

//classes
import User from './../../../../classes/user.js';

//functions
import putNewMassage from '../../messager/massenger.js'

export default async function registerUser() { // this function posts new user to DB (register)
    submitButton.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log("listening");




        const fistNameFromInput = firstNameInput.value;
        const lastNameFromInput = lastNameInput.value;
        const passwordFromInput = passwordInput.value;
        const passwordAgainFromInput = passwordConfirm.value;
        const ageFromInput = ageInput.value;
        const genderFromInput = genderInput.value;


        if (passwordFromInput != passwordAgainFromInput) {
            putNewMassage("The Password dont match", "red")
            return;
        }

        const userToPost = new User(fistNameFromInput, lastNameFromInput, passwordFromInput ,ageFromInput, genderFromInput);

        const res = await  fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userToPost),
        })

        if (res.status === 200 ){
            console.log('User registered successfully');
            putNewMassage("user was registered successfully!", "green");
        } else {
            console.log('User registered unsuccessfully');
            putNewMassage("user was registered unsuccessfully!", "red");
        }
    })
}

