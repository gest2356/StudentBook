
export async function getAuth() {
    const res = await fetch("http://localhost:3000/api/users/me", {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    const userData = await res.json()
    console.log(userData);
    return userData;
}