module.exports = (req, res, next) => {
    if (req.path === '/second-1') {
        res.render('second-1');
    } else if (req.path === '/second-2') {
        res.render('second-2');
    } else if (req.path === '/second-3') {
        res.render('second-3');
    } else if (req.path === '/second-4') {
        res.render('second-4');
    } else if (req.path === '/second-5') {
        res.render('second-5');
    } else if (req.path === '/second-6') {
        res.render('second-6');
    } else if (req.path === '/second-7') {
        res.render('second-7');
    } else if (req.path === '/second-8') {
        res.render('second-8');
    } else if (req.path === '/second-9') {
        res.render('second-9');
    } else if (req.path === '/second-10') {
        res.render('second-10');
    } else if (req.path === '/second-11') {
        res.render('second-11');
    } else {
        next();
    }
};
