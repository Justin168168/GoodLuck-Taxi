import { useState } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Home() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const orderTaxi = async () => {
    await addDoc(collection(db, "orders"), {
      pickup,
      dropoff,
      status: "waiting",
      createdAt: Date.now()
    });

    alert("叫車成功");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🚖 叫車系統</h1>

      <input placeholder="上車地點" onChange={e => setPickup(e.target.value)} />
      <input placeholder="下車地點" onChange={e => setDropoff(e.target.value)} />

      <button onClick={orderTaxi}>叫車</button>
    </div>
  );
}
