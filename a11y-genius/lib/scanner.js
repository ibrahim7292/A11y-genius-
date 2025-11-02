const puppeteer = require('puppeteer');

/**
 * Scan website for accessibility issues
 */
const scanWebsite = async (url) => {
  let browser;
  
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Run accessibility checks
    const issues = await page.evaluate(() => {
      const problems = [];
      
      // Check for missing alt text
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        if (!img.alt || img.alt.trim() === '') {
          problems.push({
            type: 'missing_alt_text',
            severity: 'high',
            element: 'img',
            selector: `img:nth-child(${index + 1})`,
            message: 'Image missing alt text for screen readers',
            line: null
          });
        }
      });
      
      // Check for missing form labels
      const inputs = document.querySelectorAll('input, textarea, select');
      inputs.forEach((input, index) => {
        const id = input.id;
        const label = id ? document.querySelector(`label[for="${id}"]`) : null;
        const ariaLabel = input.getAttribute('aria-label');
        
        if (!label && !ariaLabel) {
          problems.push({
            type: 'missing_form_label',
            severity: 'high',
            element: input.tagName.toLowerCase(),
            selector: `${input.tagName.toLowerCase()}:nth-child(${index + 1})`,
            message: 'Form element missing label or aria-label',
            line: null
          });
        }
      });
      
      // Check for low contrast (simplified)
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, a, button');
      textElements.forEach((element, index) => {
        const styles = window.getComputedStyle(element);
        const color = styles.color;
        const backgroundColor = styles.backgroundColor;
        
        // Simple contrast check (would need more sophisticated logic in production)
        if (color === 'rgb(128, 128, 128)' || backgroundColor === 'rgb(128, 128, 128)') {
          problems.push({
            type: 'low_contrast',
            severity: 'medium',
            element: element.tagName.toLowerCase(),
            selector: `${element.tagName.toLowerCase()}:nth-child(${index + 1})`,
            message: 'Text may have insufficient color contrast',
            line: null
          });
        }
      });
      
      // Check for missing heading structure
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      if (headings.length === 0) {
        problems.push({
          type: 'missing_headings',
          severity: 'medium',
          element: 'document',
          selector: 'body',
          message: 'Page missing heading structure for navigation',
          line: null
        });
      }
      
      // Check for missing ARIA landmarks
      const landmarks = document.querySelectorAll('[role="main"], [role="navigation"], [role="banner"], [role="contentinfo"], main, nav, header, footer');
      if (landmarks.length === 0) {
        problems.push({
          type: 'missing_landmarks',
          severity: 'medium',
          element: 'document',
          selector: 'body',
          message: 'Page missing ARIA landmarks for navigation',
          line: null
        });
      }
      
      // Check for keyboard navigation
      const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
      focusableElements.forEach((element, index) => {
        if (element.tabIndex === -1 && !element.disabled) {
          problems.push({
            type: 'keyboard_navigation',
            severity: 'medium',
            element: element.tagName.toLowerCase(),
            selector: `${element.tagName.toLowerCase()}:nth-child(${index + 1})`,
            message: 'Interactive element may not be keyboard accessible',
            line: null
          });
        }
      });
      
      return problems;
    });
    
    // Calculate compliance score
    const totalChecks = 100; // Simplified scoring
    const issueCount = issues.length;
    const score = Math.max(0, Math.round(((totalChecks - issueCount) / totalChecks) * 100));
    
    return {
      score,
      issues,
      totalIssues: issues.length,
      scanDate: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Scan error:', error);
    throw new Error('Failed to scan website: ' + error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = {
  scanWebsite
};
