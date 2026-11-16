# Deploy the PHP API to InfinityFree from GitHub

The `Deploy API to InfinityFree` GitHub Actions workflow builds the PHP dependencies and uploads the API to the InfinityFree `htdocs` directory over explicit FTPS whenever `api/**` changes on `talal` or `main`.

## Add repository secrets

In GitHub, open the repository and go to **Settings > Secrets and variables > Actions > New repository secret**. Add:

| Secret | Value |
| --- | --- |
| `INFINITYFREE_FTP_USER` | FTP username shown in the InfinityFree account panel |
| `INFINITYFREE_FTP_PASSWORD` | FTP password from the panel; do not use the MySQL password here |
| `INFINITYFREE_DB_NAME` | The database name shown in MySQL Databases |
| `INFINITYFREE_DB_USER` | The MySQL username shown in MySQL Databases |
| `INFINITYFREE_DB_PASSWORD` | The MySQL password shown in MySQL Databases |

The workflow uses the site's current details: `ftpupload.net` over FTPS, database host `sql206.infinityfree.com`, and website `mirtalal.ifree.page`. It creates a production `.env` during the GitHub run and sends it to the server; `.env` is not committed to the repository. The account `.htaccess` routes requests through `public/` and blocks direct access to internal source and configuration files.

## Run the deployment

After adding all five secrets, push a commit that changes a file under `api/` to `talal` or `main`. Open the repository's **Actions** tab to see the upload status. You can also start it manually using **Actions > Deploy API to InfinityFree > Run workflow**.

## Database setup still needs a separate step

The workflow uploads PHP files; it cannot run Doctrine migrations because InfinityFree free databases reject remote MySQL connections. In InfinityFree's phpMyAdmin, select the new database, choose **Import**, and upload [`infinityfree-schema.sql`](infinityfree-schema.sql). This is for a new, empty database. The API tables will exist after import, but you still need to create the first admin account before the admin pages can log in. Do not add a public migration endpoint or put database credentials in committed files.

## Frontend

After the API and its database are ready, set `VITE_API_URL=https://mirtalal.ifree.page` in the Firebase frontend build environment and redeploy the frontend. The API's CORS allowlist currently includes the Firebase default origins `https://mirtalal.web.app` and `https://mirtalal.firebaseapp.com`.
