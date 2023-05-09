const cadastroProduto = document.getElementById('cadastro')
cadastroProduto.addEventListener('click', () => {
    const nome = document.getElementById('nome').value
    const quantidade = document.getElementById('quantidade').value
    const codigo = document.getElementById('codigo').value  

    if(nome == '' || quantidade == '' || codigo == ''){
        alert("Ateção!!. Todos os dados devem ser preenchidos")
    }

    else{
        alert("Produto Cadastrado!")
        console.log(nome);
        console.log(quantidade);
        console.log(codigo);

        cadastroProduto.setAttribute('href', './Produtos.html')
    }
    
})