/**
 * Header Component - Shareable Export
 * 
 * This file contains all the code needed to use the header component in your project.
 * INCLUDES: Header bar, User Menu Panel, Help Menu Panel, and Notifications Menu Panel
 * 
 * USAGE:
 * 1. Include the CSS from header-component.css in your <head>
 * 2. Include this JavaScript file before the closing </body> tag
 * 3. Add a container div: <div id="header-container"></div>
 * 4. Initialize the header: see example at the bottom
 * 
 * DEPENDENCIES:
 * - None (pure vanilla JavaScript)
 * 
 * CUSTOMIZATION:
 * The initHeader() function accepts an options object:
 * - productName: string (default: 'Product Name')
 * - userInitials: string (default: 'SS')
 * - notificationCount: number (default: 3)
 * - userName: string (default: 'Sam Sample')
 * - userEmail: string (default: 'sam.sample@company.com')
 * - userDetails: object with phone, company, department, jobTitle, address
 * 
 * FEATURES:
 * - Header with logo, product name, and action icons
 * - User menu panel (slides in from right)
 * - Help menu panel (slides in from right)
 * - Notifications menu panel (slides in from right)
 * - All panels close when clicking outside or on close buttons
 * - Notification badge updates when notifications are dismissed
 */

// Header Component Function
function createHeader(options = {}) {
    const {
        productName = 'Product Name',
        userInitials = 'SS',
        notificationCount = 3
    } = options;

    return `
        <header class="header">
            <!-- Red top border -->
            <div class="header-top-line">
                <svg viewBox="0 0 1920 2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <line id="Line_1092" data-name="Line 1092" x1="0" y1="1" x2="1920" y2="1" fill="none" stroke="#d6002a" stroke-width="2" vector-effect="non-scaling-stroke"/>
                </svg>
            </div>
            
            <!-- Main header container -->
            <div class="header-container">
                <!-- Left side: Logo and Product Name -->
                <div class="header-left">
                    <div class="logo-group">
                        <div class="sp-logo">
                            <svg class="sp-logo-svg" viewBox="0 0 41.17 23.388" xmlns="http://www.w3.org/2000/svg">
                                <path id="Wordmark_5_" d="M59.573,80.8a4.443,4.443,0,0,1-1.277,3.2A6.6,6.6,0,0,1,53.7,85.648a6.866,6.866,0,0,1-4.848-1.577,4.856,4.856,0,0,1-1.6-3.572h2.858a2.7,2.7,0,0,0,.8,1.884,3.617,3.617,0,0,0,2.643.822,3.6,3.6,0,0,0,2.6-.822,1.891,1.891,0,0,0,.011-2.77c-.955-.721-2.318-.672-3.452-.779a6.781,6.781,0,0,1-3.383-1.016,4.034,4.034,0,0,1-1.656-2.87,4.332,4.332,0,0,1,1.314-3.584,6.98,6.98,0,0,1,8.79-.13A4.665,4.665,0,0,1,59.335,74.5H56.477a2.484,2.484,0,0,0-.671-1.516,3.915,3.915,0,0,0-4.828.022,1.741,1.741,0,0,0,.319,2.74,4.969,4.969,0,0,0,1.742.356c.641.071,1.283.124,1.922.207a5.806,5.806,0,0,1,3.325,1.367A4.24,4.24,0,0,1,59.573,80.8Zm12.087,4.59-1.082-1.212A6.455,6.455,0,0,1,63.8,85.265,4.559,4.559,0,0,1,61.392,79.6,5.7,5.7,0,0,1,63.866,76.9a4.7,4.7,0,0,1-1.615-3.862,3.744,3.744,0,0,1,2.373-3.029,5.047,5.047,0,0,1,4.322.349,3.679,3.679,0,0,1,1.7,3.49c-.132,1.756-1.46,2.908-2.888,3.745l2.663,2.9a4.834,4.834,0,0,0,.39-1.884c.051-.627.044-1.255.044-1.884h3.962v2.143H73.045a6.785,6.785,0,0,1-.931,3.442l2.836,3.074Zm-6.214-6.8a3.312,3.312,0,0,0-1.739,1.777,2.377,2.377,0,0,0,.556,2.264,3.517,3.517,0,0,0,4.691-.166Zm2.685-5a1.57,1.57,0,0,0-.9-1.5,1.992,1.992,0,0,0-1.959.2,1.593,1.593,0,0,0-.483,1.761,4.79,4.79,0,0,0,1.371,1.832C67.1,75.361,68.131,74.81,68.131,73.592Zm20.292,1.342a4.8,4.8,0,0,1-1.53,3.713,5.9,5.9,0,0,1-3.882,1.223H79.764v5.5H76.993V70.02h6.018a5.961,5.961,0,0,1,3.882,1.215A4.747,4.747,0,0,1,88.423,74.934Zm-2.814.022a2.519,2.519,0,0,0-.768-1.912,2.891,2.891,0,0,0-1.938-.578H79.764v4.958H82.9a2.916,2.916,0,0,0,1.938-.569A2.483,2.483,0,0,0,85.609,74.956Z" transform="translate(-47.254 -62.399)" fill="#d6002a"/>
                                <rect id="Bar_3_" width="41.17" height="2.771" transform="translate(0)" fill="#1a1a1a"/>
                            </svg>
                        </div>
                        <div class="vertical-separator"></div>
                        <span class="product-name">${productName}</span>
                    </div>
                </div>

                <!-- Right side: Icons -->
                <div class="header-right">
                    <!-- Bell icon with notification -->
                    <div class="icon-container bell-container" id="notificationsMenuTrigger">
                        <div class="bell-icon-wrapper">
                            <svg class="bell-icon" viewBox="0 0 20 22.856" xmlns="http://www.w3.org/2000/svg">
                                <path id="bell" d="M11.428,1.428v.857a7.147,7.147,0,0,1,5.714,7v.839a8.583,8.583,0,0,0,2.165,5.7l.33.371a1.429,1.429,0,0,1-1.067,2.379H1.429A1.43,1.43,0,0,1,.361,16.191l.331-.371a8.574,8.574,0,0,0,2.165-5.7V9.285a7.107,7.107,0,0,1,5.714-7V1.428a1.428,1.428,0,0,1,2.857,0ZM10,22.856a2.858,2.858,0,0,1-2.022-.835A2.929,2.929,0,0,1,7.143,20h5.714A2.85,2.85,0,0,1,10,22.856Z" transform="translate(0)" fill="#5c5c5c"/>
                            </svg>
                            <div class="notification-badge ${notificationCount === 0 ? 'hidden' : ''}">
                                <span class="notification-number" id="notificationCount">${notificationCount}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="icon-separator"></div>

                    <!-- Question mark icon -->
                    <div class="icon-container question-container" id="helpMenuTrigger">
                        <div class="question-icon-wrapper">
                            <svg class="question-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path id="circle-question" d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,18.75a1.481,1.481,0,0,1-1.5-1.5,1.456,1.456,0,0,1,1.5-1.5,1.5,1.5,0,1,1,0,3Zm3.239-6.656-2.114,1.313V13.5a1.125,1.125,0,0,1-2.25,0v-.75a1.156,1.156,0,0,1,.563-.984l2.672-1.594a1,1,0,0,0,.516-.891A1.078,1.078,0,0,0,13.552,8.25h-2.4a1.014,1.014,0,0,0-1.031,1.031,1.125,1.125,0,1,1-2.25,0A3.252,3.252,0,0,1,11.114,6h2.4a3.265,3.265,0,0,1,1.73,6.094Z" fill="#5c5c5c"/>
                            </svg>
                        </div>
                    </div>
                    
                    <div class="icon-separator"></div>

                    <!-- User avatar -->
                    <div class="icon-container user-container" id="userMenuTrigger">
                        <div class="user-avatar-wrapper">
                            <svg class="user-avatar" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                <g id="Path_1386" data-name="Path 1386" fill="none">
                                    <path d="M18,0A18,18,0,1,1,0,18,18,18,0,0,1,18,0Z" stroke="none"/>
                                    <path d="M 18 1 C 13.45914077758789 1 9.190059661865234 2.768310546875 5.979190826416016 5.979190826416016 C 2.768310546875 9.190059661865234 1 13.45914077758789 1 18 C 1 22.54085922241211 2.768310546875 26.80994033813477 5.979190826416016 30.02080917358398 C 9.190059661865234 33.231689453125 13.45914077758789 35 18 35 C 22.54085922241211 35 26.80994033813477 33.231689453125 30.02080917358398 30.02080917358398 C 33.231689453125 26.80994033813477 35 22.54085922241211 35 18 C 35 13.45914077758789 33.231689453125 9.190059661865234 30.02080917358398 5.979190826416016 C 26.80994033813477 2.768310546875 22.54085922241211 1 18 1 M 18 0 C 27.94112014770508 0 36 8.058879852294922 36 18 C 36 27.94112014770508 27.94112014770508 36 18 36 C 8.058879852294922 36 0 27.94112014770508 0 18 C 0 8.058879852294922 8.058879852294922 0 18 0 Z" stroke="none" fill="#5c5c5c"/>
                                </g>
                                <text id="SS" class="user-initials" x="18" y="24" text-anchor="middle" fill="#5c5c5c" font-size="17" font-family="AkkuratLL-Regular, Akkurat LL">${userInitials}</text>
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Bottom border line -->
                <div class="header-bottom-line"></div>
            </div>
        </header>
    `;
}

// Create Panels HTML
function createPanels(options = {}) {
    const {
        userName = 'Sam Sample',
        userEmail = 'sam.sample@company.com',
        userInitials = 'SS',
        userDetails = {
            phone: '000-000-0000',
            company: 'IHS Markit',
            department: 'The best one',
            jobTitle: 'Director of stuff',
            address: '1234 Street Dr.<br>Anytown, ST 00000<br>USA'
        }
    } = options;

    return `
    <!-- User Menu Panel -->
    <div class="user-menu" id="userMenu">
        <div class="user-menu-content">
            <div class="user-menu-header">
                <svg class="user-menu-header-svg" width="345" height="86.768" viewBox="0 0 345 86.768" xmlns="http://www.w3.org/2000/svg">
                    <circle id="Ellipse_2" data-name="Ellipse 2" cx="32" cy="32" r="32" transform="translate(140.5 22.768)" fill="#5c5c5c"/>
                    <text id="SS" transform="translate(172.5 67.768)" fill="#eaeef4" font-size="36" font-family="AkkuratLL-Regular, Akkurat LL" text-anchor="middle">${userInitials}</text>
                    <g id="closeMenu" class="user-menu-close-icon" transform="translate(313 1.768)">
                        <rect x="0" y="0" width="32" height="32" fill="transparent" cursor="pointer"/>
                        <g id="Group_4906" data-name="Group 4906" transform="translate(10 10)">
                            <line id="Line_1086" data-name="Line 1086" x2="12" y2="12" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2.5"/>
                            <line id="Line_1087" data-name="Line 1087" x1="12" y2="12" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2.5"/>
                        </g>
                    </g>
                </svg>
            </div>
            
            <div class="user-menu-info">
                <div class="user-menu-name">${userName}</div>
                <div class="user-menu-email">
                    ${userEmail}
                    <svg class="user-menu-edit" width="11.953" height="12" viewBox="0 0 11.953 12" xmlns="http://www.w3.org/2000/svg">
                        <g id="brand-icon-content-edit" transform="translate(-7.19 7.385)">
                            <path id="brand-icon-content-edit-2" data-name="brand-icon-content-edit" d="M11.679,1.85h0L10.129.3a1.152,1.152,0,0,0-1.55,0L7.329,1.5l3.05,3.05,1.2-1.3a.948.948,0,0,0,.2-1.3.107.107,0,0,0-.1-.1h0Zm-2.15,4-3.2-3.2L1.23,7.5c-.05.05-.05.1-.1.15l-1.1,3.7a.475.475,0,0,0,.1.5.3.3,0,0,0,.3.15H.58l3.7-1.05c.1,0,.15-.1.25-.15l5-4.949ZM1.78,10.65l-.4-.4.65-2.1,1.5.35.3,1.6-2.05.55Z" transform="translate(7.19 -7.385)" fill="#333"/>
                        </g>
                    </svg>
                </div>
                <a href="#" class="user-menu-more" id="toggleMore">More</a>
                
                <div class="user-menu-details" id="userDetails">
                    <div class="user-menu-detail-item">
                        <div class="user-menu-detail-label">Phone:</div>
                        <div class="user-menu-detail-value">${userDetails.phone}</div>
                    </div>
                    <div class="user-menu-detail-item">
                        <div class="user-menu-detail-label">Company:</div>
                        <div class="user-menu-detail-value">${userDetails.company}</div>
                    </div>
                    <div class="user-menu-detail-item">
                        <div class="user-menu-detail-label">Department:</div>
                        <div class="user-menu-detail-value">${userDetails.department}</div>
                    </div>
                    <div class="user-menu-detail-item">
                        <div class="user-menu-detail-label">Job Title:</div>
                        <div class="user-menu-detail-value">${userDetails.jobTitle}</div>
                    </div>
                    <div class="user-menu-detail-item">
                        <div class="user-menu-detail-label">Address:</div>
                        <div class="user-menu-detail-value">${userDetails.address}</div>
                    </div>
                </div>
            </div>

            <hr class="user-menu-divider">

            <div class="user-menu-items">
                <div class="user-menu-item">User Settings</div>
                <div class="user-menu-item">List item</div>
                <div class="user-menu-item">List item</div>
            </div>
        </div>
    </div>

    <!-- Help Menu Panel -->
    <div class="help-menu" id="helpMenu">
        <div class="help-menu-content">
            <div class="help-menu-header">
                <div class="help-menu-title">Help</div>
                <button class="help-menu-close" id="closeHelpMenu">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x2="12" y2="12" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2.5"/>
                        <line x1="12" y2="12" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2.5"/>
                    </svg>
                </button>
            </div>

            <div class="help-menu-body">
                <div class="help-menu-items">
                    <div class="help-menu-item">List item</div>
                    <div class="help-menu-item">List item</div>
                    <div class="help-menu-item">List item</div>
                </div>

                <div class="help-menu-section">
                    <div class="help-menu-section-title">Americas:</div>
                    <div class="help-menu-section-content">
                        <p>+1 (###) ###-####</p>
                    </div>
                </div>

                <div class="help-menu-section">
                    <div class="help-menu-section-title">Outside the US/Canada:</div>
                    <div class="help-menu-section-content">
                        <p>+1 (###) ###-####</p>
                        <p>Mon-Fri 8:00am to 9:00pm ET</p>
                    </div>
                </div>

                <div class="help-menu-section">
                    <div class="help-menu-section-title">Europe, Middle East, Africa:</div>
                    <div class="help-menu-section-content">
                        <p>+44 ### ### ###</p>
                        <p>Mon-Fri 8:00am to 6:00pm GMT</p>
                    </div>
                </div>

                <div class="help-menu-section">
                    <div class="help-menu-section-title">Asia Pacific:</div>
                    <div class="help-menu-section-content">
                        <p>+### ### ####</p>
                        <p>Mon-Fri 8:00am to 6:00pm GMT +8</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Notifications Menu Panel -->
    <div class="notifications-menu" id="notificationsMenu">
        <div class="notifications-menu-content">
            <div class="notifications-menu-header">
                <div class="notifications-menu-title">Notifications</div>
                <button class="notifications-menu-close" id="closeNotificationsMenu">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x2="12" y2="12" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2.5"/>
                        <line x1="12" y2="12" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2.5"/>
                    </svg>
                </button>
            </div>

            <div class="notifications-menu-body">
                <div class="notifications-mute">
                    <span class="notifications-mute-label">Mute alerts</span>
                    <div class="notifications-toggle" id="muteToggle">
                        <div class="notifications-toggle-slider"></div>
                    </div>
                </div>

                <div class="notifications-list">
                    <div class="notification-item success" data-notification-id="1">
                        <svg class="notification-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.665,0.335a1.14,1.14,0,0,1,0,1.614L6.522,10.59a1.14,1.14,0,0,1-1.614,0L.335,6.021a1.142,1.142,0,0,1,1.616-1.614l3.731,3.761,8.368-8.333a1.139,1.139,0,0,1,1.614,0Z" fill="#090"/>
                        </svg>
                        <div class="notification-text">
                            Something good happened the user may<br>want to know about.
                        </div>
                        <button class="notification-dismiss" aria-label="Dismiss notification">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x2="12" y2="12" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2.5"/>
                                <line x1="12" y2="12" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2.5"/>
                            </svg>
                        </button>
                    </div>

                    <div class="notification-item warning" data-notification-id="2">
                        <svg class="notification-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.92,16.761l-8.3-15.069a.871.871,0,0,0-1.537,0L.7,16.837a.98.98,0,0,0,0,.922.845.845,0,0,0,.768.461H18.152A.873.873,0,0,0,19,17.3a.628.628,0,0,0-.077-.538ZM2.93,16.376,9.848,3.922l6.918,12.454H2.928ZM9.08,7.227h1.691v4.92H9.08Zm0,6h1.691v2.152H9.08V13.224Z" fill="#c56c00"/>
                        </svg>
                        <div class="notification-text">
                            Something bad happened the user needs<br>to know about.
                        </div>
                        <button class="notification-dismiss" aria-label="Dismiss notification">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x2="12" y2="12" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2.5"/>
                                <line x1="12" y2="12" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2.5"/>
                            </svg>
                        </button>
                    </div>

                    <div class="notification-item capital-call" data-notification-id="3">
                        <svg class="notification-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 2L2 7v11h16V7L10 2zm0 2.5l6 4.5v8H4v-8l6-4.5z" fill="#1976d2"/>
                            <path d="M9 10h2v6H9v-6zm0-2h2v2H9V8z" fill="#1976d2"/>
                        </svg>
                        <div class="notification-text">
                            <strong>New Capital Call</strong><br>
                            <span class="notification-detail">GP: The Carlyle Group</span>
                            <span class="notification-detail">Fund: Carlyle Partners VII</span>
                            <span class="notification-detail">Amount: $2,500,000</span>
                            <span class="notification-detail">Due Date: 02-15-2024</span>
                            <a href="#" class="notification-link">View Capital Calls →</a>
                        </div>
                        <button class="notification-dismiss" aria-label="Dismiss notification">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x2="12" y2="12" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2.5"/>
                                <line x1="12" y2="12" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2.5"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="notifications-section">
                    <div class="notifications-section-title">System Notifications</div>
                    
                    <div class="notifications-feature-header">
                        <div class="notifications-feature-title">New feature</div>
                        <div class="notifications-badge">
                            <span class="notifications-badge-text">New</span>
                        </div>
                    </div>

                    <div class="notifications-video-thumbnail">
                        <div class="notifications-video-play">
                            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.3,9.414,1.544.322C.687-.364,0,.064,0,1.437v17.67c0,1.287.686,1.8,1.544,1.115L13.3,11.13a1.19,1.19,0,0,0,.429-.857,1.187,1.187,0,0,0-.429-.857Z" fill="#fff"/>
                            </svg>
                        </div>
                    </div>

                    <div class="notifications-description">
                        Sed posuere consectetur est at lobortis.<br>
                        Praesent commodo cursus magna, vel<br>
                        scelerisque nisl consectetur et. Morbi leo risus,<br>
                        porta ac consectetur ac, vestibulum at eros.<br>
                        Lorem ipsum dolor sit amet, consectetur<br>
                        adipiscing elit.
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

// Initialize header function
function initHeader(options = {}) {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = createHeader(options);
        
        // Add panels to body (they need to be at body level, not inside header container)
        const panelsContainer = document.getElementById('header-panels-container');
        if (panelsContainer) {
            panelsContainer.innerHTML = createPanels(options);
        } else {
            // Create panels container if it doesn't exist
            const panelsDiv = document.createElement('div');
            panelsDiv.id = 'header-panels-container';
            document.body.appendChild(panelsDiv);
            panelsDiv.innerHTML = createPanels(options);
        }
        
        // Initialize panel functionality
        initPanels();
    }
}

// Initialize panel functionality
function initPanels() {
    // User Menu
    const userMenuTrigger = document.getElementById('userMenuTrigger');
    const userMenu = document.getElementById('userMenu');
    const closeMenu = document.getElementById('closeMenu');
    const toggleMore = document.getElementById('toggleMore');
    const userDetails = document.getElementById('userDetails');

    // Help Menu
    const helpMenuTrigger = document.getElementById('helpMenuTrigger');
    const helpMenu = document.getElementById('helpMenu');
    const closeHelpMenu = document.getElementById('closeHelpMenu');

    // Notifications Menu
    const notificationsMenuTrigger = document.getElementById('notificationsMenuTrigger');
    const notificationsMenu = document.getElementById('notificationsMenu');
    const closeNotificationsMenu = document.getElementById('closeNotificationsMenu');
    const muteToggle = document.getElementById('muteToggle');

    // Close functions
    function closeHelpMenuFunc() {
        if (helpMenu) {
            helpMenu.classList.remove('open');
            if (helpMenuTrigger) helpMenuTrigger.classList.remove('active');
        }
    }

    function closeUserMenu() {
        if (userMenu) {
            userMenu.classList.remove('open');
            if (userMenuTrigger) userMenuTrigger.classList.remove('active');
        }
    }

    function closeNotificationsMenuFunc() {
        if (notificationsMenu) {
            notificationsMenu.classList.remove('open');
            if (notificationsMenuTrigger) notificationsMenuTrigger.classList.remove('active');
        }
    }

    // Toggle user menu
    if (userMenuTrigger && userMenu) {
        userMenuTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            closeHelpMenuFunc();
            closeNotificationsMenuFunc();
            userMenu.classList.toggle('open');
            userMenuTrigger.classList.toggle('active');
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', closeUserMenu);
    }

    // Toggle more details
    if (toggleMore && userDetails) {
        toggleMore.addEventListener('click', function(e) {
            e.preventDefault();
            const isExpanded = userDetails.classList.contains('expanded');
            if (isExpanded) {
                userDetails.classList.remove('expanded');
                toggleMore.textContent = 'More';
            } else {
                userDetails.classList.add('expanded');
                toggleMore.textContent = 'Less';
            }
        });
    }

    // Toggle help menu
    if (helpMenuTrigger && helpMenu) {
        helpMenuTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            closeUserMenu();
            closeNotificationsMenuFunc();
            helpMenu.classList.toggle('open');
            helpMenuTrigger.classList.toggle('active');
        });
    }

    if (closeHelpMenu) {
        closeHelpMenu.addEventListener('click', closeHelpMenuFunc);
    }

    // Toggle notifications menu
    if (notificationsMenuTrigger && notificationsMenu) {
        notificationsMenuTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            closeUserMenu();
            closeHelpMenuFunc();
            notificationsMenu.classList.toggle('open');
            notificationsMenuTrigger.classList.toggle('active');
        });
    }

    if (closeNotificationsMenu) {
        closeNotificationsMenu.addEventListener('click', closeNotificationsMenuFunc);
    }

    // Mute toggle functionality
    if (muteToggle) {
        muteToggle.addEventListener('click', function() {
            muteToggle.classList.toggle('active');
        });
    }

    // Update notification badge count
    function updateNotificationBadge() {
        const notificationItems = document.querySelectorAll('.notification-item:not(.dismissed)');
        const count = notificationItems.length;
        const badge = document.getElementById('notificationCount');
        const badgeContainer = badge ? badge.closest('.notification-badge') : null;
        
        if (badge) {
            badge.textContent = count;
        }
        
        if (badgeContainer) {
            if (count === 0) {
                badgeContainer.classList.add('hidden');
            } else {
                badgeContainer.classList.remove('hidden');
            }
        }
    }

    // Dismiss notification functionality
    const dismissButtons = document.querySelectorAll('.notification-dismiss');
    dismissButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const notificationItem = button.closest('.notification-item');
            if (notificationItem) {
                notificationItem.classList.add('dismissed');
                updateNotificationBadge();
            }
        });
    });

    // Close menus when clicking outside
    document.addEventListener('click', function(e) {
        if (userMenu && userMenuTrigger && !userMenu.contains(e.target) && !userMenuTrigger.contains(e.target)) {
            closeUserMenu();
        }
        if (helpMenu && helpMenuTrigger && !helpMenu.contains(e.target) && !helpMenuTrigger.contains(e.target)) {
            closeHelpMenuFunc();
        }
        if (notificationsMenu && notificationsMenuTrigger && !notificationsMenu.contains(e.target) && !notificationsMenuTrigger.contains(e.target)) {
            closeNotificationsMenuFunc();
        }
    });
}

// Export for module systems (if using ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createHeader, initHeader };
}
