import getAllPosts from './../apiModules/posts/getAllPosts.js'
import {renderNavBar} from "./../displayScripts/navDisplayScript.js";
import {displayAllPosts} from "./../displayScripts/displayAllPosts.js"

getAllPosts();
renderNavBar()
displayAllPosts();