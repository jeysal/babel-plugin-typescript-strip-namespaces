const handledByTransformTypescript = path =>
  path.node.declare || path.node.id.type === 'StringLiteral';

const visitor = {
  TSModuleDeclaration: {
    enter(modulePath) {
      if (!handledByTransformTypescript(modulePath)) {
        // Make sure there are only allowed node types inside
        modulePath.get('body').traverse({
          enter(path) {
            // Nested namespaces would be easy to support if we could remove in exit,
            // but because we have to do in in enter (see below), the commented out code will not traverse anything
            // if (path.isTSModuleDeclaration()) {
            //   // Must check nested ones now, or the whole modulePath will already be removed
            //   path.traverse(visitor);
            //   path.skip();
            // } else {
            throw path.buildCodeFrameError(
              'Namespaces must only contain type and interface declarations',
            );
            // }
          },
          blacklist: ['TSTypeAliasDeclaration', 'TSInterfaceDeclaration'],
        });
        // Removing in exit would be too late because of plugin-transform-typescript
        modulePath.remove();
      }
    },
  },
};

module.exports = ({ types: t }) => ({ visitor });
