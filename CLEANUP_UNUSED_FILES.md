# Files to Remove (Unused Components)

The following files can be safely removed as they are not imported or used:

## Duplicate/Unused Components:
- `/components/ChristmasPageNew.tsx` - Duplicate of ChristmasPage.tsx, not imported in App.tsx
- `/components/EmotionPage.tsx` - Replaced by EmotionPageCompact.tsx

## Potentially Unused Components (need to check usage):
- `/components/AnimatedBenefits.tsx` - Check if used in any components
- `/components/AppGrid.tsx` - Check if used in any components  
- `/components/ChristmasSizzleReel.tsx` - Check if used in any components
- `/components/LaptopShowcase.tsx` - Check if used in any components
- `/components/PhoneMockup.tsx` - Check if used in any components
- `/components/SideMenu.tsx` - Check if used in any components

## Files to Keep:
All other components are actively used in the routing system.

Note: Before removing, should grep through all files to ensure they're not imported anywhere.