import { getFxDate } from '@/utils/';
import WeatherProgress from '../WeatherProgress';
import useWeatherStore from '@/store/WeatherStore';
const WeekItem = ({ fxDate, iconDay, iconNight, tempMin, tempMax, minTemp, maxTemp, currentTemp, isToday }) => {
    const isDayFlag = useWeatherStore( state => state.isDayFlag)
    return (
        <div className="flex items-center justify-between py-2 ">
            {/* 日期 */}
            <div className="w-16">
                <div className={`text-sm font-medium 'text-gray-700'`}>
                    {getFxDate(fxDate)}
                </div>
            </div>

            {/* 天气图标 */}
            <div className="w-10 text-center">
                <div className={`${isDayFlag ? "qi-" + iconDay : "qi-" + iconNight} text-2xl `}></div>
            </div>

            {/* 温度范围 */}
            <div className="w-20 text-right">
                <span className="text-sm font-medium text-gray-600">{tempMin}°</span>
                <span className="text-gray-400 mx-1">~</span>
                <span className="text-sm font-medium text-gray-800">{tempMax}°</span>
            </div>

            {/* 温度进度条 */}
            <div className="w-20 flex-1 ml-4 min-w-15">
                <WeatherProgress
                    minTemp={minTemp}
                    maxTemp={maxTemp}
                    dayMin={tempMin}
                    dayMax={tempMax}
                    currentTemp={isToday ? currentTemp : undefined}
                    isToday={isToday}
                />
            </div>
        </div>
    );
}
export default WeekItem