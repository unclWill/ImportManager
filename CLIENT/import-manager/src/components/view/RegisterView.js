import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import "../../styles/StylesRegister.css";
import { useState } from "react";
import { registerService } from "../service/AuthService";
import { isValidCNPJ, isValidCPF } from "../../utils/Mascaras";

export default function RegisterView() {
  const [isCompany, setIsCompany] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    taxPayerDocument: "",
    email: "",
    role: "TaxPayer",
  });
  const [confirmaSenha, setConfirmaSenha] = useState("");

  const handleCheckboxChange = (e) => {
    setIsCompany(e.target.checked);
  };

  const handleRegister = () => {
    if (
      newUser.firstName == "" ||
      newUser.lastName == "" ||
      newUser.password == "" ||
      newUser.taxPayerDocument == "" ||
      newUser.email == "" ||
      newUser.role == "" ||
      confirmaSenha == ""
    ) {
      alert("Todos os campos devem ser preenchidos!");
      return;
    }

    if (newUser.role == "Admin") {
      if (!isValidCNPJ(newUser.taxPayerDocument)) {
        alert("O CNPJ está em formato inválido!");
        return;
      }
    }

    if (newUser.role == "TaxPayer") {
      if (!isValidCPF(newUser.taxPayerDocument)) {
        alert("O CPF está em formato inválido!");
        return;
      }
    }

    if (confirmaSenha != newUser.password) {
      alert("As senhas devem ser iguais!");
      return;
    }

    // alert(`
    //   ${newUser.firstName},
    //   ${newUser.lastName},
    //   ${newUser.password},
    //   ${newUser.role},
    //   ${newUser.taxPayerDocument} `);
    registerService(newUser);
    try {
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-container">
      <img
        src={"/leao.png"}
        alt="Logo InvestManager"
        className="logo-img-register"
      />
      <h1 className="title-register">ImportManager</h1>

      <div className="register-form">
        <label>Nome</label>
        <Input
          size="middle"
          placeholder="Informe seu Nome"
          prefix={<UserOutlined />}
          value={newUser.firstName}
          onChange={(n) =>
            setNewUser({ ...newUser, firstName: n.target.value })
          }
        />
        <label>Sobrenome</label>
        <Input
          size="middle"
          placeholder="Informe seu Sobrenome"
          prefix={<UserOutlined />}
          value={newUser.lastName}
          onChange={(n) => setNewUser({ ...newUser, lastName: n.target.value })}
        />

        <label>Senha</label>
        <Input.Password
          size="middle"
          placeholder="Crie uma Senha"
          prefix={<LockOutlined />}
          value={newUser.password}
          onChange={(n) => setNewUser({ ...newUser, password: n.target.value })}
        />
        <label>Confirme sua Senha</label>
        <Input.Password
          size="middle"
          placeholder="Confirme sua Senha"
          prefix={<LockOutlined />}
          value={confirmaSenha}
          onChange={(n) => setConfirmaSenha(n.target.value)}
        />

        <label>Email</label>
        <Input
          size="middle"
          placeholder="large size"
          prefix={<UserOutlined />}
          value={newUser.email}
          onChange={(n) => setNewUser({ ...newUser, email: n.target.value })}
        />

        {isCompany ? (
          <>
            <label>CNPJ</label>
            <Input
              className=".input"
              size="middle"
              placeholder="Informe o CNPJ"
              prefix={<UserOutlined />}
              value={newUser.taxPayerDocument}
              onChange={(n) =>
                setNewUser({
                  ...newUser,
                  taxPayerDocument: n.target.value,
                  role: "Admin",
                })
              }
            />
          </>
        ) : (
          <>
            <label>CPF</label>
            <Input
              className=".input"
              size="middle"
              placeholder="Informe o CPF"
              prefix={<UserOutlined />}
              value={newUser.taxPayerDocument}
              onChange={(n) =>
                setNewUser({
                  ...newUser,
                  taxPayerDocument: n.target.value,
                  role: "TaxPayer",
                })
              }
            />
          </>
        )}

        <Checkbox onChange={handleCheckboxChange}>Pessoa Jurídica</Checkbox>
      </div>
      <div className="register-product-buttons-cadastro">
        <a>Fazer Login</a>
        <Button
          type="primary"
          size="large"
          style={{ backgroundColor: "#FFA500", borderColor: "#FFA500" }}
          onClick={handleRegister}
        >
          Cadastrar
        </Button>
      </div>
    </div>

    // Nome
    // Sobrenome
    // CPF
    // Email
    // Password
    // Confirme Password
  );
}
