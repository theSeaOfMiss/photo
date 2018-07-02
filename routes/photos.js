var Photo = require('../models/Photo');   // 引入Photo模型
var path = require('path');
var fs = require('fs');
var join = path.join;

exports.list = function (req, res, next) {
	Photo.find({}, function (err, photos) {   // {}查处photo集合中的所有记录
		if (err) return next(err);
		res.render('photos', {
			title: '图片',    // 标题
			photos: photos
		});
	});
};

exports.form = function (req, res) {
	res.render('photos/upload.ejs', {
		title: 'Photo upload'
	});
};

exports.submit = function (dir) {
	return function (req, res, next) {
		var img = req.files[0];
		var name = req.body.name || img.originalname;
		var path = join(dir, img.originalname)

		fs.rename(img.path, path, function (err) {
			if (err) return next(err);

			Photo.create({
				name: name,
				path: img.originalname
			}, function (err) {
				if (err) return next(err);
				res.redirect('/');    // 重定向到首页
			});
		});
	};
};

exports.download = function (dir) {
	return function (req, res, next) {
		var id = req.params.id;
		Photo.findById(id, function (err, photo) {    // 加载照片记录
			if (err) return next(err);

			var path = join(dir, photo.path);   // 构造指向文件的绝对路径
			res.download(path);   // 传输文件
		});
	};
};