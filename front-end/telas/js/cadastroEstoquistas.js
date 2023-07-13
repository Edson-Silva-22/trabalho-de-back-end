const { createApp, ref } = Vue

createApp({
    setup(){
        const nome = ref(null)
        const email = ref(null)
        const senha = ref(null)
        const cpf = ref(null)
        const telefone = ref(null)
        const cidade = ref(null)

        async function store(){
            if(nome.value == null || email.value == null || senha.value == null || cpf.value == null || telefone.value == null || cidade.value == null){
                alert("Ateção!!. Todos os dados devem ser preenchidos")
            }
        
            else{
                axios.post('http://localhost:3000/estoquistas', {
                    nome: nome.value,
                    email: email.value,
                    senha: senha.value,
                    cpf: cpf.value,
                    telefone: telefone.value,
                    cidade: cidade.value
                }).then( (response) => {
                    
                    //Utilizando o localStorage para que o token possa ser usado nos outros arquivos 
                    localStorage.setItem('token', response.data.token)
                    alert('Estoquista cadastrado com sucesso')
                    window.location.assign('Inicio.html')
        
                }).catch( (err) => {
                    alert(err.response.data.error);
                });
            }
        }


        return{
            nome,
            email,
            senha,
            cpf,
            telefone,
            cidade,
            store
        }
    }
}).mount('#app')