export interface ParallelSelectionListPropsTypes {
  dataList: ListDatumType[];
  applyAction: (dataListId: ListDatumType["_id"][]) => void;
  cancelAction: Function;
  leftListTitle?: string;
  rightListTitle?: string;
  leftListApplyAllButtonText?: string;
  rightListApplyAllButtonText?: string;
  searchBarsVisible?: boolean;
  applyButonText?: string;
  cancelButtonText?: string;
  preSelectedDatumsIds?: ListDatumType["_id"][];
  listElementsHeight?: number;
}

export type ListDatumType = {
  _id: string;
  searchValue: string;
  visibleDefaultName: string;
  customComponent?: JSX.Element;
};
