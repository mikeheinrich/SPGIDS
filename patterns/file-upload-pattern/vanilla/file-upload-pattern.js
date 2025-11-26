/**
 * File Upload Pattern - Vanilla JavaScript
 * A drag-and-drop file upload pattern with file list display
 * 
 * USAGE:
 * 1. Include the CSS from file-upload-pattern.css
 * 2. Include this JavaScript file
 * 3. Add a container: <div id="file-upload-container"></div>
 * 4. Initialize: initFileUpload({ containerId: 'file-upload-container' })
 */

// Store file upload instances
let fileUploadInstances = {};

/**
 * Initialize File Upload
 * @param {Object} options - Configuration options
 * @param {string} options.containerId - ID of container element
 * @param {string} options.layout - Layout variant: 'vertical' or 'horizontal' (default: 'vertical')
 * @param {string} options.dropzoneText - Text for dropzone (default: "Drag and drop file to upload")
 * @param {string} options.acceptedFormats - Accepted file formats text (default: "Accepted formats: pdf, doc, docx")
 * @param {string} options.accept - File input accept attribute (default: ".pdf,.doc,.docx")
 * @param {boolean} options.multiple - Allow multiple files (default: true)
 * @param {number} options.maxFileSize - Maximum file size in bytes (default: 10MB)
 * @param {number} options.maxFiles - Maximum number of files (default: 10)
 * @param {string} options.browseButtonText - Text for browse button (default: "Browse files")
 * @param {string} options.fileListTitle - Title for file list (default: "Uploaded files")
 * @param {Function} options.onFilesChange - Callback when files change (files) => {}
 * @param {Function} options.onFileRemove - Callback when file is removed (file, remainingFiles) => {}
 * @param {Function} options.onError - Callback when error occurs (error) => {}
 * @param {Array} options.initialFiles - Initial files to display (default: [])
 */
function initFileUpload(options = {}) {
    const {
        containerId = 'file-upload-container',
        layout = 'vertical',
        dropzoneText = 'Drag and drop file to upload',
        acceptedFormats = 'Accepted formats: pdf, doc, docx',
        accept = '.pdf,.doc,.docx',
        multiple = true,
        maxFileSize = 10 * 1024 * 1024, // 10MB
        maxFiles = 10,
        browseButtonText = 'Browse files',
        fileListTitle = 'Uploaded files',
        onFilesChange = null,
        onFileRemove = null,
        onError = null,
        initialFiles = []
    } = options;

    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`File upload container #${containerId} not found`);
        return;
    }

    // Create instance
    const instanceId = containerId;
    const instance = {
        containerId,
        layout,
        dropzoneText,
        acceptedFormats,
        accept,
        multiple,
        maxFileSize,
        maxFiles,
        browseButtonText,
        fileListTitle,
        onFilesChange,
        onFileRemove,
        onError,
        files: [...initialFiles],
        dragCounter: 0
    };

    fileUploadInstances[instanceId] = instance;

    // Render HTML
    renderFileUpload(instanceId);

    // Return API
    return {
        getFiles: () => getUploadedFiles(instanceId),
        addFiles: (files) => addFilesToUpload(instanceId, files),
        removeFile: (index) => removeFileFromUpload(instanceId, index),
        clearFiles: () => clearAllFiles(instanceId),
        setDisabled: (disabled) => setFileUploadDisabled(instanceId, disabled)
    };
}

/**
 * Render the file upload HTML
 */
function renderFileUpload(instanceId) {
    const instance = fileUploadInstances[instanceId];
    if (!instance) return;

    const container = document.getElementById(instance.containerId);
    if (!container) return;

    const inputId = `${instance.containerId}-input`;
    const hasFiles = instance.files.length > 0;

    container.innerHTML = `
        <div class="file-upload file-upload--${instance.layout}">
            <!-- Drop Zone -->
            <div class="file-upload__dropzone" id="${instance.containerId}-dropzone">
                <p class="file-upload__dropzone-text">${instance.dropzoneText}</p>
                <p class="file-upload__dropzone-subtext">${instance.acceptedFormats}</p>
                <input 
                    type="file" 
                    id="${inputId}"
                    name="${inputId}"
                    class="file-upload__input"
                    accept="${instance.accept}"
                    ${instance.multiple ? 'multiple' : ''}
                />
                <button type="button" class="file-upload__browse-btn" id="${instance.containerId}-browse">
                    <span class="file-upload__browse-btn-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                            <path d="M-1698.026,21412.182h-4.5v1.688h4.5a.563.563,0,0,1,.563.563v2.813a.563.563,0,0,1-.562.563h-13.5a.563.563,0,0,1-.562-.562v-2.812a.563.563,0,0,1,.563-.562h4.5v-1.687h-4.5a2.25,2.25,0,0,0-2.25,2.25v2.813a2.25,2.25,0,0,0,2.25,2.25h13.5a2.25,2.25,0,0,0,2.25-2.25v-2.812A2.251,2.251,0,0,0-1698.026,21412.182Zm-10.965-4.5,3.371-3.311v9.494a.845.845,0,0,0,.844.844.845.845,0,0,0,.844-.844v-9.494l3.341,3.34a.832.832,0,0,0,.6.248.833.833,0,0,0,.6-.248.844.844,0,0,0,0-1.193l-4.781-4.781a.846.846,0,0,0-1.193,0l-4.781,4.781a.844.844,0,0,0,0,1.193A.784.784,0,0,0-1708.991,21407.686Zm10.4,8.152a.843.843,0,0,0-.844-.844.842.842,0,0,0-.844.844.845.845,0,0,0,.844.844A.843.843,0,0,0-1698.588,21415.838Z" transform="translate(1713.776 -21401.494)"/>
                        </svg>
                    </span>
                    ${instance.browseButtonText}
                </button>
                <div class="file-upload__error" id="${instance.containerId}-error" style="display: none;"></div>
            </div>

            <!-- File List -->
            <div class="file-upload__file-list-container" id="${instance.containerId}-list-container" style="${hasFiles ? '' : 'display: none;'}">
                <h3 class="file-upload__file-list-title">${instance.fileListTitle}</h3>
                <ul class="file-upload__file-list ${hasFiles ? '' : 'file-upload__file-list--empty'}" id="${instance.containerId}-list">
                    ${renderFileList(instanceId)}
                </ul>
            </div>
        </div>
    `;

    // Attach event listeners
    attachFileUploadListeners(instanceId);
}

/**
 * Render file list items
 */
function renderFileList(instanceId) {
    const instance = fileUploadInstances[instanceId];
    if (!instance || instance.files.length === 0) return '';

    return instance.files.map((file, index) => {
        const fileName = file.name || file;
        
        return `
            <li class="file-upload__file-item" data-index="${index}">
                <div class="file-upload__file-info">
                    <span class="file-upload__file-name" title="${fileName}">${fileName}</span>
                </div>
                <button 
                    type="button" 
                    class="file-upload__file-remove" 
                    data-index="${index}"
                    aria-label="Remove ${fileName}"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="8" fill="currentColor"/>
                        <g transform="translate(4 4)">
                            <line x1="8" y2="8" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                            <line x2="8" y2="8" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                        </g>
                    </svg>
                </button>
            </li>
        `;
    }).join('');
}

/**
 * Attach event listeners
 */
function attachFileUploadListeners(instanceId) {
    const instance = fileUploadInstances[instanceId];
    if (!instance) return;

    const dropzone = document.getElementById(`${instance.containerId}-dropzone`);
    const fileInput = document.getElementById(`${instance.containerId}-input`);
    const browseBtn = document.getElementById(`${instance.containerId}-browse`);
    const fileList = document.getElementById(`${instance.containerId}-list`);

    if (!dropzone || !fileInput || !browseBtn) return;

    // Browse button click
    browseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });

    // Dropzone click
    dropzone.addEventListener('click', (e) => {
        if (e.target === dropzone || e.target.classList.contains('file-upload__dropzone-text') || 
            e.target.classList.contains('file-upload__dropzone-subtext')) {
            fileInput.click();
        }
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        handleFiles(instanceId, e.target.files);
        // Reset input so the same file can be selected again
        e.target.value = '';
    });

    // Drag events
    dropzone.addEventListener('dragenter', (e) => {
        e.preventDefault();
        e.stopPropagation();
        instance.dragCounter++;
        dropzone.classList.add('file-upload__dropzone--dragover');
    });

    dropzone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        instance.dragCounter--;
        if (instance.dragCounter === 0) {
            dropzone.classList.remove('file-upload__dropzone--dragover');
        }
    });

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        instance.dragCounter = 0;
        dropzone.classList.remove('file-upload__dropzone--dragover');
        
        const files = e.dataTransfer.files;
        handleFiles(instanceId, files);
    });

    // File list remove buttons
    if (fileList) {
        fileList.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.file-upload__file-remove');
            if (removeBtn) {
                const index = parseInt(removeBtn.dataset.index, 10);
                removeFileFromUpload(instanceId, index);
            }
        });
    }
}

/**
 * Handle files from input or drop
 */
function handleFiles(instanceId, fileList) {
    const instance = fileUploadInstances[instanceId];
    if (!instance) return;

    const files = Array.from(fileList);
    const errors = [];
    const validFiles = [];

    // Validate each file
    files.forEach(file => {
        // Check file count
        if (instance.files.length + validFiles.length >= instance.maxFiles) {
            errors.push(`Maximum ${instance.maxFiles} files allowed`);
            return;
        }

        // Check file size
        if (file.size > instance.maxFileSize) {
            errors.push(`${file.name} exceeds maximum file size of ${formatFileSize(instance.maxFileSize)}`);
            return;
        }

        // Check file type
        if (instance.accept) {
            const acceptedTypes = instance.accept.split(',').map(t => t.trim().toLowerCase());
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            const fileType = file.type.toLowerCase();
            
            const isAccepted = acceptedTypes.some(accepted => {
                if (accepted.startsWith('.')) {
                    return fileExtension === accepted;
                }
                if (accepted.endsWith('/*')) {
                    return fileType.startsWith(accepted.replace('/*', '/'));
                }
                return fileType === accepted;
            });

            if (!isAccepted) {
                errors.push(`${file.name} is not an accepted file type`);
                return;
            }
        }

        // Check for duplicates
        const isDuplicate = instance.files.some(existingFile => 
            (existingFile.name || existingFile) === file.name
        );
        if (isDuplicate) {
            errors.push(`${file.name} is already added`);
            return;
        }

        validFiles.push(file);
    });

    // Add valid files
    if (validFiles.length > 0) {
        instance.files = [...instance.files, ...validFiles];
        updateFileList(instanceId);

        // Call callback
        if (instance.onFilesChange) {
            instance.onFilesChange(instance.files);
        }
    }

    // Show errors
    if (errors.length > 0) {
        showError(instanceId, errors[0]);
        if (instance.onError) {
            instance.onError(errors);
        }
    } else {
        hideError(instanceId);
    }
}

/**
 * Update the file list display
 */
function updateFileList(instanceId) {
    const instance = fileUploadInstances[instanceId];
    if (!instance) return;

    const listContainer = document.getElementById(`${instance.containerId}-list-container`);
    const list = document.getElementById(`${instance.containerId}-list`);

    if (!listContainer || !list) return;

    const hasFiles = instance.files.length > 0;

    listContainer.style.display = hasFiles ? '' : 'none';
    list.classList.toggle('file-upload__file-list--empty', !hasFiles);
    list.innerHTML = renderFileList(instanceId);
}

/**
 * Remove file from upload
 */
function removeFileFromUpload(instanceId, index) {
    const instance = fileUploadInstances[instanceId];
    if (!instance || index < 0 || index >= instance.files.length) return;

    const removedFile = instance.files[index];
    instance.files.splice(index, 1);
    updateFileList(instanceId);
    hideError(instanceId);

    // Call callbacks
    if (instance.onFileRemove) {
        instance.onFileRemove(removedFile, instance.files);
    }
    if (instance.onFilesChange) {
        instance.onFilesChange(instance.files);
    }
}

/**
 * Add files programmatically
 */
function addFilesToUpload(instanceId, files) {
    handleFiles(instanceId, files);
}

/**
 * Clear all files
 */
function clearAllFiles(instanceId) {
    const instance = fileUploadInstances[instanceId];
    if (!instance) return;

    instance.files = [];
    updateFileList(instanceId);
    hideError(instanceId);

    if (instance.onFilesChange) {
        instance.onFilesChange(instance.files);
    }
}

/**
 * Get uploaded files
 */
function getUploadedFiles(instanceId) {
    const instance = fileUploadInstances[instanceId];
    return instance ? [...instance.files] : [];
}

/**
 * Set disabled state
 */
function setFileUploadDisabled(instanceId, disabled) {
    const instance = fileUploadInstances[instanceId];
    if (!instance) return;

    const dropzone = document.getElementById(`${instance.containerId}-dropzone`);
    if (dropzone) {
        dropzone.classList.toggle('file-upload__dropzone--disabled', disabled);
    }
}

/**
 * Show error message
 */
function showError(instanceId, message) {
    const errorEl = document.getElementById(`${instanceId}-error`);
    if (errorEl) {
        errorEl.innerHTML = `
            <svg class="file-upload__error-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm0 12a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm1-3H7V4h2z"/>
            </svg>
            ${message}
        `;
        errorEl.style.display = 'flex';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideError(instanceId);
        }, 5000);
    }
}

/**
 * Hide error message
 */
function hideError(instanceId) {
    const errorEl = document.getElementById(`${instanceId}-error`);
    if (errorEl) {
        errorEl.style.display = 'none';
        errorEl.innerHTML = '';
    }
}

/**
 * Format file size for display
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initFileUpload,
        getUploadedFiles,
        addFilesToUpload,
        removeFileFromUpload,
        clearAllFiles,
        setFileUploadDisabled,
        fileUploadInstances
    };
}

