package com.example.Londery_management.EmailHandle;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServices {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(EmailDTO emailDTO) {
        try {
            // Create a MIME message (supports HTML)
            MimeMessage message = mailSender.createMimeMessage();

            // Helper allows for multipart (HTML/text)
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(emailDTO.getReceiver());
            helper.setSubject(emailDTO.getSubject());

            // The second argument 'true' means the body is HTML
            helper.setText(emailDTO.getBody(), true);

            mailSender.send(message);
            System.out.println("Email sent successfully (HTML supported)");

        } catch (MessagingException e) {
            System.err.println("Failed to send email: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
