import { Node } from '@tiptap/core';

export const Placeholder = Node.create({
  name: 'placeholder',

  group: 'inline',

  inline: true,

  atom: true,

  addAttributes() {
    return {
      id: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'strong[data-placeholder-id]',
      },
    ];
  },

  renderHTML({ node }) {
    return ['strong', { 'data-placeholder-id': node.attrs.id, class: 'loading-placeholder' }, 0];
  },
});
