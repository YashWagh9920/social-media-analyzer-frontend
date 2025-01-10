import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCSVData } from "../features/csvDataSlice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [postTypeData, setPostTypeData] = useState([]);
  const [commentsTrendData, setCommentsTrendData] = useState([]);
  const [scatterPlotData, setScatterPlotData] = useState([]);
  const [selectedPostType, setSelectedPostType] = useState("all");

  const COLORS = [
    'rgb(79, 70, 229)',   // indigo-600
    'rgb(147, 51, 234)',  // purple-600
    'rgb(139, 92, 246)'   // violet-500
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataFromRedux = useSelector((state) => state.csvData);

  useEffect(() => {
    fetch("../social.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            dispatch(setCSVData(result.data));
          },
        });
      });
  }, [dispatch]);

  useEffect(() => {
    processData(dataFromRedux);
  }, [selectedPostType, dataFromRedux]);

  const processData = (rawData) => {
    let filtered = rawData;
    if (selectedPostType !== "all") {
      filtered = filtered.filter((item) => item.PostType === selectedPostType);
    }

    setFilteredData(filtered);
    const typeCounts = filtered.reduce((acc, item) => {
      acc[item.PostType] = (acc[item.PostType] || 0) + 1;
      return acc;
    }, {});
    setPostTypeData(Object.entries(typeCounts).map(([name, value]) => ({ name, value })));

    setCommentsTrendData(filtered.map((item) => ({
      date: item.PostDate,
      comments: parseInt(item.Comments, 10) || 0,
      likes: parseInt(item.Likes, 10) || 0,
    })));

    setScatterPlotData(filtered.map((item) => ({
      likes: parseInt(item.Likes, 10) || 0,
      shares: parseInt(item.Shares, 10) || 0,
    })));
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-indigo-100 to-purple-100">
    <h2 className="text-2xl md:text-4xl font-bold text-indigo-800">Social Media Analytics Dashboard</h2>

    <div className="flex justify-between items-center mt-4">
    <div className="mt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <select
        value={selectedPostType}
        onChange={(e) => setSelectedPostType(e.target.value)}
        className="w-full sm:w-auto px-4 py-2 rounded-lg border border-indigo-200 text-indigo-800 bg-white hover:border-indigo-300 transition-colors"
      >
        <option value="all">All Types</option>
        <option value="Reels">Reel</option>
        <option value="Carousel">Carousel</option>
        <option value="Static">Static</option>
      </select>
      <button 
        onClick={() => setSelectedPostType("all")} 
        className="flex items-center gap-2 px-5 py-2 rounded-lg text-white bg-gradient-to-r from-indigo-600  to-violet-600 hover:opacity-90 transition-opacity"
      >
        <RefreshCw className="h-5 w-5" /> 
        Refresh
      </button>
    </div>
    <button
    onClick={()=> navigate('/chatbot')}
     className="flex items-center gap-2 lg:px-8 lg:py-4 lg:text-2xl p-2 text-xl rounded-lg text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 transition-opacity">
      Chat with ViraLyticsAI
    </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mt-6">
      {/* Pie Chart Card */}
      <div className="p-4 rounded-lg shadow-xl border border-indigo-200 bg-gradient-to-br from-indigo-100 to-indigo-200">
        <h3 className="text-lg font-semibold mb-4 text-indigo-800">Post Type Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie 
              data={postTypeData} 
              cx="50%" 
              cy="50%" 
              innerRadius="60%" 
              outerRadius="80%" 
              dataKey="value" 
              label
            >
              {postTypeData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid rgb(99, 102, 241)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart Card */}
      <div className="p-4 rounded-lg shadow-xl border border-indigo-200 bg-gradient-to-br from-indigo-100 to-indigo-200">
        <h3 className="text-lg font-semibold mb-4 text-indigo-800">Engagement Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={commentsTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(99, 102, 241)" />
            <XAxis 
              dataKey="date" 
              stroke="#3730a3"
              style={{
                fontSize: '12px',
                fontFamily: 'sans-serif'
              }}
            />
            <YAxis 
              stroke="#3730a3"
              style={{
                fontSize: '12px',
                fontFamily: 'sans-serif'
              }}
            />
            <Tooltip contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '8px',
              border: '1px solid rgb(99, 102, 241)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="comments" 
              stroke="#4f46e5" 
              strokeWidth={2}
              dot={{ fill: '#4f46e5' }}
            />
            <Line 
              type="monotone" 
              dataKey="likes" 
              stroke="#3730a3" 
              strokeWidth={2}
              dot={{ fill: '#3730a3' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Scatter Plot Card */}
      <div className="p-4 md:p-6 rounded-lg shadow-xl border border-indigo-200 bg-gradient-to-br from-indigo-100 to-indigo-200 lg:col-span-2">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-indigo-800">Engagement Correlation</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid stroke="rgb(99, 102, 241)" />
              <XAxis 
                type="number" 
                dataKey="likes" 
                name="Likes" 
                stroke="#3730a3"
                style={{
                  fontSize: '12px',
                  fontFamily: 'sans-serif'
                }}
              />
              <YAxis 
                type="number" 
                dataKey="shares" 
                name="Shares" 
                stroke="#3730a3"
                style={{
                  fontSize: '12px',
                  fontFamily: 'sans-serif'
                }}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px',
                  border: '1px solid rgb(99, 102, 241)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Scatter 
                name="Posts" 
                data={scatterPlotData} 
                fill="#4f46e5"
                fillOpacity={0.6}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Data Table Card */}
    <div className="mt-6 p-4 md:p-6 rounded-lg shadow-xl border border-indigo-200 bg-gradient-to-br from-indigo-100 to-indigo-200">
      <h3 className="text-lg md:text-xl font-semibold mb-4 text-indigo-800">Data Table</h3>
      <div className="max-h-64 md:max-h-80 lg:max-h-[450px] overflow-x-auto overflow-y-auto">
        <table className="w-full text-left border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-indigo-50">
              {filteredData.length > 0 &&
                Object.keys(filteredData[0]).map((key) => (
                  <th key={key} className="px-2 md:px-4 py-2 border-b border-indigo-200 text-indigo-800 font-semibold whitespace-nowrap">
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(0, 500).map((row, index) => (
              <tr key={index} className="hover:bg-indigo-50 transition-colors">
                {Object.values(row).map((value, i) => (
                  <td key={i} className="px-2 md:px-4 py-2 border-b border-indigo-200 text-indigo-800 whitespace-nowrap">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  );
};

export default Dashboard;
