import {chackForAuth} from "../authFunction/chackForAuth.js";
import {renderNavBar} from "../displayScripts/navDisplayScript.js";
import {displayAllUserInfo} from "../displayScripts/displayUserInfo.js";

await chackForAuth()
await renderNavBar()

await displayAllUserInfo()
