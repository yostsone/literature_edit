import { STORAGE_FINAL_PLAN } from '../constants';
import type { FinalPlanItemType } from '../types/formTypes';

// Adds a new item to the final plan stored in local storage
export function addNewPlanItem(text: string) {
  const existingData = localStorage.getItem(STORAGE_FINAL_PLAN);
  let parsedData: FinalPlanItemType[] = [];

  if (existingData) {
    try {
      parsedData = JSON.parse(existingData);
    } catch (error) {
      console.error("Error parsing local storage data: ", error);
    }
  }

  const newItem: FinalPlanItemType = {
    id: Date.now(),
    text,
  };

  parsedData.push(newItem);
  localStorage.setItem(STORAGE_FINAL_PLAN, JSON.stringify(parsedData));
}

// Fetches the final plan data from local storage and updates the state
export function fetchFinalPlanData(setFinalPlanList: (data: FinalPlanItemType[]) => void) {
  const planData = localStorage.getItem(STORAGE_FINAL_PLAN);
  if (planData) {
    try {
      const parsedData: FinalPlanItemType[] = JSON.parse(planData);
      setFinalPlanList(parsedData); // Update state
    } catch (error) {
      console.error("Error parsing local storage data: ", error);
    }
  } else {
    setFinalPlanList([]);
  }
}

// Deletes an item from the final plan by its ID
export function deletePlanItem(id: number, setFinalPlanList: (data: FinalPlanItemType[]) => void) {
  const planData = localStorage.getItem(STORAGE_FINAL_PLAN);

  if (planData) {
    try {
      let parsedData: FinalPlanItemType[] = JSON.parse(planData);
      parsedData = parsedData.filter(item => item.id !== id);
      localStorage.setItem(STORAGE_FINAL_PLAN, JSON.stringify(parsedData));
      setFinalPlanList(parsedData); // Update state
    } catch (error) {
      console.error("Error parsing local storage data: ", error);
    }
  }
}