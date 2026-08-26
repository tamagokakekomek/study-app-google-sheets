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
function onOpen(e) {
  try {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('📚 Study App')
      .addItem('📊 Open Dashboard', 'openDashboard')
      .addItem('📝 Log Study Session', 'openStudyLogDialog')
      .addItem('🎯 Set Study Goals', 'openGoalsDialog')
      .addItem('📖 Manage Subjects', 'openSubjectsDialog')
      .addItem('📈 View Progress Report', 'generateProgressReport')
      .addSeparator()
      .addItem('🔄 Initialize App', 'initializeApp')
      .addToUi();
  } catch(err) {
    Logger.log('Error in onOpen: ' + err);
  }
}

/**
 * Initialize the study app with default sheets and formatting
 */
function initializeApp() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ui = SpreadsheetApp.getUi();
    
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
    
    ui.alert('✅ Study App initialized successfully!');
  } catch(err) {
    SpreadsheetApp.getUi().alert('Error: ' + err);
  }
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
  sheet.getRange('A4').setValue('Subjects Studied');
  sheet.getRange('B4').setFormula('=COUNTA(\'Study Log\'!A:A)-1');
  
  sheet.getRange('A5').setValue('Total Study Time (min)');
  sheet.getRange('B5').setFormula('=IFERROR(SUM(\'Study Log\'!C:C),0)');
  
  sheet.getRange('A6').setValue('Total Sessions');
  sheet.getRange('B6').setFormula('=COUNTA(\'Study Log\'!A:A)-1');
  
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
  sheet.appendRow(['Mathematics', 'A', 'Mr. Smith', '2026-12-15', 'Focus on calculus', 'Blue']);
  sheet.appendRow(['English', 'B', 'Mrs. Johnson', '2026-12-10', 'Essay writing practice', 'Red']);
  sheet.appendRow(['Physics', 'A', 'Mr. Brown', '2026-12-20', 'Mechanics and waves', 'Green']);
}

/**
 * Set up the Settings sheet
 */
function setupSettings(ss) {
  const sheet = ss.getSheetByName(SHEET_NAMES.SETTINGS);
  sheet.clear();
  
  sheet.getRange('A1').setValue('⚙️ SETTINGS').setFontSize(16).setFontWeight('bold');
  
  sheet.getRange('A3').setValue('Setting');
  sheet.getRange('B3').setValue('Value');
  sheet.getRange('A3:B3').setFontWeight('bold').setBackground('#F5F5F5');
  
  sheet.getRange('A4').setValue('Daily Study Goal (minutes)');
  sheet.getRange('B4').setValue('180');
  
  sheet.getRange('A5').setValue('Weekly Study Goal (hours)');
  sheet.getRange('B5').setValue('15');
  
  sheet.getRange('A6').setValue('School Name');
  sheet.getRange('B6').setValue('Your School Name');
  
  sheet.getRange('A7').setValue('Timezone');
  sheet.getRange('B7').setValue('UTC');
  
  sheet.getRange('A8').setValue('Email for Notifications');
  sheet.getRange('B8').setValue('your-email@example.com');
  
  sheet.getRange('A9').setValue('Notification Enabled');
  sheet.getRange('B9').setValue('No');
  
  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 300);
}

/**
 * Open dialog to log a study session
 */
function openStudyLogDialog() {
  try {
    const html = HtmlService.createHtmlOutput(`
      <style>
        body { font-family: Arial, sans-serif; margin: 15px; background: #f9f9f9; }
        label { display: block; margin-top: 12px; font-weight: bold; color: #333; }
        input, select, textarea { width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; font-family: Arial, sans-serif; }
        textarea { resize: vertical; min-height: 80px; }
        button { background: #1F77D4; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-top: 15px; margin-right: 5px; font-size: 14px; }
        button:hover { background: #0D47A1; }
        .button-group { text-align: right; }
        h2 { color: #1F77D4; }
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
        }
        
        function closeDialog() {
          google.script.host.close();
        }
      </script>
    `);
    
    SpreadsheetApp.getUi().showModalDialog(html, '📝 Log Study Session');
  } catch(err) {
    SpreadsheetApp.getUi().alert('Error: ' + err);
  }
}

/**
 * Add study log entry to the sheet
 */
function addStudyLog(data) {
  try {
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
  } catch(err) {
    SpreadsheetApp.getUi().alert('Error saving study log: ' + err);
  }
}

/**
 * Open dialog to set study goals
 */
function openGoalsDialog() {
  try {
    const html = HtmlService.createHtmlOutput(`
      <style>
        body { font-family: Arial, sans-serif; margin: 15px; background: #f9f9f9; }
        label { display: block; margin-top: 12px; font-weight: bold; color: #333; }
        input, select { width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; font-family: Arial, sans-serif; }
        button { background: #D32F2F; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-top: 15px; margin-right: 5px; font-size: 14px; }
        button:hover { background: #B71C1C; }
        .button-group { text-align: right; }
        h2 { color: #D32F2F; }
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
        }
        
        function closeDialog() {
          google.script.host.close();
        }
      </script>
    `);
    
    SpreadsheetApp.getUi().showModalDialog(html, '🎯 Set Study Goal');
  } catch(err) {
    SpreadsheetApp.getUi().alert('Error: ' + err);
  }
}

/**
 * Add goal to the Goals sheet
 */
function addGoal(data) {
  try {
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
  } catch(err) {
    SpreadsheetApp.getUi().alert('Error saving goal: ' + err);
  }
}

/**
 * Open Subjects management
 */
function openSubjectsDialog() {
  try {
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.SUBJECTS).activate();
    SpreadsheetApp.getUi().alert('📖 Managing Subjects\n\nEdit the "Subjects" sheet to add or modify your subjects.');
  } catch(err) {
    SpreadsheetApp.getUi().alert('Error: ' + err);
  }
}

/**
 * Open Dashboard
 */
function openDashboard() {
  try {
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.DASHBOARD).activate();
  } catch(err) {
    SpreadsheetApp.getUi().alert('Error: ' + err);
  }
}

/**
 * Generate a progress report
 */
function generateProgressReport() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const studyLogSheet = ss.getSheetByName(SHEET_NAMES.STUDY_LOG);
    
    const studyData = studyLogSheet.getDataRange().getValues();
    
    let report = '📈 PROGRESS REPORT\n\n';
    report += '='.repeat(50) + '\n';
    
    // Calculate total study time
    let totalTime = 0;
    const subjectTime = {};
    
    for (let i = 1; i < studyData.length; i++) {
      const subject = studyData[i][0];
      const time = studyData[i][2];
      
      if (subject && !isNaN(time)) {
        totalTime += time;
        subjectTime[subject] = (subjectTime[subject] || 0) + time;
      }
    }
    
    if (totalTime === 0) {
      report += 'No study sessions logged yet. Start logging your study sessions!\n';
    } else {
      report += `Total Study Time: ${totalTime} minutes (${(totalTime/60).toFixed(1)} hours)\n\n`;
      report += 'Study Time by Subject:\n';
      
      for (const [subject, time] of Object.entries(subjectTime).sort((a, b) => b[1] - a[1])) {
        const percentage = ((time / totalTime) * 100).toFixed(1);
        const bar = '█'.repeat(Math.floor(percentage / 5));
        report += `  ${subject}: ${time}m (${percentage}%) ${bar}\n`;
      }
    }
    
    report += '\n' + '='.repeat(50);
    
    SpreadsheetApp.getUi().alert(report);
  } catch(err) {
    SpreadsheetApp.getUi().alert('Error generating report: ' + err);
  }
}
