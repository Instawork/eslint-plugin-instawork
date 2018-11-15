const BEGINNING_OF_FILE = {
  start: { line: 1, column: 0 },
  end: { line: 1, column: 0 },
};

const meta = {
  docs: {
    description:
      'Connected components must have tracking code, in order to prevent either of the following ' +
      'scenarios: (1) Forgetting to consider tracking, (2) forgetting to hook up tracking, ' +
      'resulting in an error (https://sentry.io/instawork/applicant-app/issues/409690489)',
  },
};

// The implementation below uses regexes, which are not ideal but maybe appropriate considering:
// - The secondary nature of this project (is it worth it to maintain a complex implementation?)
// - The lightweight nature of the implementation, meaning it can easily be replaced with a more
//   sophisticated implementation later on
const create = context => ({
  Program: () => {
    const source = context.getSourceCode().getText();

    // Not sure what a future-proof criteria is for determining what counts as the 'glue layer'
    // For now, the existence of `ScreenHocs` in the source is good enough for the most part --
    // it indicates the programmer's desire to connect presentation with functionality
    if (!source.match(/screenhocs/i)) return;

    if (!source.match(/withtracking/i)) {
      const message = 'connected components must have tracking code';
      context.report({ message, loc: BEGINNING_OF_FILE });
    }
  },
});

module.exports = { create, meta };
