const Store = function (){
	this.getMaps = function() { 
    if (!localStorage['maps']) {
      return []
    }
    return JSON.parse(localStorage['maps'])
  }
  this.setMaps = function(data) {
    localStorage['maps'] = JSON.stringify(data)
  }
};

this.storeFactory = {
	getNewStore: function(){
		return new Store();
	}
};

console.log('mystoreee!', this)