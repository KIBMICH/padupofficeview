<?php
// SMTP Configuration
$smtp_host = "lim114.truehost.cloud"; // Correct hostname from hosting provider
$smtp_port = 587; // Using STARTTLS
$smtp_username = "noreply@padupcreations.com";
$smtp_password = getenv('SMTP_PASSWORD') ?: "YOUR_PASSWORD_HERE"; // Set this via cPanel or .env file
$smtp_from = "noreply@padupcreations.com";
$smtp_from_name = "Fellowship Application System";
$to_email = "program1@padupcreations.com";


if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(405);
    die("Method not allowed");
}

// Honeypot spam protection
if (!empty($_POST['_gotcha'])) {
    http_response_code(200);
    die("Thank you for your submission");
}

// Sanitize and validate inputs
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Collect form data
$firstName = sanitize_input($_POST['firstName'] ?? '');
$lastName = sanitize_input($_POST['lastName'] ?? '');
$otherNames = sanitize_input($_POST['otherNames'] ?? '');
$email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phoneNumber = sanitize_input($_POST['phoneNumber'] ?? '');
$whatsappNumber = sanitize_input($_POST['whatsappNumber'] ?? '');
$country = sanitize_input($_POST['country'] ?? '');
$cityState = sanitize_input($_POST['cityState'] ?? '');
$is18OrOlder = isset($_POST['is18OrOlder']) ? 'Yes' : 'No';

$occupation = sanitize_input($_POST['occupation'] ?? '');
$linkedinProfile = sanitize_input($_POST['linkedinProfile'] ?? '');
$languages = isset($_POST['languages']) && is_array($_POST['languages']) ? implode(', ', $_POST['languages']) : (sanitize_input($_POST['languages'] ?? ''));
$socialImpactExperience = sanitize_input($_POST['socialImpactExperience'] ?? '');

$trainingAvailability = sanitize_input($_POST['trainingAvailability'] ?? '');
$postTrainingCommitment = sanitize_input($_POST['postTrainingCommitment'] ?? '');
$deviceAccess = sanitize_input($_POST['deviceAccess'] ?? '');

$statementOfInterest = sanitize_input($_POST['statementOfInterest'] ?? '');
$problemSolving = sanitize_input($_POST['problemSolving'] ?? '');
$howDidYouHear = sanitize_input($_POST['howDidYouHear'] ?? '');

$certifyInformation = isset($_POST['certifyInformation']) ? 'Yes' : 'No';
$agreeToCommitment = isset($_POST['agreeToCommitment']) ? 'Yes' : 'No';

// Validate required fields
if (empty($firstName) || empty($lastName) || empty($email) || empty($phoneNumber)) {
    http_response_code(400);
    die("Please fill in all required fields");
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    die("Invalid email address");
}

// Build email content
$subject = "New Fellowship Application - $firstName $lastName";

$message = "
==============================================
FELLOWSHIP APPLICATION
==============================================

SECTION 1: PERSONAL INFORMATION
----------------------------------------------
First Name: $firstName
Last Name: $lastName
Other Names: $otherNames
Email: $email
Phone Number: $phoneNumber
WhatsApp Number: $whatsappNumber
Country: $country
City/State: $cityState
18 Years or Older: $is18OrOlder

SECTION 2: BACKGROUND & SKILLS
----------------------------------------------
Occupation/Field of Study: $occupation
LinkedIn Profile: $linkedinProfile
Language Proficiency: $languages
Social Impact Experience:
$socialImpactExperience

SECTION 3: COMMITMENT & AVAILABILITY
----------------------------------------------
Training Availability (6 hrs/week for 3 weeks): $trainingAvailability
Post-Training Commitment (4 hrs/week for stipend): $postTrainingCommitment
Device Access: $deviceAccess

SECTION 4: MOTIVATION & ALIGNMENT
----------------------------------------------
Statement of Interest:
$statementOfInterest

Problem Solving:
$problemSolving

How Did You Hear About Us:
$howDidYouHear

SECTION 5: DECLARATION
----------------------------------------------
Certify Information is True: $certifyInformation
Agree to Commitment: $agreeToCommitment

==============================================
Submitted on: " . date('Y-m-d H:i:s') . "
==============================================
";

// Function to send email via SMTP
function send_smtp_email($to, $subject, $message, $from, $from_name, $reply_to = null) {
    global $smtp_host, $smtp_port, $smtp_username, $smtp_password;
    
    $error_log = "";
    
    // Open plain socket connection first (not SSL)
    $socket = @fsockopen($smtp_host, $smtp_port, $errno, $errstr, 30);
    
    if (!$socket) {
        $error_log .= "Failed to connect: $errstr ($errno)\n";
        file_put_contents('smtp-errors.log', date('Y-m-d H:i:s') . " - " . $error_log, FILE_APPEND);
        return false;
    }
    
    // Read server greeting
    $response = fgets($socket, 515);
    $error_log .= "Server greeting: $response";
    
    if (substr($response, 0, 3) != "220") {
        file_put_contents('smtp-errors.log', date('Y-m-d H:i:s') . " - " . $error_log . "Bad greeting\n", FILE_APPEND);
        fclose($socket);
        return false;
    }
    
    // Send EHLO
    fputs($socket, "EHLO " . $_SERVER['SERVER_NAME'] . "\r\n");
    $response = fgets($socket, 515);
    $error_log .= "EHLO response: $response";
    
    // Start TLS (STARTTLS)
    fputs($socket, "STARTTLS\r\n");
    $response = fgets($socket, 515);
    $error_log .= "STARTTLS response: $response";
    
    if (substr($response, 0, 3) != "220") {
        file_put_contents('smtp-errors.log', date('Y-m-d H:i:s') . " - " . $error_log . "STARTTLS failed\n", FILE_APPEND);
        fclose($socket);
        return false;
    }
    
    // Enable TLS encryption
    $crypto_method = STREAM_CRYPTO_METHOD_TLS_CLIENT;
    if (defined('STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT')) {
        $crypto_method |= STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
        $crypto_method |= STREAM_CRYPTO_METHOD_TLSv1_1_CLIENT;
    }
    
    stream_context_set_option($socket, 'ssl', 'verify_peer', false);
    stream_context_set_option($socket, 'ssl', 'verify_peer_name', false);
    stream_context_set_option($socket, 'ssl', 'allow_self_signed', true);
    
    if (!@stream_socket_enable_crypto($socket, true, $crypto_method)) {
        $error_log .= "TLS encryption failed\n";
        file_put_contents('smtp-errors.log', date('Y-m-d H:i:s') . " - " . $error_log, FILE_APPEND);
        fclose($socket);
        return false;
    }
    
    // Send EHLO again after STARTTLS
    fputs($socket, "EHLO " . $_SERVER['SERVER_NAME'] . "\r\n");
    $response = fgets($socket, 515);
    $error_log .= "EHLO after TLS: $response";
    
    // Authenticate
    fputs($socket, "AUTH LOGIN\r\n");
    $response = fgets($socket, 515);
    $error_log .= "AUTH LOGIN: $response";
    
    fputs($socket, base64_encode($smtp_username) . "\r\n");
    $response = fgets($socket, 515);
    $error_log .= "Username: $response";
    
    fputs($socket, base64_encode($smtp_password) . "\r\n");
    $response = fgets($socket, 515);
    $error_log .= "Password: $response";
    
    // Check if authentication succeeded
    if (substr($response, 0, 3) != "235") {
        $error_log .= "Authentication failed\n";
        file_put_contents('smtp-errors.log', date('Y-m-d H:i:s') . " - " . $error_log, FILE_APPEND);
        fclose($socket);
        return false;
    }
    
    // Send MAIL FROM
    fputs($socket, "MAIL FROM: <$from>\r\n");
    $response = fgets($socket, 515);
    $error_log .= "MAIL FROM: $response";
    
    // Send RCPT TO
    fputs($socket, "RCPT TO: <$to>\r\n");
    $response = fgets($socket, 515);
    $error_log .= "RCPT TO: $response";
    
    // Send DATA command
    fputs($socket, "DATA\r\n");
    $response = fgets($socket, 515);
    $error_log .= "DATA: $response";
    
    // Build complete email with headers
    $email_content = "From: $from_name <$from>\r\n";
    if ($reply_to) {
        $email_content .= "Reply-To: $reply_to\r\n";
    }
    $email_content .= "To: $to\r\n";
    $email_content .= "Subject: $subject\r\n";
    $email_content .= "MIME-Version: 1.0\r\n";
    $email_content .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $email_content .= "Date: " . date('r') . "\r\n";
    $email_content .= "\r\n";
    $email_content .= $message;
    
    // Send email content and end with CRLF.CRLF
    fputs($socket, $email_content . "\r\n.\r\n");
    $response = fgets($socket, 515);
    $error_log .= "Send result: $response";
    
    // Quit
    fputs($socket, "QUIT\r\n");
    fclose($socket);
    
    file_put_contents('smtp-errors.log', date('Y-m-d H:i:s') . " - SUCCESS - " . $error_log . "\n", FILE_APPEND);
    return true;
}

// Send email to admin
$mail_sent = send_smtp_email($to_email, $subject, $message, $smtp_from, $smtp_from_name, $email);

// Backup: Save to file if email fails OR always save as backup
$filename = 'fellowship-applications.txt';
$file_content = "\n\n" . str_repeat("=", 80) . "\n";
$file_content .= "NEW APPLICATION - " . date('Y-m-d H:i:s') . "\n";
$file_content .= "Email Sent: " . ($mail_sent ? "Yes" : "No") . "\n";
$file_content .= str_repeat("=", 80) . "\n";
$file_content .= $message;

// Always save to file as backup
@file_put_contents($filename, $file_content, FILE_APPEND | LOCK_EX);

// Send auto-response to applicant (only if SMTP works)
if ($mail_sent) {
    $auto_response_subject = "Thank You for Your Fellowship Application";
    $auto_response_message = "Dear $firstName $lastName,

Thank you for applying to the Global Menstrual Change Makers Fellowship!

We have received your application and our team will review it carefully. We will get back to you soon with the next steps.

If you have any questions in the meantime, please feel free to reach out to us.

Best regards,
The Fellowship Team
Pad-Up Creations";
    
    send_smtp_email($email, $auto_response_subject, $auto_response_message, $smtp_from, $smtp_from_name);
}

// Return success response - always succeed if we saved to file
http_response_code(200);
echo "success|Email sent: " . ($mail_sent ? "Yes" : "No");
?>
