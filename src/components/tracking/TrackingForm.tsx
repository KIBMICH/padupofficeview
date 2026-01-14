import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface TrackingFormProps {
  onSubmit: (trackingId: string) => void;
  isLoading?: boolean;
}

export const TrackingForm: React.FC<TrackingFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [trackingId, setTrackingId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingId.trim()) {
      setError('Please enter a tracking ID');
      return;
    }

    setError('');
    onSubmit(trackingId);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Enter your tracking ID"
            value={trackingId}
            onChange={(e) => {
              setTrackingId(e.target.value);
              if (error) setError('');
            }}
            error={error}
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          disabled={isLoading}
          className="md:w-auto"
        >
          Track Order
        </Button>
      </div>
    </form>
  );
};
