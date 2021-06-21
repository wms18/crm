import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './calendar.css'
import timeGridPlugin from "@fullcalendar/timegrid";
import "@fullcalendar/timegrid/main.css";

function SchedulePage() {
    let handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
    }
    return(
        <div>
            <FullCalendar
                defaultView="dayGridMonth"
                plugins={[dayGridPlugin, timeGridPlugin]}
                header={{
                    // 上一年，上一月，下一月，下一年 今天(逗号为紧相邻，空格为有间隙，不写哪个就不展示哪个按钮)
                    left: "prevYear,prev,next,nextYear today",
                    // 默认显示当前年月
                    center: "title",
                    // 右侧月 周 天切换按钮
                    right: "dayGridMonth,timeGridWeek,timeGridDay"
                }}
                locale='zh-cn'
                buttonText={{
                    today: '今天',
                    month: '月',
                    week: '周',
                    day: '天'
                }}
                firstDay={1}
                allDayText='全天'
                slotLabelFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false,
                    hour12: false
                }}
            />
        </div>
    )
}
export default SchedulePage;
