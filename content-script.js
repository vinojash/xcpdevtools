window.addEventListener('message', function(event) {
    // Only accept messages from same frame
    if (event.source !== window) {
      return;
    }
  
    var message = event.data;
  
    chrome.runtime.sendMessage(message);
  });