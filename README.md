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
│   ├── SearchBar/
│   ├── ReportCard/
│   ├── ReportList/
│   ├── ui/
│       ├── Alert/
│       ├── Badge/
│       ├── Button/
│       ├── Card/
│       ├── Input/
│       ├── ProgressBar/
│       ├── Skeleton/
│       └── Spinner/
│   └── UploadForm/
├── hooks/
├── services/
├── store/
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

## Core Components

### SearchBar

- **Location**: `src/components/SearchBar/SearchBar.tsx`
- Provides debounced search functionality with visual status feedback
- Integrates with `useSearch` hook for state management

### ReportCard

- **Location**: `src/components/ReportCard/`
- Displays individual diagnostic report as a card with:
  - `ReportCard`: Main card component displaying report with metadata and download button
  - `ReportCardHeader`: Header section with report name and type badge (Vibration/Thermal)
  - `ReportCardMetadata`: Shows report size, type, and date information
  - `Icons`: SVG icons for report actions
- Uses `useReportDownload` hook for download functionality
- Accessible with proper ARIA labels

### ReportList

- **Location**: `src/components/ReportList/`
- Manages report display states with components:
  - `ReportList`: Main container handling loading, empty, and filtered states
  - `ReportListContainer`: Grid container for report cards with filtering support
  - `LoadingState`: Loading skeleton placeholders while fetching reports
  - `EmptyState`: Message shown when no reports are available
  - `EmptySearchState`: Message shown when search returns no results
- Uses `useReportFiltering` hook for search/filter logic
- Handles all report display scenarios gracefully

### UploadForm

- **Location**: `src/components/UploadForm/`
- Complete file upload interface with:
  - `UploadForm`: Main form component orchestrating upload flow
  - `UploadZone`: Drag-and-drop zone with keyboard support
  - `UploadIcon`: SVG icon for upload indicator
  - `UploadContent`: Dynamic upload instructions based on drag state
  - `UploadConstraints`: Displays file size and type requirements
  - `UploadInstructions`: Detailed upload instructions for users
- Features:
  - Drag-and-drop file upload
  - File validation (10MB max, PDF/CSV only)
  - Progress tracking with visual feedback
  - Error handling with user-friendly messages
  - Keyboard accessibility (Space/Enter to select files)
- Uses `useFileUpload` hook for upload logic

### UI Components

- **Button**: Multiple variants (primary, secondary, danger, outline, transparent)
- **Badge**: Styled badges with Vibration and Thermal report types, including `ReportBadge` variant
- **Alert**: Contextual alerts with variants (info, success, warning, danger)
- **Card**: Container component with `CardContent`, `CardHeader`, `CardTitle`, `CardFooter` subcomponents
- **Input**: Form inputs with `SearchInput` variant, error handling, and accessibility features
- **ProgressBar**: Visual progress indicator for uploads with accessibility attributes
- **Skeleton**: Loading placeholders with `SkeletonCard` variant for preview layouts
- **Spinner**: Loading indicator with multiple sizes

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

### useFileUpload

- Manages file upload state and validation
- File validation:
  - Maximum 10MB file size
  - Allowed formats: PDF, CSV
  - MIME type verification
- Drag-and-drop support with keyboard accessibility
- Status messages for upload feedback (info, error, success)
- Returns:
  - `isDragging`: Current drag state
  - `statusMessage`: Upload status feedback
  - `uploadProgress`: Upload progress percentage
  - `isLoading`: Upload in progress state
  - `fileInputRef`: Reference to file input element
  - Handler functions: `handleDragEnter`, `handleDragLeave`, `handleDragOver`, `handleDrop`, `handleFileInputChange`, `handleClick`, `handleKeyDown`

### useReportFiltering

- Filters reports based on search query
- Real-time filtering with memoization for performance
- Returns:
  - `reports`: All available reports
  - `filteredReports`: Search-filtered reports
  - `searchQuery`: Current search query
  - `isLoading`: Loading state
  - `isSearching`: Whether user has entered search text
  - `isInitiallyEmpty`: No reports available initially
  - `isSearchWithNoResults`: Search query with no matching results

### useReportDownload

- Handles report download functionality
- Integrates with report data structure
- Returns:
  - `handleDownload(report)`: Function to download specific report

### useAppInitialization

- Application initialization logic
- Fetches initial report data on mount
- Handles loading and error states during startup

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

### Core Data Types

**Report**

```typescript
interface Report {
  id: number;
  name: string;
  size: string;
  type: ReportType; // 'Vibration' | 'Thermal'
  date: string;
}
```

**ReportState** (Zustand store)

```typescript
interface ReportState {
  reports: Report[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  uploadProgress: number;

  fetchReports: () => Promise<void>;
  uploadReport: (file: File) => Promise<void>;
  setSearchQuery: (query: string) => void;
  clearError: () => void;
}
```

### Component Props Types

**ReportCardProps**

- `report: Report` - The report to display

**SearchBarProps**

- `placeholder?: string` - Optional input placeholder
- `onSearch: (query: string) => void` - Search callback

**SearchStatusProps**

- `searchQuery: string` - Current search query for announcements

**ReportListContainerProps**

- `reports: Report[]` - Array of reports to display
- `searchQuery: string` - Current search query

**EmptySearchStateProps**

- `searchQuery: string` - The search query that yielded no results

**UploadZoneProps**

- `isDragging: boolean` - Drag state
- `isLoading: boolean` - Upload in progress
- `onDragEnter: (e: DragEvent<HTMLDivElement>) => void` - Drag enter handler
- `onDragLeave: (e: DragEvent<HTMLDivElement>) => void` - Drag leave handler
- `onDragOver: (e: DragEvent<HTMLDivElement>) => void` - Drag over handler
- `onDrop: (e: DragEvent<HTMLDivElement>) => void` - Drop handler
- `onClick: () => void` - Click to select file
- `onKeyDown: (e: React.KeyboardEvent) => void` - Keyboard handler
- `children: ReactNode` - Content inside upload zone

**UploadContentProps**

- `isDragging: boolean` - Current drag state for conditional messaging

**ErrorSectionProps**

- `error: string | null` - Error message to display
- `onDismiss: () => void` - Error dismissal callback

**MainContentProps**

- `error: string | null` - Current error state
- `onDismissError: () => void` - Error dismissal callback
- `onSearch: (query: string) => void` - Search callback

**SearchSectionProps**

- `onSearch: (query: string) => void` - Search callback

### UI Component Props

See individual component files in `src/components/ui/` for detailed props documentation. Components support standard HTML attributes plus custom variants, sizes, and styling options.

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

## UI Components Reference

### Alert

- **File**: `src/components/ui/Alert/`
- Contextual alerts with variants: `info`, `success`, `warning`, `danger`
- Features: Icons, dismissible option, role="alert" for error announcements
- Test coverage: `Alert.test.tsx`

### Badge

- **File**: `src/components/ui/Badge/`
- Components:
  - `Badge`: Generic badge component
  - `ReportBadge`: Specialized badge for report types (Vibration/Thermal)
- Styled with type-specific colors
- Test coverage: `Badge.test.tsx`, `ReportBadge.test.tsx`

### Button

- **File**: `src/components/ui/Button/`
- Variants: `primary`, `secondary`, `danger`, `outline`, `transparent`
- Sizes: `sm`, `md`, `lg`
- Props: `variant`, `size`, `fullWidth`, `disabled`, standard button attributes
- Accessible with proper focus states and ARIA support
- Test coverage: `Button.test.tsx`

### Card

- **File**: `src/components/ui/Card/`
- Components:
  - `Card`: Main container with shadow and border
  - `CardHeader`: Header section
  - `CardTitle`: Title text component
  - `CardContent`: Main content area
  - `CardFooter`: Footer section
- Flexible layout system for card-based UIs
- Test coverage: Individual test files for each subcomponent

### Input

- **File**: `src/components/ui/Input/`
- Components:
  - `Input`: Base input component with error handling
  - `SearchInput`: Specialized input for search functionality
- Features:
  - Error state styling
  - Accessibility attributes
  - Placeholder support
  - Type variants (text, password, email, etc.)
- Test coverage: `Input.test.tsx`, `SearchInput.test.tsx`

### ProgressBar

- **File**: `src/components/ui/ProgressBar/`
- Visual progress indicator for uploads
- Features:
  - Percentage-based progress
  - Accessible attributes (aria-valuenow, aria-valuemin, aria-valuemax)
  - Smooth animation
  - Label support
- Test coverage: `ProgressBar.test.tsx`

### Skeleton

- **File**: `src/components/ui/Skeleton/`
- Components:
  - `Skeleton`: Generic loading placeholder
  - `SkeletonCard`: Pre-built skeleton for report card loading state
- Features:
  - Animated shimmer effect
  - Responsive sizing
  - Used in `LoadingState` component
- Test coverage: `Skeleton.test.tsx`, `SkeletonCard.test.tsx`

### Spinner

- **File**: `src/components/ui/Spinner/`
- Loading indicator with multiple sizes
- Features:
  - Size variants
  - Centered layout
  - Used for upload/fetch loading states
- Test coverage: `Spinner.test.tsx`

## File Organization

The UI components follow a consistent structure:

- Component file (`Component.tsx`)
- Test file (`Component.test.tsx`)
- Index file (`index.ts`) for clean exports in select folders

All components support standard HTML attributes and maintain accessibility best practices.

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
