import { Card } from '@arco-design/web-react';

const WeatherNow = ({name, now}) => {
    return (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-md">
            <div className="text-center py-4">
                {/* 城市名称 */}
                <div className="text-lg font-medium text-gray-700 mb-2">
                    {name}
                </div>

                {/* 当前温度 */}
                <div className="text-5xl font-light text-gray-800 mb-1">
                    {now?.temp}°
                </div>

                {/* 体感温度 */}
                <div className="text-sm text-gray-600 bg-white/50 rounded-full px-3 py-1 inline-block">
                    体感温度 {now?.feelsLike}°
                </div>

                {/* 天气描述和图标区域 */}
                <div className="mt-4 flex items-center justify-center space-x-3">
                    <div className={`qi-${now?.icon} text-2xl text-blue-600`}></div>
                    <span className="text-gray-700 font-medium">{now?.text}</span>
                </div>

                {/* 其他天气信息 */}
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/40 rounded-lg p-3">
                        <div className="text-gray-500">湿度</div>
                        <div className="font-semibold text-gray-700">{now?.humidity}%</div>
                    </div>
                    <div className="bg-white/40 rounded-lg p-3">
                        <div className="text-gray-500">风速</div>
                        <div className="font-semibold text-gray-700">{now?.windSpeed} km/h</div>
                    </div>
                </div>
            </div>
        </Card>

    )
}

export default WeatherNow;