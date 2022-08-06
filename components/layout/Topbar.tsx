import { Flex, Image, Stack, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { VscKey } from 'react-icons/vsc';
import LoginModal from '../modals/LoginModal';
import RegisterModal from '../modals/RegisterModal';

const Topbar = () => {
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();

  return (
    <Flex width="100%" justifyContent={'center'}>
      <Flex width="90%" justifyContent={'space-between'}>
        <Flex direction={'column'} gap={2} justifyContent={'center'}>
          <Image src="/AduNasib.jpg" alt="logo" w={'120px'} h="auto" />
          <Text>Sudahkah kamu mengadu nasib hari ini?</Text>
        </Flex>
        <Stack direction={'row'} gap={5} alignItems={'center'}>
          <Flex gap={2} alignItems={'center'} cursor={'pointer'} onClick={onRegisterOpen}>
            <FiEdit2 />
            <Text>Adu Nasib</Text>
          </Flex>
          <Flex gap={2} alignItems={'center'} cursor={'pointer'} onClick={onLoginOpen}>
            <VscKey />
            <Text>Masuk</Text>
          </Flex>
        </Stack>
      </Flex>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <RegisterModal isOpen={isRegisterOpen} onClose={onRegisterClose} onLoginOpen={onLoginOpen} />
    </Flex>
  );
};

export default Topbar;
