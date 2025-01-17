import { Stack, Text, Card, HStack } from "@chakra-ui/react";
import { Button } from "./ui/button";
import {
  getFirestore,
  updateDoc,
  doc,
  increment,
  getDoc,
} from "firebase/firestore";
import { toaster, Toaster } from "./ui/toaster";

interface OrderCardProps {
  id: string;
  productId: string;
  productName: string;
  isPending: boolean;
  quantity: number;
  value: number;
  userId: string;
  userName: string;
}

const OrderCard = ({
  id,
  productId,
  productName,
  isPending,
  quantity,
  userId,
  userName,
  value,
}: OrderCardProps) => {
  //   const navigate = useNavigate();
  userId;
  const handleSubmit = async () => {
    // if (!id) return;
    try {
      console.log(id);
      const db = getFirestore();
      const orderRef = doc(db, "orders", id);
      await updateDoc(orderRef, {
        isPending: false,
      });
      const productRef = doc(db, "products", productId);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const productData = productSnap.data();

        // Ensure there's enough stock before reducing
        if (productData.quantity >= quantity) {
          await updateDoc(productRef, {
            quantity: increment(-quantity), // Decrease by the amount in the order
          });

          window.location.reload();
        } else {
          toaster.create({
            title: "Insufficient Product",
            description: "Product does not have enough stock for this order",
          })
          console.error("Not enough stock available for this order.");
        }
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  return (
    <>
      <Toaster />
      <Card.Root overflow="hidden">
        <Card.Body gap="2">
          <Card.Title>
            Order by {userName} for {productName}
          </Card.Title>
          <HStack>
            <Stack>
              <Text>Quantity: {quantity}</Text>
              <Text>Value: {value}</Text>
            </Stack>
          </HStack>
        </Card.Body>
        <Card.Footer gap="2">
          {isPending ? (
            <Button
              _hover={{ bg: "gray.200" }}
              color={"black"}
              onClick={() => {
                handleSubmit();
              }}
            >
              Accept Order
            </Button>
          ) : (
            <Text>Already accepted</Text>
          )}
        </Card.Footer>
      </Card.Root>
    </>
  );
};

export default OrderCard;
