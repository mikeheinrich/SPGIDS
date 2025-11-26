# File Upload Pattern

A drag-and-drop file upload pattern with a file list display for managing uploaded files.

## Overview

The File Upload pattern provides a comprehensive interface for uploading files through either drag-and-drop or file browsing. It features:

1. **Drop Zone** - A dashed-border area for dragging files or clicking to browse
2. **File List** - Displays uploaded files with the ability to remove individual files

## Features

- Drag and drop file upload
- Click to browse file dialog
- Visual feedback during drag operations
- File list display with remove functionality
- Support for multiple file upload
- File size and type validation
- Configurable accepted file formats
- Two layout options: vertical (list below) and horizontal (list to the right)

## Usage

### Basic Setup

```html
<!-- Include CSS -->
<link rel="stylesheet" href="patterns/file-upload-pattern/vanilla/file-upload-pattern.css">

<!-- Include JavaScript -->
<script src="patterns/file-upload-pattern/vanilla/file-upload-pattern.js"></script>

<!-- Container -->
<div id="file-upload-container"></div>

<!-- Initialize -->
<script>
    initFileUpload({
        containerId: 'file-upload-container'
    });
</script>
```

### Configuration Options

```javascript
initFileUpload({
    // Required
    containerId: 'file-upload-container',
    
    // Optional - Layout
    layout: 'vertical',              // 'vertical' (list below) or 'horizontal' (list to right)
    
    // Optional - Text
    dropzoneText: 'Drag and drop file to upload',
    acceptedFormats: 'Accepted formats: pdf, doc, docx',
    browseButtonText: 'Browse files',
    fileListTitle: 'Uploaded files',
    
    // Optional - File Validation
    accept: '.pdf,.doc,.docx',       // Accepted file extensions or MIME types
    multiple: true,                   // Allow multiple files
    maxFileSize: 10 * 1024 * 1024,   // Max file size in bytes (10MB)
    maxFiles: 10,                     // Maximum number of files
    
    // Optional - Callbacks
    onFilesChange: function(files) {
        console.log('Files changed:', files);
    },
    onFileRemove: function(file, remainingFiles) {
        console.log('File removed:', file.name);
    },
    onError: function(errors) {
        console.log('Errors:', errors);
    },
    
    // Optional - Initial Files
    initialFiles: []                  // Array of File objects or strings
});
```

### Layout Options

#### Vertical Layout (Default)
The file list appears below the drop zone. Best for narrow containers or when the list can grow long.

```javascript
initFileUpload({
    containerId: 'upload-vertical',
    layout: 'vertical'
});
```

#### Horizontal Layout
The file list appears to the right of the drop zone. Best for wider containers or when space allows side-by-side display.

```javascript
initFileUpload({
    containerId: 'upload-horizontal',
    layout: 'horizontal'
});
```

## API

### Functions

#### `initFileUpload(options)`

Initializes a new file upload instance and returns an API object.

**Parameters:**
- `options.containerId` (string, required) - ID of the container element
- `options.layout` (string, optional) - Layout: 'vertical' or 'horizontal' (default: 'vertical')
- `options.dropzoneText` (string, optional) - Main text in drop zone
- `options.acceptedFormats` (string, optional) - Subtext showing accepted formats
- `options.accept` (string, optional) - File input accept attribute
- `options.multiple` (boolean, optional) - Allow multiple files (default: true)
- `options.maxFileSize` (number, optional) - Max file size in bytes (default: 10MB)
- `options.maxFiles` (number, optional) - Max number of files (default: 10)
- `options.browseButtonText` (string, optional) - Browse button text
- `options.fileListTitle` (string, optional) - File list title
- `options.onFilesChange` (function, optional) - Callback when files change
- `options.onFileRemove` (function, optional) - Callback when file is removed
- `options.onError` (function, optional) - Callback when error occurs
- `options.initialFiles` (array, optional) - Initial files to display

**Returns:** API object with the following methods:
- `getFiles()` - Returns array of uploaded files
- `addFiles(files)` - Adds files programmatically
- `removeFile(index)` - Removes file at index
- `clearFiles()` - Clears all files
- `setDisabled(disabled)` - Enables/disables the upload

### Example with API Usage

```javascript
const uploader = initFileUpload({
    containerId: 'my-upload',
    onFilesChange: (files) => {
        console.log('Current files:', files);
    }
});

// Get current files
const files = uploader.getFiles();

// Clear all files
uploader.clearFiles();

// Disable uploads
uploader.setDisabled(true);
```

## Behavior

- **Drop Zone**: Users can drag files over the drop zone. Visual feedback shows when files can be dropped.
- **Browse Button**: Clicking opens the native file browser dialog.
- **File List**: Displays file names with a remove button. Appears only when files are uploaded.
- **Validation**: Files are validated against accepted types, size limits, and file count.
- **Errors**: Error messages appear briefly and auto-hide after 5 seconds.

## Styling

The pattern uses design system tokens for colors, spacing, and typography. Key CSS classes:

- `.file-upload` - Main container
- `.file-upload--vertical` / `.file-upload--horizontal` - Layout modifiers
- `.file-upload__dropzone` - Drop zone area
- `.file-upload__dropzone--dragover` - Drag over state
- `.file-upload__dropzone--disabled` - Disabled state
- `.file-upload__file-list-container` - File list wrapper
- `.file-upload__file-item` - Individual file row
- `.file-upload__file-remove` - Remove button

## Dependencies

None - this is a standalone vanilla JavaScript pattern.

## Structure

```
patterns/
  file-upload-pattern/
    vanilla/
      file-upload-pattern.css
      file-upload-pattern.js
      file-upload-example.html
    README.md
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Uses native File API for drag-and-drop

