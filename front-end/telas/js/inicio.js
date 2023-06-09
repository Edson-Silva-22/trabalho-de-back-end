const { createApp, ref, reactive } = Vue;
createApp({
    setup(){
        const estilo = ref(null)
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
            }
        ]);


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

    

        return{
            remedios,
            estilo,
            toggle
        }
    }
}).mount('#app')