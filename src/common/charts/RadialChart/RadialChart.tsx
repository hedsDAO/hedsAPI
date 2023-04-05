import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Polygon } from 'recharts';

interface RadialChartProps {
  data: Record<string, number>;
}

interface CustomPolygonProps {
  points: {
    x: number;
    y: number;
  }[];
  colors: string[];
}

const CustomPolygon: React.FC<CustomPolygonProps> = ({ points, colors }) => {
  const centerX = points.reduce((acc, point) => acc + point.x, 0) / points.length - 6;
  const centerY = points.reduce((acc, point) => acc + point.y, 0) / points.length + 6;
  return (
    <g>
      {points.map((point, index) => {
        const nextPoint = points[(index + 1) % points.length];
        const path = `M${point.x},${point.y} L${nextPoint.x},${nextPoint.y} L${centerX},${centerY} Z`;
        return <path key={index} d={path} stroke={'transparent'} fill={colors[index % colors.length]} fillOpacity={0.6} />;
      })}
      <Polygon points={points} fill="none" />
    </g>
  );
};

const colors = [
  '#FF0000', // Red
  '#FF5500', // Orange-Red
  '#FFAA00', // Orange
  '#FFD700', // Gold
  '#FFFF00', // Yellow
  '#AFFF00', // Yellow-Green
  '#00FF00', // Green
  '#00FFAA', // Green-Cyan
  '#00FFFF', // Cyan
  '#007FFF', // Sky Blue
  '#0000FF', // Blue
  '#7F00FF', // Blue-Violet
  '#AA00FF', // Purple
];

const RadialChart: React.FC<RadialChartProps> = ({ data }) => {
  const arrOfData = Object.entries(data).map(([category, value]) => {
    return { category, value };
  });

  return (
    <ResponsiveContainer minHeight={350} width={'100%'} height={'100%'}>
      <RadarChart data={arrOfData}>
        <PolarGrid gridType="circle" strokeWidth={1} />
        <PolarAngleAxis dataKey="category" tick={{ fontSize: '0.5rem' }} />
        <Radar dataKey="value" stroke={'rgba(0, 0, 0, 0.1)'} shape={(props) => <CustomPolygon {...props} colors={colors} />} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadialChart;
