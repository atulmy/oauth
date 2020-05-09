# OAuth

OAuth 2.0 implementation for various providers in one place.

This project contains OAuth 2.0 implementation for various providers and helps you understand of following OAuth 2.0 flow:

1. Show platform dialog
2. Get Access Token
3. Use token to fetch user details

Although this project is build using React for frontend and NodeJS for backend, the flow and implementation largely remains same for any other language or framework.

## Integrations

### Social platforms

- [x] [Facebook](#facebook)
- [x] [Google](#google)
- [x] [Instagram](#instagram)

### Tech platforms

- [x] [GitHub](#github)
- [x] GitLab
- [ ] DigitalOcean

## Docs

### Facebook

1. Read official flow: https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow
2. Create a new application: https://developers.facebook.com/apps/
3. Goto **App → Add Product** and choose Facebook Login
4. Goto **App → Products → Facebook Login → Settings** and add a `Valid OAuth Redirect URI` as `https://example.com/authorize/` (replace your actual domain for live)
5. Goto **App → Settings** and copy `App ID` and `App Secret`
6. Update `web/.env.local` `REACT_APP_OAUTH_FACEBOOK_ID` with `App ID`
7. Update `api/.env.local` `OAUTH_FACEBOOK_ID` with `App ID`
8. Update `api/.env.local` `OAUTH_FACEBOOK_SECRET` with `App Secret`

---

### Google

1. Read official flow: https://developers.google.com/identity/protocols/oauth2/web-server
2. Create a new application: https://console.cloud.google.com/projectcreate
3. Setup consent screen https://console.cloud.google.com/apis/credentials/consent
   1. Choose `External` (Available to any user with a Google Account.)
   2. In `Authorized domains` input enter `example.com`
   3. Fill in `Application Name` and click `Save` button
4. Create Credentials https://console.cloud.google.com/apis/credentials
   1. Click on `+ CREATE CREDENTIALS` button
   2. Choose `OAuth client ID`
   3. Select `Web application`
   4. For `Authorized redirect URIs`, fill in following two entries:
      1. `https://example.com/authorize/`
      2. `http://localhost:3000/authorize/`
5. Copy `Your Client ID` and `Your Client Secret`
6. Update `web/.env.local` `REACT_APP_OAUTH_GOOGLE_ID` with `Your Client ID`
7. Update `api/.env.local` `OAUTH_GOOGLE_ID` with `Your Client ID`
8. Update `api/.env.local` `OAUTH_GOOGLE_SECRET` with `Your Client Secret`

---

### Instagram

1. Read official flow: https://developers.facebook.com/docs/instagram-basic-display-api/getting-started
2. Create a new application: https://developers.facebook.com/apps/
3. Goto **App → Settings → Basic** and fill in all the required fields
4. Goto **App → Add Product** and choose Instagram Basic Display
5. Click on `Create New App` button
6. Goto **App → Products → Basic Display** and fill in following
   1. `Valid OAuth Redirect URIs` as `https://example.com/authorize/`
   2. `Deauthorize Callback URL` as `https://example.com/authorize/instagram-deauthorize`
   3. `Data Deletion Request URL` as `https://example.com/authorize/instagram-delete`
7. Goto **App → Products → Basic Display → Roles → Roles** and click on `Add Instagram Testers`, search for your account and click on `Submit`
8. Accept the tester invite https://www.instagram.com/accounts/manage_access/
9. Goto **App → Products → Basic Display** and copy `Instagram App ID` and `Instagram App Secret`
10. Update `web/.env.local` `REACT_APP_OAUTH_INSTAGRAM_ID` with `Instagram App ID`
11. Update `api/.env.local` `OAUTH_INSTAGRAM_ID` with `Instagram App ID`
12. Update `api/.env.local` `OAUTH_INSTAGRAM_SECRET` with `Instagram App Secret`
13. Note:

    1. As of writing this Readme, Instagram does not accept `localhost:3000` as valid callback URI. So while testing, you may need to manually change the callback URL.
    2. For production, you need to complete `App Review for Instagram Basic Display` by submitting `instagram_graph_user_profile` and `instagram_graph_user_media` for review.

---

### GitHub

1. Read official flow: https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps
2. Create a new OAuth application: https://github.com/settings/applications/new and fill in following:
   1. `Application name` enter your application name, eg: `Example`
   2. `Homepage URL` enter your website url, eg: `https://example.com`
   3. `Authorization callback URL`:
      1. For development, enter `http://localhost:3000/authorize/`
      2. For production, enter `https://example.com/authorize/`
3. Copy `Client ID` and `Client Secret`
4. Update `web/.env.local` `REACT_APP_OAUTH_GITHUB_ID` with `Client ID`
5. Update `api/.env.local` `OAUTH_GITHUB_ID` with `Client ID`
6. Update `api/.env.local` `OAUTH_GITHUB_SECRET` with `Client Secret`

---

### GitLab

1. Read official flow: https://docs.gitlab.com/ee/api/oauth2.html#web-application-flow
2. Create a new OAuth application: https://gitlab.com/profile/applications and fill in following:
   1. `Name` enter your application name, eg: `Example`
   2. `Homepage URL` enter your website url, eg: `https://example.com`
   3. `Authorization callback URL` enter `http://localhost:3000/authorize/` and on new line `https://example.com/authorize/`
3. For `Scopes` check `read_user`, `profile` and `email`
4. Click on `Save application` button and copy `Application ID` and `Secret`
5. Update `web/.env.local` `REACT_APP_OAUTH_GITLAB_ID` with `Application ID`
6. Update `api/.env.local` `OAUTH_GITLAB_ID` with `Application ID`
7. Update `api/.env.local` `OAUTH_GITLAB_SECRET` with `Secret`

## Contribution

Found an integration not working? Open an issue / Send a Pull Request with fixes.

Looking for a particular OAuth integration not yet added? Open an issue / Send a Pull Request with additional integrations.
