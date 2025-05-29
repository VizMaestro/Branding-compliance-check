
# Branding compliance check Figma Plugin

## Purpose
The **Branding-compliance-check** plugin helps designers ensure that their design elements are consistent with the assets library added to their Figma file. It highlights and marks design elements that are not from the assets library, ensuring branding compliance.

## Features
- **Design Elements Check**: Verify if colors, fonts, illustrations, frames, effects, paddings, and icons are from the assets library.
- **Highlight Issues**: Select and bring non-compliant elements to the user's viewport.
- **Mark Issues**: Add a red stroke around non-compliant elements.

## UI Layout
The plugin UI consists of a two-section modal:
- **Left Section**:
  - Title: "Design elements"
  - List of checkboxes for each design element.
  - Two buttons: "Highlight issues" and "Mark issues".
- **Right Section**:
  - Initial text: "Run the diagnostic to find issues" (40px) and "Do you have a Design library and not sure if all your design elements are aligned to elements in the library, then add the library to your file and run this diagnostic to find issues" (24px).
  - After running the diagnostic: Count of design elements with issues (66px) and "Design elements" (24px).

## Usage Instructions
1. **Select Design Elements**: Check the boxes for the design elements you want to verify.
2. **Highlight Issues**: Click the "Highlight issues" button to select and bring non-compliant elements to the viewport.
3. **Mark Issues**: Click the "Mark issues" button to select and add a red stroke around non-compliant elements.

## Installation Steps
1. **Download the Plugin Files**:
   - `manifest.json`
   - `ui.html`
   - `code.js`
2. **Place Files in a Folder**: Create a folder and place the downloaded files in it.
3. **Import Plugin in Figma**:
   - Open Figma.
   - Go to **Plugins > Development > Import plugin from manifest...**.
   - Select the `manifest.json` file from the folder.

## Files
- `manifest.json`: Defines the plugin metadata and UI entry point.
- `ui.html`: Defines the UI layout and interactions.
- `code.js`: Contains the plugin logic for checking compliance and interacting with Figma.

## License
This plugin is provided under the MIT License.
