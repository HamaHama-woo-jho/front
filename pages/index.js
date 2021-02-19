import React, { useEffect } from 'react';
import StackGrid from 'react-stack-grid';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';
import ChatBoxCopy from '../components/chatBox/ChatBoxCopy';
import { LOAD_POSTS_REQUEST, CLEAR_PAGE_DATA } from '../reducers/post';
import FilterBar from '../components/filterBar/FilterBar';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import filterPosts from '../api/filterPosts';

const Home = () => {
  const dispatch = useDispatch();
  const { mainPosts, loadPostsLoading, pageData } = useSelector((state) => state.post);
  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    dispatch({
      type: CLEAR_PAGE_DATA,
    });
    dispatch({
      type: LOAD_POSTS_REQUEST,
      data: { pageData: null },
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (!loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
            data: { pageData },
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
      <div className="flex">
        <div className="w-4/5">
          <StackGrid columnWidth={280} gutterWidth={3} gutterHeight={25} className="mt-15 mb-5">
            {filterPosts(mainPosts, filter).map((post) => (
              <div>
                <ChatBoxCopy post={post} />
              </div>
            ))}
          </StackGrid>
        </div>
        <div className="w-72 pr-5">
          <FilterBar />
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
