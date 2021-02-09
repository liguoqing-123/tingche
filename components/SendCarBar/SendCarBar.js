// components/SendCarBar/SendCarBar.js
const app = getApp()
Component({
  properties: {
    info: {
      type: Object
    }
  },
  data: {

  },
  methods: {
    sendError() {
      const { orderId } = this.properties.info;
      const { userId } = app.globalData;
      this.triggerEvent('emmiter', {orderId, userId});
    },
    finish() {
      const { orderId } = this.properties.info;
      this.triggerEvent('finished', {orderId})
    }
  }
})
