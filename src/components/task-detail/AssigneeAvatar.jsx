
import React from 'react';

const AssigneeAvatar = ({ assignee, size = '8' }) => {
  const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
  const color = assignee ? colors[assignee.charCodeAt(0) % colors.length] : 'bg-gray-400';
  const nameInitial = assignee ? assignee.split(' ').map(n => n[0]).slice(0, 2).join('') : '?';

  return (
    <div className={`w-${size} h-${size} rounded-full ${color} flex items-center justify-center text-white text-xs font-bold border-2 border-background -ml-2`}>
      {nameInitial}
    </div>
  );
};

export default AssigneeAvatar;
