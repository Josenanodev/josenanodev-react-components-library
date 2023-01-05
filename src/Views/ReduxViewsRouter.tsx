import { Fragment } from "react";

//Redux
import { useSelector } from "react-redux";
import { viewSelector } from "../redux/state/features/AppSettings/AppSettingsReducer";

//Views
import Multidestiny from "./Multidestiny/Multidestiny";

//Types

const ReduxViewsRouter = () => {
  //Redux
  const view = useSelector(viewSelector);
  return <Fragment>{view === "multidestiny" && <Multidestiny />}</Fragment>;
};

export default ReduxViewsRouter;
