# 📚 Study App for Google Sheets

A comprehensive study tracker built with Google Apps Script that helps high school students organize their study sessions, set goals, and monitor their progress.

## ✨ Features

### 📝 Study Session Logging
- Log study sessions with subject, date, time, and topic
- Add notes about what you studied and challenges faced
- Rate difficulty level (Easy, Medium, Hard)
- Color-coded entries based on difficulty

### 🎯 Goal Setting & Tracking
- Create study goals for each subject
- Set target study time and deadlines
- Prioritize goals (Low, Medium, High)
- Track progress toward your goals

### 📖 Subject Management
- Maintain a list of all your subjects
- Track grades, teachers, and exam dates
- Add notes for each subject
- Color code subjects for easy identification

### 📊 Dashboard & Reports
- View daily study summary
- Generate progress reports
- Track study time by subject
- Monitor total study sessions

### ⚙️ Customizable Settings
- Set daily and weekly study goals
- Configure school name and timezone
- Manage notification preferences
- Personalize your experience

## 🚀 Getting Started

### Prerequisites
- Google Account
- Google Drive access
- Google Sheets

### Installation

1. **Create a new Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Click "Create a new spreadsheet"
   - Name it "Study App"

2. **Add the Script**
   - Click **Extensions** → **Apps Script**
   - Copy the contents of `Code.gs` from this repository
   - Paste it into the Apps Script editor
   - Save the project (Ctrl+S or Cmd+S)

3. **Initialize the App**
   - Go back to your Google Sheet
   - Refresh the page (F5)
   - Click the **📚 Study App** menu
   - Select **🔄 Initialize App**
   - The app will create all necessary sheets and format them

## 📋 How to Use

### Logging Study Sessions

1. Click **📚 Study App** → **📝 Log Study Session**
2. Fill in the details:
   - **Subject**: Select from the dropdown
   - **Date**: Pick the date you studied
   - **Study Time**: Enter minutes spent studying
   - **Topic**: What did you study? (e.g., "Quadratic Equations")
   - **Notes**: Any observations or challenges
   - **Difficulty**: Rate how hard it was
3. Click **✅ Log Session**

### Setting Study Goals

1. Click **📚 Study App** → **🎯 Set Study Goals**
2. Enter your goal details:
   - **Goal Description**: What do you want to achieve?
   - **Subject**: Which subject is this for?
   - **Target Study Time**: How many minutes?
   - **Deadline**: When do you want to achieve it?
   - **Priority**: How important is this goal?
3. Click **✅ Set Goal**

### Managing Subjects

1. Click **📚 Study App** → **📖 Manage Subjects**
2. Edit the "Subjects" sheet:
   - Add your subjects
   - Enter grades, teacher names, exam dates
   - Add notes specific to each subject
   - Use color codes for visual organization

### Viewing Your Progress

1. Click **📚 Study App** → **📊 Open Dashboard**
   - See today's study summary
   - View total study time
   - Track number of sessions

2. Click **📚 Study App** → **📈 View Progress Report**
   - Get a detailed breakdown of study time by subject
   - See which subjects you're focusing on most
   - Visual progress bars

## 📊 Sheets Overview

### Dashboard Sheet
- Quick view of your study statistics
- Total study time across all subjects
- Session count
- Subject count

### Study Log Sheet
- Complete record of all study sessions
- Chronologically organized
- Color-coded by difficulty level
- Sortable and filterable data

### Goals Sheet
- All your study goals in one place
- Priority indicators
- Deadline tracking
- Progress percentage
- Color-coded by priority level

### Subjects Sheet
- Master list of all your subjects
- Teacher information
- Exam dates
- Subject-specific notes
- Grade tracking

### Settings Sheet
- Customize daily and weekly study goals
- School name and timezone
- Notification settings
- Personal preferences

## 💡 Tips for Success

1. **Log Consistently**: Record each study session as soon as you finish
2. **Set Realistic Goals**: Break large study tasks into smaller, achievable goals
3. **Review Progress**: Check your dashboard regularly to stay motivated
4. **Color Code Subjects**: Use the color code feature to organize subjects visually
5. **Add Notes**: Write detailed notes about what you learned and challenges faced
6. **Adjust Goals**: Modify goals as your priorities change

## 🎯 Best Practices

- **Daily Log**: Spend 2-3 minutes logging each study session
- **Weekly Review**: Check your progress report every Sunday
- **Goal Setting**: Set 2-3 goals per subject per month
- **Priority Management**: Focus on high-priority tasks first
- **Time Tracking**: Be honest about study time for accurate data

## 📱 Features to Add (Future Enhancements)

- [ ] Email notifications before deadlines
- [ ] Study streak tracking
- [ ] Subject-specific templates
- [ ] Spaced repetition reminders
- [ ] Export reports to PDF
- [ ] Weekly study schedule
- [ ] Integration with Google Calendar
- [ ] AI-powered study recommendations

## 🐛 Troubleshooting

### "Cannot call SpreadsheetApp.getUi() from this context"
- This error occurs if you're not running functions from the Google Sheet interface
- Always trigger functions through the menu or dialogs
- Don't run functions directly from Apps Script editor

### Formulas not working
- Make sure all sheets are named exactly as shown in SHEET_NAMES
- Check that sheet names have no typos
- Refresh the page if formulas show errors

### Menu not appearing
- Refresh your browser
- Check that the script is saved
- Close and reopen the spreadsheet

### Data not saving
- Ensure you have edit permissions on the sheet
- Check your internet connection
- Try logging out and back into Google

## 📝 License

This project is open source and available for educational purposes.

## 👥 Contributing

Feel free to fork this project, make improvements, and share enhancements with the community!

## 📧 Support

For issues, questions, or suggestions:
1. Check the Troubleshooting section
2. Review the GitHub issues
3. Create a new issue with details

## 🌟 Credits

Created for high school students to help them organize and track their study efforts more effectively.

---

**Happy Studying! 📚✨**