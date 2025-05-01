import { useState, useEffect } from "react"
import axios from "axios";
import "./styles.css"

function App() {

  const [formData, setFormData] = useState({
    nome: "",
    matricula: "",
    curso: "",
    bimestre: "",
  })

  const [errorNome, setErrorNome] = useState("");

  function salvarAluno(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formData.nome === "") {
      setErrorNome("Campo é obrigatório");
    } else {
      setErrorNome("")
      console.log(formData)
    }

  }

  async function buscarAlunos() {
    const response = await axios.get("https://api-aluno.vercel.app/aluno");

    console.log(response.data)
  }

  useEffect(() => {
    buscarAlunos();
  }, []);

  return (
    <>
      <div className="home">

        <div className="container_form">
          <h1 className="title_home">Diário eletrônico</h1>
          <form className="form" onSubmit={(event) => salvarAluno(event)}>

            <div className="container_input">
              <input placeholder="name" value={formData.nome} onChange={(event) => setFormData({ ...formData, nome: event.target.value })} />
              <span className="error">{errorNome}</span>
            </div>

            <div className="container_input">
              <input placeholder="matricula" value={formData.matricula} onChange={(event) => setFormData({ ...formData, matricula: event.target.value })} />
              <span className="error">{errorNome}</span>
            </div>

            <div className="container_input">
              <select value={formData.curso} onChange={(event) => setFormData({ ...formData, curso: event.target.value })}>
                <option value="Back-end">Back-end</option>
                <option value="Front-end">Front-end</option>
              </select>
              <span className="error">{errorNome}</span>
            </div>

            <div className="container_input">
              <input placeholder="bimestre" value={formData.bimestre} onChange={(event) => setFormData({ ...formData, bimestre: event.target.value })} />
              <span className="error">{errorNome}</span>
            </div>

            <button className="btn_save_form">Salvar</button>
          </form>
        </div>

        <div className="container_table">
          <h2>Alunos Cadastrados</h2>
          <table border={1} className="table_alunos">
            <tr>
              <th className="flex-0">Ordem</th>
              <th className="flex-2">Nome</th>
              <th className="flex-1">Matrícula</th>
              <th className="flex-1">Curso</th>
              <th className="flex-1">Bimestre</th>
            </tr>
            <tr>
              <td className="flex-0">1</td>
              <td className="flex-2">Junin</td>
              <td className="flex-1">Brasil</td>
              <td className="flex-1">ADS</td>
              <td className="flex-1">2</td>
            </tr>
          </table>
        </div>

      </div>
    </>
  )
}

export default App
