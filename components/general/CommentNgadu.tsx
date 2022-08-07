import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';
import { addData as _addData } from '../../store/actions/resources';
import { RESOURCE_NAME } from '../../utils/constant';
import { commentSchema } from '../../utils/schema';

const CommentNgadu = ({ addData }: Props) => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const postId = +router.query.id!;

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields: touched },
  } = useForm<typeof commentSchema['shape']>({
    resolver: zodResolver(commentSchema),
  });

  const addComment = async (values: typeof commentSchema['shape']) => {
    const data = await addData(RESOURCE_NAME.COMMENT, values);
  };

  return (
    <Box
      backgroundColor="gray.700"
      width={{ base: 'sm', md: 'md' }}
      p={3}
      borderRadius={'md'}
      gap={3}
      boxShadow={'md'}
      overflow={'hidden'}
      transition="all 0.3s ease-in-out"
      minWidth={'100%'}
      minHeight={'75px'}
    >
      <form onSubmit={handleSubmit(addComment, console.log)}>
        <Stack>
          <FormControl isInvalid={!!errors?.content?.message && !!touched?.content}>
            <FormLabel fontWeight={'bold'}>Adu nasibmu?</FormLabel>
            <Textarea
              {...register('content')}
              name={'content'}
              variant="filled"
              fontWeight={'semibold'}
              placeholder="Lu mah mending lah gw..."
            />
            <FormErrorMessage>{errors?.content?.message}</FormErrorMessage>
          </FormControl>
          <Button type="submit">Adu Nasib!</Button>
        </Stack>
      </form>
    </Box>
  );
};

const connector = connect(null, {
  addData: _addData,
});

type Props = ConnectedProps<typeof connector>;

export default connector(CommentNgadu);
