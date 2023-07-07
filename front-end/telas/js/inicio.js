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
            }
        ]);


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
            estilo,
            estilo2,
            toggle,
        }
    }
}).mount('#app')