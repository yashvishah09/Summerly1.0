import React from 'react';

function Link({ href, children }) {
  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    event.preventDefault();
    window.history.pushState({}, '', href);

    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };
  return (
    <div>
      <a onClick={handleClick} href={href}>
        {children}
      </a>
    </div>
  );
}

export default Link;
