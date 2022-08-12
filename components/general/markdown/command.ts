import _ from 'lodash';
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

export const commandMap = {
  heading: headingLevel1Command,
  bold: boldCommand,
  italic: italicCommand,
  quote: quoteCommand,
  code: codeCommand,
  link: linkCommand,
  image: imageCommand,
  orderedList: orderedListCommand,
  checkedList: checkedListCommand,
  unorderedList: unorderedListCommand,
  strikethrough: strikethroughCommand,
};

export type CommandName = keyof typeof commandMap;

export const EDITOR_COMMANDS = _.reduce(
  commandMap,
  (acc, command, key) => ({
    ...acc,
    [_.upperCase(key)]: key,
  }),
  {}
) as Record<Uppercase<CommandName>, CommandName>;
