// script.js

function salvarHospede(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome_hospede').value;
    const idade = document.getElementById('idade').value;
    const renda = document.getElementById('renda').value;
    
    const hospede = {
        id: Date.now(),
        nome,
        idade,
        renda,
        despesas: 0, // Inicialmente sem despesas
        descricaoDespesa: "" // Inicialmente sem descrição de despesa
    };
    
    let hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];
    hospedes.push(hospede);
    localStorage.setItem('hospedes', JSON.stringify(hospedes));
    
    alert('Hóspede cadastrado com sucesso!');
    document.getElementById('cadastro_de_hospedes').reset();
}

function carregarHospedes() {
    const listaHospedes = document.getElementById('lista_hospedes');
    const hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];
    
    listaHospedes.innerHTML = '';
    hospedes.forEach(hospede => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Nome:</strong> ${hospede.nome} <br>
            <strong>Idade:</strong> ${hospede.idade} <br>
            <strong>Renda Mensal:</strong> R$${hospede.renda} <br>
            <strong>Despesas:</strong> R$${hospede.despesas} <br>
            <input type="text" placeholder="Descrição da Despesa" id="descricao_${hospede.id}"><br>
            <input type="number" placeholder="Valor da Despesa" id="despesa_${hospede.id}">
            <button onclick="adicionarDespesa(${hospede.id})">Adicionar Despesa</button>
            <hr>
        `;
        listaHospedes.appendChild(li);
    });
}

function adicionarDespesa(id) {
    const descricaoInput = document.getElementById(`descricao_${id}`);
    const despesaInput = document.getElementById(`despesa_${id}`);
    const descricao = descricaoInput.value;
    const valorDespesa = parseFloat(despesaInput.value);
    
    if (!isNaN(valorDespesa)) {
        let hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];
        hospedes = hospedes.map(hospede => {
            if (hospede.id === id) {
                hospede.despesas += valorDespesa;
                hospede.descricaoDespesa += `${descricao} (R$${valorDespesa}) `;
                // Calcular valor excedente da renda
                hospede.excedenteRenda = parseFloat(hospede.renda) - parseFloat(hospede.despesas);
            }
            return hospede;
        });
        localStorage.setItem('hospedes', JSON.stringify(hospedes));
        carregarHospedes();
    } else {
        alert('Por favor, insira um valor de despesa válido.');
    }
}

document.addEventListener('DOMContentLoaded', carregarHospedes);


function carregarHospedes() {
    const listaHospedes = document.getElementById('lista_hospedes');
    const hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];
    
    listaHospedes.innerHTML = '';
    hospedes.forEach(hospede => {
        const li = document.createElement('li'); // Cria um novo item de lista para cada hóspede
        li.innerHTML = `
            <strong>Nome:</strong> ${hospede.nome} <br>
            <strong>Idade:</strong> ${hospede.idade} <br>
            <strong>Renda Mensal:</strong> R$${hospede.renda} <br>
            <strong>Despesas:</strong> R$${hospede.despesas} <br>
            <strong>Descrição das Despesas:</strong> ${hospede.descricaoDespesa ? hospede.descricaoDespesa : 'Nenhuma despesa adicionada'} <br>
            <strong>Total Excedente:</strong> R$${hospede.excedenteRenda ? hospede.excedenteRenda : hospede.renda - hospede.despesas} <br>
            <input type="text" placeholder="Descrição da Despesa" id="descricao_${hospede.id}"><br>
            <input type="number" placeholder="Valor da Despesa" id="despesa_${hospede.id}">
            <button onclick="adicionarDespesa(${hospede.id})">Adicionar Despesa</button>
            <hr>
        `;
        listaHospedes.appendChild(li); // Adiciona o item de lista à lista de hóspedes
    });
}



function adicionarDespesa(id) {
    const descricaoInput = document.getElementById(`descricao_${id}`);
    const despesaInput = document.getElementById(`despesa_${id}`);
    const descricao = descricaoInput.value;
    const valorDespesa = parseFloat(despesaInput.value);
    
    if (!isNaN(valorDespesa)) {
        let hospedes = JSON.parse(localStorage.getItem('hospedes')) || [];
        hospedes = hospedes.map(hospede => {
            if (hospede.id === id) {
                hospede.despesas += valorDespesa;
                hospede.descricaoDespesa += `${descricao} (R$${valorDespesa}) `;
                hospede.excedenteRenda = parseFloat(hospede.renda) - parseFloat(hospede.despesas);
            }
            return hospede;
        });
        localStorage.setItem('hospedes', JSON.stringify(hospedes));
        carregarHospedes();
    } else {
        alert('Por favor, insira um valor de despesa válido.');
    }
}


document.addEventListener('DOMContentLoaded', carregarHospedes);

function limparDados() {
    localStorage.removeItem('hospedes');
    alert('Dados excluídos com sucesso!');
}

/* ... */