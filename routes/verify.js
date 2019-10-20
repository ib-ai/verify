const url = require('url');

/**
 * Handles the /verify route.
 */
module.exports = (request, response) => {
    parsedUrl = url.parse(request.url, true);
    request.session.role = parsedUrl.query.role;
    response.redirect('/discord');
};