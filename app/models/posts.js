var mongoose = require('mongoose');
var mongooseTypes = require("mongoose-types");
//mongooseTypes.loadTypes(mongoose, "email"); //load only email type
var Schema = mongoose.Schema;
var CommentsSchema = new Schema({
	account_id: {
		type: Schema.Types.ObjectId
	},
	content: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: new Date()
	}
});
var FilesSchema = new Schema({
	file_id: {
		type: Schema.Types.ObjectId
	},
	name: {
		type: String
	},
	meta: {
		type: Schema.Types.Mixed // Insert object { alt:'Tags', width:'300px', height:'300px', tool:'image,pdf,video' }
	}
});
var PostsSchema = new Schema({
	permalink: {
		type: String,
		unique: true
	},
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
		required: true
    },
	info: {
		type: String
	},
	comments: [CommentsSchema],
	files: [FilesSchema],
    created: {
        type: Date,
        default: new Date()
    },
});
module.exports = mongoose.model('Posts', PostsSchema);