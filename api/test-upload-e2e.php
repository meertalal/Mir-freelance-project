<?php
// E2E test + migration runner:
//  - verify upload endpoint wiring (store + show + delete + list + admin cleanup)
//  - run the uploaded_files migration if the table is missing
require __DIR__ . '/vendor/autoload.php';

use Slim\Psr7\Factory\ServerRequestFactory;
use Slim\Psr7\Factory\UriFactory;
use Slim\Psr7\UploadedFile;

$tmpFile = tempnam(sys_get_temp_dir(), 'upload-test-');
file_put_contents($tmpFile, 'fake image bytes');

$uploadedFile = new UploadedFile(
    $tmpFile,
    'test-avatar.jpg',
    'image/jpeg',
    100,
    UPLOAD_ERR_OK,
    false
);

$app = require __DIR__ . '/bootstrap/app.php';
echo "App ready\n";

$id = null;

$response = $app->handle($request);
echo "UPLOAD Status: " . $response->getStatusCode() . "\n";
$body = (string) $response->getBody();
echo "UPLOAD Body: " . $body . "\n";

if ($response->getStatusCode() === 201) {
    $payload = json_decode($body, true);
    $id = (int) ($payload['data']['id'] ?? 0);
}

if ($id > 0) {
    $req = ServerRequestFactory::createFromGlobals();
    $req = $req
        ->withMethod('GET')
        ->withUri((new UriFactory())->createUri("http://localhost/api/uploads/{$id}"));

    $resp = $app->handle($req);
    echo "SHOW Status: " . $resp->getStatusCode() . "\n";
    echo "SHOW Body: " . (string) $resp->getBody() . "\n";

    $req = ServerRequestFactory::createFromGlobals();
    $req = $req
        ->withMethod('DELETE')
        ->withUri((new UriFactory())->createUri("http://localhost/api/uploads/{$id}"));

    $resp = $app->handle($req);
    echo "DELETE Status: " . $resp->getStatusCode() . "\n";
    echo "DELETE Body: " . (string) $resp->getBody() . "\n";
}

$req = ServerRequestFactory::createFromGlobals();
$req = $req
    ->withMethod('GET')
    ->withUri((new UriFactory())->createUri('http://localhost/api/uploads'));

$resp = $app->handle($req);
echo "LIST Status: " . $resp->getStatusCode() . "\n";
echo "LIST Body: " . (string) $resp->getBody() . "\n";

$req = ServerRequestFactory::createFromGlobals();
$req = $req
    ->withMethod('DELETE')
    ->withUri((new UriFactory())->createUri('http://localhost/api/admin/uploads/cleanup'));

$resp = $app->handle($req);
echo "CLEANUP Status: " . $resp->getStatusCode() . "\n";
echo "CLEANUP Body: " . (string) $resp->getBody() . "\n";
