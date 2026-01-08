const BuscarCEP = async () => {
    const cepInput = document.getElementById('cep');
    const cep = cepInput.value.replace(/\D/g, "");
    const verificarCep = document.getElementById('verificar-cep')

    verificarCep.innerText = "";
    
    if (cep.length !== 8) {
        verificarCep.innerText = "Digite um CEP válido!";
        return
    }

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            alert('Cep Não encontrado');
            return
        }

        document.getElementById('ddd').innerText = `DDD: ${dados.ddd}`;
        document.getElementById('cidade').innerText = `Cidade: ${dados.localidade}`;
        document.getElementById('estado').innerText = `Estado: ${dados.uf}`;
        document.getElementById('rua').innerText = `Rua: ${dados.logradouro}`;
        
        cepInput.value = "";

    } catch (err) {
        alert('Erro ao buscar o CEP');
        console.log(err);
    }
};

const botaoProcurar = document.getElementById('btn-procurar');
const cepInput = document.getElementById('cep');

botaoProcurar.addEventListener('click', BuscarCEP);

cepInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        BuscarCEP();
    }
});