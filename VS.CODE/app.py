import requests
from bs4 import BeautifulSoup
from googletrans import Translator
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

# Inicialização do Flask
app = Flask(__name__)
CORS(app)  # Permite requisições cross-origin

# Função para obter artigos do site
def obter_artigos():
    url = 'https://www.cloudcomputing-news.net/'
    try:
        response = requests.get(url)
        response.raise_for_status()  # Verifica se houve algum erro na resposta
    except requests.exceptions.RequestException as e:
        print(f"Erro ao acessar a página: {e}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    
    artigos = []
    # Certifique-se de que a classe e as tags estão corretas conforme a estrutura do site
    for artigo in soup.find_all('div', class_='post-item'):  # Exemplo de classe
        try:
            titulo = artigo.find('h2').text.strip()
            resumo = artigo.find('p').text.strip()
            link = artigo.find('a')['href']
            artigos.append({'titulo': titulo, 'resumo': resumo, 'link': link})
        except AttributeError as e:
            print(f"Erro ao extrair dados de um artigo: {e}")
            continue
    
    return artigos

# Função para traduzir o conteúdo para o português
def traduzir_conteudo(texto, destino='pt'):
    tradutor = Translator()
    try:
        traducao = tradutor.translate(texto, dest=destino)
        return traducao.text
    except Exception as e:
        print(f"Erro na tradução: {e}")
        return texto  # Retorna o texto original se a tradução falhar

# Função para obter e traduzir os artigos automaticamente
def obter_e_traduzir_artigos():
    artigos = obter_artigos()
    for artigo in artigos:
        artigo['titulo'] = traduzir_conteudo(artigo['titulo'])
        artigo['resumo'] = traduzir_conteudo(artigo['resumo'])
    return artigos

# Endpoint que retorna os artigos em JSON
@app.route('/api/obter-artigos', methods=['GET'])
def api_obter_artigos():
    artigos = obter_e_traduzir_artigos()
    return jsonify(artigos)

# Endpoint para servir o arquivo HTML
@app.route('/')
def serve_html():
    return send_from_directory('', 'Projeto_extenção.html')


if __name__ == '__main__':
    app.run(debug=True)
