import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { VscKey } from 'react-icons/vsc';
import { connect, ConnectedProps } from 'react-redux';
import { loginUser as _loginUser } from '../../store/actions/currentUser';
import { User } from '../../utils/interfaces';
import { loginSchema } from '../../utils/schema';
import { Form } from '../general';

type Schema = Pick<User, 'email' | 'password'>;

const LoginModal = ({ isOpen, onClose, loginUser, onRegisterOpen }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields: touched, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: Schema) => {
    await loginUser(values);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      closeOnOverlayClick
      allowPinchZoom
      isCentered
      closeOnEsc
    >
      <ModalOverlay />
      <ModalContent px={2} py={4}>
        <ModalHeader>
          <Flex justifyContent={'center'} alignItems={'center'} gap={2}>
            <VscKey />
            <Text>Masuk</Text>
          </Flex>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={5}>
              <FormControl isInvalid={!!errors?.email?.message && !!touched?.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <InputGroup>
                  <Input
                    {...register('email')}
                    type={'email'}
                    name={'email'}
                    variant="filled"
                    placeholder="Masukan email..."
                  />
                </InputGroup>
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors?.password?.message && !!touched?.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    {...register('password')}
                    type={isPasswordVisible ? 'text' : 'password'}
                    name={'password'}
                    variant="filled"
                    placeholder="Masukan kata sandi..."
                  />
                  <InputRightElement
                    onClick={() => setIsPasswordVisible((curr) => !curr)}
                    cursor={'pointer'}
                  >
                    {isPasswordVisible ? <FiEye /> : <FiEyeOff />}
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>
              <Button disabled={isSubmitting} isLoading={isSubmitting} type={'submit'}>
                Adu Nasib!
              </Button>
              <Flex alignItems="center" justifyContent="center" gap={4} px={3}>
                <Text fontSize={'xs'}>Belum punya akun?</Text>
                <Text
                  fontSize={'xs'}
                  cursor={'pointer'}
                  textDecoration={'underline'}
                  _hover={{
                    color: 'blue.500',
                  }}
                  onClick={() => {
                    onClose();
                    onRegisterOpen();
                  }}
                >
                  Daftar
                </Text>
              </Flex>
            </Stack>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const connector = connect(null, {
  loginUser: _loginUser,
});

type Props = ConnectedProps<typeof connector> & {
  isOpen: boolean;
  onClose: () => void;
  onRegisterOpen: () => void;
};

export default connector(LoginModal);
