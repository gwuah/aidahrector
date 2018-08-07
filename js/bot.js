console.log('content script running!')

// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//   console.log('message recieved! ooo');
//   const payload = JSON.parse(request.content);

//   console.log(payload)
// 	if(payload) {
//     sendResponse({content: "response message"});
//     // window.location.href= 'http://localhost:8080'
//     return true;
//   }
// })