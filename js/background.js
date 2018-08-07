console.log('siohdervehrveuvru')


const MyStore = function (){
  this.getMaps = function() { 
    if (!localStorage['maps']) {
      return []
    }
    return JSON.parse(localStorage['maps'])
  }
  this.setMaps = function(data) {
    return localStorage['maps'] = JSON.stringify(data)
  }
};

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//   chrome.tabs.sendMessage(tabs[0].id, {content: JSON.stringify(details)}, function(response) {
//     console.log(response)
//   });  
// });

let lastReqId = null;

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    const urlObject = new URL(details.url);
    // get maps from store
    const store = new MyStore();
    const maps = store.getMaps();
    

    // find particlar mapping in our store
    const mapping = maps.find(mapping => urlObject.host == mapping.from)

    if ((mapping) && (details.requestId !== lastReqId)) {
      // set the request it to the latest one
      lastReqId = details.requestId;
      console.log(urlObject.host == mapping.from)
      console.log(urlObject.host, mapping.from, mapping.to)
      console.log('redirect_URL', `${mapping.to}/${urlObject.search}`);

      return {
        redirectUrl: `${mapping.to}/${urlObject.search}`
      }
    }
  }, {
    urls : ["<all_urls>"]
  }, ["blocking"]
);