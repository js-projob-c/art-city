import { FloatingIndicator, UnstyledButton } from "@mantine/core";
import { useState } from "react";

import styles from "./FloatingButtons.module.scss";

interface IButtonProps {
  label: string;
  onSelected: () => void;
}

interface IProps {
  buttons: IButtonProps[];
}

const FloatingButtons: React.FC<IProps> = ({ buttons }) => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const [active, setActive] = useState(0);

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  const controls = buttons?.map((item, index) => (
    <UnstyledButton
      key={`${index}`}
      className={styles.control}
      ref={setControlRef(index)}
      onClick={() => {
        setActive(index);
        item.onSelected();
      }}
      mod={{ active: active === index }}
    >
      <span className={styles.controlLabel}>{item.label}</span>
    </UnstyledButton>
  ));

  return (
    <div className={styles.root} ref={setRootRef}>
      {controls}

      <FloatingIndicator
        target={controlsRefs[active]}
        parent={rootRef}
        className={styles.indicator}
      />
    </div>
  );
};

export default FloatingButtons;
