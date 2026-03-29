import User from "../../../../classes/user.js";

export async function getAllUsersInfo() {

    const res = await fetch('http://localhost:3000/api/users/all', {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
    });

    const json = await res.json();
    const users = []

    json.forEach((user) => {
        let newUser = new User(user.first_name, user.last_name,"" ,user.age, user.gender, user.postCount, user.user_id);
        users.push(newUser);
    })
    return users;
}