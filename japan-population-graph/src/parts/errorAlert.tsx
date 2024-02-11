import React from 'react';

interface errorAlertProps {
  populationsError: string | null;
  prefectureError: string | null;
}
const errorAlert: React.FC<errorAlertProps> = ({ populationsError, prefectureError }) => {
  if (populationsError == null && prefectureError == null) return null;
  else {
    return (
      (populationsError != null || prefectureError != null) && (
        <div className="error-message" data-testid="error-message">
          {populationsError != null && <p>{populationsError}</p>}
          {prefectureError != null && <p>{prefectureError}</p>}
        </div>
      )
    );
  }
};

export default errorAlert;
