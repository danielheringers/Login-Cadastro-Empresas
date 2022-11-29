import { Api } from "./api.js";

class dashboardFunctions{
    static async userInfos(data){
        const empresa           = document.querySelector(".empresaTrabalha")
        const departamento      = document.querySelector(".DepartamentoTrabalha")


        const userDepartment = await Api.departamentUser()
        const uuidDepartment = data.department_uuid
         

        empresa.innerText   = userDepartment.name
        userDepartment.departments.filter(elemento => {
            if(elemento.uuid == uuidDepartment){
                departamento.innerText = elemento.name
            }})

    }

    static listarFuncionariosDept(array){
        const ul        = document.querySelector(".listaFuncionarios")
        let objDep      = []

        function desconstruir(){
            for(let i = 0; i < array.length; i++){
                objDep.push(array[0].users[i].username)   
            }
            return objDep
        }

        const finalArray = desconstruir()

        finalArray.forEach((element) => {
            const li     = document.createElement("li")
            li.innerText = element
            ul.append(li)
        });
    }

    static editarUsuario(){
        const username  = document.getElementById("username")
        const email     = document.getElementById("email")
        const password  = document.getElementById("password")
        const btnSalvar = document.getElementById("btnSalvar")

        const data = {
            username:   username.value,
            email:      email.value,
            password:   password.value
        }

        btnSalvar.addEventListener("click", async (event) => {
            event.preventDefault

            await Api.editUser(data)
        })

    }
}

const data = await Api.logedUser()
dashboardFunctions.userInfos(data)

const funcionariosDept = await Api.listarFuncionariosDepartamento()
dashboardFunctions.listarFuncionariosDept(funcionariosDept)

dashboardFunctions.editarUsuario()