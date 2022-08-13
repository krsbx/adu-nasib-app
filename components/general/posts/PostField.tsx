import { Flex, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { UseFormReset } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';
import { Markdown } from '..';
import useCardColorMode from '../../../hooks/useCardColorMode';
import { addData as _addData } from '../../../store/actions/resources';
import { PLACEHOLDER, RESOURCE_NAME } from '../../../utils/constant';
import { Post } from '../../../utils/interfaces';
import { postSchema } from '../../../utils/schema';
import { commentTheme } from '../../../utils/theme';

type Schema = { content: string };

const PostField = ({ addData }: Props) => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const { cardBgColor } = useCardColorMode();

  const onSubmit = async (values: Schema, reset: UseFormReset<Schema>) => {
    const { id } = (await addData(RESOURCE_NAME.POST, values)) as Post;

    reset({
      content: '',
    });

    router.push(`/post/${id}`);
  };

  return (
    <Stack {...commentTheme} backgroundColor={cardBgColor} spacing={1}>
      <Flex justifyContent={'center'}>
        <Text fontSize={'md'} lineHeight={'base'} fontWeight={'bold'}>
          Mari Adu Nasib Mu!
        </Text>
      </Flex>
      <Markdown.PostCommentField
        schema={postSchema}
        value={value}
        setValue={setValue}
        onSubmit={onSubmit}
        placeholder={PLACEHOLDER.POST}
      />
    </Stack>
  );
};

const connector = connect(null, {
  addData: _addData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(PostField);
