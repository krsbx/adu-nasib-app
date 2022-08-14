import {
  Button,
  Flex,
  Image,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { IoMdKey } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import { getCurrentUser } from '../../store/selector/currentUser';
import * as cookieUtils from '../../utils/cookieUtils';
import LoginModal from '../modals/LoginModal';
import RegisterModal from '../modals/RegisterModal';

const Topbar = ({ currentUser }: Props) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (!router.isReady) return;

    setIsAuth(cookieUtils.isAuthenticated());
  }, [router.isReady, currentUser]);

  const colorToggleColor = useColorModeValue('gray.500', 'gray.300');
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();

  const onClickOnAduNasib = () => {
    if (isAuth) return router.push('/post/create');

    onRegisterOpen();
  };

  return (
    <Flex width="100%" justifyContent={'center'} transition="all 0.3s ease-in-out">
      <Flex width="90%" justifyContent={'space-between'}>
        <Flex direction={'column'} gap={2} justifyContent={'center'} color={colorToggleColor}>
          <Image src="/AduNasib.jpg" alt="logo" w={'120px'} h="auto" />
          <Text fontSize={'sm'} fontWeight={'semibold'}>
            Sudahkah kamu mengadu nasib hari ini?
          </Text>
        </Flex>
        <Stack direction={'row'} gap={5} alignItems={'center'}>
          <Button onClick={onClickOnAduNasib} variant={'ghost'} color={colorToggleColor}>
            <Flex gap={2} alignItems={'center'}>
              <MdEdit size={20} />
              <Text>Adu Nasib</Text>
            </Flex>
          </Button>
          {!isAuth && (
            <Button onClick={onLoginOpen} variant={'ghost'} color={colorToggleColor}>
              <Flex gap={2} alignItems={'center'}>
                <IoMdKey size={25} />
                <Text>Masuk</Text>
              </Flex>
            </Button>
          )}
          <Button onClick={toggleColorMode} variant={'ghost'} color={colorToggleColor}>
            <Flex gap={2} alignItems={'center'}>
              {colorMode === 'dark' ? <FaSun /> : <FaMoon />}
              <Text>{colorMode === 'dark' ? 'Dark' : 'Light'}</Text>
            </Flex>
          </Button>
        </Stack>
      </Flex>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <RegisterModal isOpen={isRegisterOpen} onClose={onRegisterClose} onLoginOpen={onLoginOpen} />
    </Flex>
  );
};

const mapStateToProps = (state: AppState) => ({
  currentUser: getCurrentUser(state),
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(Topbar);
