import {getAuth} from "./getAuth.js";

export async function chackForAuth() {
    const user = await getAuth()

    if (user == null) {
        window.location.replace('index.html')
    } else {
        return
    }
}