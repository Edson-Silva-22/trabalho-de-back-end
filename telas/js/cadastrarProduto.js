const cadastroProduto = document.getElementById('submitCadastro')
cadastroProduto.addEventListener('click', () => {
    const nome = document.getElementById('nome').value
    const quantidade = document.getElementById('quantidade').value
    const codigo = document.getElementById('codigo').value

    alert("Produto Cadastrado!")

    console.log(nome);
    console.log(quantidade);
    console.log(codigo);
})