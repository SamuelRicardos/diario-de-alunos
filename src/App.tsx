import { useState, useEffect } from "react"
import { LiaEdit } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import "./styles.css"

type Aluno = {
  _id: string
  bimestre: string
  matricula: string;
  nome: string;
  curso: string;
}

function App() {

  const [formData, setFormData] = useState({
    nome: "",
    matricula: "",
    curso: "",
    bimestre: "",
  })

  const [idParaEdicao, setIdParaEdicao] = useState("")

  const [errorNome, setErrorNome] = useState("");
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function salvarAluno(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formData.nome === "") {
      setErrorNome("Campo é obrigatório");
    } else {
      setErrorNome("")

      if (idParaEdicao) {
        try {
          await axios.put(`https://api-aluno.vercel.app/aluno/${idParaEdicao}`, {
            nome: formData.nome,
            matricula: formData.matricula,
            curso: formData.curso,
            bimestre: formData.bimestre,
          });
          buscarAlunos();
          toast("Aluno editado com sucesso")

        } catch (error) {
          toast("Erro ao editar aluno: " + error)
        }
      } else {
        try {
          await axios.post("https://api-aluno.vercel.app/aluno", {
            nome: formData.nome,
            matricula: formData.matricula,
            curso: formData.curso,
            bimestre: formData.bimestre,
          });
          buscarAlunos();
          toast("Aluno cadastrado com sucesso");

          setIdParaEdicao("");
        } catch (error) {
          toast("Erro ao cadastrar aluno: " + error)
        }
      }

      setFormData({ nome: "", matricula: "", curso: "", bimestre: "" })
    }

  }

  async function buscarAlunos() {
    setIsLoading(true)
    const response = await axios.get("https://api-aluno.vercel.app/aluno");
    setAlunos(response.data)
    setIsLoading(false)
  }

  async function removerAluno(id: string) {
    try {
      await axios.delete(`https://api-aluno.vercel.app/aluno/${id}`);
      buscarAlunos();
      toast("Aluno removido com sucesso")
    } catch (error) {
      toast("Erro ao remover aluno: " + error);
    }
  }

  function preencherEstado(aluno: Aluno) {

    setFormData({
      nome: aluno.nome,
      matricula: aluno.matricula,
      bimestre: aluno.bimestre,
      curso: aluno.curso
    });

    setIdParaEdicao(aluno._id);
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
                <option selected>Selecione um curso</option>
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
          {
            isLoading ? <p>Carregando...</p> :
              <table border={1} className="table_alunos">
                <tr>
                  <th className="flex-0">Ordem</th>
                  <th className="flex-2">Nome</th>
                  <th className="flex-1">Matrícula</th>
                  <th className="flex-1">Curso</th>
                  <th className="flex-1">Bimestre</th>
                  <th className="flex-1">Ações</th>
                </tr>

                {
                  alunos.map((aluno, index) => {
                    return (
                      <tr key={aluno._id}>
                        <td className="flex-0">{index + 1}</td>
                        <td className="flex-2">{aluno.nome}</td>
                        <td className="flex-1">{aluno.matricula}</td>
                        <td className="flex-1">{aluno.curso}</td>
                        <td className="flex-1">{aluno.bimestre}</td>
                        <td className="flex-1">
                          <MdDelete color="#F90000"size={25} onClick={() => removerAluno(aluno._id)}>excluir</MdDelete>
                          <LiaEdit color="#0FBA3F" size={25} onClick={() => preencherEstado(aluno)}>editar</LiaEdit>
                        </td>
                      </tr>
                    );
                  })}
              </table>
          }
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default App
