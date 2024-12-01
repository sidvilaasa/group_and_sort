import React from 'react';

function Card({ ticket, user, grouping }) {
  const getStatusIcon = (status) => {
    const statusMap = {
      'backlog': '/icons/Backlog.svg',
      'todo': '/icons/To-do.svg',
      'in progress': '/icons/in-progress.svg',
      'done': '/icons/Done.svg',
      'cancelled': '/icons/Cancelled.svg'
    };
    return statusMap[status.toLowerCase()];
  };

  const getPriorityIcon = (priority) => {
    const priorityMap = {
      0: '/icons/No-priority.svg',
      4: '/icons/SVG - Urgent Priority colour.svg',
      3: '/icons/Img - High Priority.svg',
      2: '/icons/Img - Medium Priority.svg',
      1: '/icons/Img - Low Priority.svg'
      
    };
    return priorityMap[priority];
  };

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        {grouping !== 'user' && user && (
          <div className="user-avatar" title={user.name}>
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
      </div>
      <div className="ticket-content">
        {grouping !== 'status' && (
          <div className="status-wrapper">
            <img 
              src={getStatusIcon(ticket.status)} 
              alt={ticket.status}
              width="16"
              height="16"
              className="status-icon"
            />
          </div>
        )}
        <h3 className="ticket-title">{ticket.title}</h3>
      </div>
      <div className="ticket-footer">
        {grouping !== 'priority' && (
          <img 
            src={getPriorityIcon(ticket.priority)} 
            alt="priority"
            width="16"
            height="16"
            className="priority-icon"
          />
        )}
        <div className="tag-container">
          {ticket.tag.map((tag, index) => (
            <span key={index} className="feature-tag">
              <span className="dot">●</span> {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;

