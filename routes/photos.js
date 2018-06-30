var photos = [];
photos.push({
	name: 'Node.js Logo',
	path: 'http://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
	name: 'Ryan Speaking',
	path: 'http://nodejs.org/images/ryan-speaker.jpg'
});

exports.list = function (req, res) {
	res.render('photos', {
		title: '图片',    // 标题
		photos: photos
	});
};

