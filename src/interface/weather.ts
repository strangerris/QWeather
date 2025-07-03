export interface WeatherState {
  name: string | null;
  now: NowWeatherResponse;
  day: HourlyWeatherResponse;
  week: DailyWeatherResponse;
}

interface ReferType {
  sources: string[];  // 数据来源，如["QWeather", "NMC"]
  license: string[];  // 授权信息，如["QWeather Developers License"]
}

/** 通用响应头部 */
export interface WeatherResponseBase {
  code: string;        // 状态码（固定为"200"）
  updateTime: string;  // 数据更新时间（ISO8601格式，如"2020-06-30T22:00+08:00"）
  fxLink: string;      // 可视化页面链接
  refer: ReferType;    // 数据来源和授权信息
}

export interface NowForecast {
  obsTime: string;   // 观测时间（ISO8601格式）
  temp: string;      // 温度（摄氏度）
  feelsLike: string; // 体感温度（摄氏度）
  icon: string;      // 天气图标代码
  text: string;      // 天气文字描述
  wind360: string;   // 风向360度角度
  windDir: string;  // 风向（如“东南风”）
  windScale: string; // 风力等级
  windSpeed: string; // 风速（km/h）
  humidity: string;  // 相对湿度（百分比）
  precip: string;    // 降水量（mm）
  pressure: string;  // 大气压强（hPa）
  vis: string;       // 能见度（公里）
  cloud: string;     // 云量（百分比）
  dew: string;       // 露点温度（摄氏度）
}
/** 实时天气数据 */
export interface NowWeatherResponse extends WeatherResponseBase {
  now: NowForecast; // 实时天气预报
}

/** 单日天气预报 */
export interface DailyForecast {
  fxDate: string;      // 预报日期（YYYY-MM-DD）
  sunrise: string;     // 日出时间（HH:mm）
  sunset: string;      // 日落时间（HH:mm）
  moonrise: string;    // 月出时间（HH:mm）
  moonset: string;     // 月落时间（HH:mm）
  moonPhase: string;  // 月相名称
  moonPhaseIcon: string; // 月相图标代码
  tempMax: string;     // 最高温度（摄氏度）
  tempMin: string;     // 最低温度（摄氏度）
  iconDay: string;     // 白天天气图标代码
  textDay: string;     // 白天天气文字描述
  iconNight: string;   // 夜间天气图标代码
  textNight: string;   // 夜间天气文字描述
  wind360Day: string;  // 白天风向360度角度
  windDirDay: string; // 白天风向描述
  windScaleDay: string; // 白天风力等级
  windSpeedDay: string; // 白天风速（km/h）
  wind360Night: string; // 夜间风向360度角度
  windDirNight: string; // 夜间风向描述
  windScaleNight: string; // 夜间风力等级
  windSpeedNight: string; // 夜间风速（km/h）
  humidity: string;    // 湿度（百分比）
  precip: string;      // 降水量（mm）
  pressure: string;    // 大气压强（hPa）
  vis: string;         // 能见度（公里）
  cloud: string;       // 云量（百分比）
  uvIndex: string;     // 紫外线强度指数
}

export interface DailyWeatherResponse extends WeatherResponseBase {
  daily: DailyForecast[]; // 多天预报数组（通常3-7天）
}

export interface HourlyForecast {
  fxTime: string;      // 预报时间（ISO8601格式）
  temp: string;        // 温度（摄氏度）
  icon: string;        // 天气图标代码
  text: string;        // 天气文字描述
  wind360: string;     // 风向360度角度
  windDir: string;    // 风向描述（如“西北风”）
  windScale: string;   // 风力等级
  windSpeed: string;   // 风速（km/h）
  humidity: string;    // 湿度（百分比）
  pop: string;         // 降水概率（百分比）
  precip: string;      // 降水量（mm）
  pressure: string;    // 大气压强（hPa）
  cloud: string;       // 云量（百分比）
  dew: string;         // 露点温度（摄氏度）
}

export interface HourlyWeatherResponse extends WeatherResponseBase {
  hourly: HourlyForecast[]; // 逐小时预报数组（通常24-72小时）
}