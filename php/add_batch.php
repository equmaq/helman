<?php
include 'auth.php';

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

foreach ($input as $key => $value) {
    $helmetID = $key['id'];
    $title = $value['title'];
    $author = $value['author'];
    $year = $value['year'];
}

$sql = "INSERT INTO helmetentries (`helmet-id`, title, author) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $helmetID, $title, $author);
$stmt->execute();
$stmt->close();
$conn->close();
?>