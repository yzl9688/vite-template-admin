import { Card, Descriptions, Flex, Progress } from "antd";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard: React.FC = () => {
  const data = [];

  for (let i = 6; i < 24; i++) {
    data.push({
      time: i + ":00",
      uv: Math.floor(Math.random() * 10000),
      pv: Math.floor(Math.random() * 10000),
    });
  }

  const dependencies: { [prop: string]: string } = {
    "@ant-design/icons": "^5.3.7",
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/modifiers": "^7.0.0",
    "@dnd-kit/sortable": "^8.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@types/lodash": "^4.17.1",
    antd: "^5.17.2",
    immer: "^10.1.1",
    lodash: "^4.17.21",
    "query-string": "^9.0.0",
    react: "18.2.0",
    "react-dom": "18.2.0",
    "react-router-dom": "^6.23.1",
    "react-transition-group": "^4.4.5",
    recharts: "^2.12.7",
    screenfull: "^6.0.2",
    "styled-components": "^6.1.11",
    swr: "^2.2.5",
    "use-immer": "^0.9.0",
    zustand: "^4.5.2",
  };

  return (
    <div>
      <Flex wrap gap="small" className="mb-4">
        <Card className="flex-1" bordered hoverable>
          <div className="text-sm mb-2">总销售额</div>
          <div className="text-lg font-bold">￥ 123,434</div>
        </Card>
        <Card className="flex-1" bordered hoverable>
          <div className="text-sm mb-2">访问量</div>
          <div className="text-lg font-bold">8,846</div>
        </Card>
        <Card className="flex-1" bordered hoverable>
          <div className="text-sm mb-2">支付笔数</div>
          <div className="text-lg font-bold">6,560</div>
        </Card>
        <Card className="flex-1" bordered hoverable>
          <div className="text-sm mb-2">运营活动效果</div>
          <div className="text-lg font-bold">76%</div>
          <Progress percent={76} />
        </Card>
      </Flex>
      <Card title="流量趋势" className="mb-4">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Legend />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      <Card title="项目依赖">
        <Descriptions column={4} bordered>
          {Object.keys(dependencies).map((item) => {
            return (
              <Descriptions.Item key={item} label={item}>
                {dependencies[item]}
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      </Card>
    </div>
  );
};

export default Dashboard;
