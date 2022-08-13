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
import { commandMap, CommandName } from './command';
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
      <Stack spacing={3} overflow={'auto'} {...stackProps}>
        <Stack direction={'row'} spacing={5}>
          <Stack direction={'row'} spacing={1}>
            {_.includes(commandName, 'heading') && (
              <ToolbarButton name={'heading'}>
                <FaHeading />
              </ToolbarButton>
            )}
            {_.includes(commandName, 'bold') && (
              <ToolbarButton name={'bold'}>
                <FaBold />
              </ToolbarButton>
            )}
            {_.includes(commandName, 'italic') && (
              <ToolbarButton name={'italic'}>
                <FaItalic />
              </ToolbarButton>
            )}
            {_.includes(commandName, 'strikethrough') && (
              <ToolbarButton name={'strikethrough'}>
                <FaStrikethrough />
              </ToolbarButton>
            )}
          </Stack>
          <Stack direction={'row'} spacing={1}>
            {_.includes(commandName, 'link') && (
              <ToolbarButton name={'link'}>
                <FaLink />
              </ToolbarButton>
            )}
            {_.includes(commandName, 'quote') && (
              <ToolbarButton name={'quote'}>
                <FaQuoteRight />
              </ToolbarButton>
            )}
            {_.includes(commandName, 'code') && (
              <ToolbarButton name={'code'}>
                <FaCode />
              </ToolbarButton>
            )}
            {_.includes(commandName, 'image') && (
              <ToolbarButton name={'image'}>
                <FaImage />
              </ToolbarButton>
            )}
          </Stack>
        </Stack>
        <Stack direction={'row'} spacing={1}>
          {_.includes(commandName, 'unorderedList') && (
            <ToolbarButton name={'unorderedList'}>
              <FaListOl />
            </ToolbarButton>
          )}
          {_.includes(commandName, 'orderedList') && (
            <ToolbarButton name={'orderedList'}>
              <FaListUl />
            </ToolbarButton>
          )}
          {_.includes(commandName, 'checkedList') && (
            <ToolbarButton name={'checkedList'}>
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
