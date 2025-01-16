<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Include PHPMailer

// Check if the script is being accessed via POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "POST request received"; // Add this for debugging

    $fullName = htmlspecialchars($_POST['full-name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $companyName = htmlspecialchars($_POST['company-name']);
    $jobTitle = htmlspecialchars($_POST['job-title']);
    $date = htmlspecialchars($_POST['date']);
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);
    $mail->SMTPDebug = 2; // Verbose debug output
    $mail->Debugoutput = 'html';

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Gmail SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'chikafrancis.jp@gmail.com'; // Your Gmail address
        $mail->Password = 'dnlmpoapyopszztr'; // Your Gmail password (or App Password)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipients
        $mail->setFrom('chikafrancis.jp@gmail.com', $fullName);
        $mail->addAddress('chikafrancis.jp@gmail.com', 'Recipient Name'); // Your email

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission';
        $mail->Body = "
        <html>
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

        $mail->send();
        echo "success";
    } catch (Exception $e) {
        echo "Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    // Only handle non-POST requests here
    echo "error: This script only handles POST requests.";
    http_response_code(405); // Method Not Allowed
}
?>