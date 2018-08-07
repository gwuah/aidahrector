// bind global to this
const global = this;

// setup a factory and manipulate data
const vm = new Vue({
  el: "#aidahrector",
  data: {
    name: 'aidirector',
    show: false,
    maps: global.storeFactory.getNewStore().getMaps(),
    map: {
      from: '',
      to: ''
    }
  },
  methods: {
    createMap: function() {
      console.log(this.map)
      // if map is empty, cancel it
      if ((this.map.from == '') && (this.map.to == '')) {
        this.toggleBorder();
        setTimeout(() => { this.toggleBorder() }, 1000)
        return null
      }

      // extract only the host name from the url 
      this.map.from = this.parseUrl(this.map.from);

      // add the newly created map to our global container
      console.log('newly created', this.map);
      this.maps.push(this.map);
    
      // set localstoragewith new data
      this.updateLocalStore(this.maps)

      // empty the input elements
      this.emptyInput(this.showNotif)
    },

    showNotif: function(){
      this.show = true;
      setTimeout(() => {this.show = false}, 1000)
    },

    emptyInput(cb) {
      this.map.from = '';
      this.map.to = '';
      cb ? cb() : true
    },
    
    toggleBorder: function() {
      document.querySelector('.from__url').classList.toggle('red__border');
      document.querySelector('.to__url').classList.toggle('red__border');
    },

    parseUrl(url) {
      const urlObject = new URL(url);
      return urlObject.host
    },

    deleteEntry(mapping) {
      console.log('our maps', this.maps)
      // get index of it
      let index = this.maps.findIndex(prop => {
        if ((prop.from == mapping.from) && (prop.to == mapping.to)) {
          return true
        }
      })

      // remove it from array
      if (index > -1) {
        this.maps.splice(index, 1);
      }
      // update our store
      this.updateLocalStore(this.maps)
    },

    updateLocalStore(update) {
      // update our local store
      global.storeFactory.getNewStore().setMaps(update);
      this.maps = global.storeFactory.getNewStore().getMaps()
      console.log('endin', this.maps)
    }
  }
})
