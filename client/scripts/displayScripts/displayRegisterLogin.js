const formContainer = document.getElementById("form-container")
import {getAuth} from "../authFunction/getAuth.js";

export default function displayRegisterLogin() {
    if (getAuth()) {
        console.log(formContainer);
        formContainer.style.display = "none";
    } else {
        formContainer.style.display = "flex";
    }
}
