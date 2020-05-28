module.exports = function (req, res, next){

    if (!req.user.isAdmin) return res.status(403).send("You do not have authorisation to carry out that action...");

    next();
    
}