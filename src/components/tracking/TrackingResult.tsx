import React from 'react';
import { TrackingResult, OrderStatus } from '../../types';
import { Card } from '../common/Card';

interface TrackingResultProps {
  result: TrackingResult;
}

export const TrackingResultComponent: React.FC<TrackingResultProps> = ({
  result,
}) => {
  const getStatusColor = (status: OrderStatus, completed: boolean) => {
    if (completed) return 'bg-lemonGreen text-black';
    if (status === result.status) return 'bg-brandOrange text-white';
    return 'bg-gray-200 text-gray-600';
  };

  const getStatusLabel = (status: OrderStatus): string => {
    const labels: Record<OrderStatus, string> = {
      [OrderStatus.PLACED]: 'Order Placed',
      [OrderStatus.DISPATCHED]: 'Dispatched',
      [OrderStatus.IN_TRANSIT]: 'In Transit',
      [OrderStatus.DELIVERED]: 'Delivered',
    };
    return labels[status];
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <Card className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600 text-sm mb-1">Order ID</p>
            <p className="text-2xl font-bold text-gray-900">{result.orderId}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Current Status</p>
            <p className="text-2xl font-bold text-brandOrange">
              {getStatusLabel(result.status)}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Estimated Delivery</p>
            <p className="text-2xl font-bold text-lemonGreen">
              {result.estimatedDelivery}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold text-gray-900 mb-8">Delivery Timeline</h3>
        <div className="space-y-6">
          {result.timeline.map((step, index) => (
            <div key={step.status} className="flex items-start">
              <div className="flex flex-col items-center mr-6">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${getStatusColor(
                    step.status,
                    step.completed
                  )}`}
                >
                  {step.completed ? '✓' : index + 1}
                </div>
                {index < result.timeline.length - 1 && (
                  <div
                    className={`w-1 h-12 mt-2 ${
                      step.completed ? 'bg-lemonGreen' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
              <div className="pt-2">
                <p className="font-semibold text-gray-900">{step.label}</p>
                {step.date && (
                  <p className="text-gray-600 text-sm">{step.date}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
