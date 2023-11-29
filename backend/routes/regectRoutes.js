import { Router } from 'express';
const router = Router();
import Form from '../models/Form.js';


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