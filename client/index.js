import registerUser from './scripts/apiModules/users/registerUser.js'
import loginUser from './scripts/apiModules/users/loginUser.js'
import {renderNavBar} from "./scripts/displayScripts/navDisplayScript.js";
import displayRegister from './scripts/displayScripts/displayRegisterLogin.js'
import displayRegisterLogin from "./scripts/displayScripts/displayRegisterLogin.js";

registerUser();
loginUser();

renderNavBar()
displayRegisterLogin()
