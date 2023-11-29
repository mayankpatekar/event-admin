import { Router } from 'express';
const router = Router();
import Form from '../models/Form.js';
import fs from 'fs';
import qr from 'qrcode';
import nodemailer from 'nodemailer';

// QR Code generator //////////////////////////////
const generateQRCode = async (text) => {
  try {
    const qrCodeDataURL = await qr.toDataURL(text);
    const filePath = `./${text}.png`  ;

    // Save the QR code image to the specified file path
    await fs.promises.writeFile(filePath, qrCodeDataURL.split(',')[1], 'base64');

    return filePath;
  } catch (error) {
    console.error('Error generating and saving QR code:', error);
    throw new Error('Could not generate and saving QR code.');
  }
};

// mail send method /////////////////////////
const sendEmail = async (toEmail, subject, text, html,filename,Path) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com', // Hotmail/Outlook SMTP server
  port: 587,
  secureConnection: false, // Use false for STARTTLS
  requireTLS: true, // Require TLS
    auth: {
      user: 'your email address here', // Your Gmail email
      pass: 'password here' // Your Gmail password
    }
  });
console.log(toEmail);
  const mailOptions = {
    from: 'same email address here',
    to: toEmail,
    subject,
    text : text,
    html: html,
    attachments:[
      {
        filename: `${filename}.png`,
        path:Path,
        cid:`qr-code-image`

      },{
        filename:`poster.jpeg`,
        path:'./poster.jpeg',
        cid:'poster'
      }
    ]
  };
  console.log(Path);

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Could not send email.');
  }
};



// Create a new form entry
router.post('/forms', async (req, res) => {
  const { name, receiptNo, classN, rollNo } = req.body;

  // Check if the transactionId already exists
  const existingForm = await Form.findOne({ receiptNo });
  if (existingForm) {
    return res.status(400).json({ message: 'Transaction ID already exists' });
  }

  const newForm = new Form({ name, receiptNo, classN, rollNo });
  // Save the form to the database
  await newForm.save();

  res.status(200).json({ message: 'Form submitted successfully' });
});

router.get('/forms', async (req, res) => {
  try {
    const forms = await Form.find({ $and: [{ accepted: false }, { rejected: false }] });
    res.status(200).json(forms);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred while fetching data.' });
  }
});




router.post('/acceptForm/:id', async (req, res) => {
  const { id } = req.params;
  const { receiptNumber } = req.body;

  try {
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }


    const qrCodeFileName = 'e-pass'; // Choose a suitable file name

    form.accepted = true;
    await form.save();
    // Generate QR code based on the receipt number
    const qrCodeFilePath = await generateQRCode(id);
console.log(qrCodeFilePath);
    // Send an email with the QR code
    const emailSubject = 'E-Pass for RANG TARI';
    const emailText = `Thank you for your submission. Here is your QR code for receipt number ${receiptNumber}.`;
    const emailHtml = `<br/>
    <p>Thank you for registering for <b>RANG TARI - A FOLK FIESTA</b>
    <br/>
    Your Receipt Number: <b>${receiptNumber}</b>
    <br/>
    Click the attachments to access your exclusive <b>E-Pass</b> with <b>QRCode</b>.
    Kindly save the attachment. 
    <br/>
    <b>Entry will be permitted only after screening of QR Code</b>.
    <br/>
    Waiting to see you in the event.
    <br/>
    Happy Navratri
    </p>
    `;
    
// <img src="cid:poster" alt="Image Description" width="auto" height="200px"/>
{/* <br/> */}
// <img src="cid:qr-code-image" alt="Image Description" width="auto" height="200px"/>


    await sendEmail(form.email, emailSubject, emailText, emailHtml,qrCodeFileName,qrCodeFilePath);
    console.log('Email sent successfully.');

    // TODO: Update the form status in the database to "accepted"
    // This would involve updating the form status in your database.
    // For demonstration, we'll just log a message here
    console.log(`Form with ID ${id} accepted. Email sent to ${form.email}`);

    res.status(200).json({ message: 'Form accepted and email sent.' });
  } catch (error) {
    console.error('Error accepting form:', error);
    res.status(500).json({ message: 'An error occurred while accepting the form.' });
  }
});

// Endpoint to reject a form and send an email
router.post('/rejectForm/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    // Send a rejection email
    const emailSubject = 'Receipt Submission Rejected';
    const emailText = 'Your receipt submission has been declined.';
    const emailHtml = '<p>Your receipt submission has been declined.</p>';

    await sendEmail(form.email, emailSubject, emailText, emailHtml);
    console.log('Rejection email sent successfully.');

    // TODO: Update the form status in the database to "rejected"
    // This would involve updating the form status in your database.
    // For demonstration, we'll just log a message here
    console.log(`Form with ID ${id} rejected. Email sent to ${form.email}`);

    res.status(200).json({ message: 'Form rejected and email sent.' });
  } catch (error) {
    console.error('Error rejecting form:', error);
    res.status(500).json({ message: 'An error occurred while rejecting the form.' });
  }
})


export default router;
