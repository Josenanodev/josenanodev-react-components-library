import { useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getLookAndFeel, lookAndFeelSelector } from "../../../redux/state/features/AppSettings/AppSettingsReducer";

//Types
import { propertyManagerLookAndFeelCode } from "../../../common/constants";

const LookAndFeelManager = () => {
  //Redux
  const dispatch = useDispatch();
  const lookAndFeel = useSelector(lookAndFeelSelector);
  //useEffect
  useEffect(() => {
    if (
      lookAndFeel === undefined &&
      propertyManagerLookAndFeelCode !== "" &&
      propertyManagerLookAndFeelCode !== undefined
    ) {
      dispatch(getLookAndFeel());
    }
  }, [lookAndFeel, dispatch]);
  useEffect(() => {
    if (lookAndFeel !== undefined && lookAndFeel.enabled) {
      if (lookAndFeel.primaryColor) {
        document.documentElement.style.setProperty(
          "--primary-color",
          lookAndFeel.primaryColor
        );
      }
      if (lookAndFeel.secondaryColor) {
        document.documentElement.style.setProperty(
          "--secondary-color",
          lookAndFeel.secondaryColor
        );
      }
      if (lookAndFeel.fontFamily) {
        document.body.style.setProperty("font-family", lookAndFeel.fontFamily);
      }
    }
  }, [lookAndFeel]);

  return <></>;
};

export default LookAndFeelManager;
