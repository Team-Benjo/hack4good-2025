import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, query, getDocs, updateDoc, doc, addDoc, DocumentData } from "firebase/firestore";
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

  const handleBuyItem = async (productId: string, quantity: number, productName: string, productValue: number) => {
    if (quantity <= 0) {
      alert("Out of stock");
      return;
    }

    const username = localStorage.getItem("username"); // Get the username from localStorage

    if (!username) {
      alert("User not logged in");
      return;
    }

    try {
      // Decrease product quantity in the products collection
      const docRef = doc(db, "products", productId);
      await updateDoc(docRef, {
        quantity: quantity - 1, // Decrease quantity by 1
      });

      // Add order to the orders collection
      await addDoc(collection(db, "orders"), {
        isPending: true,
        productId,
        productName,
        quantity: 1, // Only 1 item is being purchased
        userName: username, // Get the username from localStorage
        value: productValue,
      });

      alert("Purchase successful!");
      
      // Re-fetch the products to update the quantity on the page
      const q = query(collection(db, "products"));
      const querySnapshot = await getDocs(q);
      const productsData: DocumentData = [];
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsData); // Update the state with the new data
    } catch (error) {
      console.error("Error processing purchase:", error);
      alert("Failed to complete purchase.");
    }
  };

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
              onClick={() => handleBuyItem(product.id, product.quantity, product.name, product.value)}
              bg="green.600" // Set background color to green for the buy button
              color="white"
              mt={2}
              _hover={{ bg: "green.700" }} // Darker green on hover
              isDisabled={product.quantity <= 0} // Disable button if out of stock
            >
              {product.quantity > 0 ? "Buy Item" : "Out of Stock"}
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
