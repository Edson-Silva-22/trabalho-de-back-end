const { ref, createApp, onMounted, reactive } = Vue
createApp({
    setup() {
        //pegando o valor do token compartilhado pelo arquivo cadastroEstoquistas
        let token = localStorage.getItem('token')
        let remedios = ref([]);
        const estilo = ref(null)
        const estilo2 = ref(null)
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

        //Configurando o token para ser passado em todos as requisições onde tk é o nome do header definido seguido da palavra padrão Bearer e o token
        axios.defaults.headers.common['tk'] = `Bearer ${token}`;
        //Método view: lista todos os medicamentos
        async function view(){
            axios.get('http://localhost:3000/produtos').then(function (response) {

                
                localStorage.setItem('aviso', response.data.some(v => {
                    if(v.quantidade <= 10){
                        return true
                    }
                    else{
                        return false
                    }
                }))
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
                 
                alert('Produto atualizado com sucesso')
                window.location.reload(true)

                
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
            estilo2,
            toggle,
            mostrar,
            view,
            show,
            update,
            destroy,
            sair
        }
    }
}).mount('#app')