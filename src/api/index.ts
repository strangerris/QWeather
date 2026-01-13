import {
    config
} from "../../config.ts"
import request from "@/utils/request"
interface RequiredWeatherRequest {
    locationID?: string;
    longitude?: number;
    latitude?: number;
}

export const reqWeatherDay = ({
    locationID,
    longitude,
    latitude,
}: RequiredWeatherRequest):any => {
    let urlParams = ''
    if (locationID) {
        urlParams = locationID
    } else {
        urlParams = longitude + ',' + latitude
    }
    // return new Promise((resolve, reject) => {
    // 	resolve(oneDay['hourly'])
    // })
    return request.get(`${config.qweather_weather_24h}?location=${urlParams}`)

}

export const reqWeatherWeek = ({
    locationID,
    longitude,
    latitude,
}: RequiredWeatherRequest):any => {
    let urlParams = ''
    if (locationID) {
        urlParams = locationID
    } else {
        urlParams = longitude + ',' + latitude
    }
    // return new Promise((resolve, reject) => {
    // 	resolve(oneWeek['daily'])
    // })
    return request.get(`${config.qweather_weather_7d}?location=${urlParams}`)

}
export const reqWeatherNow = ({
    locationID,
    longitude,
    latitude,
}: RequiredWeatherRequest):any => {
    let urlParams = ''
    if (locationID) {
        urlParams = locationID
    } else {
        urlParams = longitude + ',' + latitude
    }
    // return new Promise((resolve, reject) => {
    // 	resolve(now['now'])
    // })
    return request.get(`${config.qweather_weather_now}?location=${urlParams}`)
}

export const reqCityInfo = ({
    locationID,
    longitude,
    latitude,
}: RequiredWeatherRequest):any => {
    let urlParams = ''
    if (locationID) {
        urlParams = locationID
    } else {
        urlParams = longitude + ',' + latitude
    }
    return request.get({
        url: `https://geoapi.qweather.com/v2/city/lookup?location=${urlParams}`,
    })
}


const loc = {
    "code": "200",
    "location": [
        {
            "name": "温岭",
            "id": "101210607",
            "lat": "28.36878",
            "lon": "121.37361",
            "adm2": "台州",
            "adm1": "浙江省",
            "country": "中国",
            "tz": "Asia/Shanghai",
            "utcOffset": "+08:00",
            "isDst": "0",
            "type": "city",
            "rank": "23",
            "fxLink": "https://www.qweather.com/weather/wenling-101210607.html"
        }
    ],
    "refer": {
        "sources": [
            "QWeather"
        ],
        "license": [
            "QWeather Developers License"
        ]
    }
}

const now = {
    "code": "200",
    "updateTime": "2025-03-14T21:42+08:00",
    "fxLink": "https://www.qweather.com/weather/wenling-101210607.html",
    "now": {
        "obsTime": "2025-03-14T21:40+08:00",
        "temp": "12",
        "feelsLike": "12",
        "icon": "501",
        "text": "雾",
        "wind360": "315",
        "windDir": "西北风",
        "windScale": "1",
        "windSpeed": "2",
        "humidity": "94",
        "precip": "0.0",
        "pressure": "1013",
        "vis": "6",
        "cloud": "100",
        "dew": "11"
    },
    "refer": {
        "sources": [
            "QWeather"
        ],
        "license": [
            "CC BY-SA 4.0"
        ]
    }
}


const oneDay = {
    "code": "200",
    "updateTime": "2025-03-14T23:18+08:00",
    "fxLink": "https://www.qweather.com/weather/wenling-101210607.html",
    "hourly": [
        {
            "fxTime": "2025-03-15T00:00+08:00",
            "temp": "12",
            "icon": "305",
            "text": "小雨",
            "wind360": "231",
            "windDir": "西南风",
            "windScale": "1-3",
            "windSpeed": "5",
            "humidity": "97",
            "pop": "55",
            "precip": "0.11",
            "pressure": "1014",
            "cloud": "100",
            "dew": "11"
        },
        {
            "fxTime": "2025-03-15T01:00+08:00",
            "temp": "12",
            "icon": "305",
            "text": "小雨",
            "wind360": "249",
            "windDir": "西风",
            "windScale": "1-3",
            "windSpeed": "5",
            "humidity": "95",
            "pop": "55",
            "precip": "0.28",
            "pressure": "1014",
            "cloud": "100",
            "dew": "11"
        },
        {
            "fxTime": "2025-03-15T02:00+08:00",
            "temp": "12",
            "icon": "305",
            "text": "小雨",
            "wind360": "269",
            "windDir": "西风",
            "windScale": "1-3",
            "windSpeed": "5",
            "humidity": "95",
            "pop": "70",
            "precip": "0.41",
            "pressure": "1014",
            "cloud": "100",
            "dew": "11"
        },
        {
            "fxTime": "2025-03-15T03:00+08:00",
            "temp": "12",
            "icon": "305",
            "text": "小雨",
            "wind360": "296",
            "windDir": "西北风",
            "windScale": "1-3",
            "windSpeed": "5",
            "humidity": "93",
            "pop": "70",
            "precip": "0.43",
            "pressure": "1014",
            "cloud": "100",
            "dew": "11"
        },
        {
            "fxTime": "2025-03-15T04:00+08:00",
            "temp": "13",
            "icon": "305",
            "text": "小雨",
            "wind360": "357",
            "windDir": "北风",
            "windScale": "1-3",
            "windSpeed": "7",
            "humidity": "93",
            "pop": "70",
            "precip": "0.44",
            "pressure": "1014",
            "cloud": "100",
            "dew": "11"
        },
        {
            "fxTime": "2025-03-15T05:00+08:00",
            "temp": "13",
            "icon": "305",
            "text": "小雨",
            "wind360": "15",
            "windDir": "北风",
            "windScale": "1-3",
            "windSpeed": "9",
            "humidity": "93",
            "pop": "70",
            "precip": "0.36",
            "pressure": "1014",
            "cloud": "100",
            "dew": "11"
        },
        {
            "fxTime": "2025-03-15T06:00+08:00",
            "temp": "13",
            "icon": "305",
            "text": "小雨",
            "wind360": "10",
            "windDir": "北风",
            "windScale": "1-3",
            "windSpeed": "11",
            "humidity": "91",
            "pop": "70",
            "precip": "0.18",
            "pressure": "1014",
            "cloud": "100",
            "dew": "11"
        },
        {
            "fxTime": "2025-03-15T07:00+08:00",
            "temp": "13",
            "icon": "305",
            "text": "小雨",
            "wind360": "6",
            "windDir": "北风",
            "windScale": "1-3",
            "windSpeed": "13",
            "humidity": "89",
            "pop": "70",
            "precip": "0.3",
            "pressure": "1014",
            "cloud": "100",
            "dew": "11"
        },
        {
            "fxTime": "2025-03-15T08:00+08:00",
            "temp": "12",
            "icon": "305",
            "text": "小雨",
            "wind360": "3",
            "windDir": "北风",
            "windScale": "1-3",
            "windSpeed": "14",
            "humidity": "86",
            "pop": "70",
            "precip": "0.15",
            "pressure": "1014",
            "cloud": "100",
            "dew": "11"
        },
        {
            "fxTime": "2025-03-15T09:00+08:00",
            "temp": "13",
            "icon": "104",
            "text": "阴",
            "wind360": "359",
            "windDir": "北风",
            "windScale": "1-3",
            "windSpeed": "16",
            "humidity": "80",
            "pop": "7",
            "precip": "0.0",
            "pressure": "1015",
            "cloud": "100",
            "dew": "10"
        },
        {
            "fxTime": "2025-03-15T10:00+08:00",
            "temp": "13",
            "icon": "104",
            "text": "阴",
            "wind360": "356",
            "windDir": "北风",
            "windScale": "1-3",
            "windSpeed": "18",
            "humidity": "74",
            "pop": "7",
            "precip": "0.0",
            "pressure": "1015",
            "cloud": "100",
            "dew": "10"
        },
        {
            "fxTime": "2025-03-15T11:00+08:00",
            "temp": "13",
            "icon": "104",
            "text": "阴",
            "wind360": "355",
            "windDir": "北风",
            "windScale": "3-4",
            "windSpeed": "20",
            "humidity": "68",
            "pop": "7",
            "precip": "0.0",
            "pressure": "1016",
            "cloud": "100",
            "dew": "10"
        },
        {
            "fxTime": "2025-03-15T12:00+08:00",
            "temp": "13",
            "icon": "305",
            "text": "小雨",
            "wind360": "356",
            "windDir": "北风",
            "windScale": "3-4",
            "windSpeed": "20",
            "humidity": "72",
            "pop": "70",
            "precip": "0.32",
            "pressure": "1017",
            "cloud": "100",
            "dew": "10"
        },
        {
            "fxTime": "2025-03-15T13:00+08:00",
            "temp": "14",
            "icon": "305",
            "text": "小雨",
            "wind360": "357",
            "windDir": "北风",
            "windScale": "3-4",
            "windSpeed": "20",
            "humidity": "74",
            "pop": "70",
            "precip": "0.23",
            "pressure": "1018",
            "cloud": "100",
            "dew": "10"
        },
        {
            "fxTime": "2025-03-15T14:00+08:00",
            "temp": "14",
            "icon": "305",
            "text": "小雨",
            "wind360": "357",
            "windDir": "北风",
            "windScale": "3-4",
            "windSpeed": "20",
            "humidity": "76",
            "pop": "65",
            "precip": "0.6",
            "pressure": "1018",
            "cloud": "100",
            "dew": "10"
        },
        {
            "fxTime": "2025-03-15T15:00+08:00",
            "temp": "13",
            "icon": "305",
            "text": "小雨",
            "wind360": "358",
            "windDir": "北风",
            "windScale": "1-3",
            "windSpeed": "18",
            "humidity": "79",
            "pop": "66",
            "precip": "0.6",
            "pressure": "1018",
            "cloud": "100",
            "dew": "10"
        },
        {
            "fxTime": "2025-03-15T16:00+08:00",
            "temp": "12",
            "icon": "305",
            "text": "小雨",
            "wind360": "358",
            "windDir": "北风",
            "windScale": "1-3",
            "windSpeed": "16",
            "humidity": "82",
            "pop": "70",
            "precip": "0.44",
            "pressure": "1017",
            "cloud": "100",
            "dew": "9"
        },
        {
            "fxTime": "2025-03-15T17:00+08:00",
            "temp": "12",
            "icon": "305",
            "text": "小雨",
            "wind360": "358",
            "windDir": "北风",
            "windScale": "1-3",
            "windSpeed": "16",
            "humidity": "83",
            "pop": "70",
            "precip": "0.6",
            "pressure": "1018",
            "cloud": "100",
            "dew": "9"
        },
        {
            "fxTime": "2025-03-15T18:00+08:00",
            "temp": "11",
            "icon": "305",
            "text": "小雨",
            "wind360": "358",
            "windDir": "北风",
            "windScale": "1-3",
            "windSpeed": "16",
            "humidity": "85",
            "pop": "70",
            "precip": "0.49",
            "pressure": "1018",
            "cloud": "100",
            "dew": "9"
        },
        {
            "fxTime": "2025-03-15T19:00+08:00",
            "temp": "11",
            "icon": "305",
            "text": "小雨",
            "wind360": "358",
            "windDir": "北风",
            "windScale": "1-3",
            "windSpeed": "14",
            "humidity": "84",
            "pop": "70",
            "precip": "0.43",
            "pressure": "1018",
            "cloud": "100",
            "dew": "9"
        },
        {
            "fxTime": "2025-03-15T20:00+08:00",
            "temp": "11",
            "icon": "305",
            "text": "小雨",
            "wind360": "358",
            "windDir": "北风",
            "windScale": "1-3",
            "windSpeed": "14",
            "humidity": "85",
            "pop": "70",
            "precip": "0.46",
            "pressure": "1018",
            "cloud": "100",
            "dew": "8"
        },
        {
            "fxTime": "2025-03-15T21:00+08:00",
            "temp": "10",
            "icon": "305",
            "text": "小雨",
            "wind360": "358",
            "windDir": "北风",
            "windScale": "1-3",
            "windSpeed": "14",
            "humidity": "85",
            "pop": "70",
            "precip": "0.4",
            "pressure": "1018",
            "cloud": "100",
            "dew": "8"
        },
        {
            "fxTime": "2025-03-15T22:00+08:00",
            "temp": "10",
            "icon": "305",
            "text": "小雨",
            "wind360": "356",
            "windDir": "北风",
            "windScale": "1-3",
            "windSpeed": "14",
            "humidity": "87",
            "pop": "70",
            "precip": "0.38",
            "pressure": "1018",
            "cloud": "100",
            "dew": "8"
        },
        {
            "fxTime": "2025-03-15T23:00+08:00",
            "temp": "10",
            "icon": "305",
            "text": "小雨",
            "wind360": "353",
            "windDir": "北风",
            "windScale": "1-3",
            "windSpeed": "13",
            "humidity": "87",
            "pop": "70",
            "precip": "0.36",
            "pressure": "1019",
            "cloud": "100",
            "dew": "8"
        }
    ],
    "refer": {
        "sources": [
            "QWeather"
        ],
        "license": [
            "CC BY-SA 4.0"
        ]
    }
}

const oneWeek = {
    "code": "200",
    "updateTime": "2025-03-14T23:18+08:00",
    "fxLink": "https://www.qweather.com/weather/wenling-101210607.html",
    "daily": [
        {
            "fxDate": "2025-03-14",
            "sunrise": "06:07",
            "sunset": "18:03",
            "moonrise": "18:10",
            "moonset": "06:07",
            "moonPhase": "满月",
            "moonPhaseIcon": "804",
            "tempMax": "15",
            "tempMin": "11",
            "iconDay": "300",
            "textDay": "阵雨",
            "iconNight": "305",
            "textNight": "小雨",
            "wind360Day": "45",
            "windDirDay": "东北风",
            "windScaleDay": "3-4",
            "windSpeedDay": "24",
            "wind360Night": "0",
            "windDirNight": "北风",
            "windScaleNight": "3-4",
            "windSpeedNight": "24",
            "humidity": "93",
            "precip": "0.0",
            "pressure": "1012",
            "vis": "24",
            "cloud": "25",
            "uvIndex": "2"
        },
        {
            "fxDate": "2025-03-15",
            "sunrise": "06:05",
            "sunset": "18:03",
            "moonrise": "19:02",
            "moonset": "06:33",
            "moonPhase": "亏凸月",
            "moonPhaseIcon": "805",
            "tempMax": "14",
            "tempMin": "9",
            "iconDay": "305",
            "textDay": "小雨",
            "iconNight": "305",
            "textNight": "小雨",
            "wind360Day": "0",
            "windDirDay": "北风",
            "windScaleDay": "4-5",
            "windSpeedDay": "34",
            "wind360Night": "0",
            "windDirNight": "北风",
            "windScaleNight": "3-4",
            "windSpeedNight": "24",
            "humidity": "81",
            "precip": "1.8",
            "pressure": "1018",
            "vis": "24",
            "cloud": "71",
            "uvIndex": "2"
        },
        {
            "fxDate": "2025-03-16",
            "sunrise": "06:04",
            "sunset": "18:04",
            "moonrise": "19:55",
            "moonset": "06:59",
            "moonPhase": "亏凸月",
            "moonPhaseIcon": "805",
            "tempMax": "15",
            "tempMin": "2",
            "iconDay": "101",
            "textDay": "多云",
            "iconNight": "151",
            "textNight": "多云",
            "wind360Day": "0",
            "windDirDay": "北风",
            "windScaleDay": "4-5",
            "windSpeedDay": "34",
            "wind360Night": "0",
            "windDirNight": "北风",
            "windScaleNight": "3-4",
            "windSpeedNight": "24",
            "humidity": "75",
            "precip": "0.0",
            "pressure": "1022",
            "vis": "25",
            "cloud": "1",
            "uvIndex": "7"
        },
        {
            "fxDate": "2025-03-17",
            "sunrise": "06:03",
            "sunset": "18:04",
            "moonrise": "20:48",
            "moonset": "07:25",
            "moonPhase": "亏凸月",
            "moonPhaseIcon": "805",
            "tempMax": "11",
            "tempMin": "4",
            "iconDay": "101",
            "textDay": "多云",
            "iconNight": "104",
            "textNight": "阴",
            "wind360Day": "0",
            "windDirDay": "北风",
            "windScaleDay": "3-4",
            "windSpeedDay": "24",
            "wind360Night": "0",
            "windDirNight": "北风",
            "windScaleNight": "1-3",
            "windSpeedNight": "3",
            "humidity": "69",
            "precip": "0.0",
            "pressure": "1020",
            "vis": "25",
            "cloud": "0",
            "uvIndex": "7"
        },
        {
            "fxDate": "2025-03-18",
            "sunrise": "06:02",
            "sunset": "18:05",
            "moonrise": "21:43",
            "moonset": "07:56",
            "moonPhase": "亏凸月",
            "moonPhaseIcon": "805",
            "tempMax": "16",
            "tempMin": "3",
            "iconDay": "101",
            "textDay": "多云",
            "iconNight": "151",
            "textNight": "多云",
            "wind360Day": "0",
            "windDirDay": "北风",
            "windScaleDay": "3-4",
            "windSpeedDay": "24",
            "wind360Night": "0",
            "windDirNight": "北风",
            "windScaleNight": "3-4",
            "windSpeedNight": "24",
            "humidity": "68",
            "precip": "0.0",
            "pressure": "1025",
            "vis": "25",
            "cloud": "0",
            "uvIndex": "8"
        },
        {
            "fxDate": "2025-03-19",
            "sunrise": "06:01",
            "sunset": "18:06",
            "moonrise": "22:40",
            "moonset": "08:28",
            "moonPhase": "亏凸月",
            "moonPhaseIcon": "805",
            "tempMax": "12",
            "tempMin": "2",
            "iconDay": "101",
            "textDay": "多云",
            "iconNight": "151",
            "textNight": "多云",
            "wind360Day": "90",
            "windDirDay": "东风",
            "windScaleDay": "1-3",
            "windSpeedDay": "16",
            "wind360Night": "0",
            "windDirNight": "北风",
            "windScaleNight": "1-3",
            "windSpeedNight": "3",
            "humidity": "64",
            "precip": "0.0",
            "pressure": "1024",
            "vis": "25",
            "cloud": "0",
            "uvIndex": "8"
        },
        {
            "fxDate": "2025-03-20",
            "sunrise": "06:00",
            "sunset": "18:06",
            "moonrise": "23:37",
            "moonset": "09:07",
            "moonPhase": "亏凸月",
            "moonPhaseIcon": "805",
            "tempMax": "15",
            "tempMin": "5",
            "iconDay": "100",
            "textDay": "晴",
            "iconNight": "150",
            "textNight": "晴",
            "wind360Day": "135",
            "windDirDay": "东南风",
            "windScaleDay": "1-3",
            "windSpeedDay": "16",
            "wind360Night": "0",
            "windDirNight": "北风",
            "windScaleNight": "1-3",
            "windSpeedNight": "3",
            "humidity": "67",
            "precip": "0.0",
            "pressure": "1021",
            "vis": "25",
            "cloud": "0",
            "uvIndex": "8"
        }
    ],
    "refer": {
        "sources": [
            "QWeather"
        ],
        "license": [
            "CC BY-SA 4.0"
        ]
    }
}