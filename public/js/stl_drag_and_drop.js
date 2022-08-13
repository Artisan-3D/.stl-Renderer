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
            render(convertDataURItoArrayBuffer(e2.target.result)); //TODO convert to binary
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

function convertDataURItoArrayBuffer(dataURI){
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return ab;
}