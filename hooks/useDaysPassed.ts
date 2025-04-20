import { useState, useEffect } from 'react';

interface DaysPassedHook {
  daysPassed: number;
  currentYear: number;
  trialDaysLeft: number;
}

export function useDaysPassed(): DaysPassedHook {
  const [daysPassed, setDaysPassed] = useState<number>(0);
  const [trialDaysLeft, setTrialDaysLeft] = useState<number>(2); // Hardcoded trial days left
  const currentYear = new Date().getFullYear();
  
  useEffect(() => {
    // Calculate days passed in the current year
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1); // January 1st of current year
    
    // Calculate the difference in milliseconds
    const diff = now.getTime() - startOfYear.getTime();
    
    // Convert to days (add 1 because we include the current day)
    const dayNumber = Math.floor(diff / (24 * 60 * 60 * 1000)) + 1;
    
    setDaysPassed(dayNumber);
    
    // Set up an interval to check for day changes at midnight
    const checkForDayChange = () => {
      const newNow = new Date();
      const newDayNumber = Math.floor(
        (newNow.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
      ) + 1;
      
      if (newDayNumber !== dayNumber) {
        setDaysPassed(newDayNumber);
      }
    };
    
    // Check every minute (more frequent than needed, but ensures we don't miss the change)
    const interval = setInterval(checkForDayChange, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  return {
    daysPassed,
    currentYear,
    trialDaysLeft,
  };
}