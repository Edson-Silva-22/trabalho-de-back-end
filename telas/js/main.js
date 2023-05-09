const { ref, createApp } = Vue
createApp({
    setup() {
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
        const buttonOpen = ref(null)
        const buttonClose = ref(null)
        const modal = ref(null)
        const fade = ref(null)

        //adicionado ou removendo classe que escode o modal
        function mostrar() {
            modal.value.classList.toggle("hide")
            fade.value.classList.toggle("hide")
        }

        return {
            remedios,
            buttonClose,
            buttonOpen,
            modal,
            fade,
            mostrar
        }
    }
}).mount('#app')