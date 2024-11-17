import React, { useState, useEffect, useContext } from "react";
import "../../styles/retainedProducts.css";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/AuthProvider";

const RetainedProductsView = () => {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Produto A",
      description: "Descrição do produto A",
      quantity: 10,
      status: "Retido",
    },
    {
      id: 2,
      name: "Produto B",
      description: "Descrição do produto B",
      quantity: 5,
      status: "Liberado",
    },
    {
      id: 3,
      name: "Produto C",
      description: "Descrição do produto C",
      quantity: 20,
      status: "Liberado",
    },
    {
      id: 4,
      name: "Produto D",
      description: "Descrição do produto D",
      quantity: 20,
      status: "Retido",
    },
  ]);

  return (
    <div className="retained-products-view">
      <h3 className="user-info">
        {user && user.name}@{user && user.doc}
      </h3>
      <img src="/leao.png" alt="Logo" className="logo" />
      <h2>Produtos Retidos</h2>
      <div className="search-container">
        <Input
          className="search-bar"
          size="large"
          placeholder="Buscar produto..."
          prefix={<SearchOutlined />}
        />
      </div>

      <ul className="product-list">
        {products.map((product) => (
          <li
            key={product.id}
            className={`product-item ${product.status.toLowerCase()}`}
          >
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Quantidade: {product.quantity}</p>
            <p>
              Status:{" "}
              <span className={`status ${product.status.toLowerCase()}`}>
                {product.status}
              </span>
            </p>
          </li>
        ))}
      </ul>

      <Button
        type="primary"
        size="large"
        style={{
          backgroundColor: "#FFA500",
          borderColor: "#FFA500",
          fontWeight: "bold",
          position: "absolute",
          top: "5vw",
          right: "0.2vw",
        }}
      >
        Alterar Dados
      </Button>

      {user.role === "Admin" && (
        <Button
          type="primary"
          size="large"
          style={{
            backgroundColor: "#FFA500",
            borderColor: "#FFA500",
            fontWeight: "bold",
            position: "absolute",
            top: "9vw",
            right: "0.2vw",
          }}
        >
          Roubar Produto do Cidadão
        </Button>
      )}
    </div>
  );
};

export default RetainedProductsView;
