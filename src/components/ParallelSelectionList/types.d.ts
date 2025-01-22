export interface ParallelSelectionListPropsTypes {
  dataList: ListDatumType[];
  applyAction?: (dataListId: ListDatumType["_id"][]) => void;
  cancelAction?: Function;
  onSelectionChange?: (dataListId: ListDatumType["_id"][]) => void;
  leftListTitle?: string;
  rightListTitle?: string;
  leftListApplyAllButtonText?: string;
  rightListApplyAllButtonText?: string;
  searchBarsVisible?: boolean;
  applyButtonText?: string;
  cancelButtonText?: string;
  preSelectedDatumsIds?: ListDatumType["_id"][];
  listElementsHeight?: number;
}

export type ListDatumType = {
  _id: string;
  searchValue: string;
  visibleDefaultName: string;
  customComponent?: React.ReactNode;
};
