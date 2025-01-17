import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const UserHistoryPage: React.FC = () => {
  return (
    <Box p={8}>
      <Heading as="h1" mb={4}>User History</Heading>
      <Text>No history available yet.</Text>
    </Box>
  );
};

export default UserHistoryPage;
