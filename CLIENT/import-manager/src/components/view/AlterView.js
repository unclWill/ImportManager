import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import "../../styles/AlterView.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { checkDocType } from "../../utils/Mascaras";

export default function AlterView() {
  const navigate = useNavigate();
  const [isCompany, setIsCompany] = useState(false);
  const { user } = useContext(AuthContext);
  const [newUser, setNewUser] = useState({
    nome: user.name,
    sobrenome: "",
    senha: "",
    confirmaSenha: "",
    email: "",
    doc: user.doc,
  });

  const handleCheckboxChange = (e) => {
    setIsCompany(e.target.checked);
  };

  const handleSalvar = () => {};

  return (
    <div className="register-container">
      <img
        src={"/leao.png"}
        alt="Logo InvestManager"
        className="logo-img-register"
      />
      <h1 className="title-register">Alterar Dados do Usuário</h1>

      <div className="register-form">
        <label>Nome</label>
        <Input
          size="middle"
          placeholder="Informe seu Nome"
          prefix={<UserOutlined />}
          value={newUser.nome}
          onChange={(n) => setNewUser({ ...newUser, nome: n.target.value })}
        />
        <label>Sobrenome</label>
        <Input
          size="middle"
          placeholder="Informe seu Sobrenome"
          prefix={<UserOutlined />}
          value={newUser.sobrenome}
          onChange={(n) =>
            setNewUser({ ...newUser, sobrenome: n.target.value })
          }
        />

        <label>Senha</label>
        <Input.Password
          size="middle"
          placeholder="Crie uma Senha"
          prefix={<LockOutlined />}
          value={newUser.senha}
          onChange={(n) => setNewUser({ ...newUser, senha: n.target.value })}
        />
        <label>Confirme sua Senha</label>
        <Input.Password
          size="middle"
          placeholder="Confirme sua Senha"
          prefix={<LockOutlined />}
          value={newUser.confirmaSenha}
          onChange={(n) =>
            setNewUser({ ...newUser, confirmaSenha: n.target.value })
          }
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
              value={newUser.doc}
              onChange={(n) => setNewUser({ ...newUser, doc: n.target.value })}
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
              value={newUser.doc}
              onChange={(n) => setNewUser({ ...newUser, doc: n.target.value })}
            />
          </>
        )}

        <Checkbox checked={checkDocType(user.doc) === "cnpj" ? true : false}>
          Pessoa Jurídica
        </Checkbox>
      </div>
      <div className="buttons-alter">
        <Button
          type="primary"
          size="large"
          style={{ backgroundColor: "#FFA500", borderColor: "#FFA500" }}
        >
          Salvar
        </Button>
        <Button
          type="primary"
          size="large"
          style={{ backgroundColor: "#FFA500", borderColor: "#FFA500" }}
          onClick={() => {
            navigate("/produtos/lista");
          }}
        >
          Cancelar
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
