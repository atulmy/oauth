# OAuth

OAuth 2.0 examples for various providers in one place.

This project helps you understand the following basic OAuth 2.0 flow:

1. Show platform dialog
2. Get Access Token
3. Use token to fetch user details

Although this project uses React in the frontend and NodeJS in backend, the flow and implementation largely remains same for any other language or framework.

## Integrations

### Social platforms

- [x] Facebook
- [ ] Google
- [ ] Twitter
- [ ] Instagram

### Tech platforms

- [ ] GitHub
- [ ] GitLab
- [ ] DigitalOcean

## Docs

### Facebook

1. Read official flow https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow
2. Create a new application https://developers.facebook.com/apps/
3. Goto **App → Add Product** and choose Facebook Login
4. Goto **App → Products → Facebook Login → Settings** and add a `Valid OAuth Redirect URI` as `https://example.com/authorize/` (replace your actual domain for live)
5. Goto **App → Settings** and copy `App ID` and `App Secret`
6. Update `web/.env.local` `REACT_APP_OAUTH_FACEBOOK_ID` with `App ID`
7. Update `api/.env.local` `OAUTH_FACEBOOK_ID` with `App ID`
8. Update `api/.env.local` `OAUTH_FACEBOOK_SECRET` with `App Secret`

## Contribution

Found an integration not working? Open an issue / Send a Pull Request with fixes.

Looking for a particular OAuth integration not yet added? Open an issue / Send a Pull Request with additional integrations.
