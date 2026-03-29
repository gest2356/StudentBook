import {getAllUsersInfo} from './../apiModules/users/getAllUsersInfo.js';
import {getUserIdForPosts} from "../listeningScripts/getUserIdForPosts.js";

export async function displayAllUserInfo() {
    const userInfoContainer = document.getElementById('user-info')
    const allUsers = await getAllUsersInfo()

    allUsers.forEach(userInfo => {
        const userNameP = document.createElement('p');
        const userAgeP = document.createElement('p');
        const userGenderP = document.createElement('p');
        const userPostCountP = document.createElement('p');
        const userContainer = document.createElement('div');
        const seeUserInfoButton = document.createElement('button');

        userNameP.innerHTML = `${userInfo.firstName} ${userInfo.lastName}`;
        userAgeP.innerHTML = `Age: ${userInfo.age}`;
        userGenderP.innerHTML =  `Gender: ${userInfo.gender}` ;
        userPostCountP.innerHTML = `Post count: ${userInfo.postCount}` ;

        userContainer.classList.add('user-card');
        userContainer.dataset.id = userInfo.userId

        seeUserInfoButton.classList.add('user-info-button');
        seeUserInfoButton.innerHTML = "See info"

        userContainer.appendChild(userNameP);
        userContainer.appendChild(userAgeP);
        userContainer.appendChild(userGenderP);
        userContainer.appendChild(userPostCountP);
        userContainer.appendChild(seeUserInfoButton);

        userInfoContainer.appendChild(userContainer);


    })

    getUserIdForPosts()
}