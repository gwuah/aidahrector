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

var RuleMatcher = function(rules){
  var lastRequestId;

  this.rules = rules;

  this.redirectOnMatch = function(request){
    var rule = _.find(rules, function(rule){ 
      return request.url.indexOf(rule.from) > -1 
      && request.requestId !== lastRequestId; 
    });

    if(rule){
      lastRequestId = request.requestId;
      return {
          redirectUrl : request.url.replace(rule.from, rule.to)
      };
    }
  };
};

const getNewStore = function() {
  return new MyStore();
}


const matcher = getNewStore();
const rules = matcher.getMaps();
const ruleMatcher = new RuleMatcher(rules);



chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    console.log('requesting', details)
    return ruleMatcher.redirectOnMatch(details)
  }, {
    urls : ["<all_urls>"]
  }, ["blocking"]
);