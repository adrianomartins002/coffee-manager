# Desafio
- Criar frontend para gerenciador de cafés, com tela de listagem, criação, funcionalidade de exclusão e edicão do café.

# Funcionalidades
Detalhes que verifiquei a partir do documento:
- Na tela inicial criar uma combobox que receberá os valores de hot e iced, a tela deve ser iniciada com hot, carregar as informações em memória e carregar os dados recuperados de hot e exibir a listagem de cafés na tabela abaixo.
- Se o usuario mudar a opcão da combobox, sempre deve recarregar a lista na memória.
- Ao clicar no botão novo na parte superior, mudar para uma tela da qual terá os detalhes de criação de um novo café.
- Se o usuário criar o novo café, ele deve ser incluído na lista em memória.
- Se o usuário clicar no botão de voltar, a partir da tela de detalhes/novo café, deverá voltar à tela inicial.
- Se o usuário escolher um item da lista, indo para a  tela de detalhes, poderá ver as opções de salvar e excluir, caso altere algum item e salvar, o item deverá ser atualizado em memória, se clicar em excluir, o item deve ser removido da lista em memória.


# Como foi desenvolvido
Todas as funcionalidades foram criadas com javascript, utilizei algumas libs para dar continuidade ao desafio:
- axios (realizar as requisições ao backend)
- lodash (realizar algumas operações de filtragem nas listas)
- Material UI (para os componentes das páginas)
- react icons (para o botão de voltar).
- react router (para roteamento entre as páginas Home e Coffee (detalhes do café))

# Execução
- Para a execução do projeto na própria máquina, navegar até o diretorio ```projeto```, abrir o terminal no diretorio, executar o comando npm install, e depois npm start, o projeto executará na porta 3000
- Para executar os testes, basta rodar npm run test

# Tempos de desenvolvimento.
- Para criação de toda parte funcional levei ao todo 3 horas (levando em conta somente o tempo de desenvolvimento, e não o tempo que parei pois a api não estava funcionando).
````
    - Criação do projeto
    - Instalação das libs (axios, react router, material ui)
    - Criação das telas e fazer roteamento para navegação entre as telas
    - Criação da lógica de inclusão dos dados em memória (usando context do react, controle de estado com useState e controle de renderização e execução com useEffect)
    - Criação dos componentes base
    - Criação das funções de serviço (listagem, edição e deleção de dados)
    - Logica e passagem de informações via navegação (com hooks do react router dom)
````


# Pontos de melhoria em relação ao desafio.
- Ponto de falha para criação da solução: durante a solução, aparentemente os dados serão editados somente em memória, se eu edito um tipo de café que estava em hot, e mudo para iced, voltando a pagina inicial e trocando o filtro do tipo, a listagem dos cafés em memória é limpa, para retornar novamente do endpoint, isso faria com que não fosse possível exibir a lista com o novo item editado.
- Na api, a listagem dos cafés é feita por duas rotas diferentes, hot e iced, por isso quando é preciso mudar o tipo
de um café, não é possivel usar somente uma rota, não sei porque foi pensado assim, ou se na base é salvo sempre como duas tabelas diferentes, mas basicamente o correto deveria ser somente uma rota, e ter um campo "type", que eu pudesse usar tanto para filtrar, quanto para atualizar.
- A api rest em alguns casos, não está seguindo o padrão rest de http request e response, onde não está fazendo bom uso dos status code, por ex, tentei criar um novo item e recebi 200 (que seria sucesso), porém no response body está exibindo erro 400.
- Numero de requests limitado - tive que parar de desenvolver durante um tempo pois estava pegando um erro "Too many requests, please try again after five minutes."

# Pontos de melhoria do projeto que posso fazer com mais tempo
- Incluir testes unitários para cobrir todos os arquivos (até o momento só criei testes para o arquivo de serviço, para garantir que a lógica da listagem de dados estava funcionando, mas com mais tempo poderia incluir em todos os componentes).
- Incluir typescript para prevenir problemas relacionados a itens inválidos/ propriedades não mapeadas e controle da informação em memória.
- Componentizar mais o projeto (como o desafio não tem tantos itens, e os existentes foram feitos utilizando os próprios componentes do Material UI, preferí por focar na velocidade para entrega rápida do projeto.)
