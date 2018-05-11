chrome.devtools.panels.create(
    "xCPDevTools", 
    "toast.png", 
    "index.html", 
    function(panel) {
        var port = chrome.runtime.connect({
            name : 'xCPDevTools'
        });
        var tabId = chrome.devtools.inspectedWindow.tabId;
        console.log(tabId);

        port.onMessage.addListener(function(msg){

        });
    
});