# JWT

Json Web Token

`This is the user identification token
issued after the initial user authentication
`

Application client offers the user different authentication
access token = short time expiration
Refresh token = long time expiration

## Hazards

XSS: Cross-site scripting
CSRF: CS Request Forgery

### Access Token

Sent as JSON
client stores in memory
Do not store in local storage or cookies

### Refresh Token

Sent as httpOnly cookie
Not accessible via javascript
Must have expiry at some point

## Overall Authentication

Issued at Authorization
Client uses for API access until expires
verifed with middleware
new token issued at Refreshed requests
