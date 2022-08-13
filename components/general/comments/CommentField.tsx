import { Flex, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { UseFormReset } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';
import { Markdown } from '..';
import useCardColorMode from '../../../hooks/useCardColorMode';
import { addData as _addData } from '../../../store/actions/resources';
import { PLACEHOLDER, RESOURCE_NAME } from '../../../utils/constant';
import { commentSchema } from '../../../utils/schema';
import { commentTheme } from '../../../utils/theme';

type Schema = { content: string };

const CommentField = ({ addData }: Props) => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const postId = +router.query.id!;
  const [value, setValue] = useState('');

  const { cardBgColor } = useCardColorMode();

  const onSubmit = async (values: Schema, reset: UseFormReset<Schema>) => {
    await addData(RESOURCE_NAME.COMMENT, Object.assign(values, { postId }));
    reset({
      content: '',
    });
  };

  return (
    <Stack {...commentTheme} backgroundColor={cardBgColor} spacing={1}>
      <Flex justifyContent={'center'}>
        <Text fontSize={'md'} lineHeight={'base'} fontWeight={'bold'}>
          Mari Adu Nasib Mu!
        </Text>
      </Flex>
      <Markdown.PostCommentField
        schema={commentSchema}
        value={value}
        setValue={setValue}
        onSubmit={onSubmit}
        placeholder={PLACEHOLDER.COMMENT}
      />
    </Stack>
  );
};

const connector = connect(null, {
  addData: _addData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(CommentField);
