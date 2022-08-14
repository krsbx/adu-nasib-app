import {
  ButtonProps,
  Stack,
  StackProps,
  Textarea,
  TextareaProps,
  useMergeRefs,
} from '@chakra-ui/react';
import isValidUrl from 'is-url';
import _ from 'lodash';
import React from 'react';
import {
  FaBold,
  FaCheck,
  FaCode,
  FaHeading,
  FaImage,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaQuoteRight,
  FaStrikethrough,
} from 'react-icons/fa';
import { useTextAreaMarkdownEditor } from 'react-mde';
import { ReactSetter } from '../../../utils/interfaces';
import { commandMap, CommandName, EDITOR_COMMANDS } from './command';
import _ToolbarButton from './ToolbarButton';

const Editor = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ commandName, setValue, value, onChange, stackProps, ...props }, propRef) => {
    const {
      ref: mdRef,
      commandController,
      textController,
    } = useTextAreaMarkdownEditor({
      commandMap,
    });

    const refs = useMergeRefs<HTMLTextAreaElement>(propRef, mdRef);

    const onPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      e.preventDefault();

      const text = e.clipboardData.getData('text/plain');
      const file = e.clipboardData.files?.[0];

      const isUrl = isValidUrl(text);
      const isImage = file?.type.startsWith('image/');

      if (text && !isUrl) {
        textController.replaceSelection(e.clipboardData?.getData('Text') ?? '');

        return;
      }

      if (isUrl) {
        // * [alt](url)
        textController.replaceSelection(`[${text}](${text})`);
        return;
      }

      if (isImage) {
        console.warn('Image upload is not implemented yet');
        // * ![alt](url)
        return;
      }
    };

    const onDropCapture = (e: React.DragEvent<HTMLTextAreaElement>) => {
      e.preventDefault();

      const file = e.dataTransfer?.files?.[0];
      if (!file) return;

      const isImage = file.type.startsWith('image/');
      if (!isImage) return;

      console.warn('Image upload is not implemented yet');
    };

    const executeCommand = (e: React.MouseEvent<HTMLButtonElement>) =>
      commandController.executeCommand(e.currentTarget.name as CommandName);

    const ToolbarButton = ({ name, ...props }: { name: CommandName } & ButtonProps) => (
      <_ToolbarButton name={name} onClick={executeCommand} title={name} {...props} />
    );

    return (
      <Stack spacing={1} overflow={'auto'} {...stackProps}>
        <Stack direction={'row'} spacing={5}>
          <Stack direction={'row'} spacing={1}>
            {_.includes(commandName, EDITOR_COMMANDS.HEADING) && (
              <ToolbarButton name={EDITOR_COMMANDS.HEADING}>
                <FaHeading />
              </ToolbarButton>
            )}
            {_.includes(commandName, EDITOR_COMMANDS.BOLD) && (
              <ToolbarButton name={EDITOR_COMMANDS.BOLD}>
                <FaBold />
              </ToolbarButton>
            )}
            {_.includes(commandName, EDITOR_COMMANDS.ITALIC) && (
              <ToolbarButton name={EDITOR_COMMANDS.ITALIC}>
                <FaItalic />
              </ToolbarButton>
            )}
            {_.includes(commandName, EDITOR_COMMANDS.STRIKETHROUGH) && (
              <ToolbarButton name={EDITOR_COMMANDS.STRIKETHROUGH}>
                <FaStrikethrough />
              </ToolbarButton>
            )}
          </Stack>
          <Stack direction={'row'} spacing={1}>
            {_.includes(commandName, EDITOR_COMMANDS.LINK) && (
              <ToolbarButton name={EDITOR_COMMANDS.LINK}>
                <FaLink />
              </ToolbarButton>
            )}
            {_.includes(commandName, EDITOR_COMMANDS.QUOTE) && (
              <ToolbarButton name={EDITOR_COMMANDS.QUOTE}>
                <FaQuoteRight />
              </ToolbarButton>
            )}
            {_.includes(commandName, EDITOR_COMMANDS.CODE) && (
              <ToolbarButton name={EDITOR_COMMANDS.CODE}>
                <FaCode />
              </ToolbarButton>
            )}
            {_.includes(commandName, EDITOR_COMMANDS.IMAGE) && (
              <ToolbarButton name={EDITOR_COMMANDS.IMAGE}>
                <FaImage />
              </ToolbarButton>
            )}
          </Stack>
        </Stack>
        <Stack direction={'row'} spacing={1}>
          {_.includes(commandName, EDITOR_COMMANDS.UNORDERED_LIST) && (
            <ToolbarButton name={EDITOR_COMMANDS.UNORDERED_LIST}>
              <FaListOl />
            </ToolbarButton>
          )}
          {_.includes(commandName, EDITOR_COMMANDS.ORDERED_LIST) && (
            <ToolbarButton name={EDITOR_COMMANDS.ORDERED_LIST}>
              <FaListUl />
            </ToolbarButton>
          )}
          {_.includes(commandName, EDITOR_COMMANDS.CHECKED_LIST) && (
            <ToolbarButton name={EDITOR_COMMANDS.CHECKED_LIST}>
              <FaCheck />
            </ToolbarButton>
          )}
        </Stack>
        <Textarea
          ref={refs}
          onPaste={onPaste}
          value={value}
          onChange={(e) => {
            onChange?.(e);
            setValue?.(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.code === 'Tab') {
              e.preventDefault();
              textController.replaceSelection('  ');
            }
          }}
          onDropCapture={onDropCapture}
          {...props}
        />
      </Stack>
    );
  }
);

Editor.displayName = 'Editor';

type Props = TextareaProps & {
  commandName: CommandName[];
  value?: string;
  setValue?: ReactSetter<string>;
  stackProps?: StackProps;
};

export default Editor;
