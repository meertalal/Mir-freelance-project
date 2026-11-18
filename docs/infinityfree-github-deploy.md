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

The workflow uploads PHP files; it cannot run Doctrine migrations because InfinityFree free databases reject remote MySQL connections. In InfinityFree's phpMyAdmin, select the new database, choose **Import**, and upload [`infinityfree-schema.sql`](infinityfree-schema.sql). This is for a new, empty database. The API tables will exist after import, but you still need to create the first admin account before the admin pages can log in. Do not add a public migration endpoint or put database credentials in committed files.

## Firebase fallback

The Firebase live deploy workflow is now manual only. Firebase preview deployments for pull requests remain available.
