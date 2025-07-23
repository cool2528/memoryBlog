/**
 * Theme persistence script
 * This script ensures theme settings are properly saved and applied across page navigation
 */
document.addEventListener('DOMContentLoaded', function() {
  // Apply saved theme immediately
  const savedTheme = localStorage.getItem('theme') || 'light';
  const themeBody = document.getElementById('theme-body');
  const html = document.documentElement;
  
  if (savedTheme === 'dark') {
    if (themeBody) themeBody.classList.add('dark-theme');
    if (html) html.classList.add('dark-theme');
    
    // Update any theme toggle buttons that might exist
    const themeToggles = document.querySelectorAll('.theme-toggle');
    themeToggles.forEach(toggle => {
      toggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    });
  } else {
    if (themeBody) themeBody.classList.remove('dark-theme');
    if (html) html.classList.remove('dark-theme');
    
    // Update any theme toggle buttons that might exist
    const themeToggles = document.querySelectorAll('.theme-toggle');
    themeToggles.forEach(toggle => {
      toggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
    });
  }
  
  // Listen for storage events (when theme is changed in another tab/window)
  window.addEventListener('storage', function(e) {
    if (e.key === 'theme') {
      const newTheme = e.newValue || 'light';
      
      if (newTheme === 'dark') {
        if (themeBody) themeBody.classList.add('dark-theme');
        if (html) html.classList.add('dark-theme');
      } else {
        if (themeBody) themeBody.classList.remove('dark-theme');
        if (html) html.classList.remove('dark-theme');
      }
    }
  });
});