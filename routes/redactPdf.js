// routes/redactPdf.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

// Setup multer
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('pdf'), async (req, res) => {
  try {
    const form = new FormData();
    form.append('pdf', fs.createReadStream(req.file.path));
    form.append('keywords', req.body.keywords);

    const microserviceURL = 'http://localhost:10001/redact';


    const response = await axios.post(microserviceURL, form, {
      headers: form.getHeaders(),
      responseType: 'stream',
    });

    const contentType = response.headers['content-type'];
if (!contentType || !contentType.includes('application/pdf')) {
  console.error('❌ Not a PDF. Received:', contentType);
  let errorData = '';
  response.data.on('data', (chunk) => errorData += chunk);
  response.data.on('end', () => console.error('Microservice error:', errorData));
  return res.status(500).send('Redaction microservice returned an invalid response.');
}


    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=redacted.pdf');
    response.data.pipe(res);

    fs.unlinkSync(req.file.path);
  } catch (err) {
    console.error('❌ Redact error:', err.message);
    res.status(500).send('Failed to redact PDF.');
  }
});

module.exports = router;
