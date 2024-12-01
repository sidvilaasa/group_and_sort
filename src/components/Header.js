import React, { useState } from 'react';

function Header({ grouping, setGrouping, sorting, setSorting }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="header">
      <div className="display-button" onClick={() => setIsOpen(!isOpen)}>
        <img src="/icons/Display.svg" alt="display" width="16" height="16" />
        <span>Display</span>
        <img 
          src="/icons/down.svg" 
          alt="toggle menu" 
          width="16" 
          height="16"
          className={isOpen ? 'icon-rotated' : ''}
        />
      </div>

      {isOpen && (
        <div className="display-dropdown">
          <div className="dropdown-group">
            <span>Grouping</span>
            <select 
              value={grouping} 
              onChange={(e) => setGrouping(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="dropdown-group">
            <span>Ordering</span>
            <select 
              value={sorting} 
              onChange={(e) => setSorting(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;

