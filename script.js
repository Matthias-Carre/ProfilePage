document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Vérifier si l'utilisateur a déjà une préférence enregistrée
  const currentTheme = localStorage.getItem('theme');
  
  // Si oui, appliquons-la
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.innerHTML = 'sombre';
  } else if (currentTheme === 'light') {
    document.body.classList.remove('dark-theme');
    themeToggle.innerHTML = 'clair';
  } else {
    // Sinon, utilisons la préférence du système
    if (prefersDarkScheme.matches) {
      document.body.classList.add('dark-theme');
      themeToggle.innerHTML = 'sombre';
    }
  }
  
  // Écoutez les clics sur le bouton
  themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = 'clair';
    } else {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = 'sombre';
    }
  });
});