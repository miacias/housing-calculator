import { Container, Title, Text, Button, Group } from "@mantine/core";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container size="sm" py="xl">
      <Title order={1} align="center" mb="md">
        Welcome to the Housing Calculator
      </Title>
      <Text align="center" mb="lg">
        Easily compare your housing costs, manage your budget, and analyze your expenses. 
        Get started by exploring the tools below.
      </Text>
      <Group position="center">
        <Button component={Link} to="/budget" color="green">
          Go to Budget
        </Button>
        <Button component={Link} to="/analysis" color="blue">
          Go to Analysis
        </Button>
      </Group>
    </Container>
  );
}