# Admin UI plan

Status: **Phase 2 (partial) shipped.** The Slim 4 + Doctrine API in `api/` and the
React admin UI at `/admin` are live: login, overview, messages (with server-side
search), testimonials, services, site settings and account. New inquiries also
send an email notification. Still future: case studies, blog posts and the media
library.

## Goal

One private area at `/admin` where the site owner can read contact submissions and,
in later phases, edit the content that currently lives in `src/features/**/data` and
`src/data/`.

Non-goals for phase 1: multi-user roles, media library, draft/publish workflow,
email notifications, audit log.

## Auth

Backend already provides:

| Method | Path             | Notes                                        |
| ------ | ---------------- | -------------------------------------------- |
| POST   | `/api/auth/login`| `{ email, password }` → `{ token, expires_at, admin }` |
| GET    | `/api/auth/me`   | Bearer token → current admin                 |
| POST   | `/api/auth/logout` | Revokes the current token                  |
| PATCH  | `/api/admin/account/password` | `{ current_password, new_password }`; revokes other sessions |
| GET    | `/api/site-settings` | Public contact/social/SEO settings        |
| GET/PUT| `/api/admin/site-settings` | Read/update the same settings      |

- Tokens are opaque, hashed (SHA-256) in `admin_tokens`, expire after
  `AUTH_TOKEN_TTL_DAYS` (default 7).
- Send `Authorization: Bearer <token>`; `X-Admin-Token` also works.
- Client storage: `sessionStorage` only, cleared on logout and on any `401`.
  A stolen `localStorage` token survives browser restarts, so avoid it.
- Every admin request that returns `401` clears the session and redirects to
  `/admin/login`.

## Routing

React Router, lazy-loaded like the rest of `src/app/lazy-pages.ts`:

```
/admin/login            -> AdminLoginPage (public)
/admin                  -> AdminLayout + ProtectedRoute
/admin                  -> AdminDashboardPage
/admin/submissions      -> SubmissionsPage
/admin/submissions/:id  -> SubmissionDetailPage
/admin/account          -> AccountPage (change password - needs API)
```

New folders:

```
src/features/admin/
  api/client.ts          // fetch wrapper: base URL, bearer header, 401 handling
  api/auth.ts            // login/logout/me
  api/submissions.ts     // list/show/updateStatus/delete
  context/AdminAuthContext.tsx
  components/AdminLayout.tsx, AdminSidebar.tsx, ProtectedRoute.tsx,
             StatusBadge.tsx, SubmissionTable.tsx, Pagination.tsx, EmptyState.tsx
  pages/AdminLoginPage.tsx, AdminDashboardPage.tsx, SubmissionsPage.tsx,
        SubmissionDetailPage.tsx, AccountPage.tsx
  data/admin-navigation.ts
```

`AdminLayout` must not render `Navbar`/`Footer`/cookie banner - use a separate
minimal shell so the public site chrome does not leak into the CMS.

## Phase 1 screens (shipped)

Implemented in `src/features/admin/`:

1. **Login** - email + password, inline error from the API (`401` = wrong
   credentials, `422` = validation), loading state, redirect to the page the user
   originally asked for.
2. **Dashboard** - counts from `meta.counts` (`new`, `read`, `archived`), latest 5
   submissions, quick link to unread.
3. **Submissions list** - table with name, email, project type, status, received
   date; filter chips by status; pagination (`page`, `per_page`); search is
   client-side until the API gains a `q` param.
4. **Submission detail** - all fields, mailto reply button, status selector
   (`new` → `read` → `archived`), soft delete with confirm.
5. **Account** - name/email, change password, sign out.
6. **Site settings** - contact details, social links and SEO defaults.

The public site reads `/api/site-settings` through `useSiteSettings()` (footer,
contact page) and falls back to the static values in `src/data/site.data.ts`
while the API is unreachable. `lets-talk.data.ts` and the SEO schema still use the
static `brand` object; migrating those is part of phase 2.

Mobile: table collapses to cards; sidebar becomes a sheet. Reuse the existing
`section.styles.ts` spacing scale and Tailwind tokens rather than new ones.

## Existing API contract

```
GET    /api/admin/contact-submissions?page=1&per_page=20&status=new
GET    /api/admin/contact-submissions/{id}
PATCH  /api/admin/contact-submissions/{id}   { "status": "read" }
DELETE /api/admin/contact-submissions/{id}   (soft delete)
```

Errors are always `{ error: { message, details? } }`; `422` carries
`details.errors` per field.

## Phase 2 - CMS content

Shipped:

1. `site_settings` - single row: email, phone, location, social URLs, SEO defaults.
2. `services` - title, slug, description, icon, image, sort order, published.
3. `testimonials` - author, role, company, quote, avatar, rating, sort order.
4. Search on the messages list (name, email, company, subject, body) via `?q=`.

Remaining:

5. `case_studies` and `blog_posts` - title, slug, excerpt, cover image, rich body,
   published flag. Needs image upload (`public/uploads`) and a rich text editor
   (TipTap or markdown - decide before building).

Content is served publicly from `GET /api/services` and `GET /api/testimonials`;
the React site reads them through `useServices()` / `useTestimonials()` in
`src/features/content/useContent.ts`, falling back to `src/data/site.data.ts`
when the API is unreachable. Service detail pages, `lets-talk.data.ts` and the SEO
organization schema still use the static data.

Each entity follows the same layered pattern already in `api/src`:
Entity → Repository → Service → `Admin\*Controller`, with a matching public
`GET /api/...` endpoint that the React site reads at runtime.

Frontend migration for phase 2: keep the typed data modules, but have them fetch
from the API with a `useContent` hook and seed the current values as the initial
database rows (a `app:seed-content` command) so nothing goes blank on cutover.

## New-message email

`api/src/Service/ContactNotifier.php` sends an HTML + plain-text notification via
Symfony Mailer after a submission is saved. It stays disabled until both are set:

```
MAIL_DSN=smtp://user:password@smtp.yourhost.com:587
MAIL_FROM=no-reply@mirtalal.com
CONTACT_NOTIFY_TO=you@mirtalal.com
```

Any transport failure is logged to `api/logs/app.log` and the visitor still gets a
successful response, so a mail outage never loses a lead.

## Deployment notes

- The API cannot run on Firebase Hosting. Host `api/` on PHP hosting (or a small
  VPS) at its own origin, e.g. `https://api.mirtalal.com`, and set that origin in
  `CORS_ORIGINS`, plus `VITE_API_URL` for the built frontend.
- Serve `/admin` from the same SPA; add `Disallow: /admin` to `public/robots.txt`
  and send `X-Robots-Tag: noindex` for the admin routes.
- HTTPS only. Keep `TRUST_PROXY=true` only when actually behind a proxy, since it
  affects the contact rate limit key.
- Firebase rewrite for `/api/**` currently points to `index.html`; once the form
  uses an absolute `VITE_API_URL`, that rewrite is unused and can be dropped.

## Open decisions

1. Admin UI scope for phase 1: submissions only, or submissions + site settings?
2. Editing experience for long content: rich text (TipTap) or markdown?
3. Where will `api/` be hosted? Needed before CORS and `VITE_API_URL` are final.
4. Should `/admin` be on the same domain as the site (simplest) or separate?
