import WeekItem from "../WeekItem";
import { Card } from "@arco-design/web-react";
import { NowForecast, DailyForecast } from "@/interface/weather";
const WeatherWeek = ({ now, week }: {
  now: NowForecast,
  week: DailyForecast[]
}) => {
  const minTemp = Math.min(...week.map(item => Number(item.tempMin)));
  const maxTemp = Math.max(...week.map(item => Number(item.tempMax)));
  
  return (
    <Card
      title={
        <div className="flex items-center space-x-2">
          <div className="w-1 h-5 bg-green-500 rounded-full"></div>
          <span className="text-gray-800 font-semibold">7日天气预报</span>
        </div>
      }
      className="shadow-md border-0"
    >
      <div className="space-y-3">
        {week?.map((item, index) => (
          <div key={item.fxDate} className={`${index !== week.length - 1 ? 'border-b border-gray-100 pb-3' : ''}`}>
            <WeekItem
              {...item}
              minTemp={minTemp}
              maxTemp={maxTemp}
              currentTemp={index === 0 ? now.temp : undefined}
              isToday={index === 0
              }
            />
          </div>
        ))}
      </div>
    </Card>
  )
}
export default WeatherWeek;