const express = require('express');

/**
 * Handles the / path.
 */
module.exports = (request, response) => {
    let filename;
    if(request.session.auth) {
        filename = 'done.html';
    } else {
        filename = 'verify.html';
    }
    response.sendFile(filename, { root: './static' });
};