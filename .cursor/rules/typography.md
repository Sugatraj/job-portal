# Typography & Font Size Rules for Job Portal

## 🎯 **Primary Objective**
Maintain consistent and balanced typography throughout the application to ensure professional appearance and optimal readability.

## 📏 **Font Size Standards**

### **Heading Hierarchy**
```css
/* Page Title - Main heading */
.text-3xl font-bold tracking-tight
/* Use for: "Candidates", "Dashboard", "Jobs" */

/* Section Title - Sub-heading */
.text-2xl font-semibold tracking-tight
/* Use for: "Recent Activity", "Quick Actions" */

/* Card Title - Component heading */
.text-xl font-semibold
/* Use for: "User Profile", "Settings" */

/* Subsection Title */
.text-lg font-medium
/* Use for: "Personal Information", "Preferences" */
```

### **Body Text Standards**
```css
/* Primary Body Text */
.text-base font-normal
/* Use for: Paragraphs, descriptions, main content */

/* Secondary Body Text */
.text-sm font-normal
/* Use for: Table data, form labels, metadata */

/* Tertiary Text */
.text-sm text-muted-foreground
/* Use for: Timestamps, status text, breadcrumbs */

/* Small Text */
.text-xs font-normal
/* Use for: Badges, tooltips, footnotes */
```

### **UI Elements**
```css
/* Buttons */
.text-sm font-medium
/* Use for: "Create", "Edit", "Delete" */

/* Links */
.text-sm font-medium hover:text-foreground
/* Use for: Navigation, breadcrumbs */

/* Form Elements */
.text-sm font-medium  /* Labels */
.text-sm             /* Inputs */
/* Use for: Forms, search fields */

/* Tables */
.text-sm font-medium  /* Headers */
.text-sm             /* Data */
.text-xs font-medium /* Badges */
```

## 🔧 **Implementation Rules**

### **1. Always Use Consistent Sizing**
- ✅ **DO**: Use `text-sm` for most UI elements
- ❌ **DON'T**: Mix different sizes for similar elements
- ✅ **DO**: Use `text-2xl` for page titles (not `text-3xl`)

### **2. Maintain Visual Hierarchy**
- ✅ **DO**: Use larger text for more important information
- ✅ **DO**: Use smaller text for supporting content
- ❌ **DON'T**: Use the same size for different hierarchy levels

### **3. Table Typography**
- ✅ **DO**: Use `text-sm font-medium` for table headers
- ✅ **DO**: Use `text-sm` for table data
- ✅ **DO**: Use `text-xs font-medium` for status badges

### **4. Button & Interactive Elements**
- ✅ **DO**: Use `text-sm font-medium` for button text
- ✅ **DO**: Use `text-sm` for form inputs
- ❌ **DON'T**: Use `text-base` or larger for buttons

## 📋 **Quick Reference**

| Element Type | Font Size | Font Weight | Use Case |
|--------------|-----------|-------------|----------|
| Page Title | `text-2xl` | `font-bold` | Main page headings |
| Section Title | `text-xl` | `font-semibold` | Component headings |
| Table Headers | `text-sm` | `font-medium` | Column titles |
| Table Data | `text-sm` | `font-normal` | Cell content |
| Buttons | `text-sm` | `font-medium` | Action buttons |
| Status Badges | `text-xs` | `font-medium` | Status indicators |
| Breadcrumbs | `text-sm` | `font-normal` | Navigation |
| Form Labels | `text-sm` | `font-medium` | Input labels |

## 🚫 **Common Mistakes to Avoid**

1. **Inconsistent Sizing**: Using different sizes for similar elements
2. **Over-sized Titles**: Using `text-3xl` or larger for page titles
3. **Mixed Weights**: Inconsistent font weights within the same component
4. **Ignoring Hierarchy**: Using the same size for different importance levels

## ✅ **Code Examples**

### **Correct Implementation**
```tsx
// Page Title
<h1 className="text-2xl font-bold tracking-tight">Candidates</h1>

// Table Header
<th className="px-4 py-3 text-left text-sm font-medium">Name</th>

// Table Data
<td className="px-4 py-3 text-sm">{candidate.fullName}</td>

// Status Badge
<span className="px-2 py-1 text-xs font-medium rounded-full">pending</span>

// Button
<Button className="text-sm font-medium">Create</Button>
```

### **Incorrect Implementation**
```tsx
// ❌ Too large for page title
<h1 className="text-3xl font-bold">Candidates</h1>

// ❌ Inconsistent with other table data
<td className="px-4 py-3 text-base">{candidate.fullName}</td>

// ❌ Wrong size for badges
<span className="px-2 py-1 text-sm font-medium">pending</span>
```

## 🎨 **Design Principles**

1. **Consistency**: Same elements should have the same typography
2. **Hierarchy**: Visual importance should match text size
3. **Readability**: Ensure text is easily readable at all sizes
4. **Professional**: Maintain a polished, business-appropriate appearance
5. **Accessibility**: Consider contrast and sizing for all users

## 📝 **Review Checklist**

Before committing code, ensure:
- [ ] All similar elements use consistent font sizes
- [ ] Page titles use `text-2xl` (not larger)
- [ ] Table elements use `text-sm` consistently
- [ ] Buttons use `text-sm font-medium`
- [ ] Status badges use `text-xs font-medium`
- [ ] No mixed font weights within components
- [ ] Typography hierarchy is logical and clear
