const clientId = process.env.CLIENT_ID;
const redirect = process.env.REDIRECT;

/**
 * Path that will redirect to the Discord OAuth2 login page in order to force the user to log in.
 */
module.exports = (_, response) => {
    response.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirect}&response_type=code&scope=identify`);
};