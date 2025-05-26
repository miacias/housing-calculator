import { AppShell, Burger, Code, Flex, Text } from "@mantine/core";
import { type ReactNode } from "react";
import { IconHome } from "@tabler/icons-react";
import { ColorSchemeToggle } from "./ColorSchemeToggle";

type LayoutProps = {
  opened: boolean;
  toggle: () => void;
  name: string;
  version: string;
  children: ReactNode;
};

export const Layout = ({
  opened,
  toggle,
  name,
  version,
  children,
}: LayoutProps) => {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Flex w="100%" justify="space-between" align="center" px={"md"} pt={'xs'}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text>
            {!opened ? name : <IconHome />}{" "}
            <Code fw={700}>{`v${version}`}</Code>
          </Text>
          <ColorSchemeToggle />
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
