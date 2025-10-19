// Custom commands for visual feedback when clicking elements
// The command cy.visualClick(selector, options) will:
//  - inject a temporary marker around the element
//  - scroll the element into view
//  - click the element
//  - take a screenshot showing the marker
//  - remove the marker
// This helps to create screenshots that show where tests clicked.

/**
 * options: { screenshotName?: string, force?: boolean }
 */

// Utility: visualType to emulate the user's Login.escrita_em_elementos_html_login
// Example usage in classes: cy.visualType([selector, text])


// End of custom commands

// NOTE: The click overwrite was removed because it interfered with Cypress' command queue.
// Use cy.visualClick(selector) in tests or page objects where you want a visual marker + screenshot.