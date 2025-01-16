
# @devlander/ui

**`@devlander/ui`** is a comprehensive UI package that provides reliable, customizable, and cross-platform components. Designed to streamline development, it helps you kickstart projects with consistent and reusable elements that work seamlessly across iOS, Android, React Native Web, React Native TV, Next.js, Xbox, and more.

---

## 🚀 Why Use @devlander/ui?

- **Functionality First**: Reliable, prebuilt components designed to handle core functionality out of the box.
- **Cross-Platform Compatibility**: Works seamlessly across multiple platforms, including mobile, web, and TV.
- **Cohesion Across Projects**: Ensures consistency in UI/UX and functionality across different projects.
- **Customizable Styling**: Fully customizable to match any design system or branding.

This package was born out of the need to avoid repetitive coding of similar components—like form inputs or password fields with toggle functionality—by providing tested, reusable building blocks.

---

## 📦 Installation

Install the package via npm or yarn:

### Using npm:
```bash
npm install @devlander/ui
```

### Using yarn:
```bash
yarn add @devlander/ui
```

---

## 📚 Components

### **Atoms**
- **Inputs**: `Button`, `Checkbox`, `Input`
- **Feedback**: `Spinner`, `Alert`
- **Display**: `Icon`, `Badge`
- **Controls**: `Slider`, `Switch`

### **Molecules**
- `Dropdown`, `AvatarGroup`, `MenuItem`, `Tooltip`, `Divider`

### **Organisms**
- `Carousel` (with subcomponents: `Slide`, `Dot`, `PaginationStatus`)
- `Card`, `Accordion`, `Navbar`, `Form`, `Table`

### **Templates**
- `Breadcrumbs`, `Stepper`

All components are highly customizable to suit your specific needs.

---

## 🎨 Theming

**`@devlander/ui`** includes pre-configured themes:
- **Default Theme**: A clean, modern style.
- **Dark Theme**: Optimized for low-light environments.

Themes can be extended or replaced. Example:

```tsx
import { ThemeProvider, createTheme } from '@devlander/ui';

const customTheme = createTheme({
  palette: {
    primary: '#007BFF',
    secondary: '#6C757D',
  },
});

const App = () => (
  <ThemeProvider theme={customTheme}>
    <YourComponent />
  </ThemeProvider>
);
```

---

## 🛠️ Usage

Here’s how to get started with **`@devlander/ui`**:

### Example: Button and Input Components
```tsx
import React from 'react';
import { Button, Input } from '@devlander/ui';

const App = () => (
  <div>
    <Input
      placeholder="Enter your password"
      type="password"
      onChange={(e) => console.log(e.target.value)}
    />
    <Button onClick={() => alert('Button clicked!')}>Submit</Button>
  </div>
);

export default App;
```

---

## 👨‍💻 Contributing

Contributions are welcome! If you’d like to improve this package, feel free to fork the repository and submit a pull request. Please ensure all tests pass before submitting.

---

## 📞 Support

For issues or feature requests, please open an [issue](https://github.com/Devlander-Software/ui/issues) or contact us directly.

---

Start building today by installing **`@devlander/ui`**:

```bash
npm install @devlander/ui
```

