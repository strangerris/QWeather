import { getFxTime } from "@/utils";
interface DayItemProps {
  fxTime: string;     // 时间戳（必选）
  icon: string;        // 天气图标（必选）
  temp: number;        // 温度（必选）
}
const DayItem = ({ fxTime, icon, temp }) => {


    return (
        <div className={`w-16 flex-shrink-0 flex flex-col items-center text-center py-3 px-2 rounded-lg transition-all duration-200 hover:bg-gray-50 
            }`}>
            {/* 时间 */}
            <div className={`text-xs mb-2  font-medium text-gray-500`}>
                {getFxTime(fxTime)}
            </div>

            {/* 天气图标 */}
            <div className={`qi-${icon} text-2xl mb-2 text-gray-600`}></div>

            {/* 温度 */}
            <div className={`text-sm font-medium text-gray-700`}>
                {temp}°
            </div>
        </div>
    );
}

export default DayItem;