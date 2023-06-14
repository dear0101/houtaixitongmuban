module.exports = function (source) {
  console.log("loader2");
  return source;
};

module.exports.pitch = function () {
  console.log("pitch2");
};
