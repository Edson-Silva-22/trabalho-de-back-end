const { createApp, ref, reactive, onMounted } = Vue;
createApp({
    setup(){
        //pegando o valor do token compartilhado pelo arquivo cadastroEstoquistas
        let token = localStorage.getItem('token')
        let aviso = ref(null)
        const estilo = ref(null)
        const estilo2 = ref(null)
        const data = ref(null)
        let click = true
        const remedios = ref([])
        const medicamento = ref(null)

    
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

        //Método view: lista todos os medicamentos
        async function view(){
            aviso.value = localStorage.getItem('aviso')
            axios.get(`http://localhost:3000/vendas/?${data.value}`).then(function (response) {

                response.data.results.map(v => {
                    remedios.value.push(v)
                })

            }).catch(function (error) {
                alert('Por causo de um erro interno não foi possível lista os produtos')
                console.log(error);
            })
        }

        //Método show: lista um medicamento específico
        async function show(){
            console.log(medicamento.value);
            axios.get(`http://localhost:3000/vendas/show/${medicamento.value}`).then((response) => {
                remedios.value = []
                response.data.results.map(v => {
                    remedios.value.push(v)
                })
                console.log(response);
            }).catch((error) => {
                alert(error.response.data.error)
            })
        }


        //Método destroy: deleta um medicamento na tabela medicamentos
        async function destroy(id){
            console.log(id);
            if(confirm("Tem certeza que deseja excluir esse medicamento?") == true){
                axios.delete(`http://localhost:3000/vendas/${id}`).then((response) => {
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

        return{
            remedios,
            medicamento,
            estilo,
            estilo2,
            aviso,
            toggle,
            sair,
            view,
            show,
            destroy
        }
    }
}).mount('#app')