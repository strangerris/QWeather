import { Card } from '@arco-design/web-react';
import DayItem from "../DayItem";
import { HourlyForecast } from '@/interface/weather';
const WeatherDay = ({ day }: { day: HourlyForecast[] }) => {

  return (
    <Card
      title={
        <div className="flex items-center space-x-2">
          <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
          <span className="text-gray-800 font-semibold">24小时天气预报</span>
        </div>
      }
      className="shadow-md border-0"
    >
      <div className="flex w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="flex space-x-4 px-2">
          {day?.map((item) => (
            <DayItem {...item} key={item.fxTime} />
          ))}
        </div>
      </div>
    </Card>
  )
}
export default WeatherDay;