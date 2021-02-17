import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StackGrid from 'react-stack-grid';
import AppLayout from '../components/AppLayout';
import ChatBoxCopy from '../components/chatBox/ChatBoxCopy';
import ToolBar from '../components/ToolBar';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Home = () => {
  const dispatch = useDispatch();
  const { mainPosts, loadPostsLoading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (!loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [loadPostsLoading]);

  return (
    <AppLayout>
      <>
        <div>
          <ToolBar className="m-auto" />
        </div>
        <StackGrid columnWidth={280} gutterWidth={3} gutterHeight={25}>
          {mainPosts.map((post) => (
            <div>
              <ChatBoxCopy post={post} />
            </div>
          ))}
        </StackGrid>
      </>
    </AppLayout>
  );
};

export default Home;
