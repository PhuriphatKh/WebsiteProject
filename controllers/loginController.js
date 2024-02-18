module.exports = (req, res) => {
    res.render('login', { flash: req.flash() });
}
