Source code for the fishstrap website.
Please ignore the horrible code. I'm working on it. PRs are appreciated.

## Developing
```bash
bun run dev
```

## Setting up Roblox authentication
### For development
Create a `.env` file with a `ROBLOXCOOKIES` variable
The data should be saved as a JSON array of strings like this:
```json
ROBLOXCOOKIES=["_|WARNING:-DO-NOT-SHARE-THIS.1", "_|WARNING:-DO-NOT-SHARE-THIS.2"]
```
### In production
Create a secret with the same name and value in Cloudflare dashboard
https://developers.cloudflare.com/workers/configuration/secrets/

If no cookies are set robloxAuth.ts will throw a runtime error