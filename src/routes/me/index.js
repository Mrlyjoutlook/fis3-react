module.exports = {
  path: 'me',
  getComponent(nextState, cb) {
    require(['./components/Me'],(Me)=>{
    	cb(null,Me.default)
    })
  }
}