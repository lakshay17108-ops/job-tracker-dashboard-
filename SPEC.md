# Job Application Tracker - Specification Document

## 1. Project Overview

**Project Name:** Job Application Tracker  
**Type:** Single Page Application (SPA)  
**Core Functionality:** A minimalist job application tracking platform with CRUD operations, multi-step forms, and advanced filtering capabilities.  
**Target Users:** Job seekers managing multiple job applications

---

## 2. UI/UX Specification

### Layout Structure

**Pages:**
- `/dashboard` - Main view with job list, search, filter, and sort
- `/add-job` - Multi-step wizard form for adding new applications

**Layout:**
- Header: Fixed top navigation with logo and navigation links
- Main Content: Centered container (max-width: 1024px)
- Footer: Minimal footer with copyright

**Responsive Breakpoints:**
- Mobile: < 640px (single column)
- Tablet: 640px - 1024px (two columns)
- Desktop: > 1024px (three columns for cards)

### Visual Design

**Color Palette:**
- Background: `#FAFAF9` (Stone-50)
- Card Background: `#FFFFFF` (White)
- Text Primary: `#18181B` (Zinc-900)
- Text Secondary: `#52525B` (Zinc-600)
- Accent Primary: `#4F46E5` (Indigo-600)
- Accent Hover: `#4338CA` (Indigo-700)
- Border: `#E4E4E7` (Zinc-200)
- Success: `#22C55E` (Green-500)
- Warning: `#F59E0B` (Amber-500)
- Error: `#EF4444` (Red-500)

**Typography:**
- Headings: `Playfair Display` (Serif) - Google Fonts
- Body: `Inter` (Sans-serif) - Google Fonts
- Font Sizes:
  - H1: 32px / font-weight: 700
  - H2: 24px / font-weight: 600
  - H3: 18px / font-weight: 600
  - Body: 14px / font-weight: 400
  - Small: 12px / font-weight: 400

**Spacing System:**
- Base unit: 4px
- Padding: 16px (cards), 24px (sections)
- Gap: 16px (grid items), 8px (inline elements)
- Border radius: 4px (rounded-sm)

**Visual Effects:**
- Card shadow: `0 1px 3px rgba(0,0,0,0.1)`
- Card hover: `0 4px 6px rgba(0,0,0,0.1)`
- Transitions: 150ms ease-in-out

### Components

**1. Header**
- Logo text: "Job Tracker" in Playfair Display
- Navigation links: Dashboard, Add Job
- Active state: Indigo underline

**2. Job Card**
- Company name (H3)
- Role title (Body)
- Status badge (colored by status)
- Date applied
- Action buttons: Edit, Delete (icon buttons)

**3. Status Badge**
- Applied: Indigo background
- Interviewing: Amber background
- Rejected: Red background
- Offered: Green background

**4. Search Bar**
- Full width input with search icon
- Placeholder: "Search by company or role..."
- Debounced: 400ms delay

**5. Filter Dropdown**
- Options: All, Applied, Interviewing, Rejected, Offered

**6. Sort Dropdown**
- Options: Date (Newest), Date (Oldest), Company (A-Z), Company (Z-A)

**7. Multi-step Form Wizard**
- Step indicator: 3 circles with connecting lines
- Step 1: Basic Info (Company, Role)
- Step 2: Application Details (Status, Date)
- Step 3: Review & Submit
- Navigation: Back, Next, Submit buttons

**8. Empty State**
- Illustration: Briefcase icon
- Text: "No job applications yet"
- CTA: "Add your first job"

---

## 3. Functionality Specification

### Core Features

**1. Job List (Dashboard)**
- Display all jobs in card grid
- Show company, role, status, date
- Pagination or infinite scroll (optional)

**2. Search**
- Real-time search with 400ms debounce
- Search by company name or role
- Clear search button

**3. Filter**
- Filter by status: All, Applied, Interviewing, Rejected, Offered
- Instant filter update

**4. Sort**
- Sort by date (newest/oldest)
- Sort by company name (A-Z/Z-A)

**5. Add Job (Multi-step Form)**
- Step 1: Company name (required), Role (required)
- Step 2: Status (dropdown), Date (date picker)
- Step 3: Review all fields, Submit
- Validation on each step before proceeding

**6. Edit Job**
- Pre-populate form with existing data
- Same multi-step wizard structure

**7. Delete Job**
- Confirmation dialog before delete
- Remove from Redux store

**8. Data Persistence**
- Store in Redux (in-memory)
- Optional: LocalStorage persistence

### User Interactions

- Click card: View details (optional)
- Click Edit: Navigate to edit form
- Click Delete: Show confirmation, then remove
- Click Add Job: Navigate to wizard
- Form submission: Show success message, redirect to dashboard

### Data Model

```typescript
interface Job {
  id: string;
  company: string;
  role: string;
  status: 'Applied' | 'Interviewing' | 'Rejected' | 'Offered';
  date: string; // ISO date string
  createdAt: string;
}
```

### Edge Cases

- Empty job list: Show empty state
- No search results: Show "No results found" message
- Form validation errors: Show inline error messages
- API failure: Show error boundary with retry option

---

## 4. Technical Implementation

### State Management (Redux Toolkit)

**Slice: `jobsSlice`**
- State: `{ jobs: Job[], searchQuery: string, filterStatus: string, sortBy: string }`
- Actions:
  - `addJob(job)`
  - `updateJob(id, updates)`
  - `deleteJob(id)`
  - `setSearchQuery(query)`
  - `setFilterStatus(status)`
  - `setSortBy(sort)`

### Routing (React Router)

- `/dashboard` - Lazy loaded Dashboard component
- `/add-job` - Lazy loaded AddJobWizard component
- `/edit-job/:id` - Lazy loaded EditJobWizard component

### Performance

- React.lazy for route components
- Error Boundary wrapper for each route
- Debounced search (400ms)

### Initial Data

- Load sample jobs from local JSON file
- 5-10 sample job entries

---

## 5. Acceptance Criteria

1. ✅ Dashboard displays job cards in responsive grid
2. ✅ Search filters jobs with 400ms debounce
3. ✅ Filter dropdown filters by status
4. ✅ Sort dropdown sorts by date or company
5. ✅ Multi-step form validates each step
6. ✅ CRUD operations work correctly
7. ✅ Redux state updates properly
8. ✅ Routes lazy load with React.lazy
9. ✅ Error Boundary catches errors
10. ✅ Visual design matches stationery theme
11. ✅ No emojis used - lucide-react icons only
12. ✅ Serif font for headings, sans-serif for body