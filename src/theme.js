/**
 * Theme Manager - Handle light/dark mode switching
 */

class ThemeManager {
  constructor() {
    this.storageKey = 'preferred-theme';
    this.theme = this.getInitialTheme();
  }

  /**
   * Get initial theme from localStorage or system preference
   */
  getInitialTheme() {
    // Check localStorage first
    const storedTheme = localStorage.getItem(this.storageKey);
    if (storedTheme) {
      return storedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  /**
   * Apply theme to document
   */
  applyTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.storageKey, theme);
  }

  /**
   * Toggle between light and dark
   */
  toggle() {
    const newTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    return newTheme;
  }

  /**
   * Get current theme
   */
  getTheme() {
    return this.theme;
  }

  /**
   * Initialize theme and setup toggle button
   */
  init() {
    // Apply initial theme
    this.applyTheme(this.theme);

    // Setup toggle button
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.toggle();
      });
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only auto-switch if user hasn't set a preference
        if (!localStorage.getItem(this.storageKey)) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }
}

export const themeManager = new ThemeManager();
export default themeManager;
