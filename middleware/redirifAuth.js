module.exports = (req, res, next) => {
    if (req.session.MemberID) {
        return res.redirect('/home')
    }

    next()
}