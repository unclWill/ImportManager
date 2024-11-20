import React, { useState, useEffect, useContext } from "react";
import "../../styles/retainedProducts.css";
import { Alert, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/AuthProvider";
import { searchAll, searchAllByUser } from "../service/ProductService";
import { useNavigate } from "react-router-dom";

const RetainedProductsView = () => {
  const { user, handleLogout } = useContext(AuthContext);
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

        if (newList) {
          setList(newList);
          console.log(newList);
        }
      } catch (error) {
        alert(
          "Erro ao recuperar informações sobre os produtos retidos, conforme o artigo 762 do código da lei numero 220020 de 1992, todos os valores e demais produtos em posse do cidadão devem ser retidos, em virtude da dúvida!",
          error
        );
      }
    }

    if (user.role === "TaxPayer") {
      try {
        const newList = await searchAllByUser(user.doc, user.token);

        if (newList) {
          setList(newList);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    console.log(user.role);
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
              <p>
                Valor a pagar: {product.totalPrice}{" "}
                <span style={{ fontSize: "0.9rem", color: "lightgrey" }}>
                  Taxad de {product.feePercentage}% aplicada
                </span>
              </p>
              <p>Quantidade: {product.quantity}</p>
              <p>Descrição: {product.productDescription}</p>
              {user.role === "TaxPayer" && (
                <Button
                  type="primary"
                  size="small"
                  style={{
                    backgroundColor: "red",
                    borderColor: "red",
                    fontWeight: "bold",
                    position: "absolute",
                    top: "4.7vw",
                    right: "0.2vw",
                    margin: "5px",
                  }}
                  onClick={() => {
                    alert(
                      "Funcionalidade ainda não implementada pelo companheiro Taxad"
                    );
                  }}
                >
                  Fazer o L
                </Button>
              )}
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
        onClick={() => {
          alert("Funcionalidade ainda não implementada pelo companheiro Taxad");
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

      <Button
        type="primary"
        size="large"
        style={{
          backgroundColor: "#FFA500",
          borderColor: "#FFA500",
          fontWeight: "bold",
          position: "absolute",
          top: "17vw",
          left: "0.2vw",
        }}
        onClick={() => {
          handleLogout();
          alert("Deslogado com sucesso!");
          navigate("/");
        }}
      >
        Deslogar
      </Button>
    </div>
  );
};

export default RetainedProductsView;
