export default async function logout() {
    const res = await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        credentials: "include",
    });

    if (res.ok) {
        console.log(res + " logged out");
        window.location.reload();
    } else {
        console.log(res + " not logged in");
    }
}