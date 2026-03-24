const formContainer = document.getElementById("form-container")
import {getAuth} from "../authFunction/getAuth.js";

export default async function displayRegisterLogin() {
    let user = await getAuth();

    if (user.id) {
        formContainer.style.display = "none";
    } else {
        formContainer.style.display = "flex";
    }
}
