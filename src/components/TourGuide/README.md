# SnipSavvy Tour Guide

An interactive tour guide system for new users of SnipSavvy, built with React Joyride.

## Features

- **Interactive Tour**: Step-by-step guide through the main features
- **First-time User Detection**: Automatically detects new users
- **Persistent State**: Remembers if user has seen the tour
- **Restart Functionality**: Users can restart the tour from settings
- **Responsive Design**: Works on all screen sizes
- **Custom Styling**: Matches SnipSavvy's dark theme

## Tour Steps

1. **Workspace Creation** - Guide users to create their first workspace
2. **Collection Creation** - Show how to organize snippets with collections
3. **Snippet Creation** - Demonstrate adding code snippets
4. **Snippet Actions** - Explain snippet management features
5. **Workspace Management** - Show workspace-level actions
6. **Settings & Access** - Introduce access management features
7. **Completion** - Congratulate and provide next steps

## Components

### TourGuide.tsx
Main tour component that handles the interactive tour experience.

**Props:**
- `isFirstTimeUser`: Boolean indicating if user is new
- `onTourComplete`: Callback when tour finishes
- `currentStep`: Optional current step number
- `onStepChange`: Optional callback for step changes

### useFirstTimeUser.ts
Custom hook that detects if a user is new by checking if they have any workspaces.

**Returns:**
- `isFirstTimeUser`: Boolean indicating if user is new
- `isLoading`: Boolean indicating if the check is in progress

### TourDemo.tsx
Demo component for testing the tour functionality.

## CSS Classes

The tour targets specific CSS classes on elements:

- `.tour-workspace-creation` - Workspace creation button
- `.tour-collection-creation` - Collection creation button
- `.tour-snippet-creation` - Snippet creation button
- `.tour-snippet-actions` - Snippet cards/actions
- `.tour-workspace-actions` - Workspace items
- `.tour-settings` - Settings button

## Usage

### Basic Implementation

```tsx
import { TourGuide, useFirstTimeUser } from '@/components/TourGuide';

function MyComponent() {
  const { isFirstTimeUser, isLoading } = useFirstTimeUser();

  const handleTourComplete = () => {
    console.log('Tour completed!');
  };

  return (
    <div>
      {/* Your app content */}
      
      {!isLoading && (
        <TourGuide 
          isFirstTimeUser={isFirstTimeUser} 
          onTourComplete={handleTourComplete}
        />
      )}
    </div>
  );
}
```

### Adding Tour Classes

Add the appropriate CSS classes to your components:

```tsx
// Workspace creation button
<button className="tour-workspace-creation">
  Create Workspace
</button>

// Collection creation button
<button className="tour-collection-creation">
  Create Collection
</button>

// Snippet creation button
<button className="tour-snippet-creation">
  Create Snippet
</button>
```

### Restarting the Tour

Users can restart the tour from the settings modal:

```tsx
const handleRestartTour = () => {
  localStorage.removeItem('hasSeenTour');
  window.location.reload();
};
```

## Customization

### Styling

The tour uses custom styles that match SnipSavvy's dark theme. You can customize the styles in the `styles` object in `TourGuide.tsx`.

### Steps

Modify the steps array in `TourGuide.tsx` to add, remove, or change tour steps.

### Localization

The tour supports localization through the `locale` prop. You can customize button text and messages.

## Testing

Visit `/tour-demo` to test the tour functionality in isolation.

## Dependencies

- `react-joyride`: Main tour library
- `next-auth`: For user session management
- `axios`: For API calls to check user status

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Accessibility

The tour is built with accessibility in mind:
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support
- Skip functionality for users who don't want the tour

## Future Enhancements

- [ ] Conditional steps based on user actions
- [ ] Video tutorials integration
- [ ] Multi-language support
- [ ] Analytics tracking
- [ ] Custom tour paths for different user types 