import getAllPosts from './../apiModules/posts/getAllPosts.js'
import {renderNavBar} from "./../displayScripts/navDisplayScript.js";
import {displayAllPosts} from "./../displayScripts/displayAllPosts.js"
import {getPostToDelete} from "../listeningScripts/getPostToDelete.js";
import {initCommentsEditor, initialize} from "./../displayScripts/quill.js";
import {getPostToPost} from "../listeningScripts/getPostToPost.js";
import {operateLikeButton} from "../listeningScripts/operateLikeButton.js";
import displayComments from "../listeningScripts/displayComments.js";
import {getCommentToPost} from "./../listeningScripts/getCommentToPost.js";
import {chackForAuth} from "../authFunction/chackForAuth.js";
import {getCommentToDelete} from "./../listeningScripts/getCommentToDelete.js";

await chackForAuth()

await getAllPosts();
await renderNavBar()
await displayAllPosts();
getPostToDelete()

await initialize();
await initCommentsEditor()
await getPostToPost()

await operateLikeButton()

await displayComments()
getCommentToPost()