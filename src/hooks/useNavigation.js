'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

const useNavigation = () => {
  const pathname = usePathname();
  const [isEndpoints, setsEndpoints] = useState(false);
  const [isSubmission, setIssubmission] = useState(false);

  useEffect(() => {
    setsEndpoints(false);
    setIssubmission(false);

    switch (pathname) {
      case '/dashboard/all':
        setsEndpoints(true);
        break;
      case '/dashboard/submissions':
        setIssubmission(true);
        break;
        
      default:
        // Handle any other cases here
        break;
    }
  }, [pathname]);

  return {
    isEndpoints,
    isSubmission
  };
};

export default useNavigation;