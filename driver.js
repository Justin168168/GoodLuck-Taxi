import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";

export default function Driver() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    return onSnapshot(collection(db, "orders"), snap => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const accept = async (id) => {
    await updateDoc(doc(db, "orders", id), { status: "accepted" });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>司機接單</h1>

      {orders.map(o => (
        <div key={o.id} style={{ marginBottom: 10 }}>
          <p>{o.pickup} → {o.dropoff}</p>
          <p>{o.status}</p>
          <button onClick={() => accept(o.id)}>接單</button>
        </div>
      ))}
    </div>
  );
}
