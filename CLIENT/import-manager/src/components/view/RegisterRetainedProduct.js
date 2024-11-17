import { CheckSquareFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Select } from "antd";
import React, { useState } from "react";
import "../../styles/styles.css";
import "../../styles/registerRetainedProduct.css";
import { registerProductService } from "../service/RegisterProductService";
import { Navigate } from "react-router-dom";

export default function RegisterRetainedProduct() {
  const { TextArea } = Input;
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    category: "",
    owner: "",
  });

  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };

  const handleRegister = () => {
    if (
      newProduct.name === "" ||
      newProduct.description === "" ||
      newProduct.quantity === "" ||
      newProduct.price === "" ||
      newProduct.category === "" ||
      newProduct.owner === ""
    ) {
      alert("Todos os campos devem ser preenchidos!");
      return;
    }

    registerProductService(newProduct);
    alert("Usuário cadastrado com sucesso.");
    //Navigate("/");
    try {
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-product-container">
      <div className="header-area">
        <img src="/leao.png" alt="Logo" className="logo" />
      </div>
      <div className="product-register-form">
        <h1 className="title">Cadastre o Produto</h1>
        <label>Nome do Produto</label>
        <Input
          className="input"
          size="large"
          placeholder="Digite o nome do produto"
          prefix={<CheckSquareFilled />}
          onChange={(n) =>
            setNewProduct({ ...newProduct, name: n.target.value })
          }
        />
        <label style={{ marginBottom: "10px" }}>Descrição</label>
        <Flex vertical gap={32}>
          <TextArea
            className="input"
            showCount
            maxLength={100}
            onChange={(event) =>
              setNewProduct({ ...newProduct, description: event.target.value })
            }
            placeholder="Digite a descrição do produto"
            style={{
              height: 80,
              resize: "none",
              borderWidth: "2px",
              borderColor: "#000000",
              marginBottom: "15px",
            }}
          />
        </Flex>
        <label>Quantidade</label>
        <Input
          className="input"
          size="large"
          placeholder="Quantidade"
          prefix={<PlusOutlined />}
          onChange={(n) =>
            setNewProduct({ ...newProduct, quantity: n.target.value })
          }
        />
        <label>Preço</label>
        <Input
          className="input"
          size="large"
          placeholder="Preço"
          prefix={<PlusOutlined />}
          onChange={(n) =>
            setNewProduct({ ...newProduct, price: n.target.value })
          }
        />
        <label>Categoria</label>
        <Form.Item>
          <Select
            className="product-register-select"
            placeholder="Selecione uma categoria"
            onChange={(n) => setNewProduct({ ...newProduct, category: n })}
          >
            <Select.Option value=""></Select.Option>
            <Select.Option value="Eletronicos">Eletrônicos</Select.Option>
            <Select.Option value="Vestuario">Vestuário</Select.Option>
          </Select>
        </Form.Item>
        <label>Proprietário do Produto</label>
        <Input
          className="input"
          size="large"
          placeholder="Digite o CPF do proprietário"
          prefix={<PlusOutlined />}
          onChange={(n) =>
            setNewProduct({ ...newProduct, owner: n.target.value })
          }
        />
        <div className="register-product-buttons-cadastro">
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: "#FFA500",
              borderColor: "#FFA500",
              width: "6rem",
              margin: "1rem",
            }}
            onClick={handleRegister}
          >
            Cadastrar
          </Button>
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: "#FFA500",
              borderColor: "#FFA500",
              width: "6rem",
              margin: "1rem",
            }}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
