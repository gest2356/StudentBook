import getAllPosts from './../apiModules/posts/getAllPosts.js'
import {renderNavBar} from "./../displayScripts/navDisplayScript.js";
import {displayAllPosts} from "./../displayScripts/displayAllPosts.js"
import {getPostToDelete} from "../listeningScripts/getPostToDelete.js";

getAllPosts();
await renderNavBar()
await displayAllPosts();
getPostToDelete()