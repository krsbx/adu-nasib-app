import { Button, Stack, useColorModeValue } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import React, { createRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';
import { Markdown } from '..';
import useCardColorMode from '../../../hooks/useCardColorMode';
import { addData as _addData } from '../../../store/actions/resources';
import { PLACEHOLDER, RESOURCE_NAME } from '../../../utils/constant';
import { ResourceMap } from '../../../utils/interfaces';
import { commentSchema } from '../../../utils/schema';
import { commentTheme } from '../../../utils/theme';
import { EDITOR_COMMANDS } from '../markdown/command';

type Schema = Pick<ResourceMap[typeof RESOURCE_NAME.COMMENT], 'content'>;

const CommentField = ({ addData }: Props) => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const postId = +router.query.id!;
  const [isEdit, setIsEdit] = useState(true);
  const [value, setValue] = useState('');

  const containerRef = createRef<HTMLDivElement>();

  const { cardBgColor, cardTextColor } = useCardColorMode();
  const modeBgColor = useColorModeValue('gray.400', 'whiteAlpha.500');
  const modeTextColor = useColorModeValue('whiteAlpha.800', 'whiteAlpha.900');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (values: Schema) => {
    await addData(RESOURCE_NAME.COMMENT, Object.assign(values, { postId }));
    reset({
      content: '',
    });
  };

  return (
    <Stack {...commentTheme} backgroundColor={cardBgColor} spacing={1} ref={containerRef}>
      <Stack direction="row">
        <Button
          variant={'ghost'}
          px={2}
          w={'75px'}
          {...(isEdit && {
            backgroundColor: modeBgColor,
            color: modeTextColor,
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
            backgroundColor: modeBgColor,
            color: modeTextColor,
          })}
          transition={'all 0.3s ease-in-out'}
          onClick={() => setIsEdit(false)}
        >
          Preview
        </Button>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {isEdit ? (
            <Markdown.Editor
              {...register('content')}
              commandName={Object.values(EDITOR_COMMANDS)}
              variant="filled"
              fontWeight={'semibold'}
              placeholder={PLACEHOLDER.COMMENT}
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

const connector = connect(null, {
  addData: _addData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(CommentField);
