const cadastroProduto = document.getElementById('cadastro')
cadastroProduto.addEventListener('click', () => {
    const nome = document.getElementById('nome')
    const quantidade = document.getElementById('quantidade')
    const codigo = document.getElementById('codigo')  

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
    
})