import { useEffect, useState } from 'react';

const useHealthData = () => {
  const [steps, setSteps] = useState(0);

	// HealthKit implementation

  return { steps};
};

export default useHealthData;
