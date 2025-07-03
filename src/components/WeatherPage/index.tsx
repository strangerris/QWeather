import WeatherNow from "@/components/WeatherNow";
import WeatherDay from "@/components/WeatherDay";
import WeatherWeek from "@/components/WeatherWeek";
import useWeatherStore from "@/store/WeatherStore";
import { Empty } from "@arco-design/web-react";
import { useShallow } from 'zustand/react/shallow';
const WeatherPage = ({ }) => {
    const { name, now, day, week } = useWeatherStore(
        useShallow(state => ({
            name: state.name,
            now: state.now,
            day: state.day,
            week: state.week
        })));

    const isReady = !!(name && now && day && week);

    return isReady ? (
        <div className="space-y-6">
            <WeatherNow name={name} now={now}></WeatherNow>
            <WeatherDay day={day}></WeatherDay>
            <WeatherWeek now={now} week={week}></WeatherWeek>
        </div>
    ) : (
        <div className="flex items-center justify-center h-full min-h-52">
            <Empty
                description={
                    <span className="text-gray-500 text-sm">
                        双击地图上的城市区域查看天气信息
                    </span>
                }
                className="py-10"
            />
        </div>
    );

}
export default WeatherPage;