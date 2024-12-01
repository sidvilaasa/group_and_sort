import React, { useMemo } from 'react';
import Column from './Column';

function Board({ tickets, users, grouping, sorting }) {
  const groupedAndSortedTickets = useMemo(() => {
    const groupTickets = () => {
      switch (grouping) {
        case 'status': {
          const statusOrder = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
          const grouped = tickets.reduce((acc, ticket) => {
            const status = ticket.status;
            if (!acc[status]) acc[status] = [];
            acc[status].push(ticket);
            return acc;
          }, {});
          
          return statusOrder.reduce((acc, status) => {
            acc[status] = grouped[status] || [];
            return acc;
          }, {});
        }
        case 'user':
          return tickets.reduce((acc, ticket) => {
            const user = users.find(u => u.id === ticket.userId);
            const userName = user ? user.name : 'Unassigned';
            if (!acc[userName]) acc[userName] = [];
            acc[userName].push(ticket);
            return acc;
          }, {});
        case 'priority': {
          const priorityOrder = ['No priority', 'Urgent', 'High','Medium', 'Low' ];
          const priorityMap = {
            4: 'Urgent',
            3: 'High',
            2: 'Medium',
            1: 'Low',
            0: 'No priority'
          };
          
          const grouped = tickets.reduce((acc, ticket) => {
            const priority = priorityMap[ticket.priority];
            if (!acc[priority]) acc[priority] = [];
            acc[priority].push(ticket);
            return acc;
          }, {});

          return priorityOrder.reduce((acc, priority) => {
            acc[priority] = grouped[priority] || [];
            return acc;
          }, {});
        }
        default:
          return { 'All Tickets': tickets };
      }
    };

    const sortTickets = (ticketsToSort) => {
      return [...ticketsToSort].sort((a, b) => {
        if (sorting === 'priority') {
          return b.priority - a.priority;
        }
        return a.title.localeCompare(b.title);
      });
    };

    const grouped = groupTickets();
    return Object.entries(grouped).map(([key, groupTickets]) => ({
      title: key,
      tickets: sortTickets(groupTickets)
    }));
  }, [tickets, users, grouping, sorting]);

  return (
    <div className="board">
      {groupedAndSortedTickets.map(group => (
        <Column 
          key={group.title}
          title={group.title}
          tickets={group.tickets}
          users={users}
          grouping={grouping}
        />
      ))}
    </div>
  );
}

export default Board;

