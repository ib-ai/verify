/**
 * Handles the /logout path.
 */
module.exports = (request, response) => {
    request.session.destroy(() => {
        response.redirect('/');
    })
};