import { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import china from '@/assets/china.json'
import { calGeoPath, checkIsCity, checkIsCounty, checkIsProvince } from '@/utils'
import { geoRequest } from '@/utils/request';
import { Card, Typography, Spin, Space, Divider, Message, Button } from '@arco-design/web-react';
import { IconLocation, IconCloud } from '@arco-design/web-react/icon';
import WeatherPage from '@/components/WeatherPage';
import CCLL from '@/assets/China-City-List-latest.json'
import { useIsMobile } from '@/ctx/IsMobileContext';
import '@/interface/weather'
import useWeatherStore from '@/store/WeatherStore';

echarts.registerMap('china', china as any);

const { Title, Paragraph } = Typography;
let addDistrict = []
let delDistrict = []
const initialOption: echarts.EChartsOption = {

  geo: [{
    id: 'baseMap',
    map: 'china',
    roam: true,
    label: {
      show: true,
      formatter: function (params: any) {
        return params.name
      },
      color: '#333', // 标签文字颜色
      fontSize: 10
    },

  }],
  series: [
    {
      id: 'dataSeries',
      type: 'map',
      map: 'china',
      geoIndex: 0,
      data: china.features.map(feature => ({
        name: feature.properties.name,
        properties: feature.properties
      })),
    },
  ],

};

const WeatherMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<echarts.ECharts | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [mobileData, setMobileData] = useState<any>({})

  const isMobile = useIsMobile()

  const fetchData = useWeatherStore(state => state.fetchData);

  // 单击显示天气
  const handleClick = (params: any) => {
    if (!params.data.properties) return
    setMobileData(params)
    const { adcode } = params.data.properties;
    const name = CCLL[adcode.toString()]?.Location_Name_ZH;
    const locationID = CCLL[adcode.toString()]?.Location_ID;
    if (locationID) {
      setLoading(true);
      fetchData(locationID, name).finally(() => {
        setLoading(false);
      });
    }
  };

  // 双击进行下探
  const handleDblclick = (params: any) => {
    if (!params.data.properties) return
    
    if (isMobile) {
      params = mobileData
    }
    const adcode: string = (params.data.properties.adcode).toString();
    // 三级地区无法下探直接返回，二级地区找citys，一级地区找province
    if (checkIsCounty(adcode)) return
    const geoPath: string = calGeoPath(adcode)
    geoRequest.get(geoPath).then(res => {
      chartRef.current?.setOption(drillDown(Number(adcode), res.data));
    })

  };

  // 右击进行恢复
  const handleRightClick = (params: any) => {
    const adcode: string = (params.data.properties.adcode).toString();
    const parentAdcode: string = params.data.properties.parent.adcode.toString()
    // 一级城市无法恢复直接返回
    if (checkIsProvince(adcode)) return
    chartRef.current?.setOption(drillUp(parentAdcode))
  };

  // 下探逻辑
  const drillDown = (selectedAdcode: Number, data: any) => {
    let d
    if (isMobile) {
      addDistrict.push(data)
      echarts.registerMap('china', data as any);
      d = data
    } else {
      const delFeature = china.features.find((feature: any) =>
        Number(feature.properties.adcode) === selectedAdcode
      );
      // 删除目标区域，防止遮挡
      china.features = china.features.filter((feature: any) => {
        return Number(feature.properties.adcode) !== selectedAdcode;
      })
      delDistrict.push(delFeature)
      // 添加目标的下探地区
      china.features.push(...data.features);
      addDistrict.push(...data.features);
      echarts.registerMap('china', china as any);
      d = china
    }
    return {
      series: [{
        id: 'dataSeries',
        data: d.features.map(feature => ({
          name: feature.properties.name,
          properties: feature.properties
        }))
      }],
    };
  }

  // 恢复逻辑
  const drillUp = (parentAdcode: string) => {
    let d
    if (isMobile) {
      addDistrict.pop()
      if (addDistrict.length !== 0) {
        d = addDistrict.at(-1)
      } else {
        d = china
      }
      echarts.registerMap('china', d as any);
      return {
        series: [{
          id: 'dataSeries',
          data: d.features.map(feature => ({
            name: feature.properties.name,
            properties: feature.properties
          }))
        }],
      };
    } else {
      const start = checkIsProvince(parentAdcode) ? 0 : 2,
        end = checkIsProvince(parentAdcode) ? 2 : 4

      china.features = china.features.filter((feature: any) => {
        return feature.properties.adcode.toString().slice(start, end) !== parentAdcode.slice(start, end);
      })
      const delIndex = delDistrict.findIndex(feature => feature.properties.adcode.toString() === parentAdcode)
      china.features.push(delDistrict[delIndex])
      delDistrict.splice(delIndex, 1)
      addDistrict = addDistrict.filter(feature => feature.properties.adcode.toString().slice(start, end) !== parentAdcode.slice(start, end))
      echarts.registerMap('china', china as any);
      d = china
    }
    return {
      series: [{
        id: 'dataSeries',
        data: china.features.map(feature => ({
          name: feature.properties.name,
          properties: feature.properties
        }))
      }],
    };
  }

  useEffect(() => {
    const mapChart = echarts.init(mapRef.current);
    chartRef.current = mapChart;
    mapChart.setOption(initialOption);

    mapChart.on('click', handleClick);
    mapChart.on('dblclick', handleDblclick);
    mapChart.on('contextmenu', handleRightClick);

    const handleResize = () => mapChart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      mapChart.dispose();
      window.removeEventListener('resize', handleResize);

    };
  }, [])

  return (

    <div className={`max-w-7xl mx-auto flex gap-5 ${isMobile ? 'flex-col gap-4' : 'flex-row h-full'}`}>
      {/* 地图区域 */}

      <div className='flex-1'>
        <Card
          className="h-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          bodyStyle={{ padding: 0, height: '100%' }}
        >
          <div className="px-6 pt-5 pb-0">
            <Space align="center">
              <IconLocation
                className='text-[20px]'
              />
              <Title
                className="!m-0 "
              >
                中国天气地图
              </Title>
            </Space>
            {
              isMobile ? (
                <div className='flex gap-2 mt-2'>
                  <Button onClick={() => handleDblclick(mobileData)}>下探</Button>
                  <Button onClick={() => handleRightClick(mobileData)}>恢复</Button>
                </div>
              ) :
                <Paragraph
                  className="!mt-2 !mb-0 !text-gray-500 !leading-relaxed"
                >
                  双击地图区域查看详细天气信息
                </Paragraph>
            }

          </div>

          <Divider className="!mx-6 !my-3 !bg-gray-200" />

          <div
            ref={mapRef}
            className="mx-4 mb-4 rounded-lg bg-white shadow-inner"
            style={{
              height: 'calc(100% - 120px)',
              minHeight: isMobile ? '300px' : '400px'
            }}
          />
        </Card>
      </div>

      {/* 天气信息区域 */}
      <div className={`${isMobile ? 'w-[100%] min-h-80' : 'w-100 flex-shrink-0'}`}>
        <Card
          className="h-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          bodyStyle={{ padding: 0, height: '100%' }}
        >
          <div className="px-6 pt-5 pb-0">
            <Space align="center">
              <IconCloud
                style={{ fontSize: '20px' }}
              />
              <Title
                className="!m-0"
              >
                天气详情
              </Title>
            </Space>
          </div>

          <Divider className="!mx-6 !my-3 !bg-gray-200" />

          <div
            className="px-6 pb-6 overflow-y-auto"
            style={{
              height: isMobile ? '' : 'calc(100% - 120px)',
            }}
          >
            {loading ? (
              <div className="flex flex-col items-center justify-center h-52">
                <Spin size={40} />
                <Paragraph className="!mt-4 !text-center !text-gray-500 !mb-0">
                  正在加载天气数据...
                </Paragraph>
              </div>
            ) : (
              <WeatherPage />
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default WeatherMap;