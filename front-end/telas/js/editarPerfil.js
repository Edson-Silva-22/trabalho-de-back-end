const { createApp, ref, reactive, onMounted } = Vue;
createApp({
    setup(){
        //pegando o valor do token compartilhado pelo arquivo cadastroEstoquistas
        let token = localStorage.getItem('token')
        let authId = localStorage.getItem('authId')
        let aviso = ref(null)
        const estilo = ref(null)
        const estilo2 = ref(null)
        let click = true
        const nome = ref(null)
        const email = ref(null)
        const senha = ref(null)
        const cpf = ref(null)
        const telefone = ref(null)
        const cidade = ref(null)

    
        //método que aciona o menu responsivo
        function toggle(){
            if(click == true){
                estilo.value.classList.toggle('open')
                estilo2.value.style.transform = "translate(0%)"
                click = false
                
            }
            else{
                estilo.value.classList.toggle('open')
                estilo2.value.style.transform = "translate(100%)"
                click = true
            }
        }

        //método que apaga o token quando o usuário sair do sistema
        function sair(){
            localStorage.setItem('token', null)
            window.location.assign('Login.html')
        }



        //Configurando o token para ser passado em todos as requisições onde tk é o nome do header definido seguido da palavra padrão Bearer e o token
        axios.defaults.headers.common['tk'] = `Bearer ${token}`;

        //Método show: lista um medicamento específico
        async function show(){
            
            axios.get(`http://localhost:3000/estoquistas/${authId}`).then((response) => {
                nome.value = response.data.estoquista.nome
                email.value = response.data.estoquista.email
                cpf.value = response.data.estoquista.cpf
                telefone.value = response.data.estoquista.telefone
                cidade.value = response.data.estoquista.cidade
            }).catch((error) => {
                alert(error.response.data.error)
            })
            
        }

        async function update(){
            if(nome.value == null || email.value == null || senha.value == null || cpf.value == null || telefone.value == null || cidade.value == null){
                alert("Ateção!!. Todos os dados devem ser preenchidos")
            }
            else{

                axios.put(`http://localhost:3000/estoquistas/${authId}`, {
                    nome: nome.value,
                    email: email.value,
                    senha: senha.value,
                    cpf: cpf.value,
                    telefone: telefone.value,
                    cidade: cidade.value,
                }).then((response) => {
                    alert('Perfil atualizado com sucesso')
                    window.location.reload(true)
                }).catch((error) => {
                    alert(error.response.data.error)
                })
            }
            
        }

        onMounted( async () => {
            show()
        })

        return{
            nome,
            email,
            senha,
            cpf,
            telefone,
            cidade,
            estilo,
            estilo2,
            aviso,
            toggle,
            sair,
            show,
            update
        }
    }
}).mount('#app')