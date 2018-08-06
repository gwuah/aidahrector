// bind global to this
const global = this;

// setup a factory and manipulate data
const vm = new Vue({
  el: "#aidahrector",
  data: {
    name: 'aidirector',
    show: false,
    rule: {
      from: '',
      to: ''
    }
  },
  methods: {
    createMap: function() {
      // console.log('clicked', global.storeFactory)
      // console.log('newRule', this.rule)

      const rules =  global.storeFactory.getNewStore().getMaps();
      // update previous container with new rules
      rules.push(this.rule);
      // set localstoragewith new data
      global.storeFactory.getNewStore().setMaps(rules);

      this.emptyInput(this.showNotif)
    },

    showNotif: function(){
      this.show = true;
      setTimeout(() => {this.show = false}, 1000)
    },

    emptyInput(cb) {
      this.rule.from = '';
      this.rule.to = '';
      cb ? cb() : true
    }
  }
})

