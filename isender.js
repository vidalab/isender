// Iframe data post - client (external sites)
// Usage:
//    var sender = new Vida.ISender('targetIframeId')
//    sender.postRender(newJSONDataObj)

DEFAULT_ORIGIN = 'https://vida.io'
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
    var _this = this
    
    function internalPostRender() {
      _this.post(json)
      _this.render()
    }

    function repeatPostRender(count) {
      if (count < 5) {
        setTimeout(function() {
          internalPostRender()
          repeatPostRender(++count)
        }, 1000)
      }
    }

    if (typeof(Vida.ISender.first_post) === 'undefined') {
      // work around for meteor load
      Vida.ISender.first_post = true
      repeatPostRender(0);
    } else {
      internalPostRender();
    }
  }
}
