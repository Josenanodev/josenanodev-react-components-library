import React from "react";
import { useState, useEffect } from "react";
import "./ParallelSelectionList.css";

//Icons
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
  BsSearch,
} from "react-icons/bs";

//Types
import { ListDatumType, ParallelSelctionListPropsTypes } from "./types";

const ParallelSelectionList = ({
  dataList,
  applyAction,
  cancelAction,
  leftListTitle,
  rightListTitle,
  searchBarsVisible,
  applyButonText,
  cancelButtonText,
}: ParallelSelctionListPropsTypes) => {
  //useState
  const [selectedDatumsIds, setSelectedDatumsIds] = useState<ListDatumType["_id"][]>([]);
  const [filteredLeftList, setFilteredLeftList] = useState<
    ParallelSelctionListPropsTypes["dataList"]
  >([]);
  const [filteredRightList, setFilteredRightList] = useState<
    ParallelSelctionListPropsTypes["dataList"]
  >([]);
  const [leftListSearchValue, setLeftListSearchValue] = useState<string>("");
  const [rightListSearchValue, setRightListSearchValue] = useState<string>("");
  //Functions
  const addToSelectedDatumsIds = (datumIdsArray: ListDatumType["_id"][]) => {
    const selectedDatumsIdsClone = [...selectedDatumsIds];
    datumIdsArray.forEach((datumId) => {
      if (!selectedDatumsIds.includes(datumId)) {
        selectedDatumsIdsClone.push(datumId);
      }
    });
    setSelectedDatumsIds(selectedDatumsIdsClone);
  };
  const removeFromSelectedDatumsIds = (datumIdsArray: ListDatumType["_id"][]) => {
    const selectedDatumsIdsClone = [...selectedDatumsIds];
    datumIdsArray.forEach((datumId) => {
      if (selectedDatumsIds.includes(datumId)) {
        selectedDatumsIdsClone.splice(selectedDatumsIdsClone.indexOf(datumId, 1));
      }
    });
    setSelectedDatumsIds(selectedDatumsIdsClone);
  };
  //useEffects
  useEffect(() => {
    let dataListClone: ParallelSelctionListPropsTypes["dataList"] = JSON.parse(
      JSON.stringify(dataList)
    );
    dataListClone = dataListClone.filter(
      (datum) => !selectedDatumsIds.includes(datum._id)
    );
    dataListClone = dataListClone.filter((datum) =>
      datum.searchValue.toLowerCase().includes(leftListSearchValue.toLowerCase())
    );
    setFilteredLeftList(dataListClone);
  }, [leftListSearchValue, dataList, selectedDatumsIds]);
  useEffect(() => {
    let dataListClone: ParallelSelctionListPropsTypes["dataList"] = JSON.parse(
      JSON.stringify(dataList)
    );
    dataListClone = dataListClone.filter((datum) =>
      selectedDatumsIds.includes(datum._id)
    );
    dataListClone = dataListClone.filter((datum) =>
      datum.searchValue.toLowerCase().includes(rightListSearchValue.toLowerCase())
    );
    setFilteredRightList(dataListClone);
  }, [rightListSearchValue, dataList, selectedDatumsIds]);
  return (
    <div className="parallel-selection-list">
      <div className="div-left-list">
        <p className="list-title">{leftListTitle}</p>
        {searchBarsVisible && (
          <div className="div-search-bar">
            <BsSearch />
            <input
              type="text"
              value={leftListSearchValue}
              onChange={(event) => setLeftListSearchValue(event.target.value)}
            />
          </div>
        )}
        <div className="list-container">
          <button
            className="apply-all-button"
            onClick={() =>
              addToSelectedDatumsIds(filteredLeftList.map((datum) => datum._id))
            }
          >
            <BsChevronDoubleRight />
          </button>
          <div className="scrollable-section">
            {filteredLeftList.map((datum) => (
              <div key={datum._id} className="div-datum-wrapper">
                {datum.customComponent ? (
                  datum.customComponent
                ) : (
                  <p className="visible-default-name">{datum.visibleDefaultName}</p>
                )}
                <button
                  className="apply-to-one-button"
                  onClick={() => addToSelectedDatumsIds([datum._id])}
                >
                  <BsChevronRight />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="div-right-list">
        <p className="list-title">{rightListTitle}</p>
        {searchBarsVisible && (
          <div className="div-search-bar">
            <BsSearch />
            <input
              type="text"
              value={rightListSearchValue}
              onChange={(event) => setRightListSearchValue(event.target.value)}
            />
          </div>
        )}
        <div className="list-container">
          <button
            className="apply-all-button"
            onClick={() =>
              removeFromSelectedDatumsIds(filteredRightList.map((datum) => datum._id))
            }
          >
            <BsChevronDoubleLeft />
          </button>
          <div className="scrollable-section">
            {filteredRightList.map((datum) => (
              <div key={datum._id} className="div-datum-wrapper">
                <button
                  className="apply-to-one-button"
                  onClick={() => removeFromSelectedDatumsIds([datum._id])}
                >
                  <BsChevronLeft />
                </button>
                {datum.customComponent ? (
                  datum.customComponent
                ) : (
                  <p className="visible-default-name">{datum.visibleDefaultName}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="div-action-buttons">
        <button className="cancel-button" onClick={() => cancelAction()}>
          {cancelButtonText ? cancelButtonText : "Cancel"}
        </button>
        <button className="apply-button" onClick={() => applyAction(selectedDatumsIds)}>
          {applyButonText ? applyButonText : "Apply"}
        </button>
      </div>
    </div>
  );
};

export default ParallelSelectionList;
