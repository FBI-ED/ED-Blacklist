/*
Description:
    A simple blacklist function that you can add to your console or script 
    section to block (remove message objects) for users you do not wish to see.
    All relevant functions and variables have been referenced.
Educational References:
    [Mutation Observers] - https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    [Data Attributes] - https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
    [For Loops] - https://www.w3schools.com/js/js_loop_for.asp
    [Arrays] - https://www.w3schools.com/js/js_arrays.asp
    [Boolean Function] - https://stackoverflow.com/a/62125479
    [Ternary Operator] - https://www.geeksforgeeks.org/javascript-ternary-operator/
    [Object Oriented Object] - https://www.geeksforgeeks.org/introduction-object-oriented-programming-javascript/
Fix References:
    "Looping through array and removing items, without breaking for loop" - https://stackoverflow.com/a/9882349
    "MutationObserver no longer has an object to refer to" - https://stackoverflow.com/a/66644539
*/
// Create an example list of Blacklisted/Blocked Users
var Blacklist = ["Rainbot", "AutoMod"];
// Select the node that will be observed for mutations
const targetNode = document.getElementById("chat-history");
// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };
// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
	// Use traditional for loops
	for (var mutation of mutationsList) {
		// If the Mutation isn't the Child list, it's a child (for all mutations of mutation list)
		if (mutation.type != "childList") InitialClean();		
	}
};
// Create the Mutation Observer Object
const observer = new MutationObserver(callback);
// Observe the Targeted Object with the predefined Configuation
observer.observe(targetNode, config);
InitialClean(); // Clean it for the first time.
function InitialClean() {
	var TargetNode = document.getElementsByClassName("chat-message row");
	var Count = 0,
		Delete = false,
        RemovalList = [];
	for (let i = 0; i < TargetNode.length; i++) {
		var mSubString = TargetNode[i].innerHTML.substring(
				TargetNode[i].innerHTML.lastIndexOf('<div class="message-info">') + 26,
				TargetNode[i].innerHTML.lastIndexOf("</div>")
			),
			MessageUsername = mSubString.split('<a href="')[0];
		if (MessageUsername == '<div class="message-username">') {
			Delete = false;
			var Username = TargetNode[i].innerHTML.split('<div class="message-time')[0].split('">')[3].split("/")[2];
			for (var ii = 0; ii < Blacklist.length; ii++) {
				if (mSubString.includes(Blacklist[ii])) RemovalList.push(TargetNode[i]); // Ensure Add to Remove Array
				Delete = (Username == Blacklist[ii]); // If Username Matches Blacklist
				if (Delete) RemovalList.push(TargetNode[i]); // Add to Remove Array
			} Count++; // Increase Count like i
		}
		if (Delete) { if (Delete) RemovalList.push(TargetNode[i]); Count++; }
	}
	for (var x = 0; x < RemovalList.length; x++) RemovalList[x].textContent = ''; // .remove() workaround, Keep Object Alive but Invisible
}