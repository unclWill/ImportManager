import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import "../../styles/AlterView.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { checkDocType } from "../../utils/Mascaras";
import { alterById } from "../service/UserService";

export default function AlterView() {
  const navigate = useNavigate();
  const [isCompany, setIsCompany] = useState(false);
  const { user, handleLogout } = useContext(AuthContext);
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [newUser, setNewUser] = useState({
    firstName: user.name,
    lastName: "",
    password: "",
    email: "",
    doc: user.doc,
    role: user.role,
    token: user.token,
    id: user.id,
  });

  // useEffect(() => {
  //   console.log(newUser);
  // }, [newUser]);

  const handleSalvar = async () => {
    try {
      if (
        newUser.firstName === "" ||
        newUser.lastName === "" ||
        newUser.password === "" ||
        newUser.email === "" ||
        confirmaSenha === ""
      ) {
        alert("Todos os campos devem ser preenchidos!");
        return;
      }

      if (confirmaSenha !== newUser.password) {
        alert("As senhas devem ser iguais!");
        return;
      }

      const userD = {
        id: newUser.id,
        token: newUser.token,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        password: newUser.password,
        email: newUser.email,
        role: newUser.role,
      };

      await alterById(userD);
      alert("Dados alterados com sucesso, faça login novamente!");
      handleLogout();
      navigate("/");
    } catch (error) {
      alert(
        "Erro ao alterar os dados, site do governo é assim mesmo, tenta amanhã!"
      );
    }
  };

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
              value={newUser.doc}
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
          onClick={handleSalvar}
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
