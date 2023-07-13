const { createApp, ref, reactive } = Vue
createApp({
    setup(){
        //pegando o valor do token compartilhado pelo arquivo cadastroEstoquistas
        let token = localStorage.getItem('token')
        const nome = ref(null)
        const quantidade = ref(null)
        const codigo = ref(null)
        const estilo = ref(null)
        const estilo2 = ref(null)
        let click = true

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


        //Métodos CRUD
        
        //Configurando o token para ser passado em todos as requisições
        axios.defaults.headers.common['tk'] = `Bearer ${token}`;
        async function store(){
            if(nome.value == null || quantidade.value == null || codigo.value == null){
                alert("Ateção!!. Todos os dados devem ser preenchidos")
            }
        
            else{
                axios.post('http://localhost:3000/produtos', {
                    nome: nome.value,
                    quantidade: quantidade.value,
                    codigo: codigo.value
                }).then( (response) => {
        
                    alert('Medicamento cadastrado com sucesso')
                    window.location.reload(true)
        
                }).catch( (err) => {
                    alert(err.response.data.error);
                });
            }
        }

    

        return{
            nome,
            quantidade,
            codigo,
            estilo,
            estilo2,
            toggle,
            store,
            sair
        }
    }
}).mount('#app')