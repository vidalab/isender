isender
=======

This lib allows sending and re-rendering visualizations on VIDA.IO

Vida.ISender(targetIframeId, iframeOrigin)
-----------
Create a sender object that attaches to target iframe. iframeOrigin is required for external sites that embed vida.io visualizations using iframe.

Methods
-----------
* post(jsonData) - send new json data to iframe 
* render() - re-run visualization with the new data
* postRender(jsonData) - run post and render methods serially

Example
-----------
```
var sender = new Vida.ISender('targetIframeId', 'https://google.com'),
    newJSONDataObj = {red: 25, blue: 20, green: 31}
sender.postRender(newJSONDataObj)

