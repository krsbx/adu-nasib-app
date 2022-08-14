import {
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaMoon, FaSearch, FaSun } from 'react-icons/fa';
import { IoMdKey } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import { getCurrentUser } from '../../store/selector/currentUser';
import { PLACEHOLDER } from '../../utils/constant';
import * as cookieUtils from '../../utils/cookieUtils';
import { searchSchema } from '../../utils/schema';
import LoginModal from '../modals/LoginModal';
import RegisterModal from '../modals/RegisterModal';

type Schema = { keyword: string };

const Topbar = ({ currentUser }: Props) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const topBarBgColor = useColorModeValue('whiteAlpha.600', 'gray.800');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(searchSchema),
  });

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

  const onSubmit = (value: Schema) => {
    router.push(`/search?keyword=${value.keyword}`);
  };

  return (
    <Flex
      width="100%"
      justifyContent={'center'}
      transition="all 0.3s ease-in-out"
      bgColor={topBarBgColor}
    >
      <Grid width="90%" templateColumns={'repeat(3,1fr)'} alignItems={'center'}>
        <GridItem>
          <NextLink href="/" passHref>
            <ChakraLink>
              <Flex direction={'column'} color={colorToggleColor}>
                <Image src="/AduNasib.jpg" alt="logo" w={'120px'} h="auto" mb={2} />
                <Text fontSize={'sm'} fontWeight={'semibold'}>
                  Sudahkah kamu mengadu nasib hari ini?
                </Text>
              </Flex>
            </ChakraLink>
          </NextLink>
        </GridItem>
        <GridItem>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup>
              <Input
                {...register('keyword')}
                type={'keyword'}
                name={'keyword'}
                variant={'filled'}
                textAlign={'center'}
                placeholder={PLACEHOLDER.SEARCH}
              />
              <InputRightElement>
                <Button type="submit" variant="ghost" isLoading={isSubmitting}>
                  <FaSearch />
                </Button>
              </InputRightElement>
            </InputGroup>
          </form>
        </GridItem>
        <GridItem>
          <Stack direction={'row'} gap={5} justifyContent={'right'}>
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
        </GridItem>
      </Grid>
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
