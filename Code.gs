// Study App for High School Students - Google Apps Script
// This script manages study tracking, goals, and progress

const SHEET_NAMES = {
  SUBJECTS: 'Subjects',
  STUDY_LOG: 'Study Log',
  GOALS: 'Goals',
  DASHBOARD: 'Dashboard',
  SETTINGS: 'Settings'
};

/**
 * Initialize the study app - creates all necessary sheets and sets up the interface
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('📚 Study App')
    .addItem('📊 Open Dashboard', 'openDashboard')
    .addItem('📝 Log Study Session', 'openStudyLogDialog')
    .addItem('🎯 Set Study Goals', 'openGoalsDialog')
    .addItem('📖 Manage Subjects', 'openSubjectsDialog')
    .addItem('⚙️ Settings', 'openSettingsDialog')
    .addItem('📈 View Progress Report', 'generateProgressReport')
    .addSeparator()
    .addItem('🔄 Initialize App', 'initializeApp')
    .addToUi();
}

/**
 * Initialize the study app with default sheets and formatting
 */
function initializeApp() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create all necessary sheets
  createSheetIfNotExists(ss, SHEET_NAMES.DASHBOARD);
  createSheetIfNotExists(ss, SHEET_NAMES.STUDY_LOG);
  createSheetIfNotExists(ss, SHEET_NAMES.GOALS);
  createSheetIfNotExists(ss, SHEET_NAMES.SUBJECTS);
  createSheetIfNotExists(ss, SHEET_NAMES.SETTINGS);
  
  // Set up headers for each sheet
  setupDashboard(ss);
  setupStudyLog(ss);
  setupGoals(ss);
  setupSubjects(ss);
  setupSettings(ss);
  
  SpreadsheetApp.getUi().alert('✅ Study App initialized successfully!');
}

/**
 * Create a sheet if it doesn't exist
 */
function createSheetIfNotExists(ss, sheetName) {
  if (!ss.getSheetByName(sheetName)) {
    ss.insertSheet(sheetName);
  }
}

/**
 * Set up the Dashboard sheet
 */
function setupDashboard(ss) {
  const sheet = ss.getSheetByName(SHEET_NAMES.DASHBOARD);
  sheet.clear();
  
  // Title
  sheet.getRange('A1').setValue('📚 STUDY DASHBOARD').setFontSize(24).setFontWeight('bold');
  
  // Summary section
  sheet.getRange('A3').setValue('Today\'s Study Summary').setFontWeight('bold').setFontSize(14);
  sheet.getRange('A4:B4').setValues([['Subjects Studied', '=COUNTA(\'Study Log\'!A:A)-1']]);
  sheet.getRange('A5:B5').setValues([['Total Study Time (min)', '=SUM(\'Study Log\'!C:C)']]);
  sheet.getRange('A6:B6').setValues([['Subjects This Week', '=SUMPRODUCT((\'Study Log\'!A:A<>"")*((TODAY()-\'Study Log\'!B:B)<=7))']]);
  
  // Format
  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 200);
  sheet.getRange('A4:B6').setBackground('#E8F5E9');
}

/**
 * Set up the Study Log sheet
 */
function setupStudyLog(ss) {
  const sheet = ss.getSheetByName(SHEET_NAMES.STUDY_LOG);
  sheet.clear();
  
  const headers = ['Subject', 'Date', 'Study Time (minutes)', 'Topic', 'Notes', 'Difficulty', 'Timestamp'];
  sheet.getRange('A1:G1').setValues([headers]);
  
  // Format header
  sheet.getRange('A1:G1')
    .setBackground('#1F77D4')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold');
  
  // Set column widths
  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 120);
  sheet.setColumnWidth(3, 150);
  sheet.setColumnWidth(4, 200);
  sheet.setColumnWidth(5, 250);
  sheet.setColumnWidth(6, 120);
  sheet.setColumnWidth(7, 180);
  
  // Freeze header
  sheet.freezeRows(1);
}

/**
 * Set up the Goals sheet
 */
function setupGoals(ss) {
  const sheet = ss.getSheetByName(SHEET_NAMES.GOALS);
  sheet.clear();
  
  const headers = ['Goal', 'Subject', 'Target Study Time (min)', 'Deadline', 'Priority', 'Status', 'Progress %', 'Created Date'];
  sheet.getRange('A1:H1').setValues([headers]);
  
  // Format header
  sheet.getRange('A1:H1')
    .setBackground('#D32F2F')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold');
  
  // Set column widths
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 120);
  sheet.setColumnWidth(3, 150);
  sheet.setColumnWidth(4, 120);
  sheet.setColumnWidth(5, 100);
  sheet.setColumnWidth(6, 100);
  sheet.setColumnWidth(7, 120);
  sheet.setColumnWidth(8, 120);
  
  // Freeze header
  sheet.freezeRows(1);
}

/**
 * Set up the Subjects sheet
 */
function setupSubjects(ss) {
  const sheet = ss.getSheetByName(SHEET_NAMES.SUBJECTS);
  sheet.clear();
  
  const headers = ['Subject Name', 'Grade', 'Teacher', 'Exam Date', 'Notes', 'Color Code'];
  sheet.getRange('A1:F1').setValues([headers]);
  
  // Format header
  sheet.getRange('A1:F1')
    .setBackground('#388E3C')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold');
  
  // Set column widths
  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 100);
  sheet.setColumnWidth(3, 150);
  sheet.setColumnWidth(4, 120);
  sheet.setColumnWidth(5, 250);
  sheet.setColumnWidth(6, 100);
  
  // Freeze header
  sheet.freezeRows(1);
  
  // Add sample subjects
  sheet.getRange('A2:F2').setValues([['Mathematics', 'A', 'Mr. Smith', '2026-12-15', 'Focus on calculus', 'Blue']]);
  sheet.getRange('A3:F3').setValues([['English', 'B', 'Mrs. Johnson', '2026-12-10', 'Essay writing practice', 'Red']]);
  sheet.getRange('A4:F4').setValues([['Physics', 'A', 'Mr. Brown', '2026-12-20', 'Mechanics and waves', 'Green']]);
}

/**
 * Set up the Settings sheet
 */
function setupSettings(ss) {
  const sheet = ss.getSheetByName(SHEET_NAMES.SETTINGS);
  sheet.clear();
  
  sheet.getRange('A1').setValue('⚙️ SETTINGS').setFontSize(16).setFontWeight('bold');
  
  const settings = [
    ['Daily Study Goal (minutes)', '180'],
    ['Weekly Study Goal (hours)', '15'],
    ['School Name', 'Your School Name'],
    ['Timezone', 'UTC'],
    ['Email for Notifications', 'your-email@example.com'],
    ['Notification Enabled', 'No']
  ];
  
  sheet.getRange('A3:B3').setValues([['Setting', 'Value']]).setFontWeight('bold').setBackground('#F5F5F5');
  sheet.getRange('A4:B9').setValues(settings);
  
  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 300);
}

/**
 * Open dialog to log a study session
 */
function openStudyLogDialog() {
  const html = HtmlService.createHtmlOutput(`
    <style>
      body { font-family: Arial, sans-serif; margin: 15px; }
      label { display: block; margin-top: 12px; font-weight: bold; }
      input, select, textarea { width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
      textarea { resize: vertical; min-height: 80px; }
      button { background: #1F77D4; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-top: 15px; font-size: 14px; }
      button:hover { background: #0D47A1; }
      .button-group { text-align: right; }
    </style>
    
    <h2>📝 Log Study Session</h2>
    
    <label>Subject:</label>
    <select id="subject">
      <option value="">Select a subject...</option>
      <option value="Mathematics">Mathematics</option>
      <option value="English">English</option>
      <option value="Physics">Physics</option>
      <option value="Chemistry">Chemistry</option>
      <option value="Biology">Biology</option>
      <option value="History">History</option>
      <option value="Geography">Geography</option>
      <option value="Other">Other</option>
    </select>
    
    <label>Date:</label>
    <input type="date" id="date">
    
    <label>Study Time (minutes):</label>
    <input type="number" id="time" min="1" value="30">
    
    <label>Topic:</label>
    <input type="text" id="topic" placeholder="e.g., Quadratic Equations">
    
    <label>Notes:</label>
    <textarea id="notes" placeholder="What did you study? Any challenges?"></textarea>
    
    <label>Difficulty:</label>
    <select id="difficulty">
      <option value="Easy">Easy</option>
      <option value="Medium" selected>Medium</option>
      <option value="Hard">Hard</option>
    </select>
    
    <div class="button-group">
      <button onclick="submitStudyLog()">✅ Log Session</button>
      <button onclick="closeDialog()" style="background: #999;">Cancel</button>
    </div>
    
    <script>
      document.getElementById('date').valueAsDate = new Date();
      
      function submitStudyLog() {
        const data = {
          subject: document.getElementById('subject').value,
          date: document.getElementById('date').value,
          time: document.getElementById('time').value,
          topic: document.getElementById('topic').value,
          notes: document.getElementById('notes').value,
          difficulty: document.getElementById('difficulty').value
        };
        
        if (!data.subject || !data.date || !data.time) {
          alert('Please fill in all required fields');
          return;
        }
        
        google.script.run.addStudyLog(data);
        closeDialog();
      }
      
      function closeDialog() {
        google.script.host.close();
      }
    </script>
  `);
  
  SpreadsheetApp.getUi().showModalDialog(html, '📝 Log Study Session');
}

/**
 * Add study log entry to the sheet
 */
function addStudyLog(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAMES.STUDY_LOG);
  
  const newRow = [
    data.subject,
    new Date(data.date),
    parseInt(data.time),
    data.topic,
    data.notes,
    data.difficulty,
    new Date()
  ];
  
  sheet.appendRow(newRow);
  
  // Apply conditional formatting to difficulty column
  const lastRow = sheet.getLastRow();
  const difficultyCell = sheet.getRange(lastRow, 6);
  
  if (data.difficulty === 'Easy') {
    difficultyCell.setBackground('#C8E6C9');
  } else if (data.difficulty === 'Medium') {
    difficultyCell.setBackground('#FFF9C4');
  } else {
    difficultyCell.setBackground('#FFCDD2');
  }
  
  SpreadsheetApp.getUi().alert(`✅ Study session logged!\n\nSubject: ${data.subject}\nTime: ${data.time} minutes`);
}

/**
 * Open dialog to set study goals
 */
function openGoalsDialog() {
  const html = HtmlService.createHtmlOutput(`
    <style>
      body { font-family: Arial, sans-serif; margin: 15px; }
      label { display: block; margin-top: 12px; font-weight: bold; }
      input, select { width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
      button { background: #D32F2F; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-top: 15px; font-size: 14px; }
      button:hover { background: #B71C1C; }
      .button-group { text-align: right; }
    </style>
    
    <h2>🎯 Set Study Goal</h2>
    
    <label>Goal Description:</label>
    <input type="text" id="goal" placeholder="e.g., Master Calculus Chapter 5">
    
    <label>Subject:</label>
    <select id="subject">
      <option value="">Select a subject...</option>
      <option value="Mathematics">Mathematics</option>
      <option value="English">English</option>
      <option value="Physics">Physics</option>
      <option value="Chemistry">Chemistry</option>
      <option value="Biology">Biology</option>
      <option value="History">History</option>
      <option value="Geography">Geography</option>
      <option value="Other">Other</option>
    </select>
    
    <label>Target Study Time (minutes):</label>
    <input type="number" id="targetTime" min="30" value="120">
    
    <label>Deadline:</label>
    <input type="date" id="deadline">
    
    <label>Priority:</label>
    <select id="priority">
      <option value="Low">Low</option>
      <option value="Medium" selected>Medium</option>
      <option value="High">High</option>
    </select>
    
    <div class="button-group">
      <button onclick="submitGoal()">✅ Set Goal</button>
      <button onclick="closeDialog()" style="background: #999;">Cancel</button>
    </div>
    
    <script>
      document.getElementById('deadline').valueAsDate = new Date(Date.now() + 7*24*60*60*1000);
      
      function submitGoal() {
        const data = {
          goal: document.getElementById('goal').value,
          subject: document.getElementById('subject').value,
          targetTime: document.getElementById('targetTime').value,
          deadline: document.getElementById('deadline').value,
          priority: document.getElementById('priority').value
        };
        
        if (!data.goal || !data.subject || !data.deadline) {
          alert('Please fill in all required fields');
          return;
        }
        
        google.script.run.addGoal(data);
        closeDialog();
      }
      
      function closeDialog() {
        google.script.host.close();
      }
    </script>
  `);
  
  SpreadsheetApp.getUi().showModalDialog(html, '🎯 Set Study Goal');
}

/**
 * Add goal to the Goals sheet
 */
function addGoal(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAMES.GOALS);
  
  const newRow = [
    data.goal,
    data.subject,
    parseInt(data.targetTime),
    new Date(data.deadline),
    data.priority,
    'In Progress',
    0,
    new Date()
  ];
  
  sheet.appendRow(newRow);
  
  // Color code by priority
  const lastRow = sheet.getLastRow();
  const priorityCell = sheet.getRange(lastRow, 5);
  
  if (data.priority === 'High') {
    priorityCell.setBackground('#FFCDD2');
  } else if (data.priority === 'Medium') {
    priorityCell.setBackground('#FFF9C4');
  } else {
    priorityCell.setBackground('#C8E6C9');
  }
  
  SpreadsheetApp.getUi().alert(`✅ Goal added!\n\nGoal: ${data.goal}\nDeadline: ${data.deadline}`);
}

/**
 * Open Subjects management dialog
 */
function openSubjectsDialog() {
  SpreadsheetApp.getUi().alert('📖 Open the "Subjects" sheet to manage your subjects');
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.SUBJECTS).activate();
}

/**
 * Open Settings dialog
 */
function openSettingsDialog() {
  SpreadsheetApp.getUi().alert('⚙️ Open the "Settings" sheet to configure your preferences');
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.SETTINGS).activate();
}

/**
 * Open Dashboard
 */
function openDashboard() {
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.DASHBOARD).activate();
}

/**
 * Generate a progress report
 */
function generateProgressReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const studyLogSheet = ss.getSheetByName(SHEET_NAMES.STUDY_LOG);
  const goalsSheet = ss.getSheetByName(SHEET_NAMES.GOALS);
  
  const studyData = studyLogSheet.getDataRange().getValues();
  
  let report = '📈 PROGRESS REPORT\n\n';
  report += '=' .repeat(50) + '\n';
  
  // Calculate total study time
  let totalTime = 0;
  const subjectTime = {};
  
  for (let i = 1; i < studyData.length; i++) {
    const subject = studyData[i][0];
    const time = studyData[i][2];
    
    totalTime += time;
    subjectTime[subject] = (subjectTime[subject] || 0) + time;
  }
  
  report += `Total Study Time: ${totalTime} minutes (${(totalTime/60).toFixed(1)} hours)\n\n`;
  report += 'Study Time by Subject:\n';
  
  for (const [subject, time] of Object.entries(subjectTime).sort((a, b) => b[1] - a[1])) {
    const percentage = ((time / totalTime) * 100).toFixed(1);
    report += `  • ${subject}: ${time} min (${percentage}%)\n`;
  }
  
  report += '\n' + '='.repeat(50) + '\n';
  report += 'Active Goals: ' + (goalsSheet.getLastRow() - 1) + '\n';
  
  SpreadsheetApp.getUi().alert(report);
}
