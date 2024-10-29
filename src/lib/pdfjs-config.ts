import * as PDFJS from 'pdfjs-dist';

// Set up PDF.js worker
const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;

export { PDFJS };