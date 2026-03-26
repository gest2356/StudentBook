import registerUser from './../apiModules/users/registerUser.js'
import loginUser from './../apiModules/users/loginUser.js'
import {renderNavBar} from "./../displayScripts/navDisplayScript.js";
import displayRegisterLogin from "./../displayScripts/displayRegisterLogin.js";

console.log("Working!!")

registerUser();
loginUser();

renderNavBar()
displayRegisterLogin()
