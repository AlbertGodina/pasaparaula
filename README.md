# 🎓 Pasapalabra Educativa

Aplicació web educativa tipus "Pasapalabra" per a ESO (Tecnologia i Digitalització) desenvolupada amb React i localStorage.

## 📝 Descripció

Joc educatiu amb dos rols diferenciats:
- **Professors:** Creen i gestionen roscos temàtics amb vocabulari específic
- **Alumnes:** Juguen els roscos i competeixen en un rànquing

## ✨ Característiques Principals

- 🎯 Roscos temàtics personalitzables per professors
- ⏱️ Configuració de temps (3 o 5 minuts)
- 🏆 Sistema de puntuacions i rànquing
- 🎨 Rosco visual circular amb colors per estats
- 💾 Persistència amb localStorage (sense necessitat de backend)
- 🇨🇦 Interfície en català amb 26 lletres (sense Ç)

## 🚀 Instal·lació i Ús

### Prerequisits
- Node.js (v14 o superior)
- npm o yarn

### Instal·lació

```bash
# Clonar el repositori
git clone https://github.com/el-teu-usuari/pasapalabra-educativa.git
cd pasapalabra-educativa

# Instal·lar dependències
npm install

# Iniciar en mode desenvolupament
npm start
```

L'aplicació s'obrirà automàticament a `http://localhost:3000`

## 🎮 Com Jugar

### Per Professors
1. Accedir amb contrasenya mestra (per defecte: `admin123`)
2. Crear roscos temàtics des del panell de gestió
3. Afegir definicions per cada lletra de l'abecedari
4. Activar els roscos perquè els alumnes puguin jugar-hi
5. Veure el rànquing i estadístiques dels alumnes

### Per Alumnes
1. Introduir el nom d'usuari
2. Seleccionar un rosco disponible
3. Configurar el temps (3 o 5 minuts)
4. Jugar: respondre definicions o passar paraula
5. Intentar superar la pròpia puntuació màxima

## 🎯 Sistema de Puntuació

| Acció | Punts |
|-------|-------|
| ✅ Resposta correcta | +10 |
| ❌ Resposta incorrecta | -5 |
| ⏭️ Passar paraula | 0 |

## 🏗️ Estructura del Projecte

```
src/
├── components/
│   ├── auth/              # Login i autenticació
│   ├── teacher/           # Panel de professorat
│   ├── student/           # Panel d'alumnes i joc
│   └── shared/            # Components compartits
├── services/
│   ├── storageService.js  # Gestió localStorage
│   ├── gameLogic.js       # Lògica del joc
│   └── validation.js      # Validacions
├── utils/
│   ├── constants.js       # Constants globals
│   └── helpers.js         # Funcions auxiliars
└── styles/                # Estils CSS
```

## 📚 Documentació Completa

Per a informació detallada sobre arquitectura, estructures de dades i flux d'usuari, consulta:
- [ARQUITECTURA_PASAPALABRA.md](./ARQUITECTURA_PASAPALABRA.md)

## 🔧 Tecnologies Utilitzades

- **React** - Framework principal
- **CSS3** - Estils i animacions
- **localStorage** - Persistència de dades

## 📊 Estats de les Lletres

Durant el joc, cada lletra té un color segons el seu estat:
- 🔵 **Blau:** Pendent (no resolta)
- 🟡 **Groc:** Passada (pot tornar-hi)
- 🟢 **Verd:** Encertada
- 🔴 **Vermell:** Fallada

## 🛠️ Scripts Disponibles

```bash
npm start          # Inicia l'app en mode desenvolupament
npm run build      # Compila l'app per producció
npm test           # Executa els tests
npm run eject      # Ejecta la configuració de Create React App
```

## 🤝 Contribuir

Les contribucions són benvingudes! Si vols millorar el projecte:

1. Fork el repositori
2. Crea una branca per la teva funcionalitat (`git checkout -b feature/nova-funcionalitat`)
3. Commit els canvis (`git commit -m 'Afegeix nova funcionalitat'`)
4. Push a la branca (`git push origin feature/nova-funcionalitat`)
5. Obre un Pull Request

## 📝 Funcionalitats Futures

- [ ] Exportar/importar roscos (JSON)
- [ ] Estadístiques avançades amb gràfics
- [ ] Mode multijugador en temps real
- [ ] Sons i efectes visuals millorats
- [ ] Temes de colors personalitzables
- [ ] Certificats de completació
- [ ] Integració amb plataformes educatives (Moodle, Classroom)

## 📄 Llicència

Aquest projecte està sota llicència MIT. Consulta el fitxer [LICENSE](LICENSE) per més detalls.

## 👨‍🏫 Creat per a Educació

Desenvolupat específicament per a alumnes d'ESO de Tecnologia i Digitalització, amb l'objectiu de fer l'aprenentatge de vocabulari tècnic més dinàmic i motivador.

---

**Fet amb ❤️ per a l'educació catalana**
