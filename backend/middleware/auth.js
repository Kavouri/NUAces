function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.sendStatus(401);
}


function ensureAdmin(req, res, next) {
  if (req.user && req.isAdmin) {
    return next();
  }
  return res.sendStatus(401);
}




exports.ensureAuthenticated = ensureAuthenticated;
exports.ensureAdmin = ensureAdmin;

