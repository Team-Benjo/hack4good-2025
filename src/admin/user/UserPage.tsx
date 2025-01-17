import React, { useEffect, useState } from "react";
import { Box, Heading, Grid, GridItem, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const UserPage: React.FC = () => {
  const [username, setUsername] = useState<string | null>("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  return (
    <Box p={8} height="100vh" display="flex" flexDirection="column">
      {/* Greeting */}
      <Heading as="h1" mb={4}>
        Hello {username || "User"}! What would you like to do today?
      </Heading>

      {/* Options */}
      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={6}
          width="80%"
        >
          {/* Purchase History */}
          <GridItem>
            <Box
              p={6}
              bg="blue.100"
              borderRadius="lg"
              boxShadow="md"
              textAlign="center"
              _hover={{ bg: "blue.200", transform: "scale(1.05)" }}
              transition="all 0.3s"
            >
              <Heading as="h2" size="md" mb={4}>
                Purchase History
              </Heading>
              <Button
                color="black"
                bg="gray.200"
                _hover={{ bg: "gray.300" }}
                onClick={() => navigate("/user/history/")} // Use navigate() for routing
              >
                View
              </Button>
            </Box>
          </GridItem>

          {/* Products */}
          <GridItem>
            <Box
              p={6}
              bg="teal.100"
              borderRadius="lg"
              boxShadow="md"
              textAlign="center"
              _hover={{ bg: "teal.200", transform: "scale(1.05)" }}
              transition="all 0.3s"
            >
              <Heading as="h2" size="md" mb={4}>
                Products
              </Heading>
              <Button
                color="black"
                bg="gray.200"
                _hover={{ bg: "gray.300" }}
                onClick={() => navigate("/user/product/")} // Use navigate() for routing
              >
                View
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserPage;
