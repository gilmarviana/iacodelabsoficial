import React from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

function ScheduleCalendar({ events = [], currentDate, onDateChange, onEventClick }) {
  const [viewDate, setViewDate] = React.useState(currentDate || new Date());

  React.useEffect(() => {
    if (currentDate) setViewDate(currentDate);
  }, [currentDate]);

  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const weeks = []; 
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    const days = [];
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'yyyy-MM-dd');
      const dayEvents = events.filter(ev => format(parseISO(ev.dateTime), 'yyyy-MM-dd') === formattedDate);
      days.push({
        date: new Date(day),
        isCurrentMonth: isSameMonth(day, monthStart),
        isToday: isSameDay(day, new Date()),
        events: dayEvents,
      });
      day = addDays(day, 1);
    }
    weeks.push(days);
  }

  const handlePrevMonth = () => setViewDate(subMonths(viewDate, 1));
  const handleNextMonth = () => setViewDate(addMonths(viewDate, 1));

  return (
    <div className="rounded-lg border bg-white p-4 shadow">
      <div className="flex items-center justify-between mb-2">
        <button onClick={handlePrevMonth} className="p-1 rounded hover:bg-gray-100">{'<'}</button>
        <span className="font-semibold text-lg">{format(viewDate, 'MMMM yyyy', { locale: ptBR })}</span>
        <button onClick={handleNextMonth} className="p-1 rounded hover:bg-gray-100">{'>'}</button>
      </div>
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 mb-1">
        {['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'].map(d => <div key={d}>{d.slice(0,3)}</div>)}
      </div>
      {weeks.map((week, wi) => (
        <div className="grid grid-cols-7" key={wi}>
          {week.map((d, di) => (
            <div
              key={di}
              className={`relative h-20 border p-1 align-top cursor-pointer ${!d.isCurrentMonth ? 'bg-gray-50 text-gray-300' : ''} ${d.isToday ? 'border-blue-500' : ''}`}
              onClick={() => d.isCurrentMonth && onDateChange && onDateChange(d.date)}
            >
              <div className={`text-xs font-bold ${d.isToday ? 'text-blue-600' : ''}`}>{d.date.getDate()}</div>
              {d.events.map(ev => (
                <div
                  key={ev.id}
                  className="mt-1 px-1 py-0.5 rounded bg-purple-100 text-purple-800 text-xs truncate flex items-center gap-1"
                  title={ev.title}
                  onClick={e => { e.stopPropagation(); onEventClick && onEventClick(ev); }}
                >
                  {format(parseISO(ev.dateTime), 'HH:mm')} {ev.title}
                  {ev.meetLink && <span className="ml-1">🔗</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ScheduleCalendar;
