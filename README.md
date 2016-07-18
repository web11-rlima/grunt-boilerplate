![Webeleven Logo](https://www.webeleven.com.br/img/logo_w11_barra.png)

# grunt.js boilerplate
Boilerplate do Grunt.js para projetos internos


## Inicializando o boilerplate
De um git clone neste repositório:
```
$ git clone https://github.com/w11-ccampos/grunt-boilerplate.git
```

Navegue até a pasta com o terminal e instale as depêndencias com o npm:
```
$ npm install
```

Pronto!

## Utilizando o boilerplate
### Javascript
Todo o código javascript que você escrever deverá ser colocado dentro da pasta
> assets/app/**js**

Utilize este comando para que qualquer alteração feita no seu código seja compilada automaticamente:
```
$ grunt watch:js
```

### CSS
Este boilerplate utiliza o [Sass](http://sass-lang.com/) como linguagem de CSS. Todo o código em sass deve ser colocado dentro da pasta
> assets/app/**css**

Utilize este comando para que qualquer alteração feita no seu código seja compilada automaticamente:
```
$ grunt watch:css
```

### Bibliotecas
Considere que o [bootstrap](http://getbootstrap.com/css/) é uma depêndencia do seu projeto e precisa ser instalado.

Ao invés de baixar manualmente seus arquivos e adicioná-los ao versionamento, este boilerplate utiliza o [bower](http://bower.io) para gerenciamento de pacotes.

Para procurar um pacote utilize o comando:
```
$ bower search bootstrap
```

Procure nos resultados o pacote desejado:
```
bootstro https://github.com/clu3/bootstro.js.git
bootstrap https://github.com/twbs/bootstrap.git
bootstrap-bo https://github.com/brentoneill/bootstrap.git
x-bootstrap https://github.com/x-element/x-bootstrap.git
bootstrappp https://gitlab.com/axc-libs/bootstrappp.git
bootstrapxl https://github.com/lu4/BootstrapXL.git
bootstrap-dv https://github.com/JKAussieSkater/Bootstrap-DV.git
bootstrap.ui https://github.com/visionappscz/bootstrap-ui.git
```

Instale o pacote:
```
$ bower install bootstrap --save
```

Todos os pacotes instalados pelo bower irão para a pasta 
> assets/vendor/{nomedopacote}, no caso assets/vendor/bootstrap

Para juntar o conteúdo da biblioteca com os seus arquivos, adicione o caminho dos arquivos dentro do arquivo gruntfile.js modificando os seguintes trechos:
```
  vendorJS: [
    "bootstrap/dist/js/boostrap.js"
  ],
  
  vendorCSS: [
    "bootstrap/dist/css/bootstrap.css"
  ]
```
Em seguida, execute o seguinte comando para recompilar as bibliotecas baixadas:
```
$ grunt vendor
```

### Pastas adicionais (imagens, fontes, etc)
Para mover qualquer pasta para a pasta de distribuição, modifique o trecho abaixo dentro do arquivo gruntfile.js.
```
foldersToMove: [
  "assets/vendor/bootstrap/dist/fonts",
  "assets/app/pastaparamover",
  "assets/app/images"
]
```
Em seguida, execute o seguinte comando para que o grunt copie as pastas:
```
$ grunt vendor
```


### Distribuição
Todos os arquivos serão processados, compilados e minificados a partir da pasta **assets/** e movidos para a pasta **dist/**.
Para ver a versão de distribuição execute o comando:
```
$ grunt dist
```
