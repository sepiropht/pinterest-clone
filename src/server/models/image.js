import mongoose from "mongoose";

const imageShema = mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  url: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    index: true,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const Image = (module.exports = mongoose.model("Image", imageShema));

module.exports.getImages = function(callback) {
  Images.find(callback);
};

module.exports.getImagesByUserId = function(userId, callback) {
  var query = { userId: userId };
  Article.find(query, callback);
};

module.exports.create = function(newImages, callback) {
  newImages.save(callback);
};
