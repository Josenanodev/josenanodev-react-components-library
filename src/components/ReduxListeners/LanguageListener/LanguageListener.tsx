import { useEffect } from "react";

//Redux
import { useDispatch } from "react-redux";
import { setLanguage } from "../../../redux/state/features/AppSettings/AppSettingsReducer";

//Variables
import { languageCode } from "../../../common/constants";

//assets
import es_ES from "../../../assets/languages/es-ES";

const LanguageListener = () => {
  //Redux
  const dispatch = useDispatch();
  //useEffect
  useEffect(() => {
    if (languageCode !== "" && languageCode !== undefined) {
      import(`../../../assets/languages/${languageCode}`)
        .then((value) => dispatch(setLanguage(value.default)))
        .catch((error) => {
          console.log(error);
          dispatch(setLanguage(es_ES));
        });
    }
  }, [dispatch]);
  return <></>;
};

export default LanguageListener;
