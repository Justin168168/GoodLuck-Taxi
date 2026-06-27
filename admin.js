import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    return onSnapshot(collection(db, "orders"), snap => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const remove = async (id) => {
    await deleteDoc(doc(db, "orders", id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>後台管理</h1>

      {orders.map(o => (
        <div key={o.id} style={{ marginBottom: 10 }}>
          <p>{o.pickup} → {o.dropoff}</p>
          <p>{o.status}</p>
          <button onClick={() => remove(o.id)}>刪除</button>
        </div>
      ))}
    </div>
  );
}
