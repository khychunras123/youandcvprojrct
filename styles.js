document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll('nav ul li a');

  // Smooth scrolling behavior for navigation links
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });
    });
  });

  // Download CV as PDF functionality
  const downloadCvBtn = document.querySelector('.download-cv');
  downloadCvBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const element = document.body; // Select the part of the page you want to save as PDF
    const options = {
      margin: 0.5,
      filename: 'CHUNRAS_CV.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } // Set format to A4 size
    };

    // Automatically add page breaks if content exceeds one page
    html2pdf().from(element).set(options).toPdf().get('pdf').then(function (pdf) {
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.text('Page ' + String(i) + ' of ' + String(totalPages), pdf.internal.pageSize.getWidth() - 20, pdf.internal.pageSize.getHeight() - 10);
      }
    }).save();
  });
});
