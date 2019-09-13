window.onload = () => {
    const fragment = new URLSearchParams(window.location.hash.slice(1)); // Get the parameters.
    if(fragment.has('access_token')) { // Check if the access token is specified.
        const token = fragment.get('access_token');
        const type = fragment.get('token_type');
        fetch('https://discordapp.com/api/users/@me', { // Fetch user data.
                headers: {
                    authorization: `${type} ${token}`
                }
			})
			.then(response => response.json())
			.then(response => {
                const { username, discriminator } = response;
				document.getElementById('content').innerText = `Hola, ${username}#${discriminator}`; // Update page contents to show user data.
			})
			.catch(console.error);
    }
};