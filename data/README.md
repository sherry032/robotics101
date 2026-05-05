# Content Database

`content-db.json` is the app's editable content store.

The site reads this file through `lib/content-db.ts`, and the API exposes:

- `GET /api/content` for the full database
- `PUT /api/content` to replace the full database
- `GET /api/content/:collection` for one collection
- `PUT /api/content/:collection` to replace one collection

Available collections are `homepage`, `lessons`, `projects`, `buildLogs`,
`resources`, `startHere`, and `about`.

Keep the JSON shape the same when editing so the pages can render it safely.
