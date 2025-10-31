(function() {
    const firebaseConfig = {
            apiKey: "AIzaSyCZU7smrPGLd9cALSO1RqY3aId28rgn4qA",
            authDomain: "chatroller-fd254.firebaseapp.com",
            databaseURL: "https://chatroller-fd254-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "chatroller-fd254",
            storageBucket: "chatroller-fd254.firebasestorage.app",
            messagingSenderId: "637117603019",
            appId: "1:637117603019:web:d0b84087ab00e3f8ebcf4e",
            measurementId: "G-ZQJN2RGTBL"
        };
        
        // --- 1. INIZIALIZZAZIONE ---
        firebase.initializeApp(firebaseConfig);
        const database = firebase.database();
        const chatRef = database.ref('messaggi');
        const gmStatusRef = database.ref('gmStatus');
        const pinMessageRef = database.ref('pinnedMessage');
        const gmRequestRef = database.ref('gmRequest');
        const usersRef = database.ref('users');
        const turnOrderRef = database.ref('turnOrder');
        const presenceRef = database.ref('presence');
        const turnCounterRef = database.ref('turnCounter');
        const sharedNotesRef = database.ref('sharedNotes');
        const musicRef = database.ref('currentTrack');
        const currentTurnNameRef = database.ref('currentTurnName');
        const vttRef = database.ref('vtt');
        const vttMapRef = vttRef.child('map');
        const vttTokensRef = vttRef.child('tokens');
        const vttDrawingsRef = vttRef.child('drawings');
        const vttConfigRef = vttRef.child('config');
        const vttPingsRef = vttRef.child('pings');

        // Riferimenti DOM
        const chatbox = document.getElementById('chatbox');
        const nomeInput = document.getElementById('nome');
        const gmCheck = document.getElementById('gm-check');
        const setNomeBtn = document.getElementById('set-nome');
        const requestGmBtn = document.getElementById('request-gm-btn');
        const gmRadio = document.getElementById('gm-radio');
        const mainContent = document.getElementById('main-content');
        const chatMessageInput = document.getElementById('chat-message');
        const sendMessageBtn = document.getElementById('send-message');
        const diceQty = document.getElementById('dice-qty');
        const diceFaces = document.getElementById('dice-faces');
        const diceMod = document.getElementById('dice-mod');
        const rollBuilderBtn = document.getElementById('roll-builder');
        const customCommandInput = document.getElementById('custom-command');
        const rollCustomBtn = document.getElementById('roll-custom');
        const isTurnRollCheck = document.getElementById('is-turn-roll');
        const pinMessageBar = document.getElementById('pinned-message-bar');
        const pinContent = document.getElementById('pin-content');
        const unpinBtn = document.getElementById('unpin-button');
        const historyPanel = document.getElementById('history-panel');
        const themeToggleBtn = document.getElementById('theme-toggle');
        const gmRequestModal = document.getElementById('gm-request-modal');
        const requesterNameEl = document.getElementById('requester-name');
        const gmAcceptBtn = document.getElementById('gm-accept');
        const gmRefuseBtn = document.getElementById('gm-refuse');
        const gmAdminPanel = document.getElementById('tab-admin');
        const deleteTextsBtn = document.getElementById('delete-texts-btn');
        const deleteRollsBtn = document.getElementById('delete-rolls-btn');
        const abdicateGmBtn = document.getElementById('abdicate-gm-btn');
        const clearLocalBtn = document.getElementById('clear-local-btn');
        const userColorInput = document.getElementById('user-color');
        const saveColorBtn = document.getElementById('save-color');
        const turnOrderList = document.getElementById('turn-order-list');
        const gmTurnControls = document.getElementById('gm-turn-controls');
        const npcNameInput = document.getElementById('npc-name');
        const npcValueInput = document.getElementById('npc-value');
        const addNpcTurnBtn = document.getElementById('add-npc-turn');
        
        const presenceWidget = document.getElementById('presence-widget');
        const presenceList = document.getElementById('presence-list');
        const turnCounterEl = document.getElementById('turn-counter');
        const nextTurnBtn = document.getElementById('next-turn-btn');
        const resetTurnBtn = document.getElementById('reset-turn-btn');
        const resetValuesBtn = document.getElementById('reset-values-btn');
        const pageBgColorInput = document.getElementById('page-bg-color');
        const savePageBgBtn = document.getElementById('save-page-bg');
        const chatBgColorInput = document.getElementById('chat-bg-color');
        const saveChatBgBtn = document.getElementById('save-chat-bg');
        
        const loginWidget = document.getElementById('login-widget');
        const toolsWidget = document.getElementById('tools-widget');
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanes = document.querySelectorAll('.tab-pane');
        const tabBtnHistory = document.getElementById('tab-btn-history');

        const macroSelect = document.getElementById('macro-select');
        const rollMacroBtn = document.getElementById('roll-macro-btn');
        const macroList = document.getElementById('macro-list');
        const macroNameInput = document.getElementById('macro-name');
        const macroCommandInput = document.getElementById('macro-command');
        const addMacroBtn = document.getElementById('add-macro-btn');
        const notesSelect = document.getElementById('notes-select');
        const addNoteBtn = document.getElementById('add-note-btn');
        const deleteNoteBtn = document.getElementById('delete-note-btn');
        const noteIsPrivateCheck = document.getElementById('note-is-private');
        const notesTextarea = document.getElementById('notes-textarea');
        const audioPlayer = document.getElementById('audio-player');
        const musicUrlInput = document.getElementById('music-url');
        const musicPlayBtn = document.getElementById('music-play');
        const musicPauseBtn = document.getElementById('music-pause');
        const musicStopBtn = document.getElementById('music-stop');

        const vttContainer = document.getElementById('vtt-container');
        const vttMapUrlInput = document.getElementById('vtt-map-url');
        const vttSetMapBtn = document.getElementById('vtt-set-map');
        const vttTokenNameInput = document.getElementById('vtt-token-name');
        const vttTokenColorInput = document.getElementById('vtt-token-color');
        const vttTokenOwnerSelect = document.getElementById('vtt-token-owner'); 
        const vttTokenUrlInput = document.getElementById('vtt-token-url');
        const vttAddTokenBtn = document.getElementById('vtt-add-token');
        const drawingToolRadios = document.querySelectorAll('input[name="vtt-tool"]'); // Cambiato name
        const drawingColorInput = document.getElementById('drawing-color');
        const drawingStrokeWidthInput = document.getElementById('drawing-stroke-width');
        const clearDrawingsBtn = document.getElementById('clear-drawings-btn');
        const gridScaleInput = document.getElementById('grid-scale');       // NUOVO Scala
        const gridUnitInput = document.getElementById('grid-unit');         // NUOVO Unità
        const saveGridScaleBtn = document.getElementById('save-grid-scale'); // NUOVO Btn Scala
        const vttZoomInBtn = document.getElementById('vtt-zoom-in');
        const vttZoomOutBtn = document.getElementById('vtt-zoom-out');
        const vttCenterViewBtn = document.getElementById('vtt-center-view');
        // Sezioni admin VTT per visibilità GM
        const vttDrawingOptionsDiv = document.getElementById('vtt-drawing-options');
        const vttMapOptionsDiv = document.getElementById('vtt-map-options');
        const vttTokenOptionsDiv = document.getElementById('vtt-token-options');

        const replyContextBar = document.getElementById('reply-context-bar');
        const replyContextText = document.getElementById('reply-context-text');
        const cancelReplyBtn = document.getElementById('cancel-reply-btn');

        // Variabili di stato globali
        let userName = ''; 
        let isGM = false;
        let gmName = null;
        let lastSenderName = null; 
        let userColors = {};
        let currentTurnName = null;
        let localNotesChange = false;
        let currentNoteKey = null;
        let currentNoteIsPrivate = false;
        let sharedNotesCache = {};
        let privateNotesCache = {};
        let currentReply = null; // Oggetto: { nome: 'Nome', testo: 'Testo...' }

        let stage; // Konva Stage
        let mapLayer;
        let gridLayer;
        let tokenLayer;
        let drawingLayer; // <-- SPOSTA QUI
        let tempLayer; // <-- SPOSTA QUI
        let currentMapUrl = null;
        let gridOptions = { size: 50, color: 'grey', strokeWidth: 1 }; // Configurazione griglia
        let gridScale = 1.5; // NUOVO Scala griglia
        let gridUnit = 'm';  // NUOVO Unità griglia
        let tokenToAdd = null; // Info sul prossimo token da aggiungere al click
        let currentDrawingTool = 'select'; // select, freehand, line, rect, circle
        let isDrawing = false;
        let startPoint = { x: 0, y: 0 };
        let currentShape = null; // Konva shape in corso di disegno
        let measurementLine = null; // NUOVO per misura
        let measurementText = null; // NUOVO per misura
        const scaleBy = 1.05; // Fattore di zoom (più è alto, più è veloce)
        const minScale = 0.1; // Massimo zoom-out
        const maxScale = 4.0; // Massimo zoom-in
        
        // --- 2. FUNZIONI HELPER (Colori, Dadi, Timestamp) ---
        
        function getRandomColor() {
            const hue = Math.floor(Math.random() * 360);
            return `hsl(${hue}, 70%, 35%)`; 
        }
        function getUserColor(nome) {
            return userColors[nome] || '#000000';
        }
        
        function formatTimestamp(timestamp) {
            return new Date(timestamp).toLocaleString('it-IT', { 
                day: '2-digit', 
                month: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        }
        
        function lanciaDadi(comando) {
            try {
                let mod = 0;
                let cmdPulito = comando.toLowerCase().replace(/\s/g, ''); // Rimuovi spazi
                let keepHighest = 0;
                let keepLowest = 0;
                let explode = false;

                // Check per Explode
                if (cmdPulito.endsWith('!')) {
                    explode = true;
                    cmdPulito = cmdPulito.slice(0, -1);
                }
                
                // Check per Keep Highest/Lowest (es. 4d6kh3)
                if (cmdPulito.includes('kh')) {
                    [cmdPulito, keepHighest] = cmdPulito.split('kh');
                    keepHighest = parseInt(keepHighest);
                } else if (cmdPulito.includes('kl')) {
                    [cmdPulito, keepLowest] = cmdPulito.split('kl');
                    keepLowest = parseInt(keepLowest);
                }

                // Modificatori (+/-)
                if (cmdPulito.includes('+')) { [cmdPulito, mod] = cmdPulito.split('+').map((p, i) => i === 1 ? parseInt(p) : p); }
                else if (cmdPulito.includes('-')) { [cmdPulito, mod] = cmdPulito.split('-').map((p, i) => i === 1 ? -parseInt(p) : p); }
                
                let [numDadi, tipoDado] = cmdPulito.split('d');
                numDadi = parseInt(numDadi) || 1;
                tipoDado = parseInt(tipoDado);
                
                if (isNaN(tipoDado) || tipoDado <= 0 || numDadi <= 0) throw new Error("Dado/Quantità non validi");
                if ((keepHighest || keepLowest) && (keepHighest + keepLowest > numDadi)) throw new Error("Keep > Num Dadi");
                 
                let tiri = [];
                for (let i = 0; i < numDadi; i++) { 
                    let tiro = Math.floor(Math.random() * tipoDado) + 1;
                    tiri.push(tiro);
                    // Explode (semplice: riesplode una sola volta)
                    if (explode && tiro === tipoDado) {
                         tiri.push(Math.floor(Math.random() * tipoDado) + 1);
                    }
                }
                
                let tiriDaSommare = [...tiri]; // Copia
                let tiriScartati = [];
                
                // Applica Keep
                if (keepHighest) {
                    tiriDaSommare.sort((a, b) => b - a); // Ordina decrescente
                    tiriScartati = tiriDaSommare.slice(keepHighest);
                    tiriDaSommare = tiriDaSommare.slice(0, keepHighest);
                } else if (keepLowest) {
                    tiriDaSommare.sort((a, b) => a - b); // Ordina crescente
                    tiriScartati = tiriDaSommare.slice(keepLowest);
                    tiriDaSommare = tiriDaSommare.slice(0, keepLowest);
                }
                
                let totale = tiriDaSommare.reduce((sum, val) => sum + val, 0);
                
                let modTesto = mod > 0 ? `+${mod}` : (mod < 0 ? mod : '');
                let risultatoFinale = totale + mod;
                
                // Costruisci stringa risultato
                let testoTiri = tiri.join(', ');
                if (tiriScartati.length > 0) {
                    let tiriScartatiTemp = [...tiriScartati]; 
                    testoTiri = tiri.map(t => {
                        const index = tiriScartatiTemp.indexOf(t);
                        if (index > -1) {
                            tiriScartatiTemp.splice(index, 1); // Rimuovi questo dado
                            return `~~${t}~~`;
                        }
                        return t;
                    }).join(', ');
                }
                let testoKeep = keepHighest ? `kh${keepHighest}` : (keepLowest ? `kl${keepLowest}` : '');
                let testoExplode = explode ? '!' : '';
                
                let testoRisultato = `${numDadi}d${tipoDado}${testoKeep}${testoExplode}${modTesto}: [${testoTiri}]${modTesto} = ${risultatoFinale}`;
                
                return { text: testoRisultato, finalValue: risultatoFinale };
            
            } catch (e) { 
                console.error("Errore lanciaDadi:", e);
                return { text: `Errore: ${e.message || 'Comando non valido'} ('${comando}')`, finalValue: 0 }; 
            }
        }
        
        // --- 2-1. FUNZIONE HELPER VTT ---

        function drawGrid() {
            if (!gridLayer || !stage) return;
            gridLayer.destroyChildren(); // Pulisci vecchie linee

            const size = gridOptions.size;
            const scale = stage.scaleX(); // Scala corrente

            // Ottimizzazione: non disegnare la griglia se è troppo piccola
            const scaledSize = size * scale;
            if (scaledSize < 4) return;

            // Calcola l'area del mondo visibile
            const viewW = stage.width();
            const viewH = stage.height();

            // (tx, ty) è la posizione (0,0) del mondo sullo schermo
            const tx = stage.x();
            const ty = stage.y();

            const x1 = (-tx) / scale;
            const y1 = (-ty) / scale;
            const x2 = (viewW - tx) / scale;
            const y2 = (viewH - ty) / scale;

            const startX = Math.floor(x1 / size) * size;
            const startY = Math.floor(y1 / size) * size;
            const endX = Math.ceil(x2 / size) * size;
            const endY = Math.ceil(y2 / size) * size;

            // Spessore linea dinamico (più sottile quando si fa zoom-out)
            const strokeWidth = Math.max(0.5, 1 / scale);

            // Disegna le linee (in coordinate del *mondo*)
            // Konva le trasformerà automaticamente con il layer
            for (let i = startX; i <= endX; i += size) {
                gridLayer.add(new Konva.Line({
                    points: [i, startY, i, endY],
                    stroke: gridOptions.color,
                    strokeWidth: strokeWidth,
                    listening: false // La griglia non deve essere cliccabile
                }));
            }
            for (let j = startY; j <= endY; j += size) {
                gridLayer.add(new Konva.Line({
                    points: [startX, j, endX, j],
                    stroke: gridOptions.color,
                    strokeWidth: strokeWidth,
                    listening: false
                }));
            }
            gridLayer.batchDraw();
        }

        function loadMapBackground(url) {
            if (!mapLayer || !stage) return;
            mapLayer.destroyChildren();

            if (!url) {
                 stage.batchDraw();
                 return;
            }

            Konva.Image.fromURL(url, (img) => {
                const stageW = stage.width();
                const stageH = stage.height();
                const imgW = img.width();
                const imgH = img.height();

                // Calcola il rapporto per "contenere" l'immagine mantenendo le proporzioni
                const ratio = Math.min(stageW / imgW, stageH / imgH);

                const newW = imgW * ratio;
                const newH = imgH * ratio;

                // Centra l'immagine nello stage
                const newX = (stageW - newW) / 2;
                const newY = (stageH - newH) / 2;

                img.setAttrs({ 
                    x: newX, 
                    y: newY, 
                    width: newW, 
                    height: newH 
                });

                mapLayer.add(img);
                img.moveToBottom();
                mapLayer.batchDraw(); // Usa batchDraw sul layer
            });
        }
        
        function drawOrUpdateToken(tokenId, tokenData) {
            if (!tokenLayer || !tokenData || !stage) return;
            let tokenShape = stage.findOne('#' + tokenId);

            const tokenSize = gridOptions.size * 0.8;
            const halfGrid = gridOptions.size / 2;
            const isMyToken = tokenData.owner === userName;
            const canDrag = isGM || isMyToken;
            const tokenX = tokenData.x || 0;
            const tokenY = tokenData.y || 0;

            if (!tokenShape) {
                 tokenShape = new Konva.Group({
                    id: tokenId, x: tokenX, y: tokenY, draggable: canDrag,
                    dragBoundFunc: function(pos) {
                        // Clamp position within stage boundaries
                        const halfGrid = gridOptions.size / 2;
                        const newX = Math.max(0 - halfGrid, pos.x);
                        const newY = Math.max(0 - halfGrid, pos.y);
                        return { x: newX, y: newY };
                    }
                 });

                 // Decide se creare Immagine o Cerchio
                 if (tokenData.imageUrl) {
                      Konva.Image.fromURL(tokenData.imageUrl, (img) => {
                          img.setAttrs({
                              name: 'tokenImage',
                              x: halfGrid, y: halfGrid, // Centro cella
                              width: tokenSize, height: tokenSize,
                              offsetX: tokenSize / 2, offsetY: tokenSize / 2, // Centra immagine
                              stroke: isMyToken ? 'var(--colore-primario)' : 'black',
                              strokeWidth: isMyToken ? 3 : 1,
                          });
                          tokenShape.add(img);
                          tokenLayer.batchDraw(); // Ridisegna quando l'immagine è caricata
                      }, () => { // Fallback se immagine non carica
                          console.warn("Immagine token non caricata:", tokenData.imageUrl);
                          addFallbackCircle(tokenShape, tokenData, tokenSize, isMyToken);
                          tokenLayer.batchDraw();
                      });
                 } else {
                     addFallbackCircle(tokenShape, tokenData, tokenSize, isMyToken);
                 }
                 
                 // Testo (Nome) - sempre presente, sopra immagine/cerchio
                 tokenShape.add(new Konva.Text({
                    name: 'tokenText',
                    x: 0,
                    y: gridOptions.size + 2, // Posiziona 2px SOTTO la cella
                    text: tokenData.name || '',
                    fontSize: 11, // Leggermente più grande
                    fill: '#000000', // Nero
                    align: 'center',
                    width: gridOptions.size, // Larghezza come la cella per centrarlo
                    listening: false
                }));

                 // Eventi (invariati)
                 // Salva la posizione quando il token viene spostato
                tokenShape.on('dragend', () => {
                    if(canDrag) {
                        const newPos = tokenShape.position();
                        vttTokensRef.child(tokenId).update({ x: newPos.x, y: newPos.y });
                    }
                });
                
                // Elimina il token con doppio click (solo GM)
                if (isGM) {
                    tokenShape.on('dblclick dbltap', () => {
                        if (window.confirm(`Eliminare il token "${tokenData.name}"?`)) {
                            vttTokensRef.child(tokenId).remove();
                        }
                    });
                }
                 tokenLayer.add(tokenShape);
                 
            } else { // Aggiorna token esistente
                 tokenShape.position({ x: tokenX, y: tokenY });
                 tokenShape.draggable(canDrag);
                 
                 const existingImage = tokenShape.findOne('.tokenImage');
                 const existingCircle = tokenShape.findOne('.tokenCircle');

                 if (tokenData.imageUrl) {
                      if (existingCircle) existingCircle.destroy(); // Rimuovi cerchio se c'è immagine
                      if (!existingImage) { // Se prima non c'era immagine (aggiungi l'immagine)
                        Konva.Image.fromURL(tokenData.imageUrl, (img) => {
                            img.setAttrs({
                                name: 'tokenImage',
                                x: halfGrid, y: halfGrid, // Centro cella
                                width: tokenSize, height: tokenSize,
                                offsetX: tokenSize / 2, offsetY: tokenSize / 2, // Centra immagine
                                stroke: isMyToken ? 'var(--colore-primario)' : 'black',
                                strokeWidth: isMyToken ? 3 : 1,
                            });
                            tokenShape.add(img); // Aggiungi l'immagine al gruppo
                            tokenLayer.batchDraw(); // Ridisegna
                        }, () => { // Fallback se immagine non carica
                            console.warn("Immagine token non caricata:", tokenData.imageUrl);
                            addFallbackCircle(tokenShape, tokenData, tokenSize, isMyToken);
                            tokenLayer.batchDraw();
                        });
                      } else { // Aggiorna immagine esistente (src, stile)
                           if (existingImage.attrs.src !== tokenData.imageUrl) {
                               // Cambia sorgente (richiede ricaricamento) - Semplificato: non gestiamo cambio src al volo
                           }
                           existingImage.stroke(isMyToken ? 'var(--colore-primario)' : 'black');
                           existingImage.strokeWidth(isMyToken ? 3 : 1);
                      }
                 } else { // Usa cerchio
                     if (existingImage) existingImage.destroy(); // Rimuovi immagine se non serve più
                     if (!existingCircle) { // Se prima non c'era cerchio
                          addFallbackCircle(tokenShape, tokenData, tokenSize, isMyToken);
                     } else { // Aggiorna cerchio esistente
                          existingCircle.fill(tokenData.color || '#ff0000');
                          existingCircle.stroke(isMyToken ? 'var(--colore-primario)' : 'black');
                          existingCircle.strokeWidth(isMyToken ? 3 : 1);
                     }
                 }

                 const text = tokenShape.findOne('.tokenText');
                 if (text) {
                    text.text(tokenData.name || '');
                    text.y(gridOptions.size + 2);
                    text.width(gridOptions.size);
                    text.fontSize(11);
                    text.fill('#000000');
                }
            }
            tokenLayer.batchDraw();
        }
        
        function addFallbackCircle(group, tokenData, tokenSize, isMyToken) {
            group.add(new Konva.Circle({
                 name: 'tokenCircle', x: gridOptions.size / 2, y: gridOptions.size / 2,
                 radius: tokenSize / 2, fill: tokenData.color || '#ff0000',
                 stroke: isMyToken ? 'var(--colore-primario)' : 'black',
                 strokeWidth: isMyToken ? 3 : 1,
            }));
        }

        function drawOrUpdateShape(shapeId, shapeData) {
            if (!drawingLayer || !shapeData) return;
            let shape = stage.findOne('#' + shapeId);

            if (!shape) { // Crea nuova forma
                const commonAttrs = {
                    id: shapeId,
                    stroke: shapeData.color || '#ff0000',
                    strokeWidth: shapeData.strokeWidth || 2,
                    draggable: false, // Disegni non draggabili per ora
                };

                switch(shapeData.type) {
                    case 'freehand':
                        shape = new Konva.Line({ ...commonAttrs, points: shapeData.points, tension: 0.5 });
                        break;
                    case 'rect':
                        shape = new Konva.Rect({ ...commonAttrs, x: shapeData.x, y: shapeData.y, width: shapeData.width, height: shapeData.height });
                        break;
                    case 'circle':
                         shape = new Konva.Circle({ ...commonAttrs, x: shapeData.x, y: shapeData.y, radius: shapeData.radius });
                         break;
                    // Aggiungere 'line' se necessario
                    default:
                        console.warn("Tipo forma non riconosciuto:", shapeData.type);
                        return;
                }
                
                // Evento doppio click per eliminare (solo GM)
                if (isGM) {
                    shape.on('dblclick dbltap', () => {
                         if (window.confirm('Eliminare questo disegno?')) {
                              vttDrawingsRef.child(shapeId).remove();
                         }
                    });
                }
                
                drawingLayer.add(shape);

            } else { // Aggiorna forma (utile per freehand in tempo reale, ma non implementato qui)
                 // Per ora, l'aggiornamento non è necessario perché salviamo solo alla fine
            }
            drawingLayer.batchDraw();
        }
        
        function zoomStage(direction, zoomCenter) {
            if (!stage) return;

            const oldScale = stage.scaleX();
            
            // Se non viene fornito un centro (es. click bottone), usa il centro del viewport
            if (!zoomCenter) {
                    zoomCenter = {
                            x: stage.width() / 2,
                            y: stage.height() / 2
                    };
            }

            // Calcola il punto relativo alla mappa
            const mousePointTo = {
                    x: (zoomCenter.x - stage.x()) / oldScale,
                    y: (zoomCenter.y - stage.y()) / oldScale,
            };

            // Calcola la nuova scala
            let newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
            newScale = Math.max(minScale, Math.min(maxScale, newScale));

            if (newScale === oldScale) return;

            // Calcola la nuova posizione per mantenere il punto zoomato
            const newPos = {
                    x: zoomCenter.x - mousePointTo.x * newScale,
                    y: zoomCenter.y - mousePointTo.y * newScale,
            };

            stage.scale({ x: newScale, y: newScale });
            stage.position(newPos);
            stage.batchDraw();
            drawGrid(); // Ridisegna la griglia dopo lo zoom
        }

        // ** MODIFICATA **: initializeVTT ora centra correttamente il token al click
        function initializeVTT() {
             const containerWidth = vttContainer.offsetWidth;
             const containerHeight = vttContainer.offsetHeight;
             
             if (stage) {
                 stage.size({ width: containerWidth, height: containerHeight });
                 drawGrid(); // Ridisegna griglia per nuove dimensioni
                 loadMapBackground(vttMapRef.snapshot?.val()?.backgroundUrl); // Ricarica mappa
                 return;
             }
             
             stage = new Konva.Stage({
                 container: 'vtt-container',
                 width: containerWidth,
                 height: containerHeight,
                 draggable: true
             });

             mapLayer = new Konva.Layer();
             gridLayer = new Konva.Layer({
             });
             drawingLayer = new Konva.Layer();
             tokenLayer = new Konva.Layer();
             tempLayer = new Konva.Layer(); // Layer temporaneo per misura/ping

             stage.add(mapLayer);
             stage.add(gridLayer);
             stage.add(drawingLayer);
             stage.add(tokenLayer);
             stage.add(tempLayer); // Aggiunto sopra gli altri
             drawGrid();

             stage.on('click tap', (e) => {
                 if (e.target !== stage) { // Click su un token/disegno, non sullo stage
                     if (tokenToAdd) { // Resetta aggiunta token se si clicca altrove
                          tokenToAdd = null;
                          vttContainer.style.cursor = 'default';
                     }
                     return; 
                 }
                 
                 const pos = stage.getRelativePointerPosition();

                 if (isGM && tokenToAdd) { // Logica Aggiunta Token (GM)
                    const halfGrid = gridOptions.size / 2;
                     const x = pos.x - halfGrid;
                     const y = pos.y - halfGrid;
                     const owner = vttTokenOwnerSelect.value || null;
                     
                     vttTokensRef.push({
                          name: tokenToAdd.name,
                          color: tokenToAdd.color,
                          imageUrl: tokenToAdd.imageUrl, // Salva URL immagine
                          x: x, y: y,
                          owner: owner
                     });
                     tokenToAdd = null;
                     vttContainer.style.cursor = 'default';

                 } else if (currentDrawingTool === 'ping') { // Logica Ping (Tutti)
                      if (checkNome()) { // Solo se loggato
                         vttPingsRef.push({ x: pos.x, y: pos.y, timestamp: Date.now(), pinger: userName });
                      }
                 }
             });
             
             stage.on('mousedown touchstart', (e) => {
                 if (e.target !== stage) { isDrawing = false; return; } // Ignora se si clicca su token/disegno

                 if (currentDrawingTool === 'select') { isDrawing = false; return; }
                 
                 isDrawing = true;
                 startPoint = stage.getRelativePointerPosition();
                 const color = drawingColorInput.value;
                 const strokeWidth = parseInt(drawingStrokeWidthInput.value) || 2;

                 // Crea forma temporanea (o linea di misura)
                 if (currentDrawingTool === 'ruler') {
                      measurementLine = new Konva.Line({
                           points: [startPoint.x, startPoint.y, startPoint.x, startPoint.y],
                           stroke: 'var(--measure-color)', strokeWidth: 2, dash: [10, 5], listening: false
                      });
                      measurementText = new Konva.Text({
                           x: startPoint.x + 5, y: startPoint.y + 5, text: '0 ' + gridUnit,
                           fontSize: 12, fill: 'var(--measure-color)', listening: false
                      });
                      tempLayer.add(measurementLine);
                      tempLayer.add(measurementText);
                 } else if (isGM) { // Solo GM può disegnare forme permanenti
                      switch(currentDrawingTool) {
                            case 'freehand':
                                currentShape = new Konva.Line({
                                    points: [startPoint.x, startPoint.y, startPoint.x, startPoint.y],
                                    stroke: color, strokeWidth: strokeWidth, tension: 0.5, lineCap: 'round', lineJoin: 'round'
                                });
                                break;
                            case 'rect':
                                currentShape = new Konva.Rect({
                                    x: startPoint.x, y: startPoint.y, width: 0, height: 0,
                                    stroke: color, strokeWidth: strokeWidth
                                });
                                break;
                            case 'circle':
                                currentShape = new Konva.Circle({
                                    x: startPoint.x, y: startPoint.y, radius: 0,
                                    stroke: color, strokeWidth: strokeWidth
                                });
                                break;
                            // Aggiungere 'line' se si vuole linea retta
                        }
                      if (currentShape) drawingLayer.add(currentShape);
                 }
             });

            stage.on('mousemove touchmove', () => {
                if (!isDrawing) return;
                const pos = stage.getRelativePointerPosition();

                if (currentDrawingTool === 'ruler' && measurementLine) {
                     measurementLine.points([startPoint.x, startPoint.y, pos.x, pos.y]);
                     // Calcola distanza
                     const dx = pos.x - startPoint.x;
                     const dy = pos.y - startPoint.y;
                     const pixelDistance = Math.sqrt(dx * dx + dy * dy);
                     const gridDistance = pixelDistance / gridOptions.size;
                     const realDistance = gridDistance * gridScale;
                     measurementText.text(realDistance.toFixed(1) + ' ' + gridUnit);
                     measurementText.position({ x: pos.x + 5, y: pos.y + 5 }); // Sposta etichetta
                     tempLayer.batchDraw();
                } else if (isGM && currentShape) { // Disegno GM
                    switch(currentDrawingTool) {
                        case 'freehand':
                            const newPoints = currentShape.points().concat([pos.x, pos.y]);
                            currentShape.points(newPoints);
                            break;
                        case 'rect':
                            currentShape.width(pos.x - startPoint.x);
                            currentShape.height(pos.y - startPoint.y);
                            break;
                        case 'circle':
                            const dx = pos.x - startPoint.x;
                            const dy = pos.y - startPoint.y;
                            currentShape.radius(Math.sqrt(dx * dx + dy * dy));
                            break;
                    }
                    drawingLayer.batchDraw();
                }
            });

            stage.on('mouseup touchend', () => {
                if (!isDrawing) return;
                isDrawing = false;
                
                if (currentDrawingTool === 'ruler') { // Fine misura
                    measurementLine.destroy();
                    measurementText.destroy();
                    tempLayer.batchDraw();
                    measurementLine = null;
                    measurementText = null;
                } else if (isGM && currentShape) {
                    // Salva la forma su Firebase
                    let shapeData = {
                        type: currentDrawingTool,
                        color: currentShape.stroke(),
                        strokeWidth: currentShape.strokeWidth(),
                    };
                    
                    switch(currentDrawingTool) {
                        case 'freehand':
                            shapeData.points = currentShape.points();
                            break;
                        case 'rect':
                            shapeData.x = currentShape.x();
                            shapeData.y = currentShape.y();
                            shapeData.width = currentShape.width();
                            shapeData.height = currentShape.height();
                            // Normalizza width/height negativi se si disegna all'indietro
                            if (shapeData.width < 0) { shapeData.x += shapeData.width; shapeData.width *= -1; }
                            if (shapeData.height < 0) { shapeData.y += shapeData.height; shapeData.height *= -1; }
                            break;
                        case 'circle':
                            shapeData.x = currentShape.x();
                            shapeData.y = currentShape.y();
                            shapeData.radius = currentShape.radius();
                            break;
                    }
                    
                    // Aggiunge a Firebase (senza ID locale temporaneo, Firebase lo genera)
                    vttDrawingsRef.push(shapeData);
                    
                    // Rimuovi la forma temporanea (verrà ridisegnata dal listener Firebase)
                    currentShape.destroy();
                    drawingLayer.batchDraw();
                    currentShape = null;
                }

                stage.on('mousedown.pan', (e) => {
                    // Attiva solo se lo strumento selezionato è 'select' e stiamo premendo sullo stage
                    if (currentDrawingTool === 'select' && e.target === stage) {
                        vttContainer.style.cursor = 'grabbing';
                    }
                });
                // Rimetti il cursore "grab" quando rilasciamo
                stage.on('mouseup.pan', (e) => {
                    if (currentDrawingTool === 'select') {
                        vttContainer.style.cursor = 'grab';
                    }
                });
            });

            // Listener per lo ZOOM (rotellina del mouse)
            stage.on('wheel.zoom', (e) => {
                e.evt.preventDefault(); // Impedisce lo scroll della pagina
                
                const pointer = stage.getPointerPosition();

                if (!pointer) return; // Uscita di sicurezza se il puntatore non è sullo stage

                // Determina la direzione dello zoom e la nuova scala
                const direction = e.evt.deltaY > 0 ? -1 : 1; // -1 zoom out, 1 zoom in
                zoomStage(direction, pointer)
            });

            stage.on('dragmove.grid', () => {
                drawGrid();
            });

            window.addEventListener('resize', () => {
                requestAnimationFrame(() => {
                    if (stage && vttContainer) {
                        const newWidth = vttContainer.offsetWidth;
                        const newHeight = vttContainer.offsetHeight;
                        if (newWidth > 0 && newHeight > 0) {
                            stage.size({ width: newWidth, height: newHeight });

                            if(gridLayer) {
                                drawGrid();
                            }
                            if(mapLayer) {
                                loadMapBackground(currentMapUrl); 
                            }
                        }
                    }
                });
            });

            vttZoomInBtn.addEventListener('click', () => {
                zoomStage(1, null); // direction 1 (zoom in), centro (null)
            });
            vttZoomOutBtn.addEventListener('click', () => {
                zoomStage(-1, null); // direction -1 (zoom out), centro (null)
            });
            vttCenterViewBtn.addEventListener('click', () => {
                if (!stage) return;
                stage.position({ x: 0, y: 0 });
                stage.scale({ x: 1, y: 1 });
                stage.batchDraw();
                drawGrid(); 
            });
        }
        
        // --- 3. LOGICA DI IMPOSTAZIONE (Nome, GM, Tema, Sessione) ---
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                button.classList.add('active');
                const tabId = button.dataset.tab;
                document.getElementById(`tab-${tabId}`).classList.add('active');
                
                if (tabId === 'history') {
                    loadHistory();
                }
            });
        });

        setNomeBtn.addEventListener('click', () => {
            const nome = nomeInput.value.trim();
            if (!nome) {
                alert('Per favore, inserisci un nome valido.');
                return;
            }
            
            // Controlla se per caso sei già GM su Firebase ma non localmente
            gmStatusRef.once('value', (snapshot) => {
                const currentFirebaseGM = snapshot.val();
                
                // *** NUOVA LOGICA DI RECUPERO ***
                if (currentFirebaseGM === nome && localStorage.getItem('isGM') !== 'true') {
                    // Firebase dice che sono GM, ma localmente non lo so (localStorage perso)
                    console.log(`Recupero ruolo GM per ${nome}`);
                    userName = nome;
                    isGM = true;
                    localStorage.setItem('userName', userName);
                    localStorage.setItem('isGM', 'true');
                    
                    // Applica le impostazioni GM
                    document.body.classList.add('is-gm');
                    attachGmRequestListener(); // Inizia ad ascoltare richieste
                    lockNameControls(); // Blocca input nome e mostra UI GM
                    
                    // Carica colore e macro (se non già fatto)
                    usersRef.child(userName).once('value', (userSnapshot) => {
                         if (userSnapshot.exists()) {
                             userColorInput.value = userSnapshot.val().color || '#000000';
                             loadMacros(); // Carica macro dopo aver recuperato
                         } else {
                            // Se l'utente non esiste più (improbabile), crea con colore default
                            const defaultColor = getRandomColor();
                            usersRef.child(userName).set({ color: defaultColor });
                            userColorInput.value = defaultColor;
                            loadMacros(); 
                         }
                    });
                     
                    alert(`Ruolo di GM per ${userName} recuperato.`);
                    return; // Interrompi qui, non serve tentare la transazione
                }
                
                // *** LOGICA NORMALE (se non c'è recupero) ***
                userName = nome;
                localStorage.setItem('userName', userName);
                
                const myPresenceRef = presenceRef.child(userName);
                myPresenceRef.set(true);
                myPresenceRef.onDisconnect().remove();
                
                usersRef.child(userName).once('value', (userSnapshot) => {
                    if (!userSnapshot.exists() || !userSnapshot.val().color) {
                        const defaultColor = getRandomColor();
                        usersRef.child(userName).set({ color: defaultColor });
                        userColorInput.value = defaultColor;
                    } else {
                        userColorInput.value = userSnapshot.val().color;
                    }
                    loadMacros(); // Carica macro
                });
                
                if (gmCheck.checked) {
                    // Tenta di diventare GM (transazione)
                    gmStatusRef.transaction((currentGM) => {
                        if (currentGM === null) return userName;
                        return undefined; 
                    }, (error, committed, snapshot) => {
                        if (error) { alert('Errore nella transazione GM: ' + error); }
                        else if (committed) {
                            isGM = true;
                            localStorage.setItem('isGM', 'true');
                            mainContent.classList.add('gm-is-me');
                            attachGmRequestListener();
                            alert('Sei il GM!');
                        } else {
                            isGM = false;
                            localStorage.setItem('isGM', 'false');
                            alert('Ruolo GM già preso da ' + currentFirebaseGM); // Usa il valore letto prima
                        }
                        lockNameControls();
                    });
                } else {
                    // Non vuoi essere GM
                    isGM = false;
                    localStorage.setItem('isGM', 'false');
                    lockNameControls();
                }
            }); // Fine .once() per controllo recupero
        
            attachPrivateNotesListener();
        });

        function lockNameControls() {
            document.body.classList.add('is-logged-in');
        
            if (isGM) {
                document.body.classList.add('is-gm');
            }
            
            initializeVTT();
        }

        (function loadSessionAndTheme() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-mode');
            }
            
            const savedBgColor = localStorage.getItem('pageBgColor');
            if (savedBgColor) {
                document.body.style.setProperty('--colore-sfondo', savedBgColor);
                pageBgColorInput.value = savedBgColor;
            }

            const savedChatBg = localStorage.getItem('chatBgColor');
             if (savedChatBg) {
                  document.documentElement.style.setProperty('--colore-sfondo-chatbox', savedChatBg);
                  chatBgColorInput.value = savedChatBg;
             }
            
            const savedName = localStorage.getItem('userName');
            if (savedName) {
                userName = savedName;
                isGM = localStorage.getItem('isGM') === 'true';
                
                const myPresenceRef = presenceRef.child(userName);
                myPresenceRef.set(true);
                myPresenceRef.onDisconnect().remove();
                
                nomeInput.value = userName;
                if (isGM) {
                    document.body.classList.add('is-gm');
                    attachGmRequestListener();
                }
                
                usersRef.child(userName).once('value', (snapshot) => {
                    if (snapshot.exists()) {
                        userColorInput.value = snapshot.val().color;
                    }
                });
                
                lockNameControls();
                loadMacros();
                lockNameControls();
                initializeVTT();
            }
        })();

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });
        
        saveColorBtn.addEventListener('click', () => {
            if (!checkNome()) return;
            const newColor = userColorInput.value;
            usersRef.child(userName).update({ color: newColor });
        });
        
        savePageBgBtn.addEventListener('click', () => {
            const newColor = pageBgColorInput.value;
            document.body.style.setProperty('--colore-sfondo', newColor);
            localStorage.setItem('pageBgColor', newColor);
        });
        
        saveChatBgBtn.addEventListener('click', () => {
             const newColor = chatBgColorInput.value;
             document.documentElement.style.setProperty('--colore-sfondo-chatbox', newColor);
             localStorage.setItem('chatBgColor', newColor);
        });
        
        clearLocalBtn.addEventListener('click', () => {
            if (window.confirm('Sei sicuro di voler resettare i dati locali? Verrai "sloggato".')) {
                if(userName) {
                    presenceRef.child(userName).remove().finally(() => {
                        localStorage.clear();
                        location.reload();
                    });
                } else {
                    localStorage.clear();
                    location.reload();
                }
            }
        });

        function loadMacros() {
             if (!userName) return;
             usersRef.child(userName).child('macros').on('value', (snapshot) => {
                 const macros = snapshot.val() || {};
                 macroSelect.innerHTML = '<option value="" disabled selected>Seleziona una macro</option>'; // Pulisci select
                 macroList.innerHTML = ''; // Pulisci lista impostazioni
                 
                 if (Object.keys(macros).length === 0) {
                      macroList.innerHTML = '<li>Nessuna macro salvata.</li>';
                      return;
                 }
                 
                 for(const [name, command] of Object.entries(macros)) {
                      // Popola Select
                      const option = document.createElement('option');
                      option.value = command;
                      option.textContent = name;
                      macroSelect.appendChild(option);
                      
                      // Popola Lista Impostazioni
                      const li = document.createElement('li');
                      li.innerHTML = `
                           <span><strong>${name}:</strong> <span class="macro-command">${command}</span></span>
                           <button class="delete-macro-btn" data-name="${name}"><i class="fa-solid fa-trash"></i></button>
                      `;
                      macroList.appendChild(li);
                 }
             });
        }
        
        addMacroBtn.addEventListener('click', () => {
             if (!checkNome()) return;
             const name = macroNameInput.value.trim();
             const command = macroCommandInput.value.trim();
             if (name && command) {
                 usersRef.child(userName).child('macros').child(name).set(command);
                 macroNameInput.value = '';
                 macroCommandInput.value = '';
             } else {
                 alert('Inserisci nome e comando per la macro.');
             }
        });
        
        macroList.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-macro-btn')) {
                const name = e.target.dataset.name;
                if (name && window.confirm(`Eliminare la macro "${name}"?`)) {
                    usersRef.child(userName).child('macros').child(name).remove();
                }
            }
        });
        
        rollMacroBtn.addEventListener('click', () => {
             const command = macroSelect.value;
             if (command) {
                 handleRoll(command);
             }
        });

        vttDrawingsRef.on('child_added', (snapshot) => {
            drawOrUpdateShape(snapshot.key, snapshot.val());
        });
        
        vttDrawingsRef.on('child_removed', (snapshot) => {
             if (stage) {
                const shape = stage.findOne('#' + snapshot.key);
                if (shape) {
                    shape.destroy();
                    drawingLayer.batchDraw();
                }
            }
        });

        vttConfigRef.on('value', (snapshot) => {
             const config = snapshot.val() || {};
             gridScale = parseFloat(config.gridScale) || 1.5;
             gridUnit = config.gridUnit || 'm';
             // Aggiorna UI se necessario (potrebbe essere utile mostrarli anche ai player)
             if (isGM) { // Solo GM vede gli input, aggiornali
                  gridScaleInput.value = gridScale;
                  gridUnitInput.value = gridUnit;
             }
        });

        vttPingsRef.on('child_added', (snapshot) => {
             const ping = snapshot.val();
             // Ignora ping troppo vecchi (es. > 5 secondi) al caricamento iniziale
             if (Date.now() - ping.timestamp > 5000) return;
             
             // Crea animazione ping
             if (stage && tempLayer) {
                  const pingCircle = new Konva.Circle({
                       x: ping.x,
                       y: ping.y,
                       radius: 5,
                       stroke: 'var(--ping-color)',
                       strokeWidth: 4,
                       opacity: 0.7,
                       listening: false,
                  });
                  tempLayer.add(pingCircle);
                  
                  const tween = new Konva.Tween({
                       node: pingCircle,
                       duration: 0.8, // Durata animazione
                       radius: gridOptions.size * 0.8, // Raggio finale
                       opacity: 0,
                       easing: Konva.Easings.EaseOut,
                       onFinish: () => {
                            pingCircle.destroy(); // Rimuovi cerchio alla fine
                       }
                  });
                  tween.play();
             }
             // Opzionale: Rimuovi il ping da Firebase dopo un po'
             setTimeout(() => vttPingsRef.child(snapshot.key).remove(), 5000);
        });

        vttMapRef.on('value', (snapshot) => {
             const mapData = snapshot.val() || {};
             loadMapBackground(mapData.backgroundUrl);
             // Qui potresti leggere anche gridOptions se le salvi su Firebase
             drawGrid(); // Ridisegna griglia (utile se cambi opzioni)
        });
        
        vttTokensRef.on('child_added', (snapshot) => {
             drawOrUpdateToken(snapshot.key, snapshot.val());
        });
        
        vttTokensRef.on('child_changed', (snapshot) => {
             drawOrUpdateToken(snapshot.key, snapshot.val());
        });
        
        vttTokensRef.on('child_removed', (snapshot) => {
            if (stage) {
                const tokenShape = stage.findOne('#' + snapshot.key);
                if (tokenShape) {
                    tokenShape.destroy();
                    stage.batchDraw();
                }
            }
        });
        
        // --- NUOVA LOGICA NOTE ---
        function getCurrentNotesRef() {
             return currentNoteIsPrivate 
                 ? usersRef.child(userName).child('privateNotes') 
                 : sharedNotesRef;
        }

        // Aggiorna il dropdown delle note
        function updateNotesDropdown() {
             notesSelect.innerHTML = ''; // Pulisci
             
             // Aggiungi note condivise
             for(const key in sharedNotesCache) {
                  const option = document.createElement('option');
                  option.value = key;
                  option.textContent = key; // Mostra solo il titolo
                  if (key === currentNoteKey && !currentNoteIsPrivate) option.selected = true;
                  notesSelect.appendChild(option);
             }
             
             // Aggiungi note private
             for(const key in privateNotesCache) {
                  const option = document.createElement('option');
                  option.value = key;
                  option.textContent = `[P] ${key}`; // Prefisso per distinguerle
                  option.dataset.isPrivate = true; // Flag per identificarle
                   if (key === currentNoteKey && currentNoteIsPrivate) option.selected = true;
                  notesSelect.appendChild(option);
             }
             
             // Se non c'è nulla, mostra placeholder
             if (notesSelect.options.length === 0) {
                  notesSelect.innerHTML = '<option value="" disabled selected>-- Nessuna Nota --</option>';
                  notesTextarea.value = '';
                  notesTextarea.disabled = true;
                  deleteNoteBtn.disabled = true;
             } else {
                  notesTextarea.disabled = false;
                  deleteNoteBtn.disabled = false;
                  // Se nessuna nota era selezionata (es. dopo delete), seleziona la prima
                  if (!currentNoteKey) {
                       notesSelect.selectedIndex = 0;
                       notesSelect.dispatchEvent(new Event('change')); // Simula cambio per caricare
                  }
             }
        }

        // Carica il contenuto della nota selezionata
        function loadSelectedNote() {
            if (!currentNoteKey) {
                notesTextarea.value = '';
                return;
            }
            const notesSource = currentNoteIsPrivate ? privateNotesCache : sharedNotesCache;
            notesTextarea.value = notesSource[currentNoteKey] || '';
        }

        // Listener per cambio selezione nota
        notesSelect.addEventListener('change', () => {
             const selectedOption = notesSelect.options[notesSelect.selectedIndex];
             if (!selectedOption) return;
             
             currentNoteKey = selectedOption.value;
             currentNoteIsPrivate = !!selectedOption.dataset.isPrivate; // Controlla flag
             noteIsPrivateCheck.checked = currentNoteIsPrivate; // Aggiorna checkbox
             
             loadSelectedNote();
        });

        // Listener per cambio checkbox "Privata"
        noteIsPrivateCheck.addEventListener('change', () => {
            currentNoteIsPrivate = noteIsPrivateCheck.checked;
            // Potrebbe essere utile ricaricare il dropdown o selezionare la prima nota del tipo corretto
            // Per ora, cambiamo solo il target per la prossima scrittura/creazione
            const targetRef = getCurrentNotesRef();
            console.log("Ora le operazioni sulle note puntano a:", currentNoteIsPrivate ? "Private" : "Condivise");
            // Ricarichiamo il contenuto della nota corrente da questo nuovo contesto, se esiste
            loadSelectedNote();
        });

        // Listener per modifiche alla textarea
        notesTextarea.addEventListener('input', () => {
            if (!currentNoteKey) return;
            localNotesChange = true;
            getCurrentNotesRef().child(currentNoteKey).set(notesTextarea.value);
        });

        // Listener per note condivise
        sharedNotesRef.on('value', (snapshot) => {
            sharedNotesCache = snapshot.val() || {};
            updateNotesDropdown(); // Aggiorna il select
            // Aggiorna textarea solo se la nota CORRENTE e CONDIVISA è cambiata esternamente
            if (!currentNoteIsPrivate && !localNotesChange && sharedNotesCache.hasOwnProperty(currentNoteKey)) {
                notesTextarea.value = sharedNotesCache[currentNoteKey] || '';
            }
            localNotesChange = false;
        });

        // Listener per note private (agganciato dopo login)
        let privateNotesListenerAttached = false;
        function attachPrivateNotesListener() {
             if (!userName || privateNotesListenerAttached) return;
             
             const userPrivateNotesRef = usersRef.child(userName).child('privateNotes');
             userPrivateNotesRef.on('value', (snapshot) => {
                  privateNotesCache = snapshot.val() || {};
                  updateNotesDropdown(); // Aggiorna il select
                  // Aggiorna textarea solo se la nota CORRENTE e PRIVATA è cambiata esternamente
                  if (currentNoteIsPrivate && !localNotesChange && privateNotesCache.hasOwnProperty(currentNoteKey)) {
                       notesTextarea.value = privateNotesCache[currentNoteKey] || '';
                  }
                  localNotesChange = false;
             });
             privateNotesListenerAttached = true;
        }

        // Aggiungi Nuova Nota
        addNoteBtn.addEventListener('click', () => {
            if (!checkNome()) return;
            const title = prompt("Inserisci il titolo della nuova nota:");
            if (title) {
                 const newNoteKey = title.trim();
                 if (newNoteKey) {
                      const targetRef = getCurrentNotesRef();
                      targetRef.child(newNoteKey).set(""); // Crea nota vuota
                      // Seleziona automaticamente la nuova nota
                      currentNoteKey = newNoteKey;
                      currentNoteIsPrivate = noteIsPrivateCheck.checked;
                      updateNotesDropdown(); // Aggiorna e seleziona
                      notesTextarea.value = "";
                      notesTextarea.focus();
                 }
            }
        });

        // Elimina Nota Selezionata
        deleteNoteBtn.addEventListener('click', () => {
            if (!currentNoteKey || !checkNome()) return;
            const noteToDelete = currentNoteKey; // Salva la chiave corrente
            const wasPrivate = currentNoteIsPrivate; // Salva il tipo
            if (window.confirm(`Sei sicuro di voler eliminare la nota "${noteToDelete}"?`)) {
                 const targetRef = wasPrivate 
                     ? usersRef.child(userName).child('privateNotes') 
                     : sharedNotesRef;
                     
                 targetRef.child(noteToDelete).remove().then(() => {
                      // Deseleziona la nota eliminata
                      if (currentNoteKey === noteToDelete && currentNoteIsPrivate === wasPrivate) {
                           currentNoteKey = null;
                      }
                      updateNotesDropdown(); // Ricarica il dropdown, che selezionerà la prima disponibile
                 });
            }
        });
        
        // --- NUOVA LOGICA MUSICA ---
        musicPlayBtn.addEventListener('click', () => {
            if (!isGM) return;
            const url = musicUrlInput.value.trim();
            if (url) {
                musicRef.set({ url: url, isPlaying: true });
            }
        });
        musicPauseBtn.addEventListener('click', () => {
            if (!isGM) return;
            musicRef.update({ isPlaying: false }); // Mantiene URL
        });
        musicStopBtn.addEventListener('click', () => {
            if (!isGM) return;
            musicRef.set(null); // Rimuove tutto
        });
        musicRef.on('value', (snapshot) => {
            const track = snapshot.val();
            if (track && track.url) {
                if (audioPlayer.src !== track.url) {
                    audioPlayer.src = track.url;
                }
                if (track.isPlaying && audioPlayer.paused) {
                    audioPlayer.play().catch(e => console.warn("Autoplay audio bloccato dal browser:", e));
                } else if (!track.isPlaying && !audioPlayer.paused) {
                    audioPlayer.pause();
                }
            } else { // Stop
                audioPlayer.pause();
                audioPlayer.src = '';
            }
        });
        document.body.addEventListener('click', () => {
            if(audioPlayer.paused && audioPlayer.src && musicRef.snapshot?.val()?.isPlaying) {
                 audioPlayer.play().catch(e => {});
            }
        }, { once: true });

        // --- 4. ASCOLTATORI FIREBASE (GM, Pin, Messaggi, Colori, Turni, Presenza) ---

        gmStatusRef.on('value', (snapshot) => {
            gmName = snapshot.val();
            
            if (gmName) {
                gmRadio.disabled = false;
                if (gmName === userName && !isGM) {
                    isGM = true;
                    localStorage.setItem('isGM', 'true');
                    attachGmRequestListener();
                    alert('Ora sei il GM!');
                } else if (gmName !== userName && isGM) {
                    isGM = false;
                    localStorage.setItem('isGM', 'false');
                    document.body.classList.remove('is-gm');
                    gmRequestRef.off();
                }
            } else {
                gmRadio.disabled = true;
                if (isGM) {
                    isGM = false;
                    localStorage.setItem('isGM', 'false');
                    document.body.classList.remove('is-gm');
                    gmRequestRef.off();
                }
            }

            renderTurnOrderList();
            renderPresenceList();
        });
        
        // Sostituisce il vecchio usersRef.on('value')
        usersRef.on('child_added', (snapshot) => {
            const name = snapshot.key; // Se usi l'UID, questo sarà l'UID
            const data = snapshot.val();
            // Assumendo che tu salvi il 'name' leggibile dentro il nodo utente
            const displayName = data.name || name; 
            userColors[displayName] = data.color;

            // Aggiorna solo gli elementi esistenti
            document.querySelectorAll(`.nome-utente[data-name="${displayName}"]`).forEach(el => {
                el.style.color = data.color;
            });
            // Non ridisegnare tutto, ma aggiorna le liste che dipendono dagli utenti
            renderTurnOrderList(); 
            renderPresenceList();
        });

        usersRef.on('child_changed', (snapshot) => {
            const name = snapshot.key;
            const data = snapshot.val();
            const displayName = data.name || name;
            userColors[displayName] = data.color;

            // Aggiorna solo gli elementi esistenti
            document.querySelectorAll(`.nome-utente[data-name="${displayName}"]`).forEach(el => {
                el.style.color = data.color;
            });
            renderTurnOrderList();
            renderPresenceList();
        });

        usersRef.on('child_removed', (snapshot) => {
            const name = snapshot.key;
            const displayName = snapshot.val().name || name;
            delete userColors[displayName];

            // Aggiorna le liste
            renderTurnOrderList();
            renderPresenceList();
        });
        
        pinMessageRef.on('value', (snapshot) => {
            const msg = snapshot.val();
            if (msg && msg.testo) {
                pinContent.innerHTML = `<i class="fa-solid fa-thumbtack"></i> <strong>${msg.nome}</strong> ${msg.testo}`;
                pinMessageBar.style.display = 'block';
            } else {
                pinMessageBar.style.display = 'none';
            }
        });
        unpinBtn.addEventListener('click', () => { pinMessageRef.set(null); });

        function attachGmRequestListener() {
            if (!isGM) return;
            gmRequestRef.on('value', (snapshot) => {
                const request = snapshot.val();
                if (request && request.from) {
                    requesterNameEl.textContent = request.from;
                    gmRequestModal.classList.add('is-visible');
                } else {
                    gmRequestModal.classList.remove('is-visible');
                }
            });
        }
        
        gmRefuseBtn.addEventListener('click', () => {
            gmRequestRef.set(null); 
            gmRequestModal.classList.remove('is-visible');
        });
        gmAcceptBtn.addEventListener('click', () => {
            const newGMName = requesterNameEl.textContent;
            if (newGMName) {
                gmStatusRef.set(newGMName);
                gmRequestRef.set(null);
            }
             gmRequestModal.classList.remove('is-visible');
        });

        chatRef.limitToLast(50).on('child_added', (snapshot) => {
            const msg = snapshot.val();
            const msgId = snapshot.key;

            if (msg.isDeleted) return;

            if (!msg || !msg.nome || !msg.testo) return;

            const wasAtBottom = chatbox.scrollTop + chatbox.clientHeight >= chatbox.scrollHeight - 10;
            const isMine = msg.nome === userName;

            if (msg.visibility === 'private' && !isMine) return;
            if (msg.visibility === 'gm' && !isMine && !isGM) return;

            const div = document.createElement('div');
            div.id = msgId; // Assegna ID per l'eliminazione
            div.classList.add('message-bubble', `${msg.visibility}-message`); 

            if (isMine) div.classList.add('mine');
            if (msg.nome === lastSenderName) div.classList.add('grouped');
            if (msg.type === 'roll') div.classList.add('roll-message');

            // --- NUOVO: Aggiungi Bottoni Azione ---
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'message-actions';

            // Bottone Rispondi (per tutti)
            const replyBtn = document.createElement('button');
            replyBtn.className = 'message-action-btn reply-btn';
            replyBtn.title = 'Rispondi';
            replyBtn.innerHTML = '<i class="fa-solid fa-reply"></i>';
            replyBtn.onclick = () => {
                currentReply = { nome: msg.nome, testo: msg.testo };
                updateReplyUI();
            };
            actionsDiv.appendChild(replyBtn);

            // Bottone Pin (solo GM)
            if (isGM && msg.visibility === 'public') {
                const pinBtn = document.createElement('button');
                pinBtn.className = 'message-action-btn pin-button gm-only'; // 'pin-button' ha già stile
                pinBtn.title = 'Fissa';
                pinBtn.innerHTML = '<i class="fa-solid fa-thumbtack"></i>';
                pinBtn.onclick = () => { pinMessageRef.set(msg); };
                actionsDiv.appendChild(pinBtn);
            }

            // Bottone Elimina (solo miei messaggi)
            if (isMine) {
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'message-action-btn delete-btn';
                deleteBtn.title = 'Elimina';
                deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
                deleteBtn.onclick = () => {
                    if (window.confirm('Sei sicuro di voler eliminare questo messaggio?')) {
                        chatRef.child(msgId).update({ isDeleted: true });
                    }
                };
                actionsDiv.appendChild(deleteBtn);
            }
            div.appendChild(actionsDiv);

            if (msg.replyTo) {
                const replyBlock = document.createElement('div');
                replyBlock.className = 'reply-context-block';
                replyBlock.innerHTML = `
                    <strong>Risposta a ${msg.replyTo.nome}</strong>
                    <p>${msg.replyTo.testo}</p>
                `;
                div.appendChild(replyBlock);
            }

            const nomeStrong = document.createElement('strong');
            nomeStrong.classList.add('nome-utente');
            nomeStrong.textContent = `${msg.nome}`;
            nomeStrong.style.color = getUserColor(msg.nome);
            nomeStrong.dataset.name = msg.nome;
            div.appendChild(nomeStrong);

            // Contenitore per il testo (per Markdown)
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content'; 

            if (msg.type === 'text') {
                const rawHtml = marked.parse(msg.testo || '');
                contentDiv.innerHTML = DOMPurify.sanitize(rawHtml);
            } else if (msg.type === 'roll') {
                const [testoBase, risultatoFinale] = (msg.testo || '').split('=');
                contentDiv.appendChild(document.createTextNode(testoBase + (risultatoFinale ? ' = ' : '')));
                if (risultatoFinale) {
                    const risultatoStrong = document.createElement('strong');
                    risultatoStrong.classList.add('roll-result');
                    risultatoStrong.textContent = risultatoFinale;
                    contentDiv.appendChild(risultatoStrong);
                }
            }
            div.appendChild(contentDiv); 

            const timeEl = document.createElement('span');
            timeEl.className = 'message-timestamp';
            timeEl.textContent = formatTimestamp(msg.timestamp);
            div.appendChild(timeEl);

            chatbox.appendChild(div);
            lastSenderName = msg.nome;

            if(wasAtBottom) {
                chatbox.scrollTop = chatbox.scrollHeight;
            }
        });
        
        chatRef.on('child_removed', (snapshot) => {
            const msgId = snapshot.key;
            const msgElement = document.getElementById(msgId);
            if (msgElement) {
                msgElement.remove();
            }
        });

        chatRef.on('child_changed', (snapshot) => {
            const msg = snapshot.val();
            const msgId = snapshot.key;
            const msgElement = document.getElementById(msgId);

            if (msgElement && msg.isDeleted) {
                // Rimuovi il messaggio dal DOM se è stato contrassegnato come eliminato
                msgElement.remove();
            }
        });

        let onlineUsersCache = {};
        function renderPresenceList() {
            const users = onlineUsersCache;
            const userNames = Object.keys(users);
            presenceList.innerHTML = ''; // Pulisci pillole
            // Pulisci e ripopola select owner
            vttTokenOwnerSelect.innerHTML = '<option value="">Nessuno/GM</option>'; 
            
            userNames.forEach(name => {
                // Pillola
                const pill = document.createElement('span');
                pill.className = 'user-pill';
                const nameSpan = document.createElement('span');
                nameSpan.textContent = name;
                pill.appendChild(nameSpan);
                pill.style.borderColor = getUserColor(name);
                if (name === gmName) {
                    const gmBadge = document.createElement('span');
                    gmBadge.className = 'gm-badge';
                    gmBadge.textContent = 'GM';
                    pill.appendChild(gmBadge);
                }
                presenceList.appendChild(pill);
                
                // Opzione Select
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                vttTokenOwnerSelect.appendChild(option);
            });
        }
        
        presenceRef.on('value', (snapshot) => {
            onlineUsersCache = snapshot.val() || {};
            renderPresenceList();
        });

        database.ref('currentTurnName').on('value', (snapshot) => {
             currentTurnName = snapshot.val();
             renderTurnOrderList(); // Rirenderizza per evidenziare
        });

        turnCounterRef.on('value', (snapshot) => {
            const count = snapshot.val() || 1;
            turnCounterEl.textContent = count;
        });
        
        // --- 5. LOGICA ORDINE DI TURNO ---
        
        let turnOrderCache = {};
        
        function renderTurnOrderList() {
            const data = turnOrderCache;
            if (!data || Object.keys(data).length === 0) {
                turnOrderList.innerHTML = '<li>Nessuno in lista.</li>';
                return;
            }
            const sortedList = Object.entries(data)
                .map(([name, turnData]) => ({ 
                     name, 
                     value: turnData.value || 0, // Default a 0
                     isPlayer: turnData.isPlayer,
                     hp: turnData.hp,
                     hp_max: turnData.hp_max,
                     status: turnData.status || '' // Default a stringa vuota
                }))
                .sort((a, b) => b.value - a.value);

            turnOrderList.innerHTML = '';
            
            sortedList.forEach(item => {
                const li = document.createElement('li');
                // Evidenzia turno corrente
                if(item.name === currentTurnName) {
                    li.classList.add('current-turn');
                }

                const participantInfo = document.createElement('div');
                participantInfo.className = 'turn-participant-info';
                
                const nameSpan = document.createElement('span');
                nameSpan.className = 'turn-name';
                nameSpan.textContent = item.name;
                nameSpan.style.color = getUserColor(item.name);
                participantInfo.appendChild(nameSpan);

                // Dettagli HP e Status
                const detailsSpan = document.createElement('span');
                detailsSpan.className = 'turn-details';
                if(isGM) { // Input per GM
                    detailsSpan.innerHTML = `
                        <span class="turn-hp">
                           <input type="number" class="turn-hp-edit" data-name="${item.name}" value="${item.hp ?? ''}" placeholder="HP"> / 
                           <input type="number" class="turn-hp_max-edit" data-name="${item.name}" value="${item.hp_max ?? ''}" placeholder="Max">
                        </span>
                        <span class="turn-status">
                           <input type="text" class="turn-status-edit" data-name="${item.name}" value="${item.status}" placeholder="Status">
                        </span>
                    `;
                } else { // Testo per Player
                     const hpText = (item.hp !== undefined && item.hp_max !== undefined) ? `${item.hp} / ${item.hp_max} HP` : (item.hp !== undefined ? `${item.hp} HP` : '');
                     const statusText = item.status ? `(${item.status})` : '';
                     detailsSpan.textContent = `${hpText} ${statusText}`.trim();
                }
                participantInfo.appendChild(detailsSpan);
                
                const controlsSpan = document.createElement('span');
                controlsSpan.className = 'turn-controls';
                
                if (isGM) {
                    const valueEl = document.createElement('input');
                    valueEl.type = 'number';
                    valueEl.className = 'turn-value-edit';
                    valueEl.value = item.value;
                    valueEl.dataset.name = item.name;
                    controlsSpan.appendChild(valueEl);
                    
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'turn-delete-btn';
                    deleteBtn.innerHTML = '<span class="icon-text"><i class="fa-solid fa-trash"></i></span>';
                    deleteBtn.dataset.name = item.name;
                    controlsSpan.appendChild(deleteBtn);
                } else {
                    const valueEl = document.createElement('span');
                    valueEl.className = 'turn-value-display';
                    valueEl.textContent = item.value;
                    controlsSpan.appendChild(valueEl);
                }
                
                li.appendChild(participantInfo);
                li.appendChild(controlsSpan);
                turnOrderList.appendChild(li);
            });
        }
        
        turnOrderRef.on('value', (snapshot) => {
            turnOrderCache = snapshot.val() || {};
            renderTurnOrderList();
        });
        
        turnOrderList.addEventListener('click', (e) => {
            if (e.target.classList.contains('turn-delete-btn')) {
                const name = e.target.dataset.name;
                if (name && window.confirm(`Rimuovere ${name} dalla lista?`)) {
                    turnOrderRef.child(name).set(null);
                }
            }
        });
        
       turnOrderList.addEventListener('change', (e) => {
             const name = e.target.dataset.name;
             if (!name) return;
             
             if (e.target.classList.contains('turn-value-edit')) {
                 const newValue = parseInt(e.target.value);
                 if (!isNaN(newValue)) turnOrderRef.child(name).update({ value: newValue });
             } else if (e.target.classList.contains('turn-hp-edit')) {
                  const newValue = parseInt(e.target.value);
                 if (!isNaN(newValue)) turnOrderRef.child(name).update({ hp: newValue });
             } else if (e.target.classList.contains('turn-hp_max-edit')) {
                  const newValue = parseInt(e.target.value);
                 if (!isNaN(newValue)) turnOrderRef.child(name).update({ hp_max: newValue });
             } else if (e.target.classList.contains('turn-status-edit')) {
                  turnOrderRef.child(name).update({ status: e.target.value });
             }
        });
        
        addNpcTurnBtn.addEventListener('click', () => {
            const name = npcNameInput.value.trim();
            const value = parseInt(npcValueInput.value);
            if (name && !isNaN(value)) {
                turnOrderRef.child(name).set({ value: value, isPlayer: false });
                npcNameInput.value = '';
            }
        });
        
        nextTurnBtn.addEventListener('click', () => {
            turnCounterRef.transaction((current) => (current || 0) + 1);
            
            // Logica avanzamento turno
            const sortedList = Object.entries(turnOrderCache)
                .map(([name, data]) => ({ name, value: data.value }))
                .sort((a, b) => b.value - a.value);
            
            if (sortedList.length === 0) return; // Non fare nulla se la lista è vuota
            
            let currentIndex = sortedList.findIndex(item => item.name === currentTurnName);
            let nextIndex = (currentIndex + 1) % sortedList.length;
            
            database.ref('currentTurnName').set(sortedList[nextIndex].name);
        });
        
        resetTurnBtn.addEventListener('click', () => {
            if(window.confirm('Resettare il contatore turni a 1?')) {
                turnCounterRef.set(1);
            }
        });
        
        resetValuesBtn.addEventListener('click', () => {
            if (window.confirm('Sei sicuro di voler AZZERARE i valori di turno di tutti i partecipanti?')) {
                turnOrderRef.once('value', (snapshot) => {
                    const updates = {};
                    snapshot.forEach(child => {
                        updates[child.key + '/value'] = 0;
                    });
                    turnOrderRef.update(updates);
                });
            }
        });
        
        // Sostituisci il blocco 1118-1146 con questo:
        drawingToolRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                currentDrawingTool = e.target.value;

                let canDrag = true;
                let cursorStyle = 'grab'; // Default (modalità 'select')

                switch(currentDrawingTool) {
                    case 'ruler':
                        canDrag = false;
                        cursorStyle = 'crosshair';
                        break;
                    case 'ping':
                        canDrag = false;
                        cursorStyle = 'pointer';
                        break;
                    case 'freehand':
                    case 'rect':
                    case 'circle':
                        if (isGM) { // Solo il GM disabilita il pan per disegnare
                            canDrag = false;
                            cursorStyle = 'crosshair';
                        }
                        // Se non è GM, si applicano i valori di default (può fare pan)
                        break;
                }

                if (stage) stage.draggable(canDrag);
                vttContainer.style.cursor = cursorStyle;

                // Logica di pulizia (invariata)
                if (currentDrawingTool !== 'ruler' && measurementLine) {
                    measurementLine.destroy(); measurementText.destroy(); tempLayer.batchDraw();
                    measurementLine = null; measurementText = null; isDrawing = false;
                }
                if (currentDrawingTool === 'select' && currentShape) {
                    currentShape.destroy(); drawingLayer.batchDraw(); currentShape = null; isDrawing = false;
                }
            });
        });

        clearDrawingsBtn.addEventListener('click', () => {
             if (isGM && window.confirm('Sei sicuro di voler CANCELLARE TUTTI i disegni sulla mappa?')) {
                  vttDrawingsRef.set(null); // Cancella tutti i disegni da Firebase
             }
        });

        saveGridScaleBtn.addEventListener('click', () => {
            if (!isGM) return;
            const scale = parseFloat(gridScaleInput.value);
            const unit = gridUnitInput.value.trim() || 'm';
            if (!isNaN(scale) && scale > 0) {
                 vttConfigRef.update({ gridScale: scale, gridUnit: unit });
            } else {
                 alert("Inserisci un valore numerico valido maggiore di 0 per la scala.");
            }
        });

        // --- 6. LOGICA DI INVIO ---
        
        function checkNome() {
            if (!userName) {
                alert('Devi prima impostare il tuo nome!');
                nomeInput.focus();
                return false;
            }
            return true;
        }

        function getVisibility() {
            return document.querySelector('input[name="visibility"]:checked').value;
        }

        function updateReplyUI() {
            if (currentReply) {
                // Tronca il testo citato per sicurezza
                const snippet = currentReply.testo.length > 40 ? currentReply.testo.substring(0, 40) + '...' : currentReply.testo;
                replyContextText.textContent = `"${snippet}"`;
                replyContextText.previousElementSibling.textContent = `Rispondi a: ${currentReply.nome}`;
                replyContextBar.style.display = 'flex';
                chatMessageInput.focus();
            } else {
                replyContextBar.style.display = 'none';
            }
        }

        cancelReplyBtn.addEventListener('click', () => {
            currentReply = null;
            updateReplyUI();
        });

        requestGmBtn.addEventListener('click', () => {
            if (!checkNome()) return;
            if (window.confirm(`Vuoi davvero inviare una richiesta per diventare GM? Il GM attuale (${gmName}) dovrà approvare.`)) {
                gmRequestRef.set({ from: userName });
                alert('Richiesta inviata.');
            }
        });

        sendMessageBtn.addEventListener('click', () => {
            if (!checkNome()) return;
            const testo = chatMessageInput.value.trim();
            if (testo) {
                // Prepara il messaggio base
                const newMessage = {
                    nome: userName,
                    type: 'text',
                    testo: testo,
                    visibility: getVisibility(),
                    timestamp: Date.now()
                };

                // Aggiungi dati di risposta se esistono
                if (currentReply) {
                    newMessage.replyTo = {
                        nome: currentReply.nome,
                        // Salva uno snippet del testo originale
                        testo: currentReply.testo.length > 50 ? currentReply.testo.substring(0, 50) + '...' : currentReply.testo
                    };
                    currentReply = null; // Resetta
                    updateReplyUI(); // Nascondi la barra
                }

                chatRef.push(newMessage);
                chatMessageInput.value = '';
            }
        });
        chatMessageInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessageBtn.click());

        function handleRoll(comando) {
            if (!checkNome()) return;
            if (!comando) return;
            
            const isTurnRoll = isTurnRollCheck.checked;
            let visibility = getVisibility();
            
            if (isTurnRoll && visibility !== 'public') {
                alert('I tiri per il turno devono essere pubblici.');
                document.querySelector('input[name="visibility"][value="public"]').checked = true;
                visibility = 'public';
            }
            
            const result = lanciaDadi(comando);
            
            chatRef.push({
                nome: userName,
                type: 'roll',
                testo: result.text,
                visibility: visibility,
                timestamp: Date.now()
            });
            
            if (isTurnRoll) {
                turnOrderRef.child(userName).set({
                    value: result.finalValue,
                    isPlayer: true
                });
                isTurnRollCheck.checked = false;
            }
        }
        
        rollBuilderBtn.addEventListener('click', () => {
            const qty = diceQty.value || 1;
            const faces = diceFaces.value;
            let mod = parseInt(diceMod.value) || 0;
            let modString = mod > 0 ? `+${mod}` : (mod < 0 ? `${mod}` : '');
            const comando = `${qty}d${faces}${modString}`;
            handleRoll(comando);
        });

        rollCustomBtn.addEventListener('click', () => {
            const comando = customCommandInput.value.trim();
            handleRoll(comando);
            customCommandInput.value = '';
        });
        customCommandInput.addEventListener('keypress', (e) => e.key === 'Enter' && rollCustomBtn.click());

        vttSetMapBtn.addEventListener('click', () => {
             if (!isGM) return;
             const url = vttMapUrlInput.value.trim();
             vttMapRef.update({ backgroundUrl: url || null }); // Salva URL o null
        });
        
        vttAddTokenBtn.addEventListener('click', () => {
             if (!isGM) return;
             const name = vttTokenNameInput.value.trim();
             const color = vttTokenColorInput.value;
             const owner = vttTokenOwnerSelect.value || null;
             const imageUrl = vttTokenUrlInput.value.trim() || null; // Leggi URL immagine
             
             if (name) {
                 tokenToAdd = { name, color, owner, imageUrl }; // Salva anche imageUrl
                 vttContainer.style.cursor = 'crosshair';
                 alert('Clicca sulla mappa per posizionare il token.');
                 // Resetta campi (opzionale)
                 vttTokenNameInput.value = '';
                 vttTokenUrlInput.value = '';
             } else {
                 alert('Inserisci almeno un nome per il token.');
             }
        });

        // --- 7. AMMINISTRAZIONE (Solo GM) ---
        
        function massDelete(query) {
            query.once('value', (snapshot) => {
                const updates = {};
                snapshot.forEach(child => {
                    updates[child.key] = null;
                });
                chatRef.update(updates)
                    .then(() => alert('Cancellazione completata.'))
                    .catch((e) => alert('Errore: ' + e.message));
            });
        }
        
        deleteTextsBtn.addEventListener('click', () => {
            if (window.confirm('SEI SICURO? Questo cancellerà TUTTI i messaggi di chat (anche privati) per SEMPRE.')) {
                massDelete(chatRef.orderByChild('type').equalTo('text'));
            }
        });
        
        deleteRollsBtn.addEventListener('click', () => {
             if (window.confirm('SEI SICURO? Questo cancellerà TUTTI i tiri (anche privati) per SEMPRE.')) {
                massDelete(chatRef.orderByChild('type').equalTo('roll'));
            }
        });
        
        abdicateGmBtn.addEventListener('click', () => {
            if (window.confirm('Sei sicuro di voler cedere il ruolo di GM? Chiunque potrà prenderlo.')) {
                gmStatusRef.set(null);
            }
        });

        // --- 8. CRONOLOGIA LANCI ---

        function loadHistory() {
            if(window.historyListener) {
                window.historyListener.off();
            }
            historyPanel.innerHTML = 'Caricamento...';
            window.historyListener = chatRef.orderByChild('type').equalTo('roll').limitToLast(100);
            
            window.historyListener.once('value', (snapshot) => {
                const data = snapshot.val();
                if (!data) {
                    historyPanel.innerHTML = 'Nessun lancio pubblico trovato.';
                    return;
                }
                historyPanel.innerHTML = '';
                Object.values(data).filter(msg => msg.visibility === 'public')
                   .sort((a, b) => a.timestamp - b.timestamp)
                   .forEach(msg => {
                        const div = document.createElement('div');
                        div.textContent = `[${formatTimestamp(msg.timestamp)}] ${msg.nome}: ${msg.testo}`;
                        historyPanel.appendChild(div);
                   });
                historyPanel.scrollTop = historyPanel.scrollHeight;
            });
        }

})();