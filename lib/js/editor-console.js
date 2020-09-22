let console = (function (oldConsole) {
  return {
    formatArgsOutput: function (arg) {
      // "Hello World!""
      let outputArgMessage;

      // Deal with different premitive types
      switch (this.getType(arg)) {
        case "string":
          outputArgMessage = `"${arg}"`;
          break;
        case "object":
          outputArgMessage = `Object ${JSON.stringify(arg)}`;
          break;
        case "array":
          outputArgMessage = `Array ${JSON.stringify(arg)}`;
        default:
          outputArgMessage = arg;
          break;
      }
      return outputArgMessage;
    },
    getType: function (arg) {
      if (typeof arg === "string") return "string";
      if (typeof arg === "boolean") return "boolean";
      if (typeof arg === "function") return "function";
      if (typeof arg === "number") return "number";
      if (typeof arg === "undefined") return "undefined";
      if (typeof arg === "object" && !Array.isArray(arg)) return "object";
      if (typeof arg === "object" && Array.isArray(arg)) return "array";
    },
    logMultipleArgs: function (logItems) {
      let currentLog = "";

      // Deal with multiple argumnets
      logItems.forEach((arg) => {
        currentLog += this.formatArgsOutput(arg) + " ";
      });

      oldConsole.log.apply(oldConsole, logItems);

      consoleMessages.push({
        message: currentLog,
        class: `log log-default`,
      });
      oldConsole.log(consoleMessages);
    },
    logSingleArgs: function (logItem) {
      oldConsole.log(logItem);
      consoleMessages.push({
        message: this.formatArgsOutput(logItem),
        class: `log log-${this.getType(logItem)}`,
      });
      oldConsole.log(consoleMessages);
    },
    log: function (text) {
      oldConsole.log(text);
      let argsArray = Array.from(arguments);
      oldConsole.log(argsArray);
      return argsArray.length !== 1
        ? this.logMultipleArgs(argsArray)
        : this.logSingleArgs(text);
    },
    info: function (text) {
      oldConsole.info(text);
    },
    warn: function (text) {
      oldConsole.warn(text);
    },
    error: function (err) {
      oldConsole.error(err);
      consoleMessages.push({
        message: `${err.name} : ${err.message}`,
        class: "log log-error",
      });
    },
  };
})(window.console);
