# Tage - Family & Friends Age Tracker

A modern, responsive web application built with Astro and TypeScript that helps you keep track of your family members' and friends' ages and birthdays. Perfect for finding age-appropriate gifts and never missing important birthdays!

## ✨ Features

- **Smart Age Display**: Shows ages in the most appropriate format:
  - Years with decimals for people over 1 year
  - Months for babies under 1 year
  - Weeks for newborns under 1 month
  - Days for very young babies under 1 week

- **Birthday Tracking**: 
  - See how many days until each person's birthday
  - Special indicators for today's birthdays and tomorrow's
  - Clean, focused view of all your people

- **Group Management**: 
  - Organize people into custom groups (Family, Friends, Work, Kids, etc.)
  - Assign colors to groups for visual organization
  - Easy group creation and management
  - Delete groups when no longer needed

- **Person Management**:
  - Add people with name, birth date, and group assignment
  - Delete people with confirmation dialog
  - Easy-to-use delete buttons on each person card

- **Modern Design**: 
  - Beautiful, responsive interface that works on all devices
  - Mobile-first design optimized for smartphones
  - Clean, intuitive user experience

- **Flexible Sorting**: 
  - Sort by upcoming birthdays (default)
  - Sort by age (oldest first or youngest first)
  - Sort alphabetically (A-Z or Z-A)
  - Sort by group with secondary name sorting
  - Emoji icons for easy identification on mobile

- **Local Storage**: 
  - All data stored locally in your browser
  - No server required - works offline
  - Privacy-focused - your data stays on your device

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tage
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:4321`

## 🏗️ Built With

- **[Astro](https://astro.build/)** - Modern static site generator
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **Local Storage API** - Browser-based data persistence

## 📱 Mobile Responsive

The app is fully responsive and optimized for mobile devices:
- Touch-friendly interface
- Responsive grid layouts
- Mobile-optimized modals and forms
- Readable typography on small screens

## 🎯 Usage

### Adding People

1. Click the "Add Person" button in the header
2. Fill in the person's name, birth date, and select a group
3. Click "Add Person" to save

### Managing People

- **Delete Person**: Click the trash icon on any person card to delete them (with confirmation)
- **Sort People**: Use the sort dropdown to organize the list by:
  - 🎂 Upcoming Birthdays (default)
  - 👴 Oldest First
  - 👶 Youngest First  
  - 🔤 Alphabetical (A-Z or Z-A)
  - 👥 By Group

### Managing Groups

1. Click the "Groups" button in the header
2. Add new groups by entering a name and selecting a color
3. Existing groups can be deleted (people in deleted groups will need to be reassigned)

### Viewing Ages

- The main view shows all people with your preferred sorting
- Each card displays:
  - Person's name and group
  - Current age in the most appropriate format
  - Days until their next birthday
  - Birth date
  - Delete button for easy management

## 🎨 Customization

The app uses Tailwind CSS for styling, making it easy to customize:
- Modify colors in `src/utils/mockData.ts` for default group colors
- Adjust the responsive breakpoints in Tailwind classes
- Customize the age calculation logic in `src/utils/ageCalculator.ts`

## 📊 Data Structure

The app uses TypeScript interfaces for type safety:

```typescript
interface Person {
  id: string;
  name: string;
  birthDate: string; // ISO date string
  groupId: string;
}

interface Group {
  id: string;
  name: string;
  color: string; // Hex color code
}
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Project Structure

```
src/
├── components/          # Reusable Astro components
├── layouts/            # Page layouts
├── pages/              # Routes (Astro pages)
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles
```

## 🚀 Deployment

The app can be deployed to any static hosting service:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` folder to your hosting service

Popular options:
- [Netlify](https://netlify.com)
- [Vercel](https://vercel.com)
- [GitHub Pages](https://pages.github.com)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎁 Perfect For

- Parents tracking their children's development
- Grandparents staying connected with grandchildren
- Gift shopping (finding age-appropriate presents)
- Birthday planning and reminders
- Family reunion planning
- Childcare providers tracking multiple children

---

Built with ❤️ using modern web technologies