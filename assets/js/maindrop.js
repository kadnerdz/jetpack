import React from 'react'
import Dropzone from 'react-dropzone'

export default class MainDrop extends React.Component {
  onDrop(acceptedFiles, rejectedFiles) {
    console.log("accepted: ", acceptedFiles,
		"rejected: ", rejectedFiles)
  }

  render() {
    return (
      <div>
	<Dropzone
	  onDrop={ this.onDrop.bind(this) }
	  maxSize={ 2 }
	  accept={ "image/gif" }
	  >
	  <div>FEED ME GIFS</div>
	</Dropzone>
      </div>
    )
  }
}

// module.exports = {
//   paramName: "file",
//   maxFilesize: 2,
//   acceptedFiles: ".gif",
//   dictInvalidFileType: "Nah dude! GIFs! GIFs!",
//   addRemoveLinks: true,
//   init: function() {
//     this.on('success', function(file, res) {
//       console.log(res);
//     });
//     this.on('error', function(file, res) {
//       console.log(res);
//     })
//   }
// }
