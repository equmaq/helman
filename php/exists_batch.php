<?php
include 'auth.php';

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['ids']) || !is_array($input['ids']) || count($input['ids']) === 0) {
    echo json_encode(['existing' => []]);
    exit;
}

$ids = array_map('trim', $input['ids']);

$placeholders = implode(',', array_fill(0, count($ids), '?'));
$types = str_repeat('s', count($ids));

$sql = "SELECT `helmet-id` FROM helmetentries WHERE `helmet-id` IN ($placeholders)";
$stmt = $conn->prepare($sql);
$stmt->bind_param($types, ...$ids);
$stmt->execute();

$result = $stmt->get_result();

$existing = [];
while ($row = $result->fetch_assoc()) {
    $existing[] = $row['helmet-id'];
}

echo json_encode(['existing' => $existing]);

$stmt->close();
$conn->close();
