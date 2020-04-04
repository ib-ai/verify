/**
 * Handles the / path.
 */
module.exports = (request, response) => {
    // This can be grouped with the rest, but I want to separate it to make it easier to understand.
    let blocked = request.session.blocked;
    if(blocked && global.lockdown) {
        response.sendFile('blocked.html', { root: './static' });
        return;
    }

    let filename;
    if(!request.session.auth || request.session.blocked) { // Add blocked to ensure those who did not verify during a lockdown can get verified.
        filename = 'index.html';
    } else {
        filename = 'done.html';
    }
    response.sendFile(filename, { root: './static' });
};