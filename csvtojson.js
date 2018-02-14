/*Created by Vitor Aoki                                              */

/*Descrição: Classe que define os dados dos alunos, onde cada        *
 *variavel armazena um tipo de dado, sendo elas utilizadas para a    *
 *criação do objeto que será convertido no JSON                      */
function Aluno() {

  this.fullname = '';
  //Define o nome do aluno
  this.setFullname = function(fullname) {
    this.fullname = fullname;
  }

  //Retorna o nome do aluno
  this.getFullname = function() {
    return this.fullname;
  }

  this.Eid = '';
  //Define o eid do aluno
  this.setEid = function(Eid) {
    this.Eid = Eid;
  }

  //Retorna o eid do aluno
  this.getEid = function(Eid) {
    return this.Eid;
  }

  this.Class = [];
  //Define as classes do aluno
  this.setClass = function(Class) {
    this.Class.push(Class)
  }

  //Retorna as classes do aluno
  this.getClass = function() {
    return this.Class;
  }

  //Retorna o numero de classes do aluno
  this.getNClasses = function() {
    return this.Class.length;
  }

  this.listaAdresses = [];
  //Define o objeto de adresses (emails e telefones)
  this.setAdresses = function(indentify, adress){

    var adresses = {'type':indentify[0], 'tags':indentify[1], 'adress':adress};
    var repeticao = false;

    if(this.listaAdresses.length > 0) {
      /*Caso existam itens na lista de adresses, verifica se algum dos dados*
       *inseridos é repetido, evitando repetições, apenas com a adição de   *
       *outra tag à tag já existente                                        */
      for(var i = 0; (i < this.listaAdresses.length) && (!repeticao); i++) {
        if(!this.listaAdresses[i]['adress'].localeCompare(adress)) {
          var adress_aux = [];
          adress_aux.push(this.listaAdresses[i]['tags']);
          adress_aux.push(indentify[1]);
          this.listaAdresses[i]['tags'] = adress_aux;
          repeticao = true;
        }
      }
      /*Caso nenhuma repetição tenha sido encontrada, insere o novo adress *
       *normalmente                                                        */
      if(!repeticao) {
        this.listaAdresses.push(adresses);
      }
    } else {
      this.listaAdresses.push(adresses);
    }
  }

  this.invisible = 'false';
  //Define se os dados sao invisiveis
  this.setInvisible = function(invisible) {
    this.invisible = invisible;
  }

  //Retorna se os dados sao invisiveis
  this.getInvisible = function() {
    return this.invisible;
  }

  this.seeAll = 'false';
  //Define se todos os dados podem ser vistos
  this.setSeeAll = function(seeAll) {
    this.seeAll = seeAll;
  }

  //Retorna se todos os dados podem ser vistos
  this.getSeeAll = function() {
    return this.seeAll
  }

  //Retorna o objeto com os dados do aluno
  this.getObjeto = function() {
    return {'fullname': this.fullname, 'eid': this.Eid, 'classes': this.Class,
    'adresses': this.listaAdresses, 'invisible': this.invisible, 'see_all': this.seeAll}
  }
}

/*Descrição: A função lê cada linha do arquivo de entrada, e separa  *
 *os dados de acordo com o separador (,) do arquivo csv              *
 *Parâmetros: - linha: linha que será analisada                      *
              - colunas: array que irá armazenar todos os dados      */
function LerDados(linha, colunas) {
  var i = 0;
  var palavra = ''; /*Variável que irá armazenar os dados obtidos da *
                     *linha                                          */
  while(i < linha.length) {
    //Verifica se o dado da entrada é uma string
    if(!linha[i].localeCompare('\"')) {
      i++;
      while(linha[i].localeCompare('\"')) {
        palavra = palavra + linha[i];
        i++;
      }
    //Caso não seja, continua coletando a palavra normalmente
    } else if(linha[i].localeCompare(',')) {
      palavra = palavra + linha[i];
    } else {
      colunas.push(palavra.trim());
      palavra = '';
    }
    i++;
  }
  colunas.push(palavra.trim());
}

/*Descrição: Função que analisa a variável dada e verifica se é um   *
 *número                                                             *
 *Parâmetros: - num: variável que será analisada                     *
 *Retorno: - true: se a variável é um número                         *
           - false: se a variável não é um número                    */
function isNum(num) {
  for(var i = 0; i < num.length; i++) {
    if((num[i] >= 'a') && (num[i] <= 'z')){
      return false;
    }
  }
  return true
}

/*Descrição: Verifica se a variável dada é um formato valido para    *
 *email                                                              *
 *Parâmetros: - email: variável que será analisada                   *
 *Retorno: - true: a variável é um email válido                      *
 *         - false: a variável não é um email válido                 */
function isEmail(email) {
  for(var i = 0; i < email.length; i++) {
    //Verifica se na variável existem caracteres especiais
    if((email[i] >= '!' && email[i] <= ',') || (email[i] == '/') ||
      (email[i] >= ':' && email[i] <= '?') || (email[i] >= '[' && email[i <= '^']) ||
      (email[i] == '`')) {
      return false;
    }
  }

  //Verifica se a variável possui '@'
  if(email.indexOf('@') == -1) {
    return false;
  }
  return true;
}

/*Descrição: Função que trata os dados obtidos do arquivo de entrada *
 *para verificar se é um email que poderá ser adicionado ao banco de *
 *dados                                                              *
 *Parâmetros: - inp: array com os dados coletados do arquivo de      *
 *              entrada                                              *
 *            - nId: índice do identificador do dado                 *
 *            - alunos: array com os alunos cadastrados              */
function TratEmails(inp, nId, alunos) {
  var str = /,|\//
  var emailAux = inp.split(str);

  for(var j = 0; j < emailAux.length; j++) {
    if((emailAux[j].localeCompare('')) && (isEmail(emailAux[j]))) {
        alunos.setAdresses(indentify[nId], emailAux[j].trim());
    }
  }
}

/*Descrição: Função que trata os dados obtidos do arquivo de entrada *
 *para verificar se é um telefone que poderá ser adicionado ao banco *
 *de dados                                                           *
 *Parâmetros: - inp: array com os dados coletados do arquivo de      *
 *              entrada                                              *
 *            - nId: índice do identificador do dado                 *
 *            - alunos: array com os alunos cadastrados              */
function TratTels(inp, nId, alunos) {
  const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
  var PNF = require('google-libphonenumber').PhoneNumberFormat;
  var PNT = require('google-libphonenumber').PhoneNumberType;

  //Verifica se existe um numero a ser verificado
  if((isNum(inp.toLowerCase())) && (''.localeCompare(inp) != 0)) {
    var numero = phoneUtil.parse(inp, 'BR');
    if(phoneUtil.isValidNumber(numero)) {
      alunos.setAdresses(indentify[nId], phoneUtil.format(numero, PNF.E164).replace('+', '').trim());
    }
  }
}

/*Descrição: Função que armazena e atualiza os dados dos alunos novos*
 *e dos já cadastrados                                               *
 *Parâmetros: - alunos: array com os alunos cadastrados              *
 *            - inp: array com os dados coletados do arquivo de      *
 *                   entrada                                         *
 *            - i: índice do aluno                                   */
function AltDados(alunos, inp, i) {

  alunos[i].setFullname(inp[0].trim());        //Armazena o nome do aluno
  alunos[i].setEid(inp[1].trim());             //Armazena o eid do aluno

  //Trata os dados de classes antes de armazenalo
  var str = /,|\//
  var ClassAux = []; //Array que armazena os dois dados de classes do aluno
  ClassAux[0] = inp[2].split(str);
  ClassAux[1] = inp[3].split(str);

  //Armazena os dados de classes do aluno
  for(var k = 0; k < ClassAux.length; k++) {
    for(var j = 0; j < ClassAux[k].length; j++) {
      if((ClassAux[k][j].localeCompare(''))) {
        alunos[i].setClass(ClassAux[k][j].trim());
      }
    }
  }

  //Trata os dados dos emails e telefones do pai, da mae e do aluno
  TratEmails(inp[4], 4, alunos[i]);
  TratTels(inp[5], 5, alunos[i]);
  TratTels(inp[6], 6, alunos[i]);
  TratEmails(inp[7], 7, alunos[i]);
  TratEmails(inp[8], 8, alunos[i]);
  TratTels(inp[9], 9, alunos[i]);

  //Trata a visibilidade dos dados do aluno
  /*Verifica se o dado de entrada é uma string vazia. Caso não seja, verifica*
   *se o dado é 1: true, ou 0: false, e armazena                             */
  if(''.localeCompare(inp[10].toLowerCase()) != 0) {
    if((!'1'.localeCompare(inp[10].toLowerCase()))) {
      alunos[i].setInvisible(true);
    } else {
      alunos[i].setInvisible(false);
    }
  }
  /*Verifica se o dado de entrada é uma string vazia. Caso não seja, verifica*
   *se o dado é yes: true, ou no: false, e armazena                          */
  if(''.localeCompare(inp[11].toLowerCase()) != 0) {
    if((!'yes'.localeCompare(inp[11].toLowerCase()))) {
      alunos[i].setSeeAll(true);
    } else {
      alunos[i].setSeeAll(false);
    }
  }
}

/*Descrição: Função que verifica na lista de alunos, se o aluno já   *
 *está cadastrado                                                    *
 *Parâmetros: - alunos: array com os alunos cadastrados              *
 *            - inp: array com os dados coletados do arquivo de      *
 *                   entrada                                         */
function VerReg(alunos, inp) {
  for(var k = 0; (k < alunos.length) && (!registrado); k++) {
    if(!inp[1].localeCompare(alunos[k].getEid())) {
      registrado = true;
      posAluno = k;
    }
  }
}

/*Descrição: função que gera o arquivo JSON                          *
 *Parâmetros: - fs: constante que permite utilizar o File System do  *
                Node.js                                              *
              - alunos: array com os alunos cadastrados              */
function toJSON(fs, alunos) {
  fs.writeFileSync('output.json', JSON.stringify(alunos[0].getObjeto()));
  fs.appendFileSync('output.json', '\n\n');
  fs.appendFileSync('output.json', JSON.stringify(alunos[1].getObjeto()));
  fs.appendFileSync('output.json', '\n\n');
  fs.appendFileSync('output.json', JSON.stringify(alunos[2].getObjeto()));
}


//Declaracao das constantes e variaveis de requerimento
const fs = require('fs');

//Declaracao das variaveis e listas
var indentify = []; //Lista de identificadores dos dados (colunas da tabela)
var alunos = []; //Lista de alunos

//Le o arquivo de entrada
var data = fs.readFileSync('input.csv', 'utf8');
linhas = data.split('\n'); //Armazena todas as linhas do arquivo de entrada

//Armazena os dados dos alunos
for(var i = 0; i < linhas.length; i++) {

  var inp = []; //Array com dos dados do arquivo de entrada

  //Le e armazena os identificadores dos dados
  if(i == 0) {
    LerDados(linhas[i], indentify);

    var indentify_aux = [];
    for(var j = 0; j < indentify.length; j++) {
      indentify_aux[j] = indentify[j].split(/, | /)
    }
    //Armazena as colunas da forma correta para obtenção das tags
    indentify[4] = [indentify_aux[4][0].trim(), [indentify_aux[4][1].trim(), indentify_aux[4][2].trim()]];
    indentify[5] = [indentify_aux[5][0].trim(), indentify_aux[5][1].trim()];
    indentify[6] = [indentify_aux[6][0].trim(), [indentify_aux[6][1].trim(), indentify_aux[6][2].trim()]];
    indentify[7] = [indentify_aux[7][0].trim(), indentify_aux[7][1].trim()];
    indentify[8] = [indentify_aux[8][0].trim(), indentify_aux[8][1].trim()];
    indentify[9] = [indentify_aux[9][0].trim(), indentify_aux[9][1].trim()];
  }
  //Le e armazena os dados de cada aluno
  else {
    var registrado = false;
    var posAluno = 0;

    //Le os dados da linha e armazena no array de dados
    LerDados(linhas[i], inp);
    VerReg(alunos, inp); //Verifica se o aluno ja eh registrado

    //Caso seja o primeiro cadastro do aluno
    if((alunos.length == 0) || (!registrado)) {
      alunos.push(new Aluno()); //Insere um novo aluno ao fim da lista de alunos
      AltDados(alunos, inp, alunos.length - 1); //Insere os dados do novo aluno cadastrado
    }
    //Caso seja um aluno já cadastrado
    else {
      AltDados(alunos, inp, posAluno); //Altera dados de um aluno ja cadastrado
    }
  }
}

toJSON(fs, alunos);
