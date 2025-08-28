import React from 'react';

export default function DdangyoMock() {
  const outerStyle = {
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    backgroundColor: '#fff'
  };

  const innerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column'
  };

  const scrollAreaStyle = {
    flex: 1,
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    paddingBottom: '80px' // 네비게이션 높이만큼 여백
  };

  const navStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '80px',
    backgroundColor: '#fff',
    borderTop: '1px solid #eee',
    zIndex: 1000
  };

  const uiImgStyle = {
    display: 'block',
    width: '100%',
    height: 'auto',
    maxWidth: '100%'
  };

  const navImgStyle = {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  return (
    <div style={outerStyle}>
      <div style={innerStyle}>
        <div style={scrollAreaStyle}>
          <img src="/ddangyoUI.png" alt="ddangyo UI" style={uiImgStyle} />
        </div>
        <div style={navStyle}>
          <img src="/ddangyoUI_nav.png" alt="ddangyo Bottom Nav" style={navImgStyle} />
        </div>
      </div>
    </div>
  );
}


