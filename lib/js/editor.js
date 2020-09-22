// Retrieve Elements
const consoleLogList = document.querySelector(".editor-console-logs");
const executeCodeBtn = document.querySelector(".editor-run");
const resetCodeBtn = document.querySelector(".editor-reset");

// Setup Ace
let codeEditor = ace.edit("editor-code");
const defaultCode = 'console.log("Hello World!");';
let consoleMessages = [];

let consoleLib = {
  clearConsoleScreen() {
    consoleMessages = [];

    //   Remove all alements in the log list
    while (consoleLogList.firstChild) {
      consoleLogList.removeChild(consoleLogList.firstChild);
    }
  },
  printToConsole() {
    consoleMessages.forEach((log) => {
      const newLogItem = document.createElement("li");
      const newLogText = document.createElement("pre");

      newLogText.className = log.class; //log log-string

      newLogText.textContent = `> ${log.message}`;

      newLogItem.appendChild(newLogText);

      consoleLogList.appendChild(newLogItem);
    });
  },
  printDefaultMsgToConsole() {
    const newLogItem = document.createElement("li");
    const newLogText = document.createElement("pre");

    newLogText.className = "log log-string"; //log log-string

    newLogText.textContent = `> "Hello World!"`;

    newLogItem.appendChild(newLogText);

    consoleLogList.appendChild(newLogItem);
  },
  init() {
    // configure ace settings

    // Theme
    codeEditor.setTheme("ace/theme/dreamweaver");

    // Set the language
    codeEditor.session.setMode("ace/mode/javascript");

    // Set Options
    codeEditor.setOptions({
      //   fontFamily: "Inconsolata",
      //   fontSize: "12pt",
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
    });

    // Set default Code
    codeEditor.setValue(defaultCode);

    // Set default output message
    consoleLib.printDefaultMsgToConsole();
  },
};

// Events
executeCodeBtn.addEventListener("click", () => {
  //   Clear the console messages
  consoleLib.clearConsoleScreen();

  // Get input from the code editor
  userCode = codeEditor.getValue();

  // Run the user code
  try {
    new Function(userCode)();
  } catch (err) {
    console.error(err);
  }

  //   print to the console
  consoleLib.printToConsole();
});

resetCodeBtn.addEventListener("click", () => {
  // Clear the ace editor
  codeEditor.setValue(defaultCode);

  //   Clear the console messages
  consoleLib.clearConsoleScreen();
});

consoleLib.init();
