const { createApp, ref } = Vue

createApp({
    setup(){
        const email = ref(null)
        const senha = ref(null)

        async function store(){
            
        }


        return {
            email,
            senha,
            store
        }
    }
}).mount('#app')