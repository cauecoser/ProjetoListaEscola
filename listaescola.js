let ipnome = document.getElementById('nome')
let ipemail = document.getElementById('email')
let ipcpf = document.getElementById('cpf')
let ipcurso = document.getElementById('curso')

let validnome = document.getElementById('validnome')
let validemail = document.getElementById('validemail')
let validcpf = document.getElementById('validcpf')

let tabela = document.getElementById('tabela')
let linhas = tabela.getElementsByTagName('tr')

let dadosAlunos = []
let storedData = JSON.parse(localStorage.getItem('Dados')) || []

function checaCPF(cpf) {
       
    var Soma
    var Resto

    Soma = 0
    if (cpf=='00000000000'||cpf=='11111111111'||cpf=='22222222222'||cpf=='33333333333'||cpf=='44444444444'||cpf=='55555555555'||cpf=='66666666666'||cpf=='77777777777'||cpf=='88888888888'||cpf=='99999999999') return false

    for (i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11))  Resto = 0
    if (Resto != parseInt(cpf.substring(9, 10)) ) return false

    Soma = 0
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11))  Resto = 0
    if (Resto != parseInt(cpf.substring(10, 11) ) ) return false
    return true
}

function cadastrar() {
    
    let nome = ipnome.value
    let email = ipemail.value
    let cpfm = ipcpf.value
    let cpf = cpfm.substring(0,3)+cpfm.substring(4,7)+cpfm.substring(8,11)+cpfm.substring(12)
    let curso = ipcurso.value
    let usuario = email.substring(0, email.indexOf("@"))
    let dominio = email.substring(email.indexOf("@")+1, email.length)

    if (nome.length==0 || email.length==0 || cpfm.length==0 || curso.length==0) {
        alert('[ERRO] Todos os dados são de preenchimento obrigatório!')
    } else if (nome.indexOf(' ') == -1) {
        ipnome.style.borderColor = 'red'
        validnome.style.color = 'gold'
        validnome.innerHTML = '*Inválido! Digite pelo menos um sobrenome.'
        setTimeout(() => {
            ipnome.style.borderColor = 'rgb(200,200,200)'
            validnome.style.color = 'white'
            validnome.innerHTML = 'Digite o nome completo do aluno.'
        }, 2000)
    } else if ((usuario.length==0) || (dominio.length < 3) || (usuario.search("@")>=0) || (dominio.search("@")>=0) || (usuario.search(" ")>=0) || (dominio.search(" ")>=0) || (dominio.search(".")==-1) || (dominio.indexOf(".")<1) || (dominio.lastIndexOf(".")>=dominio.length-1)) {
        ipemail.style.borderColor = 'red'
        validemail.style.color = 'gold'
        validemail.innerHTML = '*Inválido! Digite um endereço de e-mail válido.'
        setTimeout(() => {
            ipemail.style.borderColor = 'rgb(200,200,200)'
            validemail.style.color = 'white'
            validemail.innerHTML = 'Digite o e-mail do aluno.'
        }, 2000)
    } else if (checaCPF(cpf)==false) {
        ipcpf.style.borderColor = 'red'
        validcpf.style.color = 'gold'
        validcpf.innerHTML = '*Inválido! Digite um CPF válido.'
        setTimeout(() => {
            ipcpf.style.borderColor = 'rgb(200,200,200)'
            validcpf.style.color = 'white'
            validcpf.innerHTML = 'Digite o CPF do aluno.'
        }, 2000)
    } else {

        let dadosInd = {
            "nome": ipnome.value,
            "email": ipemail.value,
            "cpf": ipcpf.value,
            "curso": ipcurso.value
        }

        if (JSON.parse(localStorage.getItem('Dados'))) {
            dadosAlunos.push(...JSON.parse(localStorage.getItem('Dados')))
        }
        dadosAlunos.push(dadosInd)
        localStorage.setItem('Dados', JSON.stringify(dadosAlunos))

        ipnome.value=''
        ipemail.value=''
        ipcpf.value=''
        ipcurso.value=''

        ipnome.focus()

        alert('Cadastro realizado com sucesso!')

        document.location.reload(true)
    }
}
    
if (storedData!=[]) {

    for(i=0;i<storedData.length;i++) {

        let nl = document.createElement('tr')
        document.getElementById('corpo').appendChild(nl)

        let img = document.createElement('img')
        img.setAttribute('src', 'excluirpqn.png')
        img.setAttribute('class', 'foto_redonda2')
        img.setAttribute('name', i)
        img.setAttribute('id', 'imgexc')
        img.setAttribute('onclick', 'deletar('+i+')')

        let nlc1 = document.createElement('td')
        nlc1.innerHTML = storedData[i].nome
        let nlc2 = document.createElement('td')
        nlc2.innerHTML = storedData[i].email
        let nlc3 = document.createElement('td')
        nlc3.innerHTML = storedData[i].cpf
        let nlc4 = document.createElement('td')
        nlc4.innerHTML = storedData[i].curso
        let nlc5 = document.createElement('td')
        nlc5.appendChild(img)
    
        nl.appendChild(nlc1)
        nl.appendChild(nlc2)
        nl.appendChild(nlc3)
        nl.appendChild(nlc4)
        nl.appendChild(nlc5)
    }
}

ipcpf.addEventListener('keypress', () => {
    if (ipcpf.value.length===3 || ipcpf.value.length===7) {
        ipcpf.value += '.'
    } else if (ipcpf.value.length===11) {
        ipcpf.value +='-'
    }
})

function deletar(id) {

    let aviso = confirm('Deseja, realmente, excluir o registro do aluno? Esta ação não poderá ser desfeita!')
    if (aviso==true) {

        dadosAlunos.push(...JSON.parse(localStorage.getItem('Dados')))
        dadosAlunos.splice(id,1)

        localStorage.setItem('Dados', JSON.stringify(dadosAlunos))

        alert('Registro excluído com sucesso.')

        document.location.reload(true)

    }
}