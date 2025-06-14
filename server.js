// server.js
const express = require('express');
const app = express();
const cors = require('cors');

// ✅ CORS Fix
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST'],
  credentials: true
}));

// ✅ Import Routes
const mergePdfRoute = require('./routes/mergePdf');
const splitPdfRoute = require('./routes/splitPdf');
const compressPdfRoute = require('./routes/compressPdf');
const comparePdfRoute = require('./routes/comparePdf');
const convertPdfToJpgRoute = require('./routes/convertPdfToJpg');
const convertPdfToWordRoute = require('./routes/convertPdfToWord');
const convertWordToPdfRoute = require('./routes/convertWordToPdf');
const convertPdfToExcelRouter = require('./routes/convertPdfToExcel');
const convertExcelToPdfRouter = require('./routes/convertExcelToPdf');
const convertPdfToPptRoute = require('./routes/convertPdfToPpt');
const convertPptToPdfRoute = require('./routes/convertPptToPdf');
const rotatePdfRoute = require('./routes/rotatePdf');
const organizePdfRoute = require('./routes/organizePdf');
const repairPdfRoute = require('./routes/repairPdf');
const addPageNumbersRoute = require('./routes/addPageNumbers');
const redactPdfRoute = require('./routes/redactPdf');







// ✅ Mount Routes
app.use('/api/pdf-to-excel', convertPdfToExcelRouter);
console.log('✅ /api/pdf-to-excel mounted');
app.use('/api/excel-to-pdf', convertExcelToPdfRouter);
console.log('✅ /api/excel-to-pdf mounted');
app.use('/api/word-to-pdf', convertWordToPdfRoute);
console.log('✅ /api/word-to-pdf mounted');
app.use('/api/pdf-to-word', convertPdfToWordRoute);
console.log('✅ /api/pdf-to-word mounted');
app.use('/api/pdf-to-jpg', convertPdfToJpgRoute);
console.log('✅ /api/pdf-to-jpg mounted');
app.use('/api/compare', comparePdfRoute);
console.log('✅ /api/compare mounted');
app.use('/api/compress', compressPdfRoute);
console.log('✅ /api/compress mounted');
app.use('/api/merge', mergePdfRoute);
console.log('✅ /api/merge mounted');
app.use('/api/split', splitPdfRoute);
console.log('✅ /api/split mounted');
app.use('/api/pdf-to-ppt', convertPdfToPptRoute);
console.log('✅ /api/pdf-to-ppt mounted');
app.use('/api/ppt-to-pdf', convertPptToPdfRoute);
console.log('✅ /api/ppt-to-pdf mounted');
app.use('/api/rotate', rotatePdfRoute);
console.log('✅ /api/rotate mounted');
app.use('/api/organize', organizePdfRoute);
console.log('✅ /api/organize mounted');
app.use('/api/repair', repairPdfRoute);
console.log('✅ /api/repair mounted');
app.use('/api/add-page-numbers', addPageNumbersRoute);
console.log('✅ /api/add-page-numbers mounted');
app.use('/api/redact', redactPdfRoute);
console.log('✅ /api/redact mounted');



// ✅ Test Route
app.get('/', (req, res) => {
  res.send('✅ Simple backend is running!');
});

// ✅ Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT ${PORT}`);
});
