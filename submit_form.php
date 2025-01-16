<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect form data
    $fullName = htmlspecialchars($_POST['full-name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $companyName = htmlspecialchars($_POST['company-name']);
    $jobTitle = htmlspecialchars($_POST['job-title']);
    $date = htmlspecialchars($_POST['date']);
    $message = htmlspecialchars($_POST['message']);

    // Recipient email address
    $to = "chiokechikaife.jp@gmail.com"; // Replace with your email address
    $subject = "New Contact Form Submission";

    // Email content
    $emailContent = "
    <html>
    <head>
        <title>Contact Form Submission</title>
    </head>
    <body>
        <h2>New Contact Form Submission</h2>
        <p><strong>Full Name:</strong> $fullName</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Company Name:</strong> $companyName</p>
        <p><strong>Job Title:</strong> $jobTitle</p>
        <p><strong>Date:</strong> $date</p>
        <p><strong>Message:</strong><br>$message</p>
    </body>
    </html>";

    // Email headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: <$email>" . "\r\n";

    // Send email
    if (mail($to, $subject, $emailContent, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo "error";
}
?>