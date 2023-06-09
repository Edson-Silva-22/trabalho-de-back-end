const { createApp, ref, reactive } = Vue
createApp({
    setup(){
        const nome = ref(null)
        const quantidade = ref(null)
        const codigo = ref(null)
        const estilo = ref(null)
        let click = true

        //método que aciona o menu responsivo
        function toggle(){
            if(click == true){
                estilo.value.classList.toggle('open')
                click = false
                
            }
            else{
                estilo.value.classList.toggle('open')
                click = true
            }
        }

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
            toggle,
            store
        }
    }
}).mount('#app')