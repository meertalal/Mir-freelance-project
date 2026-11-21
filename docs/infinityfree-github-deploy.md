# Deploy the website and PHP API to InfinityFree from GitHub

The `Deploy website and API to InfinityFree` GitHub Actions workflow builds the React website and PHP dependencies, then uploads both to the InfinityFree `htdocs` directory over explicit FTPS whenever frontend or API source files change on `talal` or `main`. The website and API share the origin `https://mirtalal.freedev.app`; the root `.htaccess` sends requests through `public/`, and `public/.htaccess` routes `/api/*` to Slim and other non-file paths to the React app.

## Add repository secrets

In GitHub, open the repository and go to **Settings > Secrets and variables > Actions > New repository secret**. Add:

| Secret | Value |
| --- | --- |
| `INFINITYFREE_FTP_USER` | FTP username shown in the InfinityFree account panel |
| `INFINITYFREE_FTP_PASSWORD` | FTP password from the panel; do not use the MySQL password here |
| `INFINITYFREE_DB_NAME` | The database name shown in MySQL Databases |
| `INFINITYFREE_DB_USER` | The MySQL username shown in MySQL Databases |
| `INFINITYFREE_DB_PASSWORD` | The MySQL password shown in MySQL Databases |

The workflow uses the site's current details: `ftpupload.net` over FTPS, database host `sql304.infinityfree.com`, and website `mirtalal.freedev.app`. It creates a production `.env` during the GitHub run and sends it to the server; `.env` is not committed to the repository. The account `.htaccess` routes requests through `public/` and blocks direct access to internal source and configuration files. Frontend API requests use the same origin, so contact and admin requests go to the InfinityFree API.

## Run the deployment

After adding all five secrets, push a commit that changes a file under `api/` or the frontend source to `talal` or `main`. Open the repository's **Actions** tab to see the upload status. You can also start it manually using **Actions > Deploy website and API to InfinityFree > Run workflow**.

## Database setup still needs a separate step

The workflow uploads PHP files; it cannot run Doctrine migrations because InfinityFree free databases reject remote MySQL connections. In InfinityFree's phpMyAdmin, select the new database, choose **Import**, and upload [`infinityfree-schema.sql`](infinityfree-schema.sql). This is for a new, empty database. The API tables will exist after import, but you still need to create the first admin account before the admin pages can log in.

For an existing database, import [`infinityfree-content-module-upgrade.sql`](infinityfree-content-module-upgrade.sql) to add the Blog and Portfolio tables used by the Admin modules. This upgrade only creates the missing tables.

To create that account without exposing a plaintext password:

1. Add GitHub Actions repository secrets named `INFINITYFREE_ADMIN_EMAIL`, `INFINITYFREE_ADMIN_PASSWORD` (at least 12 characters), and optionally `INFINITYFREE_ADMIN_NAME`.
2. Push a change to `talal` or `main`, or manually run **Actions > Deploy website and API to InfinityFree > Run workflow**. The workflow generates a SQL file containing only a password hash and keeps it as an artifact for one day.
3. Open the successful workflow run, download `one-time-admin-sql`, extract `create-admin.sql`, then in phpMyAdmin choose **Import** for this database and import that file.
4. Delete the three admin secrets from GitHub after importing, then sign in at `/admin/login` with the email and password you chose.

The SQL uses a plain `INSERT`; import it only once. Do not commit or share the SQL artifact. Never add a public migration or account-setup endpoint.
