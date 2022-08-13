import {
  boldCommand,
  checkedListCommand,
  codeCommand,
  headingLevel1Command,
  imageCommand,
  italicCommand,
  linkCommand,
  orderedListCommand,
  quoteCommand,
  strikethroughCommand,
  unorderedListCommand,
} from 'react-mde';

export type CommandName = keyof typeof commandMap;

export const EDITOR_COMMANDS = {
  HEADING: 'heading',
  BOLD: 'bold',
  ITALIC: 'italic',
  QUOTE: 'quote',
  CODE: 'code',
  LINK: 'link',
  IMAGE: 'image',
  ORDERED_LIST: 'orderedList',
  CHECKED_LIST: 'checkedList',
  UNORDERED_LIST: 'unorderedList',
  STRIKETHROUGH: 'strikethrough',
} as const;

export const commandMap = {
  [EDITOR_COMMANDS.HEADING]: headingLevel1Command,
  [EDITOR_COMMANDS.BOLD]: boldCommand,
  [EDITOR_COMMANDS.ITALIC]: italicCommand,
  [EDITOR_COMMANDS.QUOTE]: quoteCommand,
  [EDITOR_COMMANDS.CODE]: codeCommand,
  [EDITOR_COMMANDS.LINK]: linkCommand,
  [EDITOR_COMMANDS.IMAGE]: imageCommand,
  [EDITOR_COMMANDS.ORDERED_LIST]: orderedListCommand,
  [EDITOR_COMMANDS.CHECKED_LIST]: checkedListCommand,
  [EDITOR_COMMANDS.UNORDERED_LIST]: unorderedListCommand,
  [EDITOR_COMMANDS.STRIKETHROUGH]: strikethroughCommand,
};
