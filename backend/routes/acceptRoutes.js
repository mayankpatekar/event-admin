import { Router } from 'express';
const router = Router();
import Form from '../models/Form.js';

// Endpoint to accept a form and send an email with a QR code
router.post('/acceptForm/:id', async (req, res) => {
    const { id } = req.params;
    const { receiptNumber } = req.body;
  
    try {
      const form = await Form.findById(id);
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
  
      // Generate QR code based on the receipt number
      const qrCode = await generateQRCode(receiptNumber);
  
      // Send an email with the QR code
      const emailSubject = 'Your Receipt QR Code';
      const emailText = `Thank you for your submission. Here is your QR code for receipt number ${receiptNumber}.`;
      const emailHtml = `<img src="${qrCode}" alt="QR Code" /><br/><p>Receipt Number: ${receiptNumber}</p>`;
  
      await sendEmail(Form.email, emailSubject, emailText, emailHtml);
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
  
  

  export default router;