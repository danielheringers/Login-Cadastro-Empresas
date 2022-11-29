import { Api } from "./api.js"


const mobileNavBar  = document.querySelector(".mobileMenu")
const navlist       = document.querySelector(".navlist")
const btnLogin      = document.querySelector(".btnLogin")
const btnSingUp     = document.querySelector(".btnSingUp")
const btnEmpresas   = document.querySelector(".btnEmpresas")
const modalLogin    = document.querySelector(".modalLogin")
const modalCadastro = document.querySelector(".modalCadastro")
const boasVindas    = document.querySelector(".boasVindas")
const empresas      = document.querySelector(".empresasListadas")
const selectSetores = document.querySelector(".Setores")
const btnFiltrar    = document.querySelector(".btnFiltrar")
const empresasIni   = document.querySelector(".listaDeEmpresas")


class buttons {
    static mobileNavButton(){
        mobileNavBar.addEventListener("click", async (event) => {
            event.preventDefault
            if(navlist.classList.contains("active")){
                navlist.classList.remove("active")
                mobileNavBar.classList.remove("active")
            }
            else{
                navlist.classList.add("active")
                mobileNavBar.classList.add("active")
            }
        }) 
    }

    static btnLogin(){
        btnLogin.addEventListener("click", async (event) =>{
            event.preventDefault
            if(modalCadastro.classList.contains("active") || empresas.classList.contains("active")){
                modalCadastro.classList.remove("active")
                empresas.classList.remove("active")
                modalLogin.classList.add("active")
                if(boasVindas.classList.contains(!"deactive")){
                    boasVindas.classList.add("deactive")
                }
            }
            else{
                modalLogin.classList.add("active")
                boasVindas.classList.add("deactive")
            }


        })
    }

    static btnSingUp(){
        btnSingUp.addEventListener("click", async (event) => {
            event.preventDefault
            if(modalLogin.classList.contains("active") || empresas.classList.contains("active")){
                modalLogin.classList.remove("active")
                empresas.classList.remove("active")
                modalCadastro.classList.add("active")
                if(boasVindas.classList.contains(!"deactive")){
                    boasVindas.classList.add("deactive")
                }
            }
            else{
                modalCadastro.classList.add("active")
                boasVindas.classList.add("deactive")
            }
        })
    }

    static btnEmpresas(){
        btnEmpresas.addEventListener("click", async (event) => {
            event.preventDefault
            if(modalLogin.classList.contains("active") || modalCadastro.classList.contains("active")){
                modalLogin.classList.remove("active")
                modalCadastro.classList.remove("active")
                empresas.classList.add("active")
                if(boasVindas.classList.contains(!"deactive")){
                    boasVindas.classList.add("deactive")
                }
            }
            else{
                empresas.classList.add("active")
                boasVindas.classList.add("deactive")
            }
        })
    }




}

buttons.mobileNavButton()
buttons.btnLogin()
buttons.btnSingUp()
buttons.btnEmpresas()

class renders{
    static renderEmpresas(empresa){
        const nomeEmpresa       = document.createElement("li")
        nomeEmpresa.classList.add("nomeEmpresa")
        nomeEmpresa.innerText   = empresa.name
        return nomeEmpresa
    }

    static listaEmpresa(array){
        array.forEach((element) => {
            const ltda = renders.renderEmpresas(element)
            empresasIni.appendChild(ltda)
        });
    }

    static async filterSetor(array){
        const ul = document.querySelector(".listaDeEmpresas")
        const listandoEmpresas = await Api.listarEmpresas()
        let filtros = new Map()
        array.forEach((element) => {
            if(!filtros.has(element.sectors.description)){
                filtros.set(element.sectors.description, element.sectors.uuid)
                const option     = document.createElement("option")
                option.classList.add("setorEmpresas")

                option.innerText = element.sectors.description
                option.value     = element.sectors.description
                selectSetores.appendChild(option)
            }
        })

        btnFiltrar.addEventListener("click", async () => {
            ul.innerHTML = ''
            const finalmenteFiltrada = listandoEmpresas.filter(elemento => {
                return elemento.sectors.description == selectSetores.value
            })
            
            finalmenteFiltrada.forEach(element => {
                const empresasFiltradas = renders.renderEmpresas(element)
                ul.append(empresasFiltradas)
            })
        })
    }

}

const requestEmpresas = await Api.listarEmpresas()
renders.listaEmpresa(requestEmpresas)
renders.filterSetor(requestEmpresas)

class singUpLogin{
    static createUser(){
        const inputUser     = document.querySelector('.inputUser')
        const inputEmail    = document.getElementById('email')
        const inputPass     = document.getElementById('password')
        const selectNivel   = document.querySelector('.selectNivel')
        const btnCadastro   = document.querySelector('.btnCadastro')

        btnCadastro.addEventListener("click", async (event) => {
            event.preventDefault
            
            const data = {
                email:  inputEmail.value,
                password:   inputPass.value,
                professional_level: selectNivel.value,
                username:   inputUser.value
            }
            await Api.newUser(data)
        })
    }

    static login(){
        const email     = document.getElementById("emailLogin")
        const senha     = document.getElementById("passwordLogin")
        const btnLoging = document.getElementById("btnLoging")

        btnLoging.addEventListener("click", async (event) => {
            event.preventDefault

            const data = {
                email: email.value,
                password: senha.value
            }

            await Api.login(data)
        })
    }
}

singUpLogin.createUser()
singUpLogin.login()