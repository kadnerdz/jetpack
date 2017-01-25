module.exports = {
	paramName: "file",
	maxFilesize: 2,
	acceptedFiles: ".gif",
	dictInvalidFileType: "Nah dude! GIFs! GIFs!",
	addRemoveLinks: true,
	init: function() {
		this.on('success', function(file, res) {
			console.log(res);
		});
		this.on('error', function(file, res) {
			console.log(res);
		})
	}
}
