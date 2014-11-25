// Iframe data post - client (external sites)
// Usage:
//    var sender = new Vida.ISender('targetIframeId')
//    sender.postRender(newJSONDataObj)

DEFAULT_ORIGIN = 'http://localhost:3000'
RENDER_CALLBACK_NAME   = 'renderData'
POST_DATA_MESSAGE_TYPE = 'postData'
CALLBACK_MESSAGE_TYPE  = 'runCallback'

// Vida iframe sender side
// options is an obj that includes
// iframe id (required)
Vida = {}

Vida.ISender = function (id, origin){ 
  var iframe = document.getElementById(id)
  if (iframe) {
    this.receiver = iframe.contentWindow
    this.origin = origin || DEFAULT_ORIGIN
  } else {
    console.log('Cannot find iframe. Must use iframe id to initialize.')
  }  
}

Vida.ISender.prototype.post = function (json){
  var msg = {
    type: POST_DATA_MESSAGE_TYPE,
    data: json
  }
  this.receiver.postMessage(JSON.stringify(msg), this.origin)
}

Vida.ISender.prototype.render = function (){
  this.runCallback(RENDER_CALLBACK_NAME)
}

Vida.ISender.prototype.runCallback = function (callbackName) {
  var msg = {
    type: CALLBACK_MESSAGE_TYPE,
    data: callbackName || ''
  }
  this.receiver.postMessage(JSON.stringify(msg), this.origin)
}

Vida.ISender.prototype.postRender = function (json){
  if (json) {
    this.post(json)
    this.render()
  }  
}