<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '{}', true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON payload']);
    exit;
}

$fullName = trim((string)($data['fullName'] ?? $data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$phone = trim((string)($data['phone'] ?? ''));
$company = trim((string)($data['company'] ?? ''));
$projectType = trim((string)($data['projectType'] ?? ''));
$message = trim((string)($data['message'] ?? ''));

if ($fullName === '' || $email === '' || $message === '') {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'error' => 'Full name, email, and message are required.',
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => 'Please provide a valid email address.']);
    exit;
}

$to = getenv('CONTACT_TO_EMAIL') ?: 'hello@mirtalal.com';
$subject = 'New project inquiry from ' . $fullName;

$bodyLines = [
    "Name: {$fullName}",
    "Email: {$email}",
    "Phone: {$phone}",
    "Company: {$company}",
    "Project Type: {$projectType}",
    "",
    "Message:",
    $message,
];
$body = implode("\n", $bodyLines);

$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/plain; charset=utf-8',
    'From: Mir Talal Website <noreply@mirtalal.com>',
    'Reply-To: ' . $email,
];

$storageDir = __DIR__ . '/storage';
if (!is_dir($storageDir)) {
    mkdir($storageDir, 0755, true);
}

$entry = [
    'receivedAt' => date('c'),
    'fullName' => $fullName,
    'email' => $email,
    'phone' => $phone,
    'company' => $company,
    'projectType' => $projectType,
    'message' => $message,
    'ip' => $_SERVER['REMOTE_ADDR'] ?? null,
];

file_put_contents(
    $storageDir . '/contacts.jsonl',
    json_encode($entry, JSON_UNESCAPED_UNICODE) . PHP_EOL,
    FILE_APPEND | LOCK_EX
);

$mailed = @mail($to, $subject, $body, implode("\r\n", $headers));

if (!$mailed) {
    // Still succeed if stored locally so the form is usable in Laragon/dev.
    echo json_encode([
        'success' => true,
        'message' => 'Message received and saved. Email delivery may be unavailable in local environments.',
    ]);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Thanks! Your message has been sent. I will get back to you soon.',
]);
