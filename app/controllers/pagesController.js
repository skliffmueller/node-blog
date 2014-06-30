var locomotive = require('locomotive'), Controller = locomotive.Controller;
var Posts = require('../models/posts.js');
var pagesController = new Controller();
pagesController.about = function() {
	this.title = 'About';
	this.render('main.html');
}
pagesController.main = function() {
	var self = this;
	var permalink = self.req.originalUrl;
	if(permalink=='/') {
		self.template = 'posts';
		Posts.find({},{files:0,comments:0}).sort({created:-1}).exec(function(e, r) {
			console.log(r);
			self.posts = r;
			self.render('index');
		});
	} else {
		self.template = 'single';
		Posts.findOne({permalink:permalink.substr(1)},function(e, r) {
		
			console.log(r);
			self.post = r;
			self.render('index');
		});
	}
}
var stuff = function() {
	var post = new Posts({
		title:'Blog Test Title',
		content:'			<h2></h2>\
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\
			<ul>\
				<li>List 1</li>\
				<li>List 2</li>\
				<li>List 3</li>\
			</ul>',
		info: 'Stuff about this post<ul><li>Stuff</li><li>Stuff</li></ul>'
	});
	post.comments.push({
		content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	});
	post.comments.push({
		content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	});
	post.comments.push({
		content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	});
	post.save(function(e) {
		Posts.find(function(e, r) {
			console.log(r);
		});
	});
}
module.exports = pagesController;
