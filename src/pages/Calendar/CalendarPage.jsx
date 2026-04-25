import { MyCalendar } from "../../components/Calendar/Calendar"
import { Drawer } from "../../components/Drawer/Drawer"

export const Calendar = () => {
    return (
            <div className="calendar-page__right">
                <span>Календарь</span>
                <MyCalendar />
            </div>
    )
}