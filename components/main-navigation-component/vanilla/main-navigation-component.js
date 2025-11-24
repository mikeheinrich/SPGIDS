/**
 * Main Navigation Component - Shareable Export
 * 
 * This file contains all the code needed to use the main navigation component in your project.
 * INCLUDES: Left sidebar navigation with tooltips on hover
 * 
 * USAGE:
 * 1. Include the CSS from main-navigation-component.css in your <head>
 * 2. Include this JavaScript file before the closing </body> tag
 * 3. Add a container: <aside id="main-navigation-container"></aside>
 * 4. Initialize the navigation: see example at the bottom
 * 
 * DEPENDENCIES:
 * - None (pure vanilla JavaScript)
 * 
 * CUSTOMIZATION:
 * The initMainNavigation() function accepts an options object:
 * - menuItems: array of objects with { label, svg, active, onClick }
 *   - label: string (tooltip text)
 *   - svg: string (SVG markup)
 *   - active: boolean (whether item is active)
 *   - onClick: function (optional click handler)
 * 
 * FEATURES:
 * - Fixed left sidebar navigation
 * - Tooltips on hover
 * - Active state indicator
 * - Click handlers for each menu item
 */

// Default menu items
const defaultMenuItems = [
    {
        label: 'Home',
        svg: `<svg version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="21px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 21">
            <path d="M 0.5348052313317384 9.421600271212204  L 11.36408381380959 0.23428490905323418  C 11.731129176340279 -0.07633959293830439  12.268870823659718 -0.07633959293830356  12.635916186190407 0.23428490905323418  L 23.464210378287163 9.421600271212204  C 23.68575571201644 9.608805352418342  23.813558447021247 9.88411830831428  23.813558447021247 10.174166712267656  C 23.813558447021247 10.718313130987083  23.37244061464495 11.159430960259549  22.828294192096752 11.159430960259549  C 22.595487325543015 11.159430960259549  22.370200996411384 11.076992997741646  22.192378005906342 10.92673315332311  L 21.187315426803544 10.073266698914898  L 21.187315426803544 17.719026735118554  C 21.18731557456554 19.53149902665306  19.71881459088581 21  17.907326824741325 21  L 6.093657713401772 21  C 4.280641893080822 20.999999999911328  2.8117001828153514 19.53105829998175  2.8117001828153514 17.719026882791876  L 2.8117001828153554 10.069329137418203  L 1.8076219940936569 10.922795591826414  C 1.6326605471132012 11.063737882829718  1.4147510119212832 11.140590525078736  1.1900818382407305 11.140590525078736  C 0.6464180428792408 11.140590525078736  0.20569145714102588 10.6998639424416  0.20569145714102588 10.156200150905484  C 0.20569145714102588 9.875620014131968  0.3254227123879383 9.608373327431643  0.5348052313317384 9.421600271212204  Z M 12 2.2749261547143873  L 4.780480945014765 8.404725014691234  L 4.780480945014765 17.719026735118554  C 4.7804805743878935 18.444172774439842  5.3675283865911965 19.031220582512507  6.091688562012701 19.031220582512507  C 6.09234494608711 19.031220582512507  6.093001330067554 19.0312200896387  6.093657713401772 19  L 17.90634228659823 19  C 17.906670539931884 19.031219350420578  17.906998793346734 19.03121947368513  17.907327046772963 19.03121947368513  C 18.63148722219447 19.03121947368513  19.21853503439777 18.444171665612465  19.21853503439777 17.720011495286357  L 19.218534664604135 8.399803062820366  L 12 2.2749261547143873  Z " fill-rule="nonzero" fill="rgba(92, 92, 92, 1)" stroke="none" transform="matrix(1 0 0 1 0 0)" />
        </svg>`,
        active: false
    },
    {
        label: 'Profile',
        svg: `<svg version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="21px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 24">
            <path d="M 21 22.5  C 21 17.94375  17.30625 14.25  12.749999999999998 14.25  L 8.25 14.25  C 3.6937499999999996 14.25  0 17.94375  0 22.5  C 0 23.32828125  0.67171875 24  1.5 24  L 19.5 24  C 20.328281250000003 24  21 23.32828125  21 22.5  Z M 18.703125 21.75  L 2.29640625 21.75  C 2.6667187500000002 18.792187499999997  5.19375 16.5  8.25 16.5  L 12.749999999999998 16.5  C 15.804374999999999 16.5  18.3328125 18.79453125  18.703125 21.75  Z M 4.5 6  C 4.5 9.314062499999999  7.1859375000000005 12  10.5 12  C 13.813593749999999 12  16.5 9.313593749999999  16.5 6  C 16.5 2.68640625  13.813593749999999 0  10.5 0  C 7.18640625 0  4.5 2.68640625  4.5 6  Z M 6.750000000000001 6  C 6.750000000000001 3.9323437500000002  8.432812499999999 2.25  10.5 2.25  C 12.56765625 2.25  14.25 3.9323437500000002  14.25 6  C 14.25 8.06765625  12.56765625 9.75  10.5 9.75  C 8.43234375 9.75  6.750000000000001 8.0671875  6.750000000000001 6  Z " fill-rule="nonzero" fill="rgba(214, 0, 42, 1)" stroke="none" transform="matrix(1 0 0 1 0 0)" />
        </svg>`,
        active: true
    },
    {
        label: 'Documents',
        svg: `<svg version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="19px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 19">
            <path d="M 23.871250000000003 9.428325892857142  C 24.1 8.804464285714285  23.991666666666667 8.142857142857142  23.608333333333334 7.616964285714285  C 23.229166666666664 7.086830357142857  22.641666666666666 6.785714285714286  21.962500000000002 7  L 5.591666666666666 7  C 4.762499999999999 6.785714285714286  4.008333333333334 7.315848214285714  3.717916666666667 8.1046875  L 1.3333333333333333 14.580803571428572  L 1.3333333333333333 2.714285714285714  C 1.3333333333333333 1.9661607142857143  1.9316666666666666 1.357142857142857  2.6666666666666665 1.357142857142857  L 7.5625 1.357142857142857  C 7.918708333333334 1.357142857142857  8.253333333333332 1.4982857142857144  8.505416666666667 1.7547433035714286  L 10.779166666666667 4.071428571428571  L 18.666666666666668 4.071428571428571  C 19.401666666666667 4.071428571428571  20 4.680446428571429  20 5.428571428571428  L 21.333333333333332 5.428571428571428  C 21.333333333333332 3.9293526785714286  20.139583333333334 2.714285714285714  18.666666666666668 2.714285714285714  L 11.333333333333332 2.714285714285714  L 9.445833333333333 0.7952008928571428  C 8.945833333333333 0.2858482142857144  8.270833333333334 0  7.5625 0  L 2.6666666666666665 0  C 1.1937499999999999 0  0 1.2150669642857141  0 2.714285714285714  L 0 16.285714285714285  C 0 17.784933035714285  1.1937499999999999 19  2.6666666666666665 19  L 19.462500000000002 19  C 20.342083333333335 19  21.109583333333333 18.42618303571429  21.371250000000003 17.571183035714288  L 23.871250000000003 9.428325892857142  Z M 22.53708333333333 8.419205357142857  C 22.662499999999998 8.596651785714286  22.7 8.8171875  22.633333333333336 9.025  L 20.133333333333336 17.167857142857144  C 20.045833333333334 17.452008928571427  19.791666666666668 17.642857142857142  19.462500000000002 17.642857142857142  L 2.6666666666666665 17.642857142857142  C 2.52825 17.642857142857142  2.4017916666666665 17.602350669642856  2.276125 17.562361607142854  C 2.185125 17.51274107142857  2.104916666666667 17.442254464285714  2.0429583333333334 17.351283482142858  C 1.916666666666667 17.165736607142858  1.888666666666667 16.937779017857142  1.966791666666667 16.726573660714283  L 4.9667916666666665 8.583716517857143  C 5.0625 8.320982142857142  5.3125 8.142857142857142  5.591666666666666 8.142857142857142  L 22 8.142857142857142  C 22.214208333333332 8.142857142857142  22.41016666666667 8.243582589285714  22.53708333333333 8.419205357142857  Z " fill-rule="nonzero" fill="rgba(92, 92, 92, 1)" stroke="none" transform="matrix(1 0 0 1 0 0)" />
        </svg>`,
        active: false
    },
    {
        label: 'Settings',
        svg: `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="ext-gen1075"><defs><path id="a" d="M0 0h24v24H0z"></path></defs><g fill="none" fill-rule="evenodd"><g><mask id="b" fill="#5c5c5c"><use xlink:href="#a"></use></mask><path d="M1.959 6.654c-.309.797-.635 1.632-.949 2.47-.02.054.028.162.078.207.3.273.601.549.923.797.237.184.321.397.288.689a9.984 9.984 0 0 0 .086 2.892.54.54 0 0 1-.186.525c-.328.301-.65.609-.964.926-.053.054-.09.184-.062.249.328.775.666 1.546 1.011 2.314.026.057.124.12.185.117.452-.024.905-.058 1.356-.102.224-.022.398.04.534.219a9.3 9.3 0 0 0 2.186 2.071c.163.11.232.262.223.46-.019.453-.024.906-.044 1.358-.006.126.02.194.15.242.775.29 1.547.588 2.316.891.126.05.196.03.279-.07.244-.296.519-.568.743-.876.22-.304.494-.363.838-.323a9.37 9.37 0 0 0 2.734-.085c.236-.041.425.01.591.19.296.324.6.639.91.948.054.052.172.102.229.078.791-.334 1.578-.678 2.361-1.029.052-.023.107-.114.104-.17a24.36 24.36 0 0 0-.099-1.33c-.026-.243.033-.428.228-.575a9.233 9.233 0 0 0 2.06-2.164.51.51 0 0 1 .482-.23c.453.02.907.027 1.36.047.12.006.179-.03.223-.146.292-.773.588-1.544.895-2.31.056-.141.018-.211-.085-.296-.295-.245-.568-.517-.877-.742-.298-.216-.349-.485-.308-.82a9.276 9.276 0 0 0-.084-2.728c-.044-.249.015-.437.2-.607.324-.296.64-.599.948-.91.05-.05.085-.17.06-.23-.332-.783-.673-1.561-1.02-2.337-.024-.052-.113-.11-.169-.107-.445.025-.89.053-1.333.101-.241.026-.43-.03-.577-.225a9.276 9.276 0 0 0-2.168-2.057.512.512 0 0 1-.237-.478c.02-.445.028-.89.049-1.335.006-.132-.025-.207-.164-.259a115.66 115.66 0 0 1-2.294-.883c-.137-.055-.209-.025-.296.08-.239.29-.51.555-.728.858-.225.313-.505.37-.858.329a9.181 9.181 0 0 0-2.711.084c-.245.044-.44-.01-.611-.198-.296-.323-.6-.638-.911-.946-.05-.05-.171-.089-.23-.064-.784.33-1.564.671-2.341 1.017-.053.024-.114.112-.11.167.022.436.047.873.098 1.307.032.27-.04.467-.257.631A9.01 9.01 0 0 0 4.002 6.4a.556.556 0 0 1-.515.257c-.5-.01-1-.003-1.528-.003zM24 14.906l-.942 2.389c-.082.21-.162.421-.243.632-.091.24-.258.361-.52.35-.462-.017-.924-.025-1.385-.047-.155-.008-.256.034-.35.165a10.043 10.043 0 0 1-1.739 1.833.41.41 0 0 0-.127.29c.017.476.054.95.093 1.425.022.273-.096.441-.342.547-.995.431-1.989.868-2.984 1.3-.275.12-.424.091-.633-.123a46.957 46.957 0 0 1-.942-.982c-.104-.113-.209-.166-.366-.142-.863.133-1.729.135-2.598.063-.073-.006-.173.058-.227.119-.303.337-.594.685-.893 1.025-.24.275-.367.305-.699.178l-2.927-1.129c-.384-.148-.451-.248-.44-.666.01-.445.034-.89.036-1.335a.348.348 0 0 0-.122-.246 10.646 10.646 0 0 1-1.882-1.789.354.354 0 0 0-.253-.11c-.485.021-.969.057-1.452.096-.273.022-.443-.097-.55-.341-.431-.994-.869-1.985-1.301-2.978-.125-.288-.095-.426.136-.649.325-.315.66-.621.977-.946.075-.076.138-.216.125-.317-.11-.871-.13-1.742-.054-2.617.007-.073-.057-.173-.118-.228-.338-.302-.686-.593-1.028-.89-.274-.24-.306-.366-.178-.698l1.14-2.943c.14-.36.239-.427.633-.418.446.01.892.037 1.337.036a.405.405 0 0 0 .283-.14c.52-.69 1.112-1.31 1.779-1.86a.378.378 0 0 0 .112-.273c-.02-.475-.057-.95-.096-1.425-.022-.27.095-.444.34-.55C6.602 1.077 7.604.64 8.604.2c.239-.104.437-.062.615.126.323.34.645.682.978 1.012.067.066.19.124.278.112a12.457 12.457 0 0 1 2.67-.057c.066.005.156-.059.207-.115.262-.29.512-.59.772-.882.123-.138.258-.264.388-.396h.329c.066.035.13.076.199.103.96.373 1.92.743 2.88 1.115.325.126.4.232.392.578-.01.445-.023.89-.045 1.334-.008.153.03.255.163.35A9.186 9.186 0 0 1 20.26 5.22c.09.112.182.145.32.134.467-.04.935-.064 1.403-.102.283-.024.452.1.562.355.427.986.862 1.97 1.292 2.955.126.287.097.433-.127.65-.314.305-.624.615-.952.904-.157.137-.19.28-.158.472.132.814.117 1.632.067 2.452a.412.412 0 0 0 .116.292c.398.362.81.708 1.218 1.06v.515z" stroke-width=".1" mask="url(#b)" stroke="#5c5c5c" fill="#5c5c5c"></path></g><path d="M8.118 16.288h-.026c0 .414-.008.828.006 1.242.003.09.063.214.136.259 2.528 1.53 5.06 1.529 7.588-.002a.326.326 0 0 0 .135-.234c.01-.836.015-1.671.004-2.507-.011-.822-.493-1.465-1.222-1.668-.152-.043-.268-.037-.395.094-1.27 1.315-3.373 1.304-4.664-.007a.389.389 0 0 0-.3-.097c-.65.12-1.221.744-1.257 1.4-.027.505-.005 1.013-.005 1.52m8.727.669c2.044-1.859 2.688-5.183 1.552-7.707-1.275-2.834-4.1-4.449-7.12-4.135-2.985.31-5.433 2.534-6.052 5.49-.54 2.581.534 5.092 1.986 6.32 0-.631-.006-1.246 0-1.861.017-1.418.91-2.428 2.307-2.622.256-.036.467.007.648.222 1.027 1.22 2.702 1.218 3.72 0a.594.594 0 0 1 .53-.233c1.13.067 2.119.86 2.338 1.963.102.514.07 1.055.09 1.584.01.309.001.618.001.979m2.983-4.622c-.19 4.452-3.953 7.553-7.905 7.467-4.742-.103-7.8-4.033-7.717-7.905.102-4.694 4.008-7.782 7.922-7.703 4.71.096 7.93 4.08 7.7 8.141" fill="#5c5c5c"></path><path d="M13.916 9.584a1.88 1.88 0 0 0-1.9-1.881c-1.05-.006-1.885.856-1.88 1.899a1.89 1.89 0 0 0 1.898 1.884 1.898 1.898 0 0 0 1.882-1.902m.884.02a2.772 2.772 0 0 1-2.801 2.767A2.771 2.771 0 0 1 9.25 9.575a2.776 2.776 0 0 1 5.549.029" fill="#5c5c5c" id="ext-gen1076"></path></g></svg>`,
        active: false
    }
];

// Main Navigation Component Function
function createMainNavigation(options = {}) {
    const { menuItems = defaultMenuItems, isDemo = false } = options;
    
    const demoClass = isDemo ? ' main-navigation-demo' : '';
    let navigationHTML = `<aside class="main-navigation${demoClass}">`;
    
    menuItems.forEach((item, index) => {
        const activeClass = item.active ? ' active' : '';
        // Ensure SVG is properly formatted
        const svgContent = item.svg ? item.svg.trim() : '';
        navigationHTML += `
            <div class="main-navigation-icon${activeClass}" data-index="${index}">
                <span class="main-navigation-tooltip">${item.label}</span>
                ${svgContent}
            </div>`;
    });
    
    navigationHTML += '</aside>';
    
    return navigationHTML;
}

// Initialize Main Navigation
function initMainNavigation(options = {}) {
    console.log('=== initMainNavigation CALLED ===');
    console.log('Options received:', options);
    
    const containerId = options.containerId || 'main-navigation-container';
    console.log('Looking for container with ID:', containerId);
    
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`❌ Main navigation container not found. Add <aside id="${containerId}"></aside> to your HTML.`);
        console.log('Available elements in document:', {
            allIds: Array.from(document.querySelectorAll('[id]')).map(el => el.id),
            mainNavIds: Array.from(document.querySelectorAll('[id*="main-navigation"]')).map(el => el.id),
            allAsides: Array.from(document.querySelectorAll('aside')).map(el => ({ id: el.id, className: el.className }))
        });
        return;
    }
    
    console.log('✅ Main navigation container found:', container);
    console.log('Container details:', {
        tagName: container.tagName,
        id: container.id,
        className: container.className,
        parentElement: container.parentElement,
        parentElementTag: container.parentElement?.tagName,
        parentElementClass: container.parentElement?.className,
        isConnected: container.isConnected,
        offsetParent: container.offsetParent
    });
    
    // Check if this is a demo context (container is inside a demo/preview area)
    const isDemo = container.closest('.component-preview, .component-showcase') !== null;
    console.log('Is demo mode:', isDemo);
    if (isDemo) {
        const closestPreview = container.closest('.component-preview, .component-showcase');
        console.log('Found demo container:', closestPreview);
        console.log('Demo container classes:', closestPreview?.className);
    } else {
        console.log('⚠️ No demo container found - checking parent chain:');
        let current = container.parentElement;
        let level = 0;
        while (current && level < 5) {
            console.log(`  Level ${level}:`, current.tagName, current.className);
            current = current.parentElement;
            level++;
        }
    }
    
    // Simple approach: directly set classes and content on the container
    // This transforms <aside id="main-navigation-showcase"></aside> 
    // into <aside id="main-navigation-showcase" class="main-navigation main-navigation-demo">...</aside>
    
    console.log('=== MODIFYING CONTAINER ===');
    console.log('Container before modification:', {
        element: container,
        tagName: container.tagName,
        id: container.id,
        className: container.className,
        innerHTML: container.innerHTML,
        childrenCount: container.children.length
    });
    
    // Set the classes
    const newClassName = isDemo ? 'main-navigation main-navigation-demo' : 'main-navigation';
    console.log('Setting className to:', newClassName);
    container.className = newClassName;
    console.log('✅ Container className after:', container.className);
    console.log('Container.classList:', Array.from(container.classList));
    
    // Build the icons HTML directly from menuItems
    const menuItems = options.menuItems || defaultMenuItems;
    console.log('=== BUILDING ICONS ===');
    console.log('Menu items count:', menuItems.length);
    console.log('Menu items:', menuItems.map((item, idx) => ({ index: idx, label: item.label, hasSvg: !!item.svg, active: item.active })));
    
    let iconsHTML = '';
    menuItems.forEach((item, index) => {
        const activeClass = item.active ? ' active' : '';
        const svgContent = item.svg ? item.svg.trim() : '';
        const iconHTML = `
            <div class="main-navigation-icon${activeClass}" data-index="${index}">
                <span class="main-navigation-tooltip">${item.label}</span>
                ${svgContent}
            </div>`;
        iconsHTML += iconHTML;
        console.log(`  Icon ${index} (${item.label}):`, {
            activeClass,
            svgLength: svgContent.length,
            iconHTMLLength: iconHTML.length
        });
    });
    
    console.log('=== SETTING INNERHTML ===');
    console.log('Icons HTML total length:', iconsHTML.length);
    console.log('Icons HTML preview (first 500 chars):', iconsHTML.substring(0, 500));
    console.log('Icons HTML preview (last 200 chars):', iconsHTML.substring(Math.max(0, iconsHTML.length - 200)));
    
    try {
        container.innerHTML = iconsHTML;
        console.log('✅ innerHTML set successfully');
    } catch (error) {
        console.error('❌ Error setting innerHTML:', error);
        return;
    }
    
    console.log('=== VERIFICATION ===');
    console.log('Container after innerHTML set:', {
        element: container,
        tagName: container.tagName,
        id: container.id,
        className: container.className,
        innerHTMLLength: container.innerHTML.length,
        childrenCount: container.children.length,
        children: Array.from(container.children).map((child, idx) => ({
            index: idx,
            tagName: child.tagName,
            className: child.className,
            innerHTML: child.innerHTML.substring(0, 100)
        }))
    });
    
    // Verify icons were created
    const iconElements = container.querySelectorAll('.main-navigation-icon');
    console.log('Icon elements found:', iconElements.length);
    iconElements.forEach((icon, idx) => {
        console.log(`  Icon ${idx}:`, {
            element: icon,
            className: icon.className,
            hasTooltip: !!icon.querySelector('.main-navigation-tooltip'),
            hasSvg: !!icon.querySelector('svg'),
            childrenCount: icon.children.length
        });
    });
    
    if (iconElements.length === 0) {
        console.error('❌ NO ICON ELEMENTS FOUND!');
        console.log('Container.innerHTML:', container.innerHTML);
        console.log('Container.children:', Array.from(container.children));
    }
    
    // Ensure the container has the correct tag (should already be aside)
    if (container.tagName !== 'ASIDE') {
        console.warn('Container is not an <aside> element, it is:', container.tagName);
    }
    
    console.log('Navigation classes applied to container:', container.className);
    console.log('Container innerHTML length:', container.innerHTML.length);
    console.log('Container innerHTML preview:', container.innerHTML.substring(0, 200));
    console.log('Container children count:', container.children.length);
    console.log('Container tagName:', container.tagName);
    console.log('Container id:', container.id);
    
    // Verify icons were created
    const iconsBeforeReflow = container.querySelectorAll('.main-navigation-icon');
    console.log('Icons found before reflow:', iconsBeforeReflow.length);
    
    // Use the container as the navigation element for the rest of the function
    // (container now has the navigation classes and content)
    
    // Force a reflow to ensure styles are applied
    void container.offsetHeight;
    
    // Verify it's visible - log all computed styles
    const computedStyle = window.getComputedStyle(container);
    console.log('=== Container Computed Styles ===');
    console.log('display:', computedStyle.display);
    console.log('position:', computedStyle.position);
    console.log('visibility:', computedStyle.visibility);
    console.log('opacity:', computedStyle.opacity);
    console.log('width:', computedStyle.width);
    console.log('height:', computedStyle.height);
    console.log('top:', computedStyle.top);
    console.log('left:', computedStyle.left);
    console.log('bottom:', computedStyle.bottom);
    console.log('z-index:', computedStyle.zIndex);
    console.log('offsetWidth:', container.offsetWidth);
    console.log('offsetHeight:', container.offsetHeight);
    console.log('getBoundingClientRect:', container.getBoundingClientRect());
    
    // Check if parent has position relative
    const parent = container.parentElement;
    if (parent) {
        const parentStyle = window.getComputedStyle(parent);
        console.log('Parent position:', parentStyle.position);
        console.log('Parent overflow:', parentStyle.overflow);
    }
    
    // Attach click handlers - menuItems already defined above
    const navigationIcons = container.querySelectorAll('.main-navigation-icon');
    
    console.log('Found navigation icons:', navigationIcons.length);
    
    if (navigationIcons.length === 0) {
        console.error('No navigation icons found in container element');
        console.log('Container innerHTML:', container.innerHTML);
    }
    
    navigationIcons.forEach((icon, index) => {
        const menuItem = menuItems[index];
        if (menuItem && menuItem.onClick) {
            icon.addEventListener('click', function() {
                // Remove active class from all icons
                navigationIcons.forEach(i => i.classList.remove('active'));
                // Add active class to clicked icon
                this.classList.add('active');
                // Call the onClick handler
                menuItem.onClick(this, menuItem);
            });
        } else {
            // Default click handler to toggle active state
            icon.addEventListener('click', function() {
                // Remove active class from all icons
                navigationIcons.forEach(i => i.classList.remove('active'));
                // Add active class to clicked icon
                this.classList.add('active');
            });
        }
    });
    
    // Tooltips are handled via CSS hover, no JavaScript needed
    // The CSS already has .main-navigation-icon:hover .main-navigation-tooltip styles
}

// Export for module systems (if using ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createMainNavigation, initMainNavigation, defaultMenuItems };
}

