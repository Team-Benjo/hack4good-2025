import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, query, getDocs, DocumentData, where } from "firebase/firestore";
import { Stack, Text } from "@chakra-ui/react";
import OrderCard from "@/components/OrderCard";

const AdminViewOrder = () => {
  const [orders, setOrders] = useState<DocumentData>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "orders"), where('isPending', '==', true));
        const querySnapshot = await getDocs(q);
        const ordersData: DocumentData = [];
        querySnapshot.forEach((doc) => {
          ordersData.push({ id: doc.id, ...doc.data() });
        });
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  if (orders.length == 0) {
    return <Text>No orders to accept</Text>
  }

  return (
    <div>
      <Stack>
        {orders.map((order: DocumentData) => (
          <OrderCard
            key={order.id}
            id={order.id}
            productName={order.productName}
            quantity={order.quantity}
            value={order.value}
            isPending={order.isPending}
            productId={order.productId}
            userId={order.userId}
            userName={order.userName}
          />
        ))}
      </Stack>
    </div>
  );
};

export default AdminViewOrder;
