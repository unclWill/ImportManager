import React, { useState, useEffect, useContext, useRef } from "react";
import "../../styles/retainedProducts.css";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/AuthProvider";
import {
  recoverProduct,
  searchAll,
  searchAllByUser,
  searchByProductName,
  searchByProductNamebyUserId,
} from "../service/ProductService";

import { useNavigate } from "react-router-dom";

const RetainedProductsView = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const [list, setList] = useState(null);
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [search, setSearch] = useState("");


  async function render() {
    if (search === "") {
      if (user.role === "Admin") {
        try {
          const newList = await searchAll(user.doc, user.token);

          if (newList) {
            setList(newList);
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            return;
          } else {
            alert(
              "Erro ao recuperar informações sobre os produtos retidos, conforme o artigo 762 do código da lei numero 220020 de 1992, todos os valores e demais produtos em posse do cidadão devem ser retidos, em virtude da dúvida!",
              error
            );
          }
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

    if (search != "") {
      if (user.role === "Admin") {
        try {
          const newList = await searchByProductName(search, user.token);

          if (newList) {
            setList(newList);
          }
        } catch (error) {
          setList([
            {
              productName: "Não tem Produto com Esse Nome!",
              quantity: 0,
              feePercentage: 0,
              totalPrice: 0,
              description: "Digite o nome de um produto que exista!",
              isFinalized: true,
            },
          ]);
        }
      } else {
        try {
          const newList = await searchByProductNamebyUserId(
            search,
            user.id,
            user.token
          );

          if (newList) {
            setList(newList);
          }
        } catch (error) {
          setList([
            {
              productName: "Não tem Produto com Esse Nome!",
              quantity: 0,
              feePercentage: 0,
              totalPrice: 0,
              description: "Digite o nome de um produto que exista!",
              isFinalized: true,
            },
          ]);
        }
      }
    }
  }

  useEffect(() => {
    render();
    console.log(list);
  }, []);

  useEffect(() => {
    setList(null);
    render();
  }, [search]);

  function playLeao() {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }

  async function handleRecoverProduct(product) {
    try {
      const recovered = await recoverProduct(
        product.id,
        product.quantity,
        product.feePercentage,
        user.token
      );

      if (recovered.isFinalized === true) {
        console.log(recovered.isFinalized);
        alert(
          "Produto recuperado com sucesso, aguarde 72 dias úteis para buscar seu produto em uma agência da Receita Federal. Em caso de dúvida confira https://www.gov.br/receitafederal/pt-br"
        );
        playLeao();
        render();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="retained-products-view">
      <audio ref={audioRef} src="/audio/leao.mp3" preload="auto" />
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
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>

      <ul className="product-list">
        {list &&
          list.map((product) => (
            <li key={product.id} className={`product-item`}>
              <h3>{product.productName}</h3>
              <p>
                Evasor: {product.userName}@{product.taxPayerDocument}
              </p>
              <p>
                Valor a pagar: {product.totalPrice}{" "}
                <span style={{ fontSize: "0.9rem", color: "lightgrey" }}>
                  Taxad de {product.feePercentage}% aplicada
                </span>
              </p>
              <p>Quantidade: {product.quantity}</p>
              <p>Descrição: {product.productDescription}</p>
              <p
                className={`status ${product.isFinalized ? "liberado" : "retido"
                  }`}
              >
                {product.isFinalized ? "Liberado" : "Retido"}
              </p>
              {user.role === "TaxPayer" && !product.isFinalized && (
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
                    handleRecoverProduct(product);
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
          navigate("/user/alterar");
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
