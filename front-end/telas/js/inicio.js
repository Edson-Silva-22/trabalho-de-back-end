const { createApp, ref, reactive } = Vue;
createApp({
    setup(){
        const estilo = ref(null)
        const estilo2 = ref(null)
        let click = true
        const remedios = ref([
            {
                nome: 'Paracetamol',
                codigo: 'RMD-001',
                quantidade: 50
            },
            {
                nome: 'Ibuprofeno',
                codigo: 'RMD-002',
                quantidade: 30
            },
            {
                nome: 'Dipirona',
                codigo: 'RMD-003',
                quantidade: 20
            },
            {
                nome: 'Amoxicilina',
                codigo: 'RMD-004',
                quantidade: 10
            },
            {
                nome: 'Cetoprofeno',
                codigo: 'RMD-005',
                quantidade: 25
            },
            {
                nome: 'Omeprazol',
                codigo: 'RMD-006',
                quantidade: 15
        const remedios = ref([]);

        const detalhes = ref(null)
        const excluir = ref(null)


        //Método view: lista todos os medicamentos
        async function view(){
            axios.get('http://localhost:3000/produtos').then(function (response) {

                response.data.map(v => {
                    remedios.value.push(v)
                })

            }).catch(function (error) {
                alert('Por causo de um erro interno não foi possível lista os produtos')
                console.log(error);
            })
        }

        //Método show: lista um medicamento específico
        async function show(){
            axios.get(`http://localhost:3000/produtos/${medicamento.value}`).then((response) => {
                response.data.map(v => {
                    remedios.value = []
                    remedios.value.push(v)
                })
            }).catch((error) => {
                alert(error.response.data.error)
            })
        }


        //Método destroy: deleta um medicamento na tabela medicamentos
        async function destroy(codigo){
            if(confirm("Tem certeza que deseja excluir esse medicamento?") == true){
                axios.delete(`http://localhost:3000/produtos/${codigo}`).then((response) => {
                if(response.data){
                    alert("Produto deletado com sucesso")
                    window.location.reload(true)
                }
                }).catch((error) => {
                    alert('Por causo de um erro interno não foi possível deletar o produto')
                    console.log(error);
                })
            }
            
        }
    
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

        return{
            remedios,
            detalhes,
            excluir,
            estilo,
            estilo2,
            toggle,
        }
    }
}).mount('#app')