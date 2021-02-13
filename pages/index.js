import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';
import ChatBoxCopy from '../components/chatBox/ChatBoxCopy';
import ToolBar from '../components/ToolBar';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
  const dispatch = useDispatch();
  const { mainPosts, loadPostsLoading } = useSelector((state) => state.post);

  useEffect(() => {
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
        <ToolBar />
        <div className="grid gap-x-0 grid-cols-1 xl:grid-cols-2">
          {mainPosts.map((post) => (
            <ChatBoxCopy post={post} />
          ))}
        </div>
      </>
    </AppLayout>
  );
};

export default Home;
