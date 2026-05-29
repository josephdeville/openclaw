# Clay Coaching site

Static Vercel site for `https://clayworksofart.com/clay-coaching`.

## Environment

Set these in Vercel before deploying:

- `STRIPE_PRICING_TABLE_ID`
- `STRIPE_PUBLISHABLE_KEY`

The build writes `dist/clay-coaching/index.html`, so the page is served at `/clay-coaching`.

## Local build

```bash
STRIPE_PRICING_TABLE_ID=prctbl_test STRIPE_PUBLISHABLE_KEY=pk_test npm run build
```
