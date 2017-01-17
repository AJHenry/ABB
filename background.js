//Global variables mostly used for debugging
var currentTabID;
var currentWindowID;

chrome.commands.onCommand.addListener(function(command) {
	//Run the default duplicate method
		duplicateTab();
      });
	  
/*
* Returns all all of the tabs in the current window in tabs[]
* goes through a for loop to get the one that is selected
*/

function getAll(){
	//Chrome tabs API call
	chrome.tabs.getAllInWindow(
	//default value for window because we didn't specify one
	
	//Callback function
	//We have to execute the code within this because Google's background
	//script does not update by the time we need to use the variables
	function(tabs){
	  for(j = 0; j < tabs.length; j++){
		  
		  //Debug information
		  console.log("tabID: " + (tabs[j].id));
		  console.log("tabURL: " + (tabs[j].url));
		  console.log("isSelected: " + (tabs[j].selected));
		  console.log("-------------");

	  }
  });
}


/*
* Returns all all of the tabs in the current window in tabs[]
* goes through a for loop to get the one that is selected
*/

function duplicateTab(){
	//Chrome tabs API call
	chrome.tabs.getAllInWindow(
	//default value for window because we didn't specify one
	
	//Callback function
	//We have to execute the code within this because Google's background
	//script does not update by the time we need to use the variables
	function(tabs){
	  for(j = 0; j < tabs.length; j++){
		  if(tabs[j].selected){
				currentTabID = tabs[j].id;
				
				//Executes a built-in javascript function 
				//to go back in history one step
				 chrome.tabs.executeScript(currentTabID, {
						code: 'history.back();'
							}, function(result) {
								//duplicates the current tab session
								chrome.tabs.duplicate(currentTabID);
								//Changes the focus of the tab to the one we were on
								chrome.tabs.update(currentTabID, {selected: true});
							});
		  }
	  }
  });
}


//Default callback function for debugging purposes
function successCallback(departure){
	if(departure){
		console.log("Success from "+ departure);
	}else{
		console.log("Failure from "+ departure);
	}
}


//Creates a default selection menu within the "Right-click options"
  var parent = chrome.contextMenus.create(
	{
		"title": "Advanced Back Button", 
		"contexts":["page"]
	}
	);

// Creates a child to append to the parent menu
var child1 = chrome.contextMenus.create(
  {
	    "title": "Open his Tab in a New Page", 
		"parentId": parent, 
		"onclick": duplicateTab
  }
  );
  
  // Creates a child to append to the parent menu
  //Preferences tab does nothing yet
var child2 = chrome.contextMenus.create(
  {
	  "title": "Preferences", 
	  "parentId": parent, 
	  "onclick":  duplicateTab
  }
  );



