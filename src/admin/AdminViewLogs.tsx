import { ADMIN_LANDING } from "@/Routes";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminViewLogs() {

  const navigate = useNavigate()

  const [logs] = useState([
    {
      timestamp: "2025-01-17T10:15:30Z",
      action: "disburse_voucher",
      admin_id: "A123",
      user_id: "U456",
      voucher_amount: 50,
      voucher_code: "VCHR-20250117-001",
      status: "success"
    },
    {
      timestamp: "2025-01-17T10:30:45Z",
      action: "purchase_good",
      user_id: "U456",
      product_id: "P789",
      product_name: "Rice 5kg",
      quantity: 1,
      total_price: 20,
      payment_method: "voucher",
      status: "pending_approval"
    },
    {
      timestamp: "2025-01-17T10:45:12Z",
      action: "approve_purchase",
      admin_id: "A123",
      user_id: "U456",
      purchase_id: "PUR-20250117-001",
      approved_items: [
        {
          product_id: "P789",
          product_name: "Rice 5kg",
          quantity: 1,
          price: 20
        }
      ],
      status: "approved"
    },
    {
      timestamp: "2025-01-17T11:00:30Z",
      action: "create_user",
      admin_id: "A123",
      new_user_id: "U789",
      user_name: "John Doe",
      role: "resident",
      account_status: "active",
      status: "success"
    }
  ]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>System Logs</h2>
      <table border={1} cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Action</th>
            <th>Details</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.action.replace("_", " ").toUpperCase()}</td>
              <td>
                {log.action === "disburse_voucher" && `Admin ${log.admin_id} gave ${log.voucher_amount} vouchers to User ${log.user_id}`}
                {log.action === "purchase_good" && `User ${log.user_id} bought ${log.quantity}x ${log.product_name} for $${log.total_price}`}
                {log.action === "approve_purchase" && `Admin ${log.admin_id} approved purchase ${log.purchase_id}`}
                {log.action === "create_user" && `Admin ${log.admin_id} created User ${log.new_user_id} (${log.user_name}, ${log.role})`}
              </td>
              <td>{log.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button onClick={() => navigate(ADMIN_LANDING)}>
        Go Back
      </Button>
    </div>
  );
};
