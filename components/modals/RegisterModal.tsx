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
import { registerSchema } from '../../utils/schema';

const RegisterModal = ({ isOpen, onClose, onLoginOpen }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields: touched, isSubmitting },
  } = useForm<typeof registerSchema['shape']>({
    resolver: zodResolver(registerSchema),
  });

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
            <Text>Daftar</Text>
          </Flex>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(console.log)}>
            <Stack spacing={5}>
              <FormControl isInvalid={!!errors?.username?.message && !!touched?.username}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <InputGroup>
                  <Input
                    {...register('username')}
                    name={'username'}
                    variant="filled"
                    placeholder="Masukan username..."
                  />
                </InputGroup>
                <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
              </FormControl>
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
                <Text fontSize={'xs'}>Sudah punya akun?</Text>
                <Text
                  fontSize={'xs'}
                  cursor={'pointer'}
                  textDecoration={'underline'}
                  _hover={{
                    color: 'blue.500',
                  }}
                  onClick={() => {
                    onClose();
                    onLoginOpen();
                  }}
                >
                  Masuk
                </Text>
              </Flex>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const connector = connect(null, {});

type Props = ConnectedProps<typeof connector> & {
  isOpen: boolean;
  onClose: () => void;
  onLoginOpen: () => void;
};

export default connector(RegisterModal);
