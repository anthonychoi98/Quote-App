import React from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Crop from './Crop.js';
import download from 'downloadjs';

 
export default class CameraComponent extends React.Component {

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
  }

  handleTakePhoto (dataUri) {
    // var blob = dataURItoBlob(dataUri);
    // var fd = new FormData(document.forms[0]);
    // fd.append("canvasImage", blob);
    // console.log('blob', blob)

    download(dataUri);

  }
 
  handleTakePhotoAnimationDone (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }
 
  handleCameraError (error) {
    console.log('handleCameraError', error);
  }
 
  handleCameraStart (stream) {
    console.log('handleCameraStart');
  }
 
  handleCameraStop () {
    console.log('handleCameraStop');
  }
 
  render(){
    return(
    <div>
      <Camera
        onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri); } }
        onTakePhotoAnimationDone = { (dataUri) => { this.handleTakePhotoAnimationDone(dataUri); } }
        onCameraError = { (error) => { this.handleCameraError(error); } }
        idealFacingMode = {FACING_MODES.ENVIRONMENT}
        idealResolution = {{width: 640, height: 480}}
        imageType = {IMAGE_TYPES.JPG}
        imageCompression = {0.97}
        isMaxResolution = {true}
        isImageMirror = {false}
        isSilentMode = {false}
        isDisplayStartCameraError = {true}
        isFullscreen = {false}
        sizeFactor = {1}
        onCameraStart = { (stream) => { this.handleCameraStart(stream); } }
        onCameraStop = { () => { this.handleCameraStop(); } }
      />
      <Crop /> 

    </div>
    );
  }

}
