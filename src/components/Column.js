import React from 'react';
import Card from './Card';

function Column({ title, tickets, users, grouping }) {

  const getColumnIcon = () => {
    if (grouping === 'status') {
      const statusMap = {
        'backlog': '/icons/Backlog.svg',
        'todo': '/icons/To-do.svg',
        'in progress': '/icons/in-progress.svg',
        'done': '/icons/Done.svg',
        'cancelled': '/icons/Cancelled.svg'
      };
      return (
        <img 
          src={statusMap[title.toLowerCase()]} 
          alt={title}
          width="16"
          height="16"
          className="status-icon"
        />
      );
    } else if (grouping === 'priority') {
      const priorityMap = {
        'Urgent': '/icons/SVG - Urgent Priority colour.svg',
        'High': '/icons/Img - High Priority.svg',
        'Medium': '/icons/Img - Medium Priority.svg',
        'Low': '/icons/Img - Low Priority.svg',
        'No priority': '/icons/No-priority.svg'
      };
      return (
        <img 
          src={priorityMap[title]} 
          alt={title}
          width="16"
          height="16"
          className="priority-icon"
        />
      );
    }
    return null;
  };

  return (
    <div className="board-column">
      <div className="column-header">
        <div className="column-title">
          {grouping === 'user' && (
            <>
              <div className="user-avatar" title={title}>
                {title.split(' ').map(n => n[0]).join('')}
              </div>
              <span className="user-name">{title}</span>
            </>
          )}
          {getColumnIcon()}
          {grouping !== 'user' && <span>{title}</span>}
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <div className="column-actions">
          <button className="icon-button">
            <img src="/icons/add.svg" alt="add" width="16" height="16" />
          </button>
          <button className="icon-button">
            <img src="/icons/3 dot menu.svg" alt="more options" width="16" height="16" />
          </button>
        </div>
      </div>
      <div className="column-content">
        {tickets.map(ticket => (
          <Card 
            key={ticket.id}
            ticket={ticket}
            user={users.find(user => user.id === ticket.userId)}
            grouping={grouping}
          />
        ))}
        {tickets.length === 0}
      </div>
    </div>
  );
}

export default Column;

