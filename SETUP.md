# 📖 Detailed Setup Guide

## Step-by-Step Installation

### 1. Create a New Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click the **+ Create** button
3. Select **Blank spreadsheet**
4. Name it "My Study App" or any name you prefer
5. You should now have a blank spreadsheet

### 2. Access the Apps Script Editor

1. In your Google Sheet, click on **Extensions** (top menu)
2. Click on **Apps Script**
3. A new tab will open with the Apps Script editor
4. You should see a file named "Code.gs" on the left sidebar

### 3. Add the Script Code

1. Copy all the code from the `Code.gs` file in this repository
2. In the Apps Script editor, select all the code in the default `Code.gs` file (Ctrl+A or Cmd+A)
3. Delete the selected code
4. Paste the copied code into the editor
5. Your editor should now contain the full study app code

### 4. Save the Script

1. Press **Ctrl+S** (Windows) or **Cmd+S** (Mac)
2. You may see a dialog asking to save the project
3. Give it a name like "Study App Script" and click **OK**
4. The script is now saved

### 5. Initialize the App

1. Go back to your Google Sheet tab (you may need to refresh the page)
2. Wait a few seconds for the page to load completely
3. You should see a new menu called **📚 Study App** in the top menu bar
4. Click on **📚 Study App**
5. Select **🔄 Initialize App**
6. A dialog will appear asking if you want to initialize the app
7. Click **OK** to confirm
8. The app will create all necessary sheets and set them up automatically

### 6. Verify Installation

You should now see these sheets at the bottom of your spreadsheet:
- Dashboard
- Study Log
- Goals
- Subjects
- Settings

If you see all five sheets, congratulations! Your app is ready to use.

## Troubleshooting Setup Issues

### Issue: The menu "📚 Study App" is not appearing

**Solution:**
1. Refresh your browser (F5)
2. Close the Google Sheet and reopen it
3. Make sure the Apps Script is saved (check for the checkmark in the editor)
4. Wait 30 seconds and try again

### Issue: Error when running "Initialize App"

**Solution:**
1. Check that the script was copied correctly
2. Make sure you're in the Google Sheet (not the Apps Script editor)
3. Try refreshing the page and initializing again
4. Check the Apps Script logs: Extensions → Apps Script → View > Logs

### Issue: Sheets are not being created

**Solution:**
1. Make sure you have edit permissions on the spreadsheet
2. Try creating a new Google Sheet and repeating the process
3. Check your Google Drive storage isn't full

### Issue: Dialog boxes are not opening when I click menu items

**Solution:**
1. Check your browser console for errors (F12 → Console)
2. Try a different browser
3. Clear your browser cache
4. Disable browser extensions that might interfere with Google Sheets

## First Time Using the App

1. **Initialize Settings**
   - Click **📚 Study App** → **Settings** (if available)
   - Update your school name and daily study goal

2. **Add Your Subjects**
   - Click **📚 Study App** → **📖 Manage Subjects**
   - Edit the "Subjects" sheet
   - Replace the example subjects with your actual subjects
   - Add your teachers, grades, and exam dates

3. **Set Your First Goal**
   - Click **📚 Study App** → **🎯 Set Study Goals**
   - Create a goal for your first subject
   - Click "✅ Set Goal"

4. **Log Your First Study Session**
   - Click **📚 Study App** → **📝 Log Study Session**
   - Fill in the details of a recent study session
   - Click "✅ Log Session"

5. **View Your Dashboard**
   - Click **📚 Study App** → **📊 Open Dashboard**
   - You should see your stats updating

## Next Steps

- Read the main [README.md](README.md) for detailed feature information
- Start logging your study sessions regularly
- Review the progress report weekly
- Adjust your goals as needed
- Customize the settings to match your preferences

Enjoy your new study tracker! 📚✨