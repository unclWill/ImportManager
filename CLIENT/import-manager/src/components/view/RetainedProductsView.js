import React, { useState, useEffect } from "react";
import "../../styles/styles.css";

const RetainedProductsView = () => {
  
  const [products, setProducts] = useState([
    { id: 1, name: "Produto A", description: "Descrição do produto A", quantity: 10, status: "Retido" },
    { id: 2, name: "Produto B", description: "Descrição do produto B", quantity: 5, status: "Liberado" },
    { id: 3, name: "Produto C", description: "Descrição do produto C", quantity: 20, status: "Liberado" },
    { id: 4, name: "Produto D", description: "Descrição do produto D", quantity: 20, status: "Retido" }
  ]);

  
  /*useEffect(() => {
     fetch('/api/produtos-retidos')
       .then(response => response.json())
       .then(data => setProducts(data))
       .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);*/

  return (
    <div className="retained-products-view">
      <img src="/leao.png" alt="Logo" className="logo" />
      <h2>Produtos Retidos</h2>
      <input type="text" placeholder="Buscar produto..." className="search-bar" />

      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className={`product-item ${product.status.toLowerCase()}`}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Quantidade: {product.quantity}</p>
            <p>Status: <span className={`status ${product.status.toLowerCase()}`}>{product.status}</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RetainedProductsView;
