import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const WeatherChart = ({ data, city }) => {
  const chartData = data.slice(0, 10).map((item) => {
    return {
      time: new Date(item.dt * 1000).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
      temp: Math.round(item.main.temp),
    };
  });

  return (
    <div className="chart-container  p-4 glass-card">
      <h4 className="text-start mb-4">Andamento Temperatura {city} (Prossime 24h)</h4>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="time" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", borderRadius: "10px", border: "none" }} itemStyle={{ color: "#fff" }} />
            <Area type="monotone" dataKey="temp" stroke="#8884d8" fillOpacity={1} fill="url(#colorTemp)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeatherChart;
