import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Post, Wrapper } from '../components/general';
import FieldPlaceholder from '../components/general/placeholder/FieldPlaceholder';
import { AppState } from '../store';
import { getCurrentUser } from '../store/selector/currentUser';
import { PLACEHOLDER } from '../utils/constant';
import * as cookieUtils from '../utils/cookieUtils';

const Posts = dynamic(import('./posts/index'), { ssr: false });

const HomePage = ({ currentUser }: Props) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [hasFocused, setHasFocused] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    setIsAuth(cookieUtils.isAuthenticated());
  }, [router.isReady, currentUser]);

  return (
    <Box>
      {isAuth && (
        <Wrapper>
          {hasFocused ? (
            <Post.PostField />
          ) : (
            <FieldPlaceholder onClick={() => setHasFocused(true)} placeholder={PLACEHOLDER.POST} />
          )}
        </Wrapper>
      )}
      <Posts />
    </Box>
  );
};

const mapStateToProps = (state: AppState) => ({
  currentUser: getCurrentUser(state),
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(HomePage);
