const { createApp, ref } = Vue

createApp({
    setup(){
        //pegando o valor do token compartilhado pelo arquivo cadastroEstoquistas
        let token = localStorage.getItem('token')
        const email = ref(null)
        const senha = ref(null)

        //Método view: realiza o login do usuário
        async function view(){
            if(email.value == null || senha.value == null){
                alert("Ateção!!. Todos os dados devem ser preenchidos")
            }
            else{
                axios.post(`http://localhost:3000/estoquistas/login`, {
                    email: email.value,
                    senha: senha.value
                }).then(function (response) {
                    localStorage.setItem('token', response.data.token)
                    alert(response.data.message)
                    window.location.assign('Inicio.html')
                }).catch(function (error) {
                    alert(error.response.data.error)
                })
            }
            
        }

        return {
            email,
            senha,
            view
        }
    }
}).mount('#app')