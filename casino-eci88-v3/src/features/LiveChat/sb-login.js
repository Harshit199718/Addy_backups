export const loginSupportBoard = (username) => {

    window.SBF && window.SBF.getActiveUser(true, () => {
        let hostname = "email.com" 
        if (window && window.location && window.location.hostname) {
            hostname = window.location.hostname;
        }
        if (!window.SBF.activeUser() || (window.SBF.activeUser().email != `${username}@${hostname}`)) {
            window.SBF.ajax({
                function: "add-user-and-login",
                settings: { profile_image: "https://board.support/media/docs/user.png", first_name: username, email: `${username}@${hostname}`, password: "12345678" },
                // settings_extra: { phone: ["123456789", "Phone"], city: ["London", "City"] }
            }, (response) => {
                if (!window.SBF.errorValidation(response)) {
                    window.SBF.loginCookie(response[1]);
                    window.SBF.activeUser(new window.SBUser(response[0]));
                    window.SBChat.initChat();
                    let settings = JSON.parse(localStorage.getItem('support-board'))
                    if (settings != null && window.SBF.setting('welcome')) {
                        settings['welcome'] = '';
                        localStorage.setItem('support-board', JSON.stringify(settings))
                    }
                } else if (response[1] == "duplicate-email") {
                    window.SBF.login(`${username}@${hostname}`, "12345678", "", "", () => { window.SBChat.initChat(); });
                }
            });
        } else {
            window.SBChat.initChat();
        }
    });
}