// Every run gets a disposable worker; the UI terminates it on timeout.
self.onmessage = (event) => {
  const { javascript, exercise } = event.data;
  const output = [];
  const format = (value) =>
    typeof value === 'string' ? value : value === undefined ? 'undefined' : JSON.stringify(value);
  try {
    const logger = {
      log: (...values) => {
        if (output.length >= 200) throw new Error('Console output limit reached.');
        output.push(values.map(format).join(' '));
      },
    };
    const functions = new Function(
      'console',
      javascript +
        `\n;return {
        getDailyMessage: typeof getDailyMessage === "function" ? getDailyMessage : undefined,
        buildDailyMessages: typeof buildDailyMessages === "function" ? buildDailyMessages : undefined
      };`,
    )(logger);
    let cases;
    if (exercise) {
      const candidate = functions[exercise.functionName];
      cases = exercise.cases.map((test) => {
        const input = test.args.map(format).join(', ');
        const expected = format(test.expected);
        try {
          const actual = typeof candidate === 'function' ? candidate(...test.args) : undefined;
          return {
            label: test.label,
            input,
            expected,
            actual: format(actual),
            passed: Array.isArray(test.expected)
              ? Array.isArray(actual) && JSON.stringify(actual) === JSON.stringify(test.expected)
              : actual === test.expected,
          };
        } catch (error) {
          return { label: test.label, input, expected, actual: String(error), passed: false };
        }
      });
    }
    self.postMessage({ output, cases });
  } catch (error) {
    self.postMessage({ output, error: String(error) });
  }
};
