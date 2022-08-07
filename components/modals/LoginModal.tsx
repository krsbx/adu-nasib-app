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
import { loginSchema } from '../../utils/schema';

const LoginModal = ({ isOpen, onClose }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields: touched },
  } = useForm<typeof loginSchema['shape']>({
    resolver: zodResolver(loginSchema),
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
            <Text>Masuk</Text>
          </Flex>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(console.log, console.log)}>
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
              <Button type="submit">Adu Nasib!</Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default LoginModal;
