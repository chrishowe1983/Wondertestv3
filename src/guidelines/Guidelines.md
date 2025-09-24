## Mobile-First Design Guidelines

### Mobile Detection and Responsiveness
- The application uses mobile-first design principles with automatic device detection
- Mobile devices are detected using multiple methods (user agent, screen size, touch capability, orientation)
- Mobile viewport is enforced with comprehensive meta tags to prevent zooming and improve PWA experience
- Touch targets must be at least 48px x 48px for optimal accessibility (upgraded from 44px)
- Dynamic viewport height handling with CSS custom properties for better mobile browser support

### Mobile Layout Rules
- Mobile view gets full-screen treatment with safe area support for notched devices
- Desktop view maintains the card-like layout with rounded corners and shadows
- Navigation automatically switches between mobile slide-out menu and desktop hover navigation
- Mobile navigation uses backdrop blur and translucent background for modern iOS-style appearance
- All input fields use 16px font size minimum to prevent iOS zoom with enhanced styling
- Content areas use flexbox layout for proper mobile height management

### Mobile Performance Optimizations
- Enhanced virtual keyboard handling for iOS devices with height adjustment
- Smooth scrolling with touch support (-webkit-overflow-scrolling: touch)
- Prevention of horizontal scrolling and bounce effects on mobile
- Optimized font rendering with antialiasing and proper text scaling
- Touch action optimization to prevent unwanted gestures
- Overscroll behavior containment for better scroll performance
- iOS-specific fixes for Safari viewport height issues and address bar changes

### Mobile Styling Classes
- `.mobile-padding` - Automatic safe area padding for left/right
- `.mobile-margin` - Automatic safe area margin for left/right  
- `.mobile-card` - Optimized card styling with proper shadows and spacing
- `.mobile-grid-1/2` - Responsive grid layouts for mobile
- `.mobile-text-*` - Mobile-optimized typography scaling
- `.mobile-nav-height` - Navigation height with safe area support
- `.mobile-list-item` - Standardized list item with proper touch targets
- `.h-screen-safe` - Full height accounting for safe areas

### Responsive Breakpoints
- Mobile: < 768px (uses mobile navigation and full-screen layout)
- Desktop: ≥ 768px (uses hover navigation and desktop layout)
- The useIsMobile hook provides real-time breakpoint detection
- CSS custom properties handle dynamic viewport dimensions

### Platform-Specific Features
- iOS: Address bar handling, scroll bounce prevention, fill-available height support
- Android: Smooth scroll behavior, optimized touch handling
- PWA: Mobile web app capabilities, status bar styling, home screen optimization

**Add your own guidelines here**
<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->
