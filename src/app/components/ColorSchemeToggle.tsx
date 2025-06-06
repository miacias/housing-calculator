import cx from "clsx";
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { memo } from "react";
// import { IconSun, IconMoon } from "@tabler/icons-react";
import styles from "./ColorSchemeToggle.module.css";

// const MemoIconSun = memo(IconSun);
// const MemoMoonIcon = memo(IconMoon);

export const ColorSchemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      {/* {computedColorScheme === "light" ? (
        <MemoIconSun className={cx(styles.icon, styles.light)} stroke={1.5} />
      ) : (
        <MemoMoonIcon className={cx(styles.icon, styles.dark)} stroke={1.5} />
      )} */}
      {computedColorScheme === "light" ? (
        <>sun</>
      ) : (
        <>moon</>
      )}
    </ActionIcon>
  );
}