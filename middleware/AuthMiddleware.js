module.exports = (req, res, next) => {
    if (req.session && req.session.MemberID) {
        next();
    } else {
        return res.redirect('/');
    }
};
