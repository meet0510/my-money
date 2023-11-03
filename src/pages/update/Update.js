import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import styles from "./Update.module.css";

export default function Update() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  const [transaction, setTransaction] = useState(null);
  const [name, setName] = useState(null);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    if (documents) {
      const need = documents.filter((document) => document.id === id);
      console.log(need);
      setTransaction(need[0]);
      setName(need[0].name);
      setAmount(need[0].amount);
    }
  }, [documents]);

  const history = useHistory();
  const { updateDocument, response } = useFirestore("transactions");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTransaction = { ...transaction, name, amount };
    console.log(updatedTransaction);
    updateDocument(id, updatedTransaction);
    console.log(response);
    history.push("/");
  };

  return (
    <div className={styles.sidebar}>
      <h3>Update Transaction</h3>
      {transaction && <span>Transaction id: {transaction.id}</span>}
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            required
          />
        </label>
        <button>Update transaction</button>
      </form>
    </div>
  );
}
