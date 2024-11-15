import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import "../../styles/styles.css";
import { useState } from "react";

export default function RegisterView() {
  const [isCompany, setIsCompany] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsCompany(e.target.checked);
  };

  const handleRegister = () => {};

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
        />
        <label>Sobrenome</label>
        <Input
          size="middle"
          placeholder="Informe seu Sobrenome"
          prefix={<UserOutlined />}
        />

        <label>Senha</label>
        <Input.Password
          size="middle"
          placeholder="Crie uma Senha"
          prefix={<LockOutlined />}
        />
        <label>Confirme sua Senha</label>
        <Input.Password
          size="middle"
          placeholder="Confirme sua Senha"
          prefix={<LockOutlined />}
        />

        <label>Email</label>
        <Input
          size="middle"
          placeholder="large size"
          prefix={<UserOutlined />}
        />

        {isCompany ? (
          <>
            <label>CNPJ</label>
            <Input
              size="middle"
              placeholder="Informe o CNPJ"
              prefix={<UserOutlined />}
            />
          </>
        ) : (
          <>
            <label>CPF</label>
            <Input
              size="middle"
              placeholder="Informe o CPF"
              prefix={<UserOutlined />}
            />
          </>
        )}

        <Checkbox onChange={handleCheckboxChange}>Pessoa Jurídica</Checkbox>
      </div>
      <div className="buttons-cadastro">
        <a>Fazer Login</a>
        <Button
          type="primary"
          size="large"
          style={{ backgroundColor: "#FFA500", borderColor: "#FFA500" }}
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
