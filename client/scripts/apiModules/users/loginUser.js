// inputs
const firstNameInput = document.getElementById('login-first-name-input');
const lastNameInput = document.getElementById('login-last-name-input');
const passwordInput = document.getElementById('login-password');

// button
const submitButton = document.getElementById('login-submit-button');

// classes
import User from './../../../../classes/user.js';

// functions
import putNewMassage from '../../messager/massenger.js'

export default async function loginUser() {
    submitButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const firstNameFromInput = firstNameInput.value;
        const lastNameFromInput = lastNameInput.value;
        const passwordFromInput = passwordInput.value;

        const userLoginCrudentuales = {
            firstName: firstNameFromInput,
            lastName: lastNameFromInput,
            password: passwordFromInput,
        }
        console.log(userLoginCrudentuales);

        const res = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            credentials: 'include',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userLoginCrudentuales)
        })

        const json = await res.json();


        if (res.status === 200) {
            putNewMassage("login successful", "green");
        } else {
            putNewMassage("login failed", "red");
        }
    })
}