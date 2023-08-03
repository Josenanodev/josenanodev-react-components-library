import React, { Fragment, useState } from "react";
import styles from "./BubbleMenu.module.scss";

//icons
import { BsX } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";

const BubbleMenuDictionary = {
  en: {
    menu: "menu",
    close: "close",
  },
  es: {
    menu: "menú",
    close: "cerrar",
  },
};

type BubbleMenuProps = {
  options: {
    icon: JSX.Element;
    text: string;
    visible: boolean;
    optionCallback: () => void;
  }[];
  language?: "en" | "es";
};

const BubbleMenu = ({ options, language = "en" }: BubbleMenuProps) => {
  const [showMenu, setShowMenu] = useState<boolean | null>(null);
  return (
    <Fragment>
      <button className={styles["menu-button"]} onClick={() => setShowMenu(!showMenu)}>
        {showMenu ? <BsX /> : <IoMenu />}
        <p>
          {showMenu
            ? BubbleMenuDictionary[language]["close"]
            : BubbleMenuDictionary[language]["menu"]}
        </p>
      </button>
      <section
        className={styles["menu-container"]}
        data-status={showMenu === true ? "visible" : showMenu === false ? "hidden" : "idle"}
        onClick={() => setShowMenu(false)}
      >
        <ul>
          {options
            .filter((option) => option.visible)
            .map((option, index) => (
              <li key={option.text} style={{ transitionDelay: `${index * 100}ms` }}>
                <button
                  onClick={() =>
                    setTimeout(option.optionCallback, 300 + options.length * 100)
                  }
                >
                  {option.icon}
                  {option.text}
                </button>
              </li>
            ))}
        </ul>
      </section>
    </Fragment>
  );
};

export default BubbleMenu;
