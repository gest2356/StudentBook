import {getAuth} from "./getAuth.js";

export async function chackForAuth() {
    console.log("chackForAuth");
    const user = await getAuth()

    if (user == null) {
        window.location.replace('index.html')
    } else {
        return
    }
}