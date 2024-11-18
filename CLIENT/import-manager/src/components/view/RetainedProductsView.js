import React, { useState, useEffect, useContext } from "react";
import "../../styles/retainedProducts.css";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/AuthProvider";
import { searchAll } from "../service/ProductService";
import { useNavigate } from "react-router-dom";

const RetainedProductsView = () => {
  const { user } = useContext(AuthContext);
  const [list, setList] = useState(null);
  const navigate = useNavigate();

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

  async function render() {
    if (user.role === "Admin") {
      try {
        const newList = await searchAll(user.doc, user.token);
        console.log(list);

        if (newList) {
          setList(newList);
        }
      } catch (error) {
        alert(
          "Erro ao recuperar informações sobre os produtos retidos, conforme o artigo 762 do código da lei numero 220020 de 1992, todos os valores e demais produtos em posse do cidadão devem ser retidos, em virtude da dúvida!"
        );
      }
    }

    try {
      const list = await searchAll(user.doc, user.token);
      console.log(list);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    render();
  }, []);

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
        {list &&
          list.map((product) => (
            <li
              key={product.id}
              className={`product-item ${product.isFinalized && "Liberado"}`}
            >
              <h3>{product.productName}</h3>
              <p>Valor a pagar: {product.totalPrice}</p>
              <p>Quantidade: {product.quantity}</p>
              {/* <p>
                Status:
                <span className={`status ${product.isFinalized && "Retido"}`}>
                  {product.isFinalized}
                </span>
              </p> */}
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
          onClick={() => {
            navigate("/produtos/cadastro");
          }}
        >
          Roubar Produto do Cidadão
        </Button>
      )}
    </div>
  );
};

export default RetainedProductsView;
