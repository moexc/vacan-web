import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { FC } from 'react';
import { useField } from 'formik';
import { parseDate } from '../util/time';

const DateInput: FC<{
    options ?: {
        enableTime?: boolean,
        dateFormat?: string,
        minDate?: Date,
    },
    className?: string,
    name: string,
}> = ({options, className, name}) => {

    const [field, meta, helper] = useField({ name })
    const { value } = meta
    const { setValue } = helper

    const handChange = (date : Date[]) => {
        setValue(date.length > 0 ? parseDate(date[0]) : '')
    }

    return (
        <Flatpickr
        name={name}
        data-enable-time
        value={value}
        options={{
            ...options,
            locale: {
                weekdays: {
                    shorthand: ["日", "一", "二", "三", "四", "五", "六"],
                    longhand: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
                },
                months: {
                    shorthand: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                    longhand: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                },
                rangeSeparator: " 至 ",
                weekAbbreviation: "周",
                scrollTitle: "滚动切换",
                toggleTitle: "点击切换 12/24 小时时制",
                time_24hr: true,
                amPM:['上午', '下午']
            }
        }}
        className={`form-input ${className}`}
        onChange={(date) => {handChange(date)} }
        />
    )
}

export default DateInput