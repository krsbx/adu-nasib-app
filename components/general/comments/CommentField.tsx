import { Button, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';
import { Markdown } from '..';
import useCardColorMode from '../../../hooks/useCardColorMode';
import { addData as _addData } from '../../../store/actions/resources';
import { RESOURCE_NAME } from '../../../utils/constant';
import { commentSchema } from '../../../utils/schema';
import { commentTheme } from '../../../utils/theme';
import { EDITOR_COMMANDS } from '../markdown/command';

const CommentField = ({ addData }: Props) => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const postId = +router.query.id!;

  const { cardBgColor, cardTextColor } = useCardColorMode();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<typeof commentSchema['shape']>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (values: typeof commentSchema['shape']) =>
    await addData(RESOURCE_NAME.COMMENT, Object.assign(values, { postId }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack {...commentTheme} backgroundColor={cardBgColor}>
        <Markdown.Editor
          {...register('content')}
          commandName={Object.values(EDITOR_COMMANDS)}
          variant="filled"
          fontWeight={'semibold'}
          placeholder="Lu mah mending lah gw..."
          minH={'175px'}
          stackProps={{
            color: cardTextColor,
            backgroundColor: cardBgColor,
          }}
        />
        <Button disabled={isSubmitting} isLoading={isSubmitting} type={'submit'}>
          Adu Nasib!
        </Button>
      </Stack>
    </form>
  );
};

const connector = connect(null, {
  addData: _addData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(CommentField);
