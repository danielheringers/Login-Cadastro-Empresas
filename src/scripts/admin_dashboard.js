import { Api } from "./api.js";
const setorLista        = document.querySelector(".setorLista")
const DivSetores        = document.querySelector(".setores")
const DivEmpresas       = document.querySelector(".empresas")
const DivDepartamentos  = document.querySelector(".departamentos")
const btnSetores        = document.getElementById("btnSetores")
const btnEmpresas       = document.getElementById("btnEmpresas")
const btnDepartamentos  = document.getElementById("btnDepartamentos")

class ButtonsAdminDashboar{
    static btnSetores(){
        btnSetores.addEventListener("click", async (event) =>{
            event.preventDefault

            DivSetores.classList.add("active")
            DivEmpresas.classList.remove("active")
            DivDepartamentos.classList.remove("active")
        })
    }

    static btnEmpresas(){
        btnEmpresas.addEventListener("click", async (event) =>{
            event.preventDefault

            DivSetores.classList.remove("active")
            DivEmpresas.classList.add("active")
            DivDepartamentos.classList.remove("active")
        })
    }

    static btnDepartamentos(){
        btnDepartamentos.addEventListener("click", async (event) =>{
            event.preventDefault

            DivSetores.classList.remove("active")
            DivEmpresas.classList.remove("active")
            DivDepartamentos.classList.add("active")
        })
    }
}

ButtonsAdminDashboar.btnSetores()
ButtonsAdminDashboar.btnEmpresas()
ButtonsAdminDashboar.btnDepartamentos()

class AdminDashboard{
    static renderSetor(setor){
        const nomeSetor       = document.createElement("li")
        nomeSetor.classList.add("nomeEmpresa")
        nomeSetor.innerText   = setor.description
        return nomeSetor
    }

    static listarSetor(array){
        array.forEach((element) => {
            const setor = this.renderSetor(element)
            setorLista.append(setor)
        });
    }

    
    static async Setores(array){
        const selecionarSetor = document.getElementById("selecionarSetor")
        

        let filtros = new Map()
        array.forEach((element) => {
            if(!filtros.has(element.description)){
                filtros.set(element.description, element.uuid)
                const option     = document.createElement("option")
                option.classList.add("setorEmpresas")

                option.innerText = element.description
                option.value     = element.uuid
                selecionarSetor.appendChild(option)
            }
        })
    }

    static async CriarEmpresas(){
        const btnCriarEmpresa   = document.getElementById("btnCriarEmpresa")
        const nomeEmpresa       = document.getElementById("nomeEmpresa")
        const horario           = document.getElementById("horario")
        const descricao         = document.getElementById("descricao")
        const selecionarSetor   = document.getElementById("selecionarSetor")


        btnCriarEmpresa.addEventListener("click", async (element) =>{
            element.preventDefault
            const data = {
                name: nomeEmpresa.value,
                opening_hours: horario.value,
                description: descricao.value,
                sector_uuid: selecionarSetor.value
            }

            await Api.createCompanie(data)
        })
    }



    static async renderEmpresasPorSetor(data){
        const companys      = document.querySelector(".companys")
        data.forEach((empresa) => {
            const subEmpresa       = document.createElement("div")
            const empresaNome      = document.createElement("p")
            const empresaSetor     = document.createElement("span")
            const empresaHorario   = document.createElement("span")
            const departamentos    = document.createElement("div")

            departamentos.classList.add("divDepartamentos")

            empresaNome.innerText    = empresa.name
            empresaSetor.innerText   = empresa.sectors.description
            empresaHorario.innerText = empresa.opening_hours

            subEmpresa.append(empresaNome, empresaSetor, empresaHorario, departamentos)
            companys.append(subEmpresa)
            return companys
        })

    }


    static async ListarEmpresasPorSetor(data){
        const setores = await Api.listarSetores()

        function select(array){
            const selectSectors = document.getElementById("selectSectors")
            const companys      = document.querySelector(".companys")
        
            let filtros = new Map()
            array.forEach((element) => {
                if(!filtros.has(element.description)){
                    filtros.set(element.description, element.uuid)
                    const option     = document.createElement("option")
                    option.classList.add("setorEmpresas")

                    option.innerText = element.description
                    option.value     = element.uuid
                    selectSectors.appendChild(option)
                }
            })
            
            data.forEach((empresa) => {
                const subEmpresa       = document.createElement("div")
                const empresaNome      = document.createElement("p")
                const empresaSetor     = document.createElement("span")
                const empresaHorario   = document.createElement("span")

                empresaNome.innerText    = empresa.name
                empresaSetor.innerText   = empresa.sectors.description
                empresaHorario.innerText = empresa.opening_hours
                subEmpresa.append(empresaNome, empresaSetor, empresaHorario,)
                companys.append(subEmpresa)
                return companys
            })
            
            selectSectors.addEventListener("change", async () =>{
                companys.innerHTML = ''
                const empresasApi = await Api.listarEmpresas()
                const filtros = empresasApi.filter(element => {
                    return element.sectors.uuid == selectSectors.value
                })

                const empresasFiltradas = AdminDashboard.renderEmpresasPorSetor(filtros)
                
                return empresasFiltradas
            })

        }
        select(setores)
    }

    static listaEmpresa(array){
        const empresasAll      = document.querySelector(".listAllCompany")
        array.forEach((empresa) => {
            const div              = document.createElement("div")
            const empresaNome      = document.createElement("p")
            const empresaSetor     = document.createElement("span")
            const empresaHorario   = document.createElement("span")

            empresaNome.innerText    = empresa.name
            empresaSetor.innerText   = empresa.sectors.description
            empresaHorario.innerText = empresa.opening_hours

            empresasAll.append(div)
            div.append(empresaNome, empresaSetor, empresaHorario)
        });
    }

    static async createDepart(){
        const nomeDpt       = document.getElementById("nomeDpt")
        const descDpt       = document.getElementById("descDpt")
        const btnCriarDpt   = document.getElementById("criarDpt")

        const empresasLista = await Api.listarEmpresas()
        function select(array){
            const selectEmpresa = document.getElementById("selectEmpresa")

            array.forEach((element) => {
                const option     = document.createElement("option")
                option.innerText = element.name
                option.value     = element.uuid
                selectEmpresa.appendChild(option)
            })

            btnCriarDpt.addEventListener("click", async (element) => {
                element.preventDefault()
    
                const data = {
                    name: nomeDpt.value,
                    description: descDpt.value,
                    company_uuid: selectEmpresa.value
                }

                await Api.CreateDpt(data)
            })
        }
        select(empresasLista)
    }

    static async listarFuncionariosDpt(){
        const empresasLista = await Api.listarEmpresas()
        const Users         = await Api.listarUsuariosSemTrabalho()
        function select(empresas){
            const selectEmpresaLista  = document.getElementById("selectEmpresaLista")
            const selectDptEmpresa    = document.getElementById("selectDptEmpresa")
            const funcionarios        = document.getElementById("funcionarios")
            

            empresas.forEach((element) => {
                const option     = document.createElement("option")
                option.innerText = element.name
                option.value     = element.uuid
                selectEmpresaLista.appendChild(option)
            })

            selectEmpresaLista.addEventListener("change", async () =>{
                selectDptEmpresa.innerHTML = ""
                const optionVazia = document.createElement("option")
                optionVazia.innerText = "Escolha o Departamento"
                const listaDpt = await Api.listDptCompany(selectEmpresaLista.value)
                listaDpt.forEach((element) => {
                    const option     = document.createElement("option")
                    option.innerText = element.name
                    option.value     = element.uuid
                    selectDptEmpresa.appendChild(option)
                })
            })

            selectDptEmpresa.addEventListener("change", async (element) =>{
                element.preventDefault()
                funcionarios.innerHTML = ""
                const listaFuncionarios = await Api.listarUsuarios()
                console.log(listaFuncionarios)
                console.log(selectDptEmpresa.value)
                listaFuncionarios.forEach((element) => {
                    if(element.department_uuid == selectDptEmpresa.value){
                        const div      = document.createElement("div")
                        const NomeFun  = document.createElement("p")
                        const nivel    = document.createElement("p")
                        const tipo     = document.createElement("p")
                        const btnDem   = document.createElement("button")
                        NomeFun.innerText   = `Nome: ${element.username}`
                        NomeFun.id          = "nomeDel"
                        NomeFun.value       = element.uuid
                        nivel.innerText     = `Nível: ${element.professional_level}`
                        tipo.innerText      = `Tipo: ${element.kind_of_work}`
                        btnDem.innerText    = "Demitir"
                        btnDem.id           = `${element.username}btnDem`
                        btnDem.type         = "button"
                        
                        div.append(NomeFun, nivel, tipo, btnDem)
                        funcionarios.append(div)

                        const btnDemitir          = document.getElementById(`${element.username}btnDem`)
                        btnDemitir.addEventListener("click", async () => {
                            const nomeDel = document.getElementById("nomeDel")
                            await Api.FireWorker(nomeDel.value)
                        })

                    }
                })
            })

            
            const DivPrincipal   = document.getElementById("usuarioSemEmprego")
            Users.forEach((element) => {
                const div      = document.createElement("div")
                const NomeFun  = document.createElement("p")
                const nivel    = document.createElement("p")
                const btnCon   = document.createElement("button")
                if(element.username == null || element.username == undefined || element.username == ""){
                    NomeFun.innerText = ""
                }
                NomeFun.innerText   = `Nome: ${element.username}`
                NomeFun.id          = "nomeCon"
                NomeFun.value       = element.uuid
                nivel.innerText     = `Nível: ${element.professional_level}`
                btnCon.innerText    = "Contratar"
                btnCon.id           = `${element.username}btnCon`
                btnCon.type         = "button"
    
                div.append(NomeFun, nivel, btnCon)
                DivPrincipal.append(div)
    
                const btnContratar  = document.getElementById(`${element.username}btnCon`)
                btnContratar.addEventListener("click", async (element) => {
                    element.preventDefault()
                    const nomeCon = document.getElementById("nomeCon")
                    console.log(nomeCon.value)
                    const data    = {
                        user_uuid: nomeCon.value,
                        department_uuid: selectDptEmpresa.value
                    }
                    await Api.HireWorker(data)
                })
    
            })
            




        }
        select(empresasLista)

    }




}




//----------------------------------------------------//

const requestEmpresas = await Api.listarEmpresas()
const setores = await Api.listarSetores()


AdminDashboard.listarSetor(setores)
AdminDashboard.Setores(setores)

AdminDashboard.CriarEmpresas()

AdminDashboard.ListarEmpresasPorSetor(requestEmpresas)


AdminDashboard.listaEmpresa(requestEmpresas)

AdminDashboard.createDepart()

AdminDashboard.listarFuncionariosDpt()