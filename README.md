# Atlas One starter

A tiny shop site with **zero dependencies**, ready for your coding agent to add a Nigerian-language feature
with [Atlas One](https://atlas-one.collins-coordinator-worker.workers.dev) and N-ATLaS.

1. Click **Use this template** above (this gives you your own copy on GitHub), then clone it.
   Or just: `git clone https://github.com/agapemiteu/atlas-one-starter`
2. Run it: `npm start`, then open http://localhost:3000. No install step.
3. Open the folder in your coding agent and follow the
   [beginner's guide](https://atlas-one.collins-coordinator-worker.workers.dev/guide), which has ideas to try.

Shop facts live in `shop.json`; API routes go in `server.js`; your key goes in `.env.local` (never committed).
When the agent reports `verified: true`, let it save `ATLAS_VERIFICATION.jwt` and push it: that receipt proves
your app reached genuine N-ATLaS, and anyone can check it.

Needs Node 20.11 or newer.
