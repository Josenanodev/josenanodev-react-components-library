import React from "react";
import { useState, useEffect, useRef } from "react";
import "./ParallelSelectionList.css";

//Icons
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
  BsSearch,
} from "react-icons/bs";

//Hooks
import useResizeObserver from "../../hooks/useResizeObserver";

//Types
import { ListDatumType, ParallelSelectionListPropsTypes } from "./types";

const ParallelSelectionList = ({
  dataList,
  applyAction,
  cancelAction,
  leftListTitle,
  rightListTitle,
  leftListApplyAllButtonText,
  rightListApplyAllButtonText,
  searchBarsVisible,
  applyButonText,
  cancelButtonText,
  preSelectedDatumsIds = [],
  listElementsHeight = 50,
}: ParallelSelectionListPropsTypes) => {
  //Refs
  const leftListRef = useRef<HTMLDivElement | null>(null);
  const rightListRef = useRef<HTMLDivElement | null>(null);
  //useState
  const [selectedDatumsIds, setSelectedDatumsIds] =
    useState<ListDatumType["_id"][]>(preSelectedDatumsIds);
  const [filteredLeftList, setFilteredLeftList] = useState<
    ParallelSelectionListPropsTypes["dataList"]
  >([]);
  const [filteredRightList, setFilteredRightList] = useState<
    ParallelSelectionListPropsTypes["dataList"]
  >([]);
  const [leftListFirstVisibleElementIndex, setLeftListFirstVisibleElementIndex] =
    useState<number>(0);
  const [leftListLastVisibleElementIndex, setLeftListLastVisibleElementIndex] =
    useState<number>(0);
  const [rightListFirstVisibleElementIndex, setRightListFirstVisibleElementIndex] =
    useState<number>(0);
  const [rightListLastVisibleElementIndex, setRightListLastVisibleElementIndex] =
    useState<number>(0);
  const [leftListSearchValue, setLeftListSearchValue] = useState<string>("");
  const [rightListSearchValue, setRightListSearchValue] = useState<string>("");
  //hooks
  const [leftListWidth, leftListHeight] = useResizeObserver(leftListRef);
  const [rightListWidth, rightListHeight] = useResizeObserver(rightListRef);
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
        selectedDatumsIdsClone.splice(selectedDatumsIdsClone.indexOf(datumId), 1);
      }
    });
    setSelectedDatumsIds(selectedDatumsIdsClone);
  };
  //useEffects
  useEffect(() => {
    let dataListClone = [...dataList];
    dataListClone = dataListClone.filter(
      (datum) => !selectedDatumsIds.includes(datum._id)
    );
    dataListClone = dataListClone.filter((datum) =>
      datum.searchValue.toLowerCase().includes(leftListSearchValue.toLowerCase())
    );
    setFilteredLeftList(dataListClone);
  }, [leftListSearchValue, dataList, selectedDatumsIds]);
  useEffect(() => {
    let dataListClone = [...dataList];
    dataListClone = dataListClone.filter((datum) =>
      selectedDatumsIds.includes(datum._id)
    );
    dataListClone = dataListClone.filter((datum) =>
      datum.searchValue.toLowerCase().includes(rightListSearchValue.toLowerCase())
    );
    setFilteredRightList(dataListClone);
  }, [rightListSearchValue, dataList, selectedDatumsIds]);
  useEffect(() => {
    if (leftListRef.current && leftListRef.current.clientHeight !== 0) {
      setLeftListLastVisibleElementIndex(
        leftListFirstVisibleElementIndex +
          Math.floor(leftListRef.current.clientHeight / listElementsHeight) +
          2
      );
    } else {
      setLeftListLastVisibleElementIndex(filteredLeftList.length);
    }
  }, [
    leftListHeight,
    leftListWidth,
    leftListFirstVisibleElementIndex,
    listElementsHeight,
    filteredLeftList.length,
  ]);
  useEffect(() => {
    if (rightListRef.current && rightListRef.current.clientHeight !== 0) {
      setRightListLastVisibleElementIndex(
        rightListFirstVisibleElementIndex +
          Math.floor(rightListRef.current.clientHeight / listElementsHeight) +
          2
      );
    } else {
      setRightListLastVisibleElementIndex(filteredRightList.length);
    }
  }, [
    rightListHeight,
    rightListWidth,
    rightListFirstVisibleElementIndex,
    listElementsHeight,
    filteredRightList.length,
  ]);
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
            {leftListApplyAllButtonText} <BsChevronDoubleRight />
          </button>
          <div
            ref={leftListRef}
            className="scrollable-section"
            onScroll={(event) =>
              setLeftListFirstVisibleElementIndex(
                Math.floor(
                  (event.target as HTMLDivElement).scrollTop / listElementsHeight
                )
              )
            }
          >
            <div
              className="resizable-div-for-scroll"
              style={{
                paddingTop: leftListFirstVisibleElementIndex * listElementsHeight,
                height: filteredLeftList.length * listElementsHeight,
              }}
            >
              {filteredLeftList
                .slice(leftListFirstVisibleElementIndex, leftListLastVisibleElementIndex)
                .map((datum) => (
                  <div
                    key={datum._id}
                    className="div-datum-wrapper"
                    style={{ height: listElementsHeight }}
                  >
                    {datum.customComponent ? (
                      <div className="div-custom-component-wrapper">
                        {datum.customComponent}
                      </div>
                    ) : (
                      <p
                        className="visible-default-name"
                        title={datum.visibleDefaultName}
                      >
                        {datum.visibleDefaultName}
                      </p>
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
            <BsChevronDoubleLeft /> {rightListApplyAllButtonText}
          </button>
          <div
            ref={rightListRef}
            className="scrollable-section"
            onScroll={(event) =>
              setRightListFirstVisibleElementIndex(
                Math.floor(
                  (event.target as HTMLDivElement).scrollTop / listElementsHeight
                )
              )
            }
          >
            <div
              className="resizable-div-for-scroll"
              style={{
                paddingTop: rightListFirstVisibleElementIndex * listElementsHeight,
                height: filteredRightList.length * listElementsHeight,
              }}
            >
              {filteredRightList
                .slice(
                  rightListFirstVisibleElementIndex,
                  rightListLastVisibleElementIndex
                )
                .map((datum) => (
                  <div
                    key={datum._id}
                    className="div-datum-wrapper"
                    style={{ height: listElementsHeight }}
                  >
                    <button
                      className="apply-to-one-button"
                      onClick={() => removeFromSelectedDatumsIds([datum._id])}
                    >
                      <BsChevronLeft />
                    </button>
                    {datum.customComponent ? (
                      <div className="div-custom-component-wrapper">
                        {datum.customComponent}
                      </div>
                    ) : (
                      <p
                        className="visible-default-name"
                        title={datum.visibleDefaultName}
                      >
                        {datum.visibleDefaultName}
                      </p>
                    )}
                  </div>
                ))}
            </div>
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
