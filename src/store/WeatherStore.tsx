import { create } from 'zustand'

import { reqWeatherDay, reqWeatherNow, reqWeatherWeek } from '@/api';
import { NowForecast, HourlyForecast, DailyForecast } from '@/interface/weather';
import { checkIsDay } from '@/utils';
type State = {
  name: string;
  now: NowForecast;
  day: HourlyForecast[];
  week: DailyForecast[];
  isDayFlag: boolean
};
type Action = {
  fetchData: (locationID: string, name: string) => Promise<void>;
}
const useWeatherStore = create<State & Action>((set) => ({
  name: null,
  now: null,
  day: null,
  week: null,
  isDayFlag: true,
  fetchData: async (locationID, name) => {
    const [nowRes, dayRes, weekRes] = await Promise.all([
      reqWeatherNow({ locationID }),
      reqWeatherDay({ locationID }),
      reqWeatherWeek({ locationID })
    ]);
    set({ name });
    set({ now: nowRes.now, day: dayRes.hourly, week: weekRes.daily });
    set({ isDayFlag: checkIsDay(weekRes.daily[0].fxDate, weekRes.daily[0].sunrise, weekRes.daily[0].sunset)})
  }
}))
export default useWeatherStore;