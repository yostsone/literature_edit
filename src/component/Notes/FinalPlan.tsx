import { useState, useEffect } from 'react';
import { alpha, Paper, Typography } from '@mui/material';
import PdfDownload from '../FinalPlan/PdfDownload';
import ItemList from '../FinalPlan/ItemList';
import AddNewItem from '../FinalPlan/AddNewItem';
import AddNewItemForm from '../FinalPlan/AddNewItemForm';
import type { FinalPlanItemType } from '../../types/formTypes';
import { deleteStorageItem, fetchStorageData, addNewBasicItem } from '../../utils/globalUtils';
import { STORAGE_FINAL_PLAN } from '../../constants';

export default function FinalPlan() {
  const [isAddActive, setIsAddActive] = useState<boolean>(false);
  const [finalPlanList, setFinalPlanList] = useState<FinalPlanItemType[] | []>([]);

  // Save the new item to local storage and update the final plan list.
  const saveNewItem = (text: string) => {
    addNewBasicItem<FinalPlanItemType>(STORAGE_FINAL_PLAN, text);
    setIsAddActive(false);
    fetchStorageData<FinalPlanItemType>(STORAGE_FINAL_PLAN, setFinalPlanList);
  };

  // Remove item from local storage and update the final plan list.
  const removeItem = (id: number) => {
    deleteStorageItem<FinalPlanItemType>(id, STORAGE_FINAL_PLAN, setFinalPlanList);
  };

  // initially set the final plan list from local storage.
  useEffect(() => {
    fetchStorageData<FinalPlanItemType>(STORAGE_FINAL_PLAN, setFinalPlanList);
  }, []);


  return (
    <Paper
      elevation={2}
      sx={(theme) => ({
        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
        padding: "10px 16px 20px",
        textAlign: "justify",
      })}
    >
      <Typography variant="h6" sx={{ pb: 1 }}>
        Pārsprieduma plāns
      </Typography>
      <ItemList items={finalPlanList} removeItem={removeItem}/>
      <AddNewItem isAddActive={isAddActive} setIsAddActive={setIsAddActive}/>
      <AddNewItemForm isAddActive={isAddActive} saveNewItem={saveNewItem} />
      <PdfDownload isVisible={!isAddActive} data={finalPlanList}/>
    </Paper>
  );
}