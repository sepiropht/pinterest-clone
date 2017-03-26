import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
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
const Image = (module.exports = mongoose.model("Image", imageSchema));

module.exports.getImages = function(callback) {
  Image.find(callback);
};

module.exports.getImagesByUserId = function(userId, callback) {
  var query = { userId: userId };
  Image.find(query, callback);
};

module.exports.create = function(newImages, callback) {
  console.log("merdier", newImages);
  newImages.save(callback);
};
