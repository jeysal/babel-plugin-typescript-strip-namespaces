const { transform } = require('@babel/core');
const plugin = require('.');

test('strips away a namespace containing types and interfaces', () => {
  const { code } = transform(
    `
    namespace N {
      type A = string;
      interface B {
        x: string;
      }
    }

    class N {}
    `,
    { plugins: [plugin, '@babel/plugin-syntax-typescript'] }
  );

  expect(code).toEqual(`class N {}`);
});

test('allows export declarations', () => {
  const { code } = transform(
    `
    namespace N {
      export type A = string;
    }

    class N {}
    `,
    { plugins: [plugin, '@babel/plugin-syntax-typescript'] }
  );

  expect(code).toEqual(`class N {}`);
});

test('handles nested namespaces', () => {
  const { code } = transform(
    `
    namespace N {
      type A = string;
      namespace Inner {
        type B = string;
      }
    }

    class N {}
    `,
    { plugins: [plugin, '@babel/plugin-syntax-typescript'] }
  );

  expect(code).toEqual(`class N {}`);
});

test('fails if a namespace contains anything else', () => {
  expect(() =>
    transform(
      `
      namespace N {
         const x = 42;
      }
      `,
      {
        plugins: [plugin, '@babel/plugin-syntax-typescript'],
        highlightCode: false,
      }
    )
  ).toThrowErrorMatchingSnapshot();
});

test('fails if a nested namespace contains anything else', () => {
  expect(() =>
    transform(
      `
      namespace N {
        type A = string;
        namespace Inner {
          const x = 42;
        }
      }
      `,
      {
        plugins: [plugin, '@babel/plugin-syntax-typescript'],
        highlightCode: false,
      }
    )
  ).toThrowErrorMatchingSnapshot();
});

test('works with plugin-transform-typescript', () => {
  const { code } = transform(
    `
    namespace N {
      type A = string;
      interface B {
        x: string;
      }
    }

    class N {}
    `,
    {
      plugins: ['@babel/plugin-transform-typescript', plugin], // even in the wrong order!
    }
  );
  expect(code).toEqual('class N {}');
});
