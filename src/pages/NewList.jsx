import React, { useState, useEffect } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IconContext } from "react-icons";
import Alert from "../hooks/Alert";
import Items from "./Items";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  }
  return [];
};

const NewList = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //display alert
      showAlert(true, "alert", "Please Enter a Value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return {
              ...item,
              title: name,
              quantity: quantity,
              price: price,
              total: quantity * price,
            };
          }
          return item;
        })
      );
      setName("");
      setQuantity(0);
      setPrice(0);
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "Value Changed");
    } else {
      showAlert(true, "success", "Item Added To The List");
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        quantity: quantity,
        price: price,
        total: Math.round((quantity * price + Number.EPSILON) * 100) / 100,
      };
      setList([...list, newItem]);
      setName("");
      setQuantity(0);
      setPrice(0);
    }
  };
  const fullTotal = list.map((item) => {
    const { total } = item;
    let allTotals = 0;
    return (allTotals += total);
  });
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, "alert", "List Cleared");
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, "alert", "Item Removed");
    setList(list.filter((item) => item.id != id));
  };
  const editItem = (id) => {
    showAlert(true, "warning", "Modify the entry");
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
    setQuantity(specificItem.quantity);
    setPrice(specificItem.price);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <div className="grid-container">
      <br />
      <div className="grid-x" style={{ backgroundColor: "#fff" }}>
        <div className="cell small-5"></div>
        <h2 className="" style={{ color: "#2c3840" }}>
          <b>NEW LIST</b>
        </h2>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <div className="grid-container">
          <div className="grid-x">
            <div className="cell small-6">
              <label htmlFor="">
                <span className="primary label">Name of the item</span>
                <input
                  type="text"
                  placeholder="Product"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <div className="cell small-2">
              <label htmlFor="">
                <span className="primary label">Number of items</span>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max="1000"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </label>
            </div>
            <div className="cell small-2">
              <label htmlFor="">
                <span className="primary label">Price per item </span>
                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
            </div>
            <div className="">
              <button
                type="submit"
                style={{ marginTop: "1.4rem" }}
                className="success button tiny"
                value={price}
              >
                <IconContext.Provider value={{ size: "1.5rem" }}>
                  <IoIosAddCircleOutline />
                </IconContext.Provider>
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="expanded button invisible"></div>
      <div className="grid-container" style={{ fontSize: "1.2rem" }}>
        {list.length > 0 && (
          <div>
            <table>
              {/* make head invisible if no items */}
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <Items items={list} removeItem={removeItem} editItem={editItem} />
            </table>
            <div className="callout">
              <div className="grid-x">
                <div className="cell small-3"></div>
                <h4>Total price of all items in the list:</h4>
                <h4>{fullTotal.reduce((a, b) => a + b, 0)}$</h4>
              </div>
            </div>
            <div className="alert expanded button" onClick={clearList}>
              CLEAR THE LIST
            </div>
          </div>
        )}
      </div>
      <div className="expanded button">Add list from template</div>
    </div>
  );
};

export default NewList;
