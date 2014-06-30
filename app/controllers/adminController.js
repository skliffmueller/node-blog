var locomotive = require('locomotive'), Controller = locomotive.Controller;
var Posts = require('../models/posts.js');
var adminController = new Controller();
adminController.create = function() {
	var self = this;
	var permalink = self.req.originalUrl.split('/').splice(0,1).join('/');
	
	if(permalink=='/') {
		self.template = 'posts';
		Posts.find({},{files:0,comments:0},function(e, r) {
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
adminController.post = function() {
	var self = this;
	console.log(self.req.originalUrl);
	var permalink = self.req.originalUrl.split('/');
	console.log(permalink);
	permalink.splice(0,2);
	console.log(permalink);
	permalink = permalink.join('/');
	console.log(permalink);
	self.template = 'single';
	if(permalink=='create') {
		self.post = {
			_id: '',
			permalink:'',
			title:'',
			content:'',
			info: '',
			comments:[],
			files:[],
			created: new Date()
		};
		self.render('admin');
	} else if(permalink=='post') {
		console.log(self.req.body);
	} else {
		Posts.findOne({permalink:permalink},function(e, r) {
			console.log(r);
			self.post = r;
			self.render('admin');
		});
	}
}
adminController.editPost = function() {

}
adminController.createPost = function() {
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
module.exports = adminController;
