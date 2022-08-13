const dropZone = document.getElementById("fileDrag");

import {render} from './stlviewer.js';

dropZone.addEventListener('dragover', function(e) {
    try{
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    } catch (e) {
        showError(e);
        throw e;
    }
});

dropZone.addEventListener('drop', function(e) {
    try{
        e.stopPropagation();
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const fileExtension = file.name.split('.').pop();
        if (fileExtension !== "stl") throw "File must be a .stl file";
        
        const reader = new FileReader();
        reader.onload = function(e2) {
            convertDataURItoBlob(e2.target.result).text().then(value => 
                render(value.replace(/(\r\n|\n|\r)/gm, ""))
                );
        }

        reader.readAsDataURL(file);
    } catch (e) {
        showError(e);
        throw e;
    }

})

function showError(message){
    console.log(message);
}

function hideError(){
    
}

function convertDataURItoBlob(dataURI){

  //https://www.codegrepper.com/code-examples/javascript/convert+dataurl+to+string+and+back+to+dataurl

  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;
}