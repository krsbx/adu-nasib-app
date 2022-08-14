import { Button, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import _ from 'lodash';
import React, { useState } from 'react';
import { useForm, UseFormReset } from 'react-hook-form';
import { Markdown } from '..';
import useCardColorMode from '../../../hooks/useCardColorMode';
import useFieldButtonColorMode from '../../../hooks/useFieldButtonColorMode';
import { ReactSetter } from '../../../utils/interfaces';
import { commentSchema, postSchema } from '../../../utils/schema';
import { EDITOR_COMMANDS } from './command';

type Schema = { content: string };

const PostCommentField = ({ setValue, value, placeholder, schema, onSubmit }: Props) => {
  const [isEdit, setIsEdit] = useState(true);

  const { cardBgColor, cardTextColor } = useCardColorMode();
  const { fieldButtonBgColor, fieldButtonTextColor } = useFieldButtonColorMode();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onFormSubmit = (values: Schema) => {
    if (!onSubmit) return;

    onSubmit(values, reset);
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row">
        <Button
          variant={'ghost'}
          px={2}
          w={'75px'}
          {...(isEdit && {
            backgroundColor: fieldButtonBgColor,
            color: fieldButtonTextColor,
          })}
          transition={'all 0.3s ease-in-out'}
          onClick={() => setIsEdit(true)}
        >
          Edit
        </Button>
        <Button
          variant={'ghost'}
          px={2}
          w={'75px'}
          {...(!isEdit && {
            backgroundColor: fieldButtonBgColor,
            color: fieldButtonTextColor,
          })}
          transition={'all 0.3s ease-in-out'}
          onClick={() => setIsEdit(false)}
        >
          Preview
        </Button>
      </Stack>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Stack spacing={3}>
          {isEdit ? (
            <Markdown.Editor
              {...register('content')}
              commandName={_.values(
                _.omit(EDITOR_COMMANDS, [
                  'CODE',
                  'STRIKETHROUGH',
                  'UNORDERED_LIST',
                  'CHECKED_LIST',
                  'ORDERED_LIST',
                ])
              )}
              variant="filled"
              fontWeight={'semibold'}
              placeholder={placeholder}
              minH={'175px'}
              stackProps={{
                color: cardTextColor,
                backgroundColor: cardBgColor,
              }}
              value={value}
              setValue={setValue}
            />
          ) : (
            <Markdown.Preview value={value} />
          )}
          <Button disabled={isSubmitting} isLoading={isSubmitting} type={'submit'}>
            Adu Nasib!
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

type Props = {
  value: string;
  setValue: ReactSetter<string>;
  placeholder?: string;
  schema: typeof postSchema | typeof commentSchema;
  onSubmit?: (data: Schema, reset: UseFormReset<Schema>) => void;
};

export default PostCommentField;
