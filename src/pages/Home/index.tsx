//components
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios"; //conexao com a api
import ReactLoading from "react-loading"; //import loading

//style-componets
import { Container, Content, FilterForm, TableContent } from "./styles";

//import types
import { UserData } from "../../assets/types";
import ModalInfo from "../../components/Modal";

function Home() {
//armazenar dados de retorno da API
    const [dataFetching, setDataFetching] = useState<UserData[]>([])
    const [dataFetchingBackup,setDataFetchingBackup] = useState<UserData[]>([])
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState(null)
   
//Modal
    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false)
    const [dataUser, setDataUser] = useState<UserData>()
    
    function handleOpenModalInfo(userSelected:UserData) {
        setIsModalInfoOpen(true)
        setDataUser(userSelected)
    }
    function handleCloseModalInfo() {
        setIsModalInfoOpen(false)
        
    }
    
// filtro de busca
    const [search, setSearch] = useState('')
    const [searchCoutry, setSearchCoutry] = useState('')
//primero filtro
    useEffect(() => {
       if (search.length > 0) {
           const filter = dataFetching.filter(a =>
               a.name.first.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
               a.name.last.toLowerCase().indexOf(search.toLowerCase()) >= 0 
           )
           setDataFetching(filter)
       } else {
        setDataFetching(dataFetchingBackup)
       }
   },[search])
//segundo filtro
    useEffect(() => {
       if (searchCoutry != "") {
           const filterCountry = dataFetching.filter(a => a.location.country.toUpperCase().indexOf(searchCoutry.toUpperCase()))
           setDataFetching(filterCountry)
           
       } else {
           setDataFetching(dataFetchingBackup)
       }
   },[searchCoutry])

    
//conexao com a API
    useEffect(() => {
        axios.get('https://randomuser.me/api/', {
            params: {
                results:10
            }
        })
            .then(response => { //resposta ok
                setDataFetching(response.data.results)
                setDataFetchingBackup(response.data.results)
                // console.log("ola mundo")
            })
            .catch(error => { //resposta erro
                console.log(error)
                setError(error)
            })
            .finally(() => {  //dando erro ou nao ele ira executar
            setIsFetching(false) //
        }) 
    }, [])
    
   

    return ( 
        <Container>
            <Header/>
            <Content>
                <h1>Lista de alunos do curso</h1>
                {isFetching ? (
                <ReactLoading type="cubes" color="#FFFFFF"/>
                ) : (
                    <>
                        <FilterForm>
                            <div>
                                <label htmlFor="nome">Pesquisar</label>
                                    <input type="text"
                                        id="nome"
                                        placeholder="Nome do Aluno"
                                        onChange={(e) => setSearch(e.target.value)} />
                                </div>
                                
                            <div>
                                <label htmlFor="nacionalidade">Nacionalidade</label>
                                    <select name="nacionalidade"
                                        id="nacionalidade"
                                        onChange={(e) => setSearchCoutry(e.target.value)}
                                        // value={searchCoutry}
                                        >
                                        <option value="">Todas</option>
                                        {dataFetching.map((item, index) => (
                                            <option key={index} value={item.location.country}>{ item.location.country}</option>
                                        )
                                            
                                        )}
                                </select>
                            </div>
                        </FilterForm>
                        <TableContent>
                            <thead>
                                <tr>
                                <th>Nome</th>
                                <th>Sexo</th>
                                <th>Nacionalidade</th>
                                <th>Ação</th>
                            </tr>
                            </thead>
                            <tbody>
                                {dataFetching.map((item, index) => (
                                <tr key={index}>
                                    <td>{ `${item.name.first} ${item.name.last}`}</td>
                                    <td>{ item.gender}</td>
                                    <td>{item.nat}</td>
                                <td><button onClick={()=> handleOpenModalInfo(item)}>visualizar</button></td>
                            </tr> 
                                ))}
                                
                                
                            </tbody>
                        </TableContent>
                    </>
                )}
            </Content>
            <ModalInfo
                isOpen={isModalInfoOpen}
                onRequestClose={handleCloseModalInfo}
                userSelected={dataUser}
            
            />
      </Container>
     );
}

export default Home;