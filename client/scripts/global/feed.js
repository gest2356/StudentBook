import getAllPosts from './../apiModules/posts/getAllPosts.js'
import {renderNavBar} from "./../displayScripts/navDisplayScript.js";
import {displayAllPosts} from "./../displayScripts/displayAllPosts.js"
import {getPostToDelete} from "../listeningScripts/getPostToDelete.js";
import {initialize} from "./../displayScripts/quill.js";
import {getPostToPost} from "../listeningScripts/getPostToPost.js";

getAllPosts();
await renderNavBar()
await displayAllPosts();
getPostToDelete()

initialize();
await getPostToPost()