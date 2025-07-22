document.addEventListener('DOMContentLoaded', function() {
  // Wrap images with fancybox
  const images = document.querySelectorAll('.post-content img');
  
  if (images.length === 0) return;

  images.forEach(function(img) {
    const parent = img.parentNode;
    // Don't wrap if it's already in a link
    if (parent.tagName.toLowerCase() !== 'a') {
      const link = document.createElement('a');
      link.href = img.src;
      link.dataset.fancybox = 'gallery';
      link.dataset.caption = img.alt; // Use alt text as caption

      // Insert the link and move the image inside it
      parent.insertBefore(link, img);
      link.appendChild(img);
    }
  });

  // After wrapping images, initialize Fancybox
  Fancybox.bind('[data-fancybox="gallery"]', {
    // You can add custom options here if needed
  });
});