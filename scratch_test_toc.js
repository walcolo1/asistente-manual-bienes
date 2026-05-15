const tocService = require('./backend/src/services/toc.service');
const fs = require('fs');

try {
  console.log('Testing buildTOC...');
  const toc = tocService.buildTOC();
  console.log('Chapters count:', toc.chapters.length);
  if (toc.chapters.length > 0) {
    console.log('First chapter:', toc.chapters[0].chapter);
    console.log('Sections in first chapter:', toc.chapters[0].sections.length);
  }
  // console.log(JSON.stringify(toc, null, 2));
} catch (err) {
  console.error('Error in buildTOC:', err);
}
