import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, query, getDocs, DocumentData } from "firebase/firestore";
import { Stack, Text, Image, Box } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const UserProductsPage = () => {
  const [products, setProducts] = useState<DocumentData>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"));
        const querySnapshot = await getDocs(q);
        const productsData: DocumentData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Stack spacing={4}>
        {products.map((product: DocumentData) => (
          <Box key={product.id} borderWidth="1px" borderRadius="md" p={4}>
            <Image src={product.image} height={200} width={200} />
            <Text fontSize="lg" fontWeight="bold" mt={2}>
              {product.name}
            </Text>
            <Text>Quantity: {product.quantity}</Text>
            <Text>Value: {product.value}</Text>
            <Button
              onClick={() => navigate(`/user/product/${product.id}`)}
              bg="gray.600" // Set default background color to gray
              color="white" // Ensure text is white for contrast
              mt={2}
              _hover={{ bg: "gray.700" }} // Darker background on hover
            >
              More Info
            </Button>
          </Box>
        ))}
        <Button onClick={() => navigate("/admin/product/add")} colorScheme="gray">
          Add New Product
        </Button>
      </Stack>
    </div>
  );
};

export default UserProductsPage;
