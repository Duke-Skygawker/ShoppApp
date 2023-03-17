import React from "react";
import { IoBanSharp, IoDocumentTextOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
const Items = ({ items, removeItem, editItem }) => {
  return (
    <>
      <tbody className="grocery-list">
        {items.map((item) => {
          const { id, title, quantity, price, total } = item;
          return (
            <tr key={id}>
              <td>{title}</td>
              <td>{quantity}</td>
              <td>{price}$</td>
              <td>{total}$</td>
              <td>
                <button
                  type="button"
                  style={{ marginTop: "0", marginBottom: "0" }}
                  className="warning button tiny"
                  onClick={() => editItem(id)}
                >
                  <IconContext.Provider value={{ size: "1.5rem" }}>
                    <IoDocumentTextOutline />
                  </IconContext.Provider>
                </button>
              </td>
              <td>
                <button
                  type="submit"
                  style={{ marginTop: "0", marginBottom: "0" }}
                  className="alert button tiny"
                  onClick={() => removeItem(id)}
                >
                  <IconContext.Provider value={{ size: "1.5rem" }}>
                    <IoBanSharp />
                  </IconContext.Provider>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
};

export default Items;
