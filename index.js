const handledByTransformTypescript = path =>
  path.node.declare || path.node.id.type === 'StringLiteral';

const visitor = {
  TSModuleDeclaration: {
    enter(modulePath) {
      if (!handledByTransformTypescript(modulePath)) {
        // Make sure there are only allowed node types inside
        modulePath.get('body').traverse({
          enter(path) {
            if (!path.isModuleDeclaration()) {
              throw path.buildCodeFrameError(
                'Namespaces must only contain type and interface declarations'
              );
            }
          },
          blacklist: [
            'TSModuleDeclaration', // nested ones will get their own visitor passes
            'TSTypeAliasDeclaration',
            'TSInterfaceDeclaration',
          ],
        });
      }
    },
    exit(modulePath) {
      if (!handledByTransformTypescript(modulePath)) {
        modulePath.remove();
      }
    },
  },
};

module.exports = ({ types: t }) => ({
  visitor: {
    // Gotta run before plugin-transform-typescript
    Program(path) {
      path.traverse(visitor);
    },
  },
});
