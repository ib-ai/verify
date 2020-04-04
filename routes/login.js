const url = require('url');
const fetch = require('node-fetch');
const formData = require('form-data');
const bot = require('./../bot');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirect = process.env.REDIRECT;
const server = process.env.SERVER;

/**
 * Handles the /login path.
 */
module.exports = (request, response) => {
    parsedUrl = url.parse(request.url, true);
    let code = parsedUrl.query.code;
    let data = new formData();
    data.append('client_id', clientId);
    data.append('client_secret', clientSecret);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', redirect);
    data.append('scope', 'identify');
    data.append('code', code);
    fetch('https://discordapp.com/api/oauth2/token', {method: "POST", body: data})
        .then(res => res.json())
        .then(res => {
            console.log(res);
            request.session.auth = {
                type: res.token_type,
                token: res.access_token
            };
            fetch('https://discordapp.com/api/users/@me', {method: "GET", headers: {
                authorization: `${res.token_type} ${res.access_token}`
            }})
            .then(res => res.json())
            .then(res => {
                verify(res.id, request.session.role, request);
                response.redirect('/');
            })
            .catch(error => {
                response.send('Internal error. Please report this: geting user.');
                console.log(error);
            });
        })
        .catch(error => {
            response.send('Internal error. Please report this: getting token.');
            console.log(error);
        });
};

/**
 * Adds the verified + year role to the user.
 * @param {string} user The user ID.
 * @param {string} role The role name.
 * @param {session} request The request.
 */
function verify(user, role, request) {
    bot.fetchUser(user).then(user => {
        let guild = bot.guilds.get(server);
        bot.guilds.get(server).fetchMember(user).then(member => {
            let now = new Date().getTime();
            let aWeek = 7 * 24 * 3600 * 1000; // A week in milliseconds.
            let aboutAWeekAgoWeekAgo = parseInt(now - aWeek); // Explicit integer parse.
            let created = parseInt(user.createdAt.getTime()); // Explicit integer parse.

            if(created > aboutAWeekAgoWeekAgo && global.lockdown) { // Younger than a week.
                console.log(`Possible spam account: ${request.ip}.`);
                request.session.blocked = true;
                saveSession(request);
                return;
            } else {
                // This is to override any previous remains from a lockdown.
                request.session.blocked = false;
                saveSession(request);
            }

            let verified = lookup(guild, "Verified");
            let year = lookup(guild, role);
            if(verified != null && !member.roles.has(verified.id)) {
                member.addRole(verified);
            }
            if(year != null && !member.roles.has(year.id)) {
                member.addRole(year);
            }
            console.log(`Verified user ${user.id} with IP address ${request.ip}.`);
        })
        .catch(_ => {
            console.log(`Could not find member for ${user.id}.`);
        });
    })
    .catch(_ => {
        console.log(`User ${user} not on the server.`);
    });
}


/**
 * Finds a role by name.
 * @param {Guild} guild The guild.
 * @param {string} name The role name.
 */
function lookup(guild, name) {
    return name != null ? guild.roles.find(role => role.name.toLowerCase() === name.toLowerCase()) : null;
}

/**
 * Shorthand to save a session.
 * @param {Request} request The request.
 */
function saveSession(request) {
    request.session.save(error => {
        console.log(error);
    });
}