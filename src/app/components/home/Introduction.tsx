import { Container, Title, Text, Button, Group } from "@mantine/core";

type IntroductionProps = {
  name: string;
  version: string;
  lastUpdated?: string | null;
  // chart?: string;
  parentTab?: string;
};

export const Introduction = ({
  name = "Housing Calculator",
  version = "1.0.0",
  lastUpdated = null,
}: IntroductionProps) => {
  return (
    <>
      <Title order={1} mb="md">
        Welcome to the Housing Calculator
      </Title>
      <Text mb="lg">
        Easily compare your housing costs, manage your budget, and analyze your
        expenses. Get started by exploring the tools below.
      </Text>
      <Text mb="md">
        This is a budgeting app to help you visualize your monthly expenses and
        income. It allows you to compare renting vs owning a home, and see how
        your expenses stack up against your income.
      </Text>
      <Text mb="md">
        <strong>Disclaimer:</strong> This is a work in progress and is not meant
        to be a complete budgeting solution.
      </Text>
      {/* <Text mb="md">
        <strong>Disclaimer:</strong> This is a work in progress and is not meant
        to be a complete budgeting solution. It is meant to be a starting point
        for your budgeting needs. Feel free to contribute to the project on{" "}
        <a
          href={import.meta.env.VITE_GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </Text> */}
      <Text mb="md" c={"dimmed"}>
        <strong>Last Updated:</strong>{" "}
        {lastUpdated
          ? new Date(lastUpdated).toLocaleDateString()
          : "Loading..."}
      </Text>
    </>
  );
};
