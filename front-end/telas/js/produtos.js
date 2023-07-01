const { ref, createApp, onMounted, reactive } = Vue
createApp({
    setup() {
        let remedios = ref([]/* [
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
            }
        ] */);
        const estilo = ref(null)
        let click = true
        const buttonOpen = ref(null)
        const buttonClose = ref(null)
        const modal = ref(null)
        const fade = ref(null)
        const medicamento = ref(null)
        const nome = ref(null)
        const codigo = ref(null)
        const quantidade = ref(null)
        var id = ref(null)
        

        //adicionado ou removendo classe que escode o modal
        function mostrar(inputnome, inputcodigo, inputquantidade, inputid) {
            nome.value = inputnome
            codigo.value = inputcodigo
            quantidade.value = inputquantidade
            modal.value.classList.toggle("hide")
            fade.value.classList.toggle("hide")
            id.value = inputid
        }

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
        
        //Métodos CRUD

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
                remedios.value = []
                response.data.map(v => {
                    remedios.value.push(v)
                })
            }).catch((error) => {
                alert(error.response.data.error)
            })
        }

        //Método update: atualiza um medicamento na tabela medicamentos
        async function update(){
            axios.put(`http://localhost:3000/produtos/${id.value}`, {
                nome: nome.value,
                codigo: codigo.value,
                quantidade: quantidade.value

            }).then((response) => {
                if(response.data){
                    alert('Produto atualizado com sucesso')
                    window.location.reload(true)
                }
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

        onMounted( async () => {
            view()
        })

        return {
            remedios,
            buttonClose,
            buttonOpen,
            modal,
            fade,
            medicamento,
            nome,
            codigo,
            quantidade,
            estilo,
            toggle,
            mostrar,
            view,
            show,
            update,
            destroy
        }
    }
}).mount('#app')