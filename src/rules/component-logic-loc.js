// @flow

const meta = {
  docs: {
    description: 'Checks that the LOC of a React component logic is less than a certain threshold',
    // configurable threshold
    schema: [
      {
        additionalProperties: false,
        properties: {
          max: {
            minimum: 0,
            type: 'integer',
          },
          skipBlankLines: {
            type: 'boolean',
          },
          skipComments: {
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
  },
};

const create = (context) => ({
  // counts the number of lines starting from the first line of the component logic
  // to the return statement
  ReturnStatement: (node) => {
    const maxLines = context.options[0]?.max ?? 100;
    const skipBlankLines = context.options[0]?.skipBlankLines ?? false;
    const skipComments = context.options[0]?.skipComments ?? false;
    if (node.argument?.type !== 'JSXElement') {
      return;
    }
    // find the function declaration node
    let { parent } = node;
    while (
      parent?.type != null &&
      parent.type !== 'FunctionDeclaration' &&
      parent.type !== 'ArrowFunctionExpression'
    ) {
      ({ parent } = parent);
    }
    // find the function body node
    let { body } = parent;
    while (body.type !== 'BlockStatement') {
      ({ body } = body);
    }
    // count the number of lines
    let lines = node.loc.start.line - body.loc.start.line;

    // exclude blank lines
    if (skipBlankLines) {
      const linesOfCode = context
        .getSourceCode()
        .lines.slice(body.loc.start.line - 1, node.loc.start.line - 1);
      const blankLines = linesOfCode.filter((line) => line.trim() === '');
      lines -= blankLines.length;
    }

    // exclude comments
    if (skipComments) {
      body.comments.forEach((comment) => {
        if (
          comment.loc.start.line >= body.loc.start.line &&
          comment.loc.start.line <= node.loc.start.line
        ) {
          lines -= comment.loc.end.line - comment.loc.start.line + 1;
        }
      });
    }

    // exclude early return statements
    // traverse the body of the function and find all return statements
    // that are before the return statement of the component logic
    const returnStatements = [];
    const queue = [body];
    while (queue.length > 0) {
      const current = queue.shift();
      if (current.type === 'ReturnStatement') {
        returnStatements.push(current);
      }
      if (current.body != null) {
        queue.push(...current.body);
      }
      if (current.consequent != null) {
        queue.push(current.consequent);
      }
      if (current.alternate != null) {
        queue.push(current.alternate);
      }
    }
    returnStatements.forEach((returnStatement) => {
      if (returnStatement.loc.start.line < node.loc.start.line) {
        lines -= returnStatement.loc.end.line - returnStatement.loc.start.line + 1;
      }
    });

    if (lines > 100) {
      context.report({
        message: `Component logic is ${lines} lines (${body.loc.start.line} - ${node.loc.start.line}), which is greater than the maximum of ${maxLines} lines\n`,
        node: parent,
      });
    }
  },
});

module.exports = { create, meta };
