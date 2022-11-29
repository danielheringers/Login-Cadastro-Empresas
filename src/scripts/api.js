import { Toast } from "./toastify.js"
export class Api{
    static baseUrl      = "http://localhost:6278/"
    static token        = localStorage.getItem("@KE:token") || ""
    static headers      = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
    }

    static async listarEmpresas(){
        const lista = await fetch(`${this.baseUrl}companies`,{
            method: "GET",
        })
        .then(res => res.json())
        .then(res => {return res})
        .catch(err => console.log(err))
        return lista
    }

    static async filtroSetor(setor){
        const lista = await fetch(`${this.baseUrl}companies/${setor}`,{
            method: "GET",
        })
        .then(res => res.json())
        .then(res => {return res})
        .catch(err => console.log(err))
        return lista
    }

    static async newUser(body){
        const user = await fetch(`${this.baseUrl}auth/register/user`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        .then(res => res)
        .then(res => {
            if(res.ok){
                Toast.create("Usuário Criado!", "#07bc0c")
            }
            else{
                Toast.create("Preencha os dados corretamente", "#f1c40f")
            }
        })
        .catch(err => console.log(err))
        return user
    }

    static async login(body){
        const user = await fetch(`${this.baseUrl}auth/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        .then(res => {
            if(res.ok){
                Toast.create("Sucesso no Login!", "#07bc0c")
                return res.json()
            }
            else{
                Toast.create("Erro no Login!", "#e74c3c")
                return res.json()
            }
        })
        .then(res => {
            localStorage.setItem("@KE:token", res.token)
            localStorage.setItem("@KE:uuid:", res.uuid)
            console.log(res.is_admin)
            if(res.is_admin === true){
                window.location.assign("./src/pages/admin_dashboard.html")
            }
            if(res.is_admin === false){
                window.location.assign("./src/pages/dashboard.html")
            }
            if(res.is_admin === undefined){
                window.location.assign("./index.html")
            }
            
        })
        .catch(err => console.log(err))
        return user
    }

    static async listarSetores(){
        const setor = await fetch(`${this.baseUrl}sectors`, {
            method: "GET",
            headers: this.headers,
        })
        .then(res => res.json())
        .then(res => {return res})
        .catch(err => console.log(err))
        return setor
    }

    static async logedUser(){
        const logedUser = await fetch(`${this.baseUrl}users/profile`, {
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .then(res => {return res})

        return logedUser
    }

    static async departamentUser(){
        const dptUser = await fetch(`${this.baseUrl}users/departments`, {
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .then(res => {return res})

        return dptUser
    }

    static async listarFuncionariosDepartamento(){
        const dptFunc = await fetch(`${this.baseUrl}users/departments/coworkers`, {
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .then(res => {return res})

        return dptFunc
    }

    static async editUser(body){
        const editUser = await fetch(`${this.baseUrl}users`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {return res})

        return editUser
    }

    static async createCompanie(body){
        const company = await fetch(`${this.baseUrl}companies`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res)
        .then(res => {
            if(res.ok){
                Toast.create("Empresa Criada!", "#07bc0c")
            }
            else{
                Toast.create("Preencha os dados corretamente", "#f1c40f")
            }
        })
        .catch(err => console.log(err))
        return company
    }

    static async listDptCompany(id){
        const listDptCompany = await fetch(`${this.baseUrl}departments/${id}`, {
            method: "GET",
            headers: this.headers,
            
        })
        .then(res => res.json())
        .then(res => {return res})
        .catch(err => console.log(err))
        return listDptCompany
    }

    static async listAllDpt(){
        const listAllDpt = await fetch(`${this.baseUrl}departments`, {
            method: "GET",
            headers: this.headers,
            
        })
        .then(res => res.json())
        .then(res => {return res})
        .catch(err => console.log(err))
        return listAllDpt
    }

    static async CreateDpt(body){
        const createDpt = await fetch(`${this.baseUrl}departments`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {return res})
        .catch(err => console.log(err))
        return createDpt
    }

    static async HireWorker(body){
        const hire = await fetch(`${this.baseUrl}departments/hire/`,{
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {return res})
        .catch(err => console.log(err))
        return hire
    }

    static async FireWorker(id){
        const fire = await fetch(`${this.baseUrl}departments/dismiss/${id}`, {
            method: "PATCH",
            headers: this.headers
        })
        .then(res => res.json())
        .then(res => {return res})
        .catch(err => console.log(err))
        return fire
    }

    static async EditDpt(body, id){
        const editDpt = await fetch(`${this.baseUrl}departments/${id}`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {return res})
        .catch(err => console.log(err))
        return editDpt
    }

    static async DelDpt(id){
        const delDpt = await fetch(`${this.baseUrl}departments/${id}`, {
            method: "DELETE",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {return res})
        .catch(err => console.log(err))
        return delDpt
    }

    static async listarUsuarios(){
        const usersAll = await fetch(`${this.baseUrl}users`, {
            method: "GET",
            headers: this.headers,
        })
        .then(res => res.json())
        .then(res => {return res})
        .catch(err => console.log(err))
        return usersAll
    }

    static async listarUsuariosSemTrabalho(){
        const usersOutWork = await fetch(`${this.baseUrl}admin/out_of_work`, {
            method: "GET",
            headers: this.headers,
        })
        .then(res => res.json())
        .then(res => {return res})
        .catch(err => console.log(err))
        return usersOutWork
    }


}