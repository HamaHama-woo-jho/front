import React from 'react';
import PropTypes from 'prop-types';
import Menu from './menu/Menu';

const AppLayout = ({ children }) => (
  <>
    <div style={{ height: '100vh' }}>
      <Menu />
      <div className="pt-36 h-full flex flex-col" style={{ justifyContent: 'space-between' }}>
        {children}
        <div
          className="w-full text-center text-white py-1"
          style={{
            backgroundColor: '#5f5f5f',
            bottom: 0,
          }}
        >
          @jaegoo hyein
        </div>
      </div>
    </div>
  </>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
