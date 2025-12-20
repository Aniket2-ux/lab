module.exports = function auth(req, res, next) {
  // TEMP SAFE AUTH (no JWT yet)
  // Allows backend to run without crashing

  // Later you can add real JWT validation here
  next();
};
