
const US_HOLIDAYS = {
    '2024-01-01': 'New Year\'s Day',
    '2024-07-04': 'Independence Day'
    // Add more US holidays here
};
const IN_HOLIDAYS = {
    '2025-01-01': 'New Year',
    '2025-01-26': 'Republic Day',
    '2025-02-26': 'Shivratri',
    '2025-03-14': 'Dhuleti / Holi',
    '2025-03-31': 'Eid al-Fitr (Ramzan Eid)',
    '2025-04-18': 'Good Friday',
    '2025-08-15': 'Independence Day',
    '2025-10-02': 'Gandhi Jayanti / Dusshera',
    '2025-10-20': 'Diwali',
    '2025-10-21': 'Diwali',
    '2025-11-01': 'Kannada Rajyothsava/Haryana Day',
    '2025-12-25': 'Christmas'
    // Add more Indian holidays here
};

const IN_RESTRICTED_HOLIDAYS = {
    '2025-01-13': 'Lohri',
    '2025-01-14': 'Makar Sankranti/ Pongal',
    '2025-03-13': 'Holika Dahan',
    '2025-05-01': 'Labour Day',
    '2025-06-06': 'Bakri Id/Eid ul-Adha',
    '2025-06-27': 'Rath Yatra',
    '2025-08-27': 'Ganesh Chaturthi',
    '2025-09-04': 'Milad un-Nabi',
    '2025-09-05': 'Onam',
    '2025-10-22': 'Gowardhan Puja',
    '2025-10-23': 'Bhai Duj',
    '2025-10-27': 'Chhat Puja',
    '2025-11-05': 'Guru Nanak Jayanti',
    '2025-12-31': 'New Year Eve'
};

const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();

// Render both months side by side
function renderCalendar(year, month) {
    const currenttMonthDate = new Date(year, month, 1);
    const nextMonthDate = new Date(year, month + 1, 1);
    const calendarsHTML = [
        getMonthHTML(currenttMonthDate.getFullYear(), currenttMonthDate.getMonth()),
        getMonthHTML(nextMonthDate.getFullYear(), nextMonthDate.getMonth())
    ].join('');
    document.getElementById('calendar').innerHTML = calendarsHTML;
}

function getMonthHTML(year, month) {
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);
    const daysInMonth = monthEnd.getDate();
    const startDay = monthStart.getDay();
    const monthName = monthStart.toLocaleString('default', { month: 'long' });
    let html = `<div class="month"><h3>${monthName} ${year}</h3>`;
    html += '<div class="weekdays">';
    ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d => {
        html += `<div>${d}</div>`;
    });
    html += '</div><div class="days">';
    
    // Pad days before month start
    for (let i=0; i<startDay; i++) {
        html += '<div></div>';
    }

    for (let d=1; d<=daysInMonth; d++) {
        const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        let classes = '';
        if (year === today.getFullYear() && month === today.getMonth() && d === today.getDate()) {
            classes += 'today ';
        }
        if (US_HOLIDAYS[dateStr]) classes += 'us-holiday ';
        if (IN_HOLIDAYS[dateStr]) classes += 'in-holiday ';
        if (IN_RESTRICTED_HOLIDAYS[dateStr]) classes += 'in-restricted-holiday ';
        const dayOfWeek = new Date(year, month, d).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            classes += 'weekend ';
        }
        html += `<div class="${classes.trim()}">${d}</div>`;
    }
    html += '</div></div>';
    return html;
}

// Initial render: current month + next month
renderCalendar(currentYear, currentMonth);

// Navigation
document.getElementById('prevBtn').onclick = () => {
    currentMonth--;
    renderCalendar(currentYear, currentMonth);
};
document.getElementById('nextBtn').onclick = () => {
    currentMonth++;
    renderCalendar(currentYear, currentMonth);
};

function getUpcomingHolidays() {
    const holidays = [];
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 60);

    function addHolidays(holidayList, type) {
        for (const date in holidayList) {
            const holidayDate = new Date(date);
            if (holidayDate >= today && holidayDate <= futureDate) {
                holidays.push({ date: holidayDate, name: holidayList[date], type });
            }
        }
    }

    addHolidays(US_HOLIDAYS, 'US Holiday');
    addHolidays(IN_HOLIDAYS, 'Indian Holiday');
    addHolidays(IN_RESTRICTED_HOLIDAYS, 'Indian Restricted Holiday');

    holidays.sort((a, b) => a.date - b.date);

    let tableHTML = '<h3>Upcoming Holidays</h3><table style="margin: 0 auto; border-collapse: collapse;"><tr><th style="border: 1px solid #ccc; padding: 8px;">Date</th><th style="border: 1px solid #ccc; padding: 8px;">Name</th><th style="border: 1px solid #ccc; padding: 8px;">Type</th></tr>';
    holidays.forEach(holiday => {
        tableHTML += `<tr><td style="border: 1px solid #ccc; padding: 8px;">${holiday.date.toDateString()}</td><td style="border: 1px solid #ccc; padding: 8px;">${holiday.name}</td><td style="border: 1px solid #ccc; padding: 8px;">${holiday.type}</td></tr>`;
    });
    tableHTML += '</table>';
    document.getElementById('upcomingHolidays').innerHTML = tableHTML;
}

// Initial render: current month + next month
renderCalendar(currentYear, currentMonth);

// Navigation
document.getElementById('prevBtn').onclick = () => {
    currentMonth--;
    renderCalendar(currentYear, currentMonth);
};
document.getElementById('nextBtn').onclick = () => {
    currentMonth++;
    renderCalendar(currentYear, currentMonth);
};

getUpcomingHolidays();