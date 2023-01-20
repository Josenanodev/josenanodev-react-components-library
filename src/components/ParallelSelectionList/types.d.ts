export interface ParallelSelctionListPropsTypes {
  dataList: ListDatumType[];
  applyAction: (dataListId: ListDatumType["_id"][]) => Fuction;
  cancelAction: Function;
  leftListTitle?: string;
  rightListTitle?: string;
  searchBarsVisible?: boolean;
  applyButonText?: string;
  cancelButtonText?: string;
}

export type ListDatumType = {
  _id: string;
  searchValue: string;
  visibleDefaultName: string;
  customComponent?: JSX.Element;
};
