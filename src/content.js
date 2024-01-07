chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.method === 'alert') {
      console.error(request.data)
      alert(request.data)
    } else if (request.method === 'getSelection') {
      sendResponse({data: window.getSelection().toString()})
    } else if (request.method === 'clearSelection') {
      const elem = document.activeElement
  
      if (elem && !elem.isContentEditable) {
        const end = elem.selectionEnd
        window.getSelection().removeAllRanges()
        elem.selectionStart = end
        elem.selectionEnd = elem.selectionStart
      } else {
        const sel = window.getSelection()
        if (sel.rangeCount) {
          const range = sel.getRangeAt(0)
          range.collapse()
        }
      }
    } else if (request.method === 'replaceSelection' && request.data) {
      const elem = document.activeElement
  
      if (elem && elem.isContentEditable) {
        // elem is contentEditable
        insertIntoContentEditable(request.data || '')
      } else if (elem) {
        insertIntoInput(elem, request.data || '')
      }
    } else {
      sendResponse({}) // snub them.
    }
  })//Inference endpoint callback with huggingface models
// chrome api call
