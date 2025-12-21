# Diagnostic Report Manager

A modern React application for managing and searching diagnostic reports (Vibration and Thermal analysis). Built with TypeScript, Tailwind CSS, and Zustand for state management.

## Features

- **Report Management**: Upload, view, and organize diagnostic reports
- **Advanced Search**: Debounced search functionality with real-time filtering
- **Progress Tracking**: Visual progress bar for file uploads
- **Accessibility**: Full ARIA compliance and screen reader support
- **Modern UI**: Component-based design with Tailwind CSS styling
- **Comprehensive Testing**: Unit tests with Vitest and React Testing Library

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── MainContent.tsx
│   ├── SearchBar/
│   │   ├── SearchBar.tsx
│   │   ├── SearchStatus.tsx
│   │   └── SearchStatus.test.tsx
│   └── ui/
│       ├── Input/
│       │   ├── Input.tsx
│       │   └── SearchInput.tsx
│       ├── Button/
│       │   └── Button.tsx
│       ├── Badge/
│       │   ├── Badge.tsx
│       │   └── ReportBadge.tsx
│       ├── Alert/
│       │   └── Alert.tsx
│       ├── Skeleton/
│       │   ├── Skeleton.tsx
│       │   └── SkeletonCard.tsx
│       ├── Spinner/
│       │   └── Spinner.tsx
│       └── ProgressBar/
│           └── ProgressBar.tsx
├── hooks/
│   ├── useSearch.tsx
│   ├── useSearch.test.tsx
│   └── useAppInitialization.ts
├── services/
│   └── mockService.ts
├── store/
│   └── reportStore.ts
├── types/
│   └── index.ts
├── utils/
│   ├── utilityFunctions.ts
│   └── utilityFunctions.test.ts
├── App.tsx
└── main.tsx
```

## Core Components

### SearchBar

- **Location**: `src/components/SearchBar/SearchBar.tsx`
- Provides debounced search functionality with visual status feedback
- Integrates with `useSearch` hook for state management

### UI Components

- **Button**: Multiple variants (primary, secondary, danger, outline, transparent)
- **Badge**: Styled badges with Vibration and Thermal report types
- **Alert**: Contextual alerts with variants (info, success, warning, danger)
- **ProgressBar**: Visual progress indicator for uploads
- **Skeleton**: Loading placeholders for content
- **Spinner**: Loading indicator with multiple sizes
- **Input**: Form inputs with error handling and accessibility features

### SearchStatus

- Screen reader-only status component
- Announces active search queries to assistive technologies
- Uses `aria-live="polite"` for non-intrusive updates

## Hooks

### useSearch

```typescript
const { value, onValueChange, onClear } = useSearch({ onSearch: callback });
```

- Manages search input state
- Implements debouncing (300ms delay)
- Stable callback references for performance
- Cleanup on unmount

## State Management

### reportStore (Zustand)

```typescript
const { reports, searchQuery, isLoading, error, uploadProgress } = useReportStore();
```

**Actions**:

- `fetchReports()`: Load all reports
- `uploadReport(file)`: Upload new report with progress tracking
- `setSearchQuery(query)`: Update search query
- `clearError()`: Clear error messages

## Services

### mockService

Provides simulated API calls:

- `getReports()`: Returns list of diagnostic reports
- `uploadReport(file)`: Simulates file upload (2s delay, 10% failure rate)

## Utilities

### combineClasses

Merges CSS class names, filtering out falsy values:

```typescript
combineClasses('btn', isActive && 'active', false); // 'btn active'
```

### delay

Utility for async delays:

```typescript
await delay(500); // Wait 500ms
```

## Types

Key types used throughout the application:

- `Report`: Diagnostic report with id, name, size, type (Vibration/Thermal), date
- `SearchBarProps`: Props for SearchBar component
- `ButtonProps`: Props for Button component with variants and sizes
- `AlertProps`: Props for Alert component
- `InputProps`: Props for Input component

## Testing

The project includes comprehensive test suites:

- **useSearch.test.tsx**: Tests for debouncing, value changes, clearing, and cleanup
- **SearchStatus.test.tsx**: Tests for accessibility and dynamic updates
- **utilityFunctions.test.ts**: Tests for utility functions

Run tests with:

```bash
npm run test
```

## Accessibility Features

- Full keyboard navigation support
- ARIA labels and roles on all interactive elements
- Screen reader announcements for status changes
- Focus visible indicators
- Error announcements with `role="alert"`
- Progress bar with accessible attributes
- Semantic HTML structure

## Styling

Built with **Tailwind CSS** with custom color palette:

- Primary: Rose Red (`bg-rose-red`)
- Secondary: Slate Blue (`bg-slate-blue`)
- Report Types:
  - Vibration: Purple (`bg-purple-100`)
  - Thermal: Orange (`bg-orange-100`)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Testing

```bash
npm run test
npm run test:ui
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Dependencies

- **React 18+**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Zustand**: State management
- **Vitest**: Testing framework
- **React Testing Library**: Component testing utilities
