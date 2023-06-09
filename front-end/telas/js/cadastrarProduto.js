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

        if(nome.value == '' || quantidade.value == '' || codigo.value == ''){
            alert("Ateção!!. Todos os dados devem ser preenchidos")
        }
    
        else{
            axios.post('http://localhost:3000/produtos', {
                nome: nome.value,
                quantidade: quantidade.value,
                codigo: codigo.value
            }).then(function (response) {
    
                alert('Medicamento cadastrado com sucesso')
                window.location.reload(true)
    
            }).catch(function (err) {
                alert(err.response.data.error);
            });
        }

    

        return{
            nome,
            quantidade,
            codigo,
            estilo,
            toggle
        }
    }
}).mount('#app')