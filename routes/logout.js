/**
 * Handles the /logout path.
 */
module.exports = (request, response) => {
    if(global.lockdown) {
        response.sendFile('unavailable.html', { root: './static' });
    } else {
        request.session.destroy(() => {
            response.redirect('/');
        });
    }
};