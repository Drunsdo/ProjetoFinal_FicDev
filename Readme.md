# Software de Análise de Logs

## Introdução
O Software de Análise de Logs é uma ferramenta projetada para analisar e monitorar logs. Ele oferece um conjunto de funcionalidades para visualizar, analisar e categorizar logs, permitindo aos usuários identificar e resolver problemas com mais eficiência.

## Funcionalidades

### Dashboard
- **Mensagens Puladas**: Exibe o número total de mensagens puladas durante a análise dos logs.
- **Total de Erros**: Apresenta o número total de erros identificados nos logs analisados.
- **Logs Analisados**: Mostra o total de logs analisados pela ferramenta.
- **Porcentagem de Logs com Erros e sem Erros**: Exibe a porcentagem de logs que contêm erros em comparação com logs sem erros.
- **Porcentagem de Erro por Categoria**: Mostra a distribuição percentual de erros por categoria. As categorias podem ser definidas pelo usuário ou automaticamente identificadas pela ferramenta.

### Visualização de Logs
O software permite visualizar todos os logs armazenados em um banco de dados em uma tabela, que apresenta atributos importantes como data, hora, origem, nível de gravidade e mensagem. Os usuários podem acessar logs específicos na tabela para visualizar detalhes adicionais, incluindo mensagens puladas e erros associados.

### Categorização de Erros
Os usuários podem cadastrar categorias para os diferentes tipos de erro encontrados nos logs. Essas categorias podem ser usadas para classificar e organizar os erros, facilitando a análise e a resolução de problemas. Os erros serão relacionados a essa categoria, pois no software após cadastrar a categoria uma função irá percorrer os erros que não têm categoria, a fim de que seja encontrado um erro que possui essa categoria dentro do texto dele.

## Autores
- Rogério Moura
- Maria Queiroz
- Ayron

## Como Contribuir
Contribuições são bem-vindas! Para contribuir com o projeto, por favor, siga as diretrizes de contribuição ou entre em contato com um dos autores para mais informações.

## Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE.md para detalhes.
