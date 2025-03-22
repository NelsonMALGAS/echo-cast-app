import { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const { name, streams, subscribers } = payload[0].payload;

    return (
      <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
        <p className="text-gray-700 font-semibold">{label}</p>
        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-600">Name: <span className="font-medium">{name}</span></p>
          <p className="text-sm text-gray-600">Streams: <span className="font-medium">{streams}</span></p>
          <p className="text-sm text-gray-600">Subscribers: <span className="font-medium">{subscribers}</span></p>
        </div>
      </div>
    );
  }
  return null;
};
