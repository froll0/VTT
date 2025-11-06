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
    const storage = firebase.storage();
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
    const scenesRef = database.ref('scenes');
    const vttStateRef = database.ref('vtt_state');
    const vttPingsRef = vttStateRef.child('pings');

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
    const deleteTextsBtn = document.getElementById('delete-texts-btn');
    const deleteRollsBtn = document.getElementById('delete-rolls-btn');
    const abdicateGmBtn = document.getElementById('abdicate-gm-btn');
    const clearLocalBtn = document.getElementById('clear-local-btn');
    const userColorInput = document.getElementById('user-color');
    const saveColorBtn = document.getElementById('save-color');
    const turnOrderList = document.getElementById('turn-order-list');
    const npcNameInput = document.getElementById('npc-name');
    const npcValueInput = document.getElementById('npc-value');
    const addNpcTurnBtn = document.getElementById('add-npc-turn');

    const presenceList = document.getElementById('presence-list');
    const turnCounterEl = document.getElementById('turn-counter');
    const nextTurnBtn = document.getElementById('next-turn-btn');
    const resetTurnBtn = document.getElementById('reset-turn-btn');
    const resetValuesBtn = document.getElementById('reset-values-btn');
    const pageBgColorInput = document.getElementById('page-bg-color');
    const savePageBgBtn = document.getElementById('save-page-bg');
    const chatBgColorInput = document.getElementById('chat-bg-color');
    const saveChatBgBtn = document.getElementById('save-chat-bg');

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

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
    const vttMapFileInput = document.getElementById('vtt-map-file-input');
    const vttSetMapBtn = document.getElementById('vtt-set-map');
    const vttTokenNameInput = document.getElementById('vtt-token-name');
    const vttTokenColorInput = document.getElementById('vtt-token-color');
    const vttTokenOwnerSelect = document.getElementById('vtt-token-owner'); 
    const vttTokenUrlInput = document.getElementById('vtt-token-url');
    const vttAddTokenBtn = document.getElementById('vtt-add-token');
    const vttUploadTokenImageBtn = document.getElementById('vtt-upload-token-image-btn');
    const vttTokenFileInput = document.getElementById('vtt-token-file-input');
    const drawingToolRadios = document.querySelectorAll('input[name="vtt-tool"]'); // Cambiato name
    const drawingColorInput = document.getElementById('drawing-color');
    const drawingStrokeWidthInput = document.getElementById('drawing-stroke-width');
    const clearDrawingsBtn = document.getElementById('clear-drawings-btn');
    const gridScaleInput = document.getElementById('grid-scale');       // NUOVO Scala
    const gridUnitInput = document.getElementById('grid-unit');         // NUOVO Unità
    const vttZoomInBtn = document.getElementById('vtt-zoom-in');
    const vttZoomOutBtn = document.getElementById('vtt-zoom-out');
    const vttCenterViewBtn = document.getElementById('vtt-center-view');
    const vttToggleSidebarBtn = document.getElementById('vtt-toggle-sidebar');
    const vttUpdateGridBtn = document.getElementById('vtt-update-grid-btn'); // <-- [NUOVO] (Sostituisce il precedente)
    const worldWidthInput = document.getElementById('world-width'); // <-- [NUOVO]
    const worldHeightInput = document.getElementById('world-height'); // <-- [NUOVO]
    const sceneSelect = document.getElementById('scene-select'); // <-- [NUOVO]
    const sceneActivateBtn = document.getElementById('scene-activate-btn'); // <-- [NUOVO]
    const sceneCreateBtn = document.getElementById('scene-create-btn'); // <-- [NUOVO]
    const sceneDeleteBtn = document.getElementById('scene-delete-btn'); // <-- [NUOVO]
    const vttGmPanelBtn = document.getElementById('vtt-gm-panel-btn');
    const gmPanelModal = document.getElementById('gm-panel-modal');
    const gmPanelCloseBtn = document.getElementById('gm-panel-close-btn');
    const gmTabButtons = document.querySelectorAll('.gm-tab-button');
    const gmTabPanes = document.querySelectorAll('.gm-tab-pane');
    const editTokenModal = document.getElementById('edit-token-modal');
    const editTokenCloseBtn = document.getElementById('edit-token-close-btn');
    const editTokenSaveBtn = document.getElementById('edit-token-save-btn');
    const editTokenDeleteBtn = document.getElementById('edit-token-delete-btn');
    const editTokenName = document.getElementById('edit-token-name');
    const editTokenUrl = document.getElementById('edit-token-url');
    const editTokenColor = document.getElementById('edit-token-color');
    const editTokenOwner = document.getElementById('edit-token-owner');

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
    let lastMessageTime = 0; // Timestamp dell'ultimo messaggio inviato
    const MESSAGE_COOLDOWN = 1000; // Tempo minimo in ms (1000 = 1 secondo)

    let activeSceneId = null;
    let currentSceneConfig = {}; // Cache per la config della scena attiva
    let worldDimensions = { width: 8000, height: 6000 }; // Valori di default
    let scenesCache = {}; // Cache per i nomi delle scene
    // Riferimenti dinamici che cambieranno con la scena
    let activeConfigRef = null;
    let activeTokensRef = null;
    let activeDrawingsRef = null;
    let currentEditingTokenId = null;

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
        const strokeWidth = Math.max(0.5, 1 / scale);
        if (size * scale < 4) return;

        const worldWidth = worldDimensions.width;
        const worldHeight = worldDimensions.height;

        for (let i = 0; i <= worldWidth; i += size) {
            gridLayer.add(new Konva.Line({
                points: [i, 0, i, worldHeight], // Modificato
                stroke: gridOptions.color,
                strokeWidth: strokeWidth,
                listening: false
            }));
        }
        for (let j = 0; j <= worldHeight; j += size) {
            gridLayer.add(new Konva.Line({
                points: [0, j, worldWidth, j], // Modificato
                stroke: gridOptions.color,
                strokeWidth: strokeWidth,
                listening: false
            }));
        }
        gridLayer.batchDraw();
    }

    function loadMapBackground(url) {
        currentMapUrl = url;
        if (!mapLayer || !stage) return;
        mapLayer.destroyChildren();

        if (!url) {
            stage.batchDraw();
            return;
        }

        Konva.Image.fromURL(url, (img) => {
            img.setAttrs({
                x: 0,
                y: 0,
                width: worldDimensions.width,
                height: worldDimensions.height,
                listening: false
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
                id: tokenId, x: tokenX, y: tokenY, draggable: canDrag
            });

            tokenShape.on('dragmove.snap', () => {
                // Prendi la posizione REALE del mouse nel mondo
                const pos = stage.getRelativePointerPosition();
                if (!pos) return;

                // Calcola il centro della cella più vicina al mouse
                const halfGrid = gridOptions.size / 2;
                let snapX = Math.floor(pos.x / gridOptions.size) * gridOptions.size + halfGrid;
                let snapY = Math.floor(pos.y / gridOptions.size) * gridOptions.size + halfGrid;

                snapX = Math.max(halfGrid, Math.min(worldDimensions.width - halfGrid, snapX));
                snapY = Math.max(halfGrid, Math.min(worldDimensions.height - halfGrid, snapY));

                // Forza il token su quel centro
                tokenShape.position({ x: snapX, y: snapY });
            });

            // Decide se creare Immagine o Cerchio
            if (tokenData.imageUrl) {
                Konva.Image.fromURL(tokenData.imageUrl, (img) => {
                    img.setAttrs({
                        name: 'tokenImage',
                        // --- [MODIFICA] x/y a 0, usa offsetX/Y per centrare l'immagine sul gruppo ---
                        x: 0, 
                        y: 0,
                        width: tokenSize, height: tokenSize,
                        offsetX: tokenSize / 2, // Sposta il centro dell'immagine (a tokenSize/2) su x=0
                        offsetY: tokenSize / 2, // Sposta il centro dell'immagine (a tokenSize/2) su y=0
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
            const text = new Konva.Text({
                name: 'tokenText',
                listening: false
            });
            updateTokenText(text, tokenData, halfGrid, gridOptions.size);
            tokenShape.add(text);

            // Eventi (invariati)
            // Salva la posizione quando il token viene spostato
            tokenShape.on('dragend', () => {
                if(canDrag && activeTokensRef) {
                    const newPos = tokenShape.position();
                    activeTokensRef.child(tokenId).update({ x: newPos.x, y: newPos.y });
                }
            });

            // Elimina il token con doppio click (solo GM)
            if (isGM) {
                tokenShape.on('dblclick dbltap', () => {
                    currentEditingTokenId = tokenId; // Salva l'ID del token che stiamo modificando

                    // Popola il modale
                    editTokenName.value = tokenData.name;
                    editTokenUrl.value = tokenData.imageUrl || '';
                    editTokenColor.value = tokenData.color || '#ff0000';

                    // Ricrea le opzioni del proprietario (come in renderPresenceList)
                    editTokenOwner.innerHTML = vttTokenOwnerSelect.innerHTML; 
                    editTokenOwner.value = tokenData.owner || '';

                    editTokenModal.classList.add('is-visible');
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
                        x: 0, 
                        y: 0,
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
                updateTokenText(text, tokenData, halfGrid, gridOptions.size);
            }
        }
        tokenLayer.batchDraw();
    }

    function addFallbackCircle(group, tokenData, tokenSize, isMyToken) {
        group.add(new Konva.Circle({
            name: 'tokenCircle', 
            x: 0,
            y: 0,
            radius: tokenSize / 2, 
            fill: tokenData.color || '#ff0000',
            stroke: isMyToken ? 'var(--colore-primario)' : 'black',
            strokeWidth: isMyToken ? 3 : 1,
        }));
    }

    function updateTokenText(textNode, tokenData, halfGrid, gridSize) {
        textNode.text(tokenData.name || '');
        textNode.x(-halfGrid);
        textNode.y(halfGrid + 2);
        textNode.width(gridSize);
        textNode.fontSize(11);
        textNode.fill('#000000');
        textNode.align('center');
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

            switch (shapeData.type) {
                case 'freehand':
                    shape = new Konva.Line({ ...commonAttrs, points: shapeData.points, tension: 0.5 });
                    break;
                case 'rect':
                    shape = new Konva.Rect({ ...commonAttrs, x: shapeData.x, y: shapeData.y, width: shapeData.width, height: shapeData.height });
                    break;
                case 'circle':
                        shape = new Konva.Circle({ ...commonAttrs, x: shapeData.x, y: shapeData.y, radius: shapeData.radius });
                        break;
                case 'text':
                    shape = new Konva.Text({
                        ...commonAttrs,
                        x: shapeData.x,
                        y: shapeData.y,
                        text: shapeData.text,
                        fontSize: shapeData.fontSize || 24,
                        fill: shapeData.color || '#000000',
                        draggable: true // Rendiamo il testo trascinabile
                    });

                    shape.on('dragend', () => {
                        if (activeDrawingsRef) {
                            activeDrawingsRef.child(shapeId).update({ x: shape.x(), y: shape.y() });
                        }
                    });
                    break;
                default:
                    console.warn("Tipo forma non riconosciuto:", shapeData.type);
                    return;
            }

            // Evento doppio click per eliminare (solo GM)
            if (isGM) {
                shape.on('dblclick dbltap', () => {
                    if (window.confirm('Eliminare questo disegno?')) {
                        if (activeDrawingsRef) activeDrawingsRef.child(shapeId).remove();
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
        
        const dynamicMinScale = Math.min(
            stage.width() / worldDimensions.width,
            stage.height() / worldDimensions.height
        )

        newScale = Math.max(dynamicMinScale, Math.min(maxScale, newScale));

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

    function initializeVTT() {
        const containerWidth = vttContainer.offsetWidth;
        const containerHeight = vttContainer.offsetHeight;

        if (stage) {
            stage.size({ width: containerWidth, height: containerHeight });
            // Ricarica la mappa con le dimensioni corrette
            loadMapBackground(currentMapUrl);
            drawGrid();
            constrainStageDrag(); // Ricalcola i bordi
            return;
        }

        stage = new Konva.Stage({
            container: 'vtt-container',
            width: containerWidth,
            height: containerHeight,
            draggable: true
        });

        mapLayer = new Konva.Layer();
        gridLayer = new Konva.Layer({});
        drawingLayer = new Konva.Layer();
        tokenLayer = new Konva.Layer();
        tempLayer = new Konva.Layer();
        stage.add(mapLayer, gridLayer, drawingLayer, tokenLayer, tempLayer);

        drawGrid(); // Disegna la griglia iniziale (vuota)
        constrainStageDrag(); // Applica i vincoli iniziali

        stage.on('click tap', (e) => {
            if (e.target !== stage) { // Click su un token/disegno, non sullo stage
                if (tokenToAdd) { // Resetta aggiunta token se si clicca altrove
                    tokenToAdd = null;
                    vttContainer.style.cursor = 'default';
                }
                return; 
            }

            const pos = stage.getRelativePointerPosition();

            if (isGM && tokenToAdd) {
                const halfGrid = gridOptions.size / 2;
                const x = Math.floor(pos.x / gridOptions.size) * gridOptions.size + halfGrid;
                const y = Math.floor(pos.y / gridOptions.size) * gridOptions.size + halfGrid;

                const owner = vttTokenOwnerSelect.value || null;

                if (activeTokensRef) {
                    // Usa il riferimento alla scena attiva
                    activeTokensRef.push({
                        name: tokenToAdd.name,
                        color: tokenToAdd.color,
                        imageUrl: tokenToAdd.imageUrl,
                        x: x,
                        y: y,
                        owner: owner
                    });
                } else {
                    console.error("Nessuna scena attiva per salvare il token.");
                }

                tokenToAdd = null;
                vttContainer.style.cursor = 'default';

            } else if (currentDrawingTool === 'ping') { // Logica Ping (Tutti)
                if (checkNome()) { // Solo se loggato
                    vttPingsRef.push({ x: pos.x, y: pos.y, timestamp: Date.now(), pinger: userName });
                }
            } else if (currentDrawingTool === 'text' && isGM) {
                const textContent = prompt("Inserisci il testo da aggiungere:", "Testo");
                if (textContent && activeDrawingsRef) {
                    const textData = {
                        type: 'text',
                        x: pos.x,
                        y: pos.y,
                        text: textContent,
                        color: drawingColorInput.value,
                        fontSize: 24 // Puoi renderlo un input nell'UI
                    };
                    activeDrawingsRef.push(textData);
                }
                // Resetta lo strumento su 'select' dopo aver aggiunto il testo
                document.querySelector('input[name="vtt-tool"][value="select"]').checked = true;
                drawingToolRadios[0].dispatchEvent(new Event('change')); // Simula il click
            }
        });

        stage.on('mousedown touchstart', (e) => {
            if (e.target !== stage) { isDrawing = false; return; } // Ignora se si clicca su token/disegno

            if (currentDrawingTool === 'select') { isDrawing = false; return; }

            isDrawing = true;
            startPoint = stage.getRelativePointerPosition();
            const color = drawingColorInput.value;
            const strokeWidth = parseInt(drawingStrokeWidthInput.value) || 2;

            if (isGM && (currentDrawingTool === 'rect' || currentDrawingTool === 'circle')) {
                startPoint.x = Math.round(startPoint.x / gridOptions.size) * gridOptions.size;
                startPoint.y = Math.round(startPoint.y / gridOptions.size) * gridOptions.size;
            }

            // Crea forma temporanea (o linea di misura)
            if (currentDrawingTool === 'ruler') {
                // 'startPoint' (impostato poche righe sopra) è il click esatto.

                // 1. Calcola il centro della cella cliccata
                const halfGrid = gridOptions.size / 2;
                const snapX = Math.floor(startPoint.x / gridOptions.size) * gridOptions.size + halfGrid;
                const snapY = Math.floor(startPoint.y / gridOptions.size) * gridOptions.size + halfGrid;

                // 2. Sovrascrivi startPoint con la posizione centrata.
                // In questo modo, il 'mousemove' leggerà questo come punto di origine.
                startPoint = { x: snapX, y: snapY };

                // 3. Crea la linea e il testo usando il nuovo startPoint centrato
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
            let pos = stage.getRelativePointerPosition();

            if (isGM && (currentDrawingTool === 'rect' || currentDrawingTool === 'circle')) {
                pos.x = Math.round(pos.x / gridOptions.size) * gridOptions.size;
                pos.y = Math.round(pos.y / gridOptions.size) * gridOptions.size;
            }

            if (currentDrawingTool === 'ruler' && measurementLine) {
                // 1. Calcola il centro della cella di destinazione
                const halfGrid = gridOptions.size / 2;
                const snapX = Math.floor(pos.x / gridOptions.size) * gridOptions.size + halfGrid;
                const snapY = Math.floor(pos.y / gridOptions.size) * gridOptions.size + halfGrid;

                measurementLine.points([startPoint.x, startPoint.y, snapX, snapY]);
                
                // --- [MODIFICA] Calcolo distanza TTRPG (Regola D&D 5e) ---

                // 1. Calcola la distanza in pixel sugli assi
                const dx_pixels = Math.abs(snapX - startPoint.x);
                const dy_pixels = Math.abs(snapY - startPoint.y);

                // 2. Converti in numero di caselle (arrotonda per sicurezza)
                const dx_squares = Math.round(dx_pixels / gridOptions.size);
                const dy_squares = Math.round(dy_pixels / gridOptions.size);

                // 3. La distanza è il numero maggiore tra i due (Regola D&D 5e)
                const gridDistance = Math.max(dx_squares, dy_squares);

                // 4. Moltiplica per la scala (es. 3 caselle * 1.5m = 4.5m)
                const realDistance = gridDistance * gridScale;

                measurementText.text(realDistance.toFixed(1) + ' ' + gridUnit);
                measurementText.position({ x: pos.x + 5, y: pos.y + 5 });
                tempLayer.batchDraw();
            } else if (isGM && currentShape) { // Disegno GM
                switch(currentDrawingTool) {
                    case 'freehand':
                        const freehandPos = stage.getRelativePointerPosition(); // Rileggi la pos esatta
                        const newPoints = currentShape.points().concat([freehandPos.x, freehandPos.y]);
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

                if (activeDrawingsRef) {
                    // Usa il riferimento alla scena attiva
                    activeDrawingsRef.push(shapeData);
                } else {
                    console.error("Nessuna scena attiva per salvare il disegno.");
                }

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
            zoomStage(direction, pointer);
            constrainStageDrag()
        });

        window.addEventListener('resize', () => {
            requestAnimationFrame(() => {
                if (stage && vttContainer) {
                    const newWidth = vttContainer.offsetWidth;
                    const newHeight = vttContainer.offsetHeight;
                    if (newWidth > 0 && newHeight > 0) {
                        stage.size({ width: newWidth, height: newHeight });

                        if (gridLayer) drawGrid();
                        if (mapLayer) loadMapBackground(currentMapUrl); 

                        constrainStageDrag();
                    }
                }
            });
        });

        vttZoomInBtn.addEventListener('click', () => {
            zoomStage(1, null);
            constrainStageDrag();
        });
        vttZoomOutBtn.addEventListener('click', () => {
            zoomStage(-1, null);
            constrainStageDrag();
        });
        vttCenterViewBtn.addEventListener('click', () => {
            fitMapToView();
        });
    }

    function constrainStageDrag() {
        if (!stage) return;

        stage.dragBoundFunc((pos) => {
            const scale = stage.scaleX();
            const viewW = stage.width();
            const viewH = stage.height();

            // Calcola i limiti del mondo scalati
            const worldW = worldDimensions.width * scale;
            const worldH = worldDimensions.height * scale;

            let newX, newY;

            // --- [FIX] Logica Asse X ---
            if (worldW < viewW) {
                // Se il mondo è PIÙ PICCOLO della vista, centralo
                newX = (viewW - worldW) / 2;
            } else {
                // Altrimenti, vincola i bordi
                newX = Math.max(pos.x, viewW - worldW); // Vincola bordo sinistro
                newX = Math.min(newX, 0); // Vincola bordo destro
            }

            // --- [FIX] Logica Asse Y ---
            if (worldH < viewH) {
                // Se il mondo è PIÙ PICCOLO della vista, centralo
                newY = (viewH - worldH) / 2;
            } else {
                // Altrimenti, vincola i bordi
                newY = Math.max(pos.y, viewH - worldH); // Vincola bordo superiore
                newY = Math.min(newY, 0); // Vincola bordo inferiore
            }

            return { x: newX, y: newY };
        });
    }

    function fitMapToView() {
        if (!stage) return;

        // 1. Calcola la scala minima per "contenere" la mappa
        const fitScale = Math.min(
            stage.width() / worldDimensions.width,
            stage.height() / worldDimensions.height
        );

        // 2. Calcola la posizione per centrare la mappa
        const newX = (stage.width() - (worldDimensions.width * fitScale)) / 2;
        const newY = (stage.height() - (worldDimensions.height * fitScale)) / 2;

        // 3. Applica scala e posizione
        stage.scale({ x: fitScale, y: fitScale });
        stage.position({ x: newX, y: newY });

        // 4. Ridisegna e aggiorna i vincoli di drag
        stage.batchDraw();
        drawGrid(); 
        constrainStageDrag();
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
                        document.body.classList.add('is-gm');
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

        const sidebarIsCollapsed = localStorage.getItem('sidebarCollapsed') !== 'false';

        mainContent.style.transition = 'none';
        const icon = vttToggleSidebarBtn.querySelector('i');

        if (sidebarIsCollapsed) {
            mainContent.classList.add('sidebar-collapsed');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
            vttToggleSidebarBtn.title = "Mostra sidebar";
        } else {
            mainContent.classList.remove('sidebar-collapsed');
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
            vttToggleSidebarBtn.title = "Nascondi sidebar";
        }

        mainContent.offsetHeight;
        mainContent.style.transition = '';

        if (isGM) {
            document.body.classList.add('is-gm');
        }

        initializeVTT();
        startSceneListeners();
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
        }

        const savedTool = localStorage.getItem('vttActiveTool') || 'select';
        const toolRadio = document.querySelector(`input[name="vtt-tool"][value="${savedTool}"]`);
        if (toolRadio) {
            toolRadio.checked = true;
            toolRadio.dispatchEvent(new Event('change')); // Forza l'aggiornamento
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

    vttToggleSidebarBtn.addEventListener('click', () => {
        const appContainer = document.getElementById('main-content');
        const icon = vttToggleSidebarBtn.querySelector('i');

        // Attiva/disattiva la classe sul contenitore principale
        appContainer.classList.toggle('sidebar-collapsed');

        localStorage.setItem('sidebarCollapsed', appContainer.classList.contains('sidebar-collapsed'));

        // Cambia l'icona del pulsante
        if (appContainer.classList.contains('sidebar-collapsed')) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
            vttToggleSidebarBtn.title = "Mostra Sidebar";
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
            vttToggleSidebarBtn.title = "Nascondi Sidebar";
        }

        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 310); // 310ms (appena dopo la fine della transizione di 0.3s)
    });

    gmTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            gmTabButtons.forEach(btn => btn.classList.remove('active'));
            gmTabPanes.forEach(pane => pane.classList.remove('active'));

            button.classList.add('active');
            const tabId = button.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });

    vttGmPanelBtn.addEventListener('click', () => {
        gmPanelModal.classList.add('is-visible');
    });

    gmPanelCloseBtn.addEventListener('click', () => {
        gmPanelModal.classList.remove('is-visible');
    });

    gmPanelModal.addEventListener('click', (e) => {
        if (e.target === gmPanelModal) { 
            gmPanelModal.classList.remove('is-visible');
        }
    });

    function startSceneListeners() {
        // Listener per popolare il dropdown
        scenesRef.on('value', (snapshot) => {
            scenesCache = snapshot.val() || {};
            sceneSelect.innerHTML = ''; // Pulisci il dropdown

            if (Object.keys(scenesCache).length === 0) {
                sceneSelect.innerHTML = '<option value="">-- Crea una scena --</option>';
                return;
            }

            for (const [id, scene] of Object.entries(scenesCache)) {
                const option = document.createElement('option');
                option.value = id;
                option.textContent = scene.config?.name || 'Scena senza nome';
                if (id === activeSceneId) {
                    option.selected = true;
                }
                sceneSelect.appendChild(option);
            }
        });

        // Listener per cambiare scena
        vttStateRef.child('activeSceneId').on('value', (snapshot) => {
            const newSceneId = snapshot.val();

            if (activeSceneId === newSceneId) return; 

            if (activeConfigRef) activeConfigRef.off();
            if (activeTokensRef) activeTokensRef.off();
            if (activeDrawingsRef) activeDrawingsRef.off();

            if (mapLayer) mapLayer.destroyChildren();
            if (tokenLayer) tokenLayer.destroyChildren();
            if (drawingLayer) drawingLayer.destroyChildren();

            activeSceneId = newSceneId;
            if (sceneSelect.value !== newSceneId) sceneSelect.value = newSceneId; // Aggiorna UI

            if (!newSceneId) {
                currentSceneConfig = {};
                worldDimensions = { width: 8000, height: 6000 };
                loadMapBackground(null);
                drawGrid();
                fitMapToView();
                return;
            }

            activeConfigRef = scenesRef.child(newSceneId).child('config');
            activeTokensRef = scenesRef.child(newSceneId).child('tokens');
            activeDrawingsRef = scenesRef.child(newSceneId).child('drawings');

            activeConfigRef.on('value', (configSnap) => {
                currentSceneConfig = configSnap.val() || {};

                const gridW_squares = currentSceneConfig.gridWidth || 80;
                const gridH_squares = currentSceneConfig.gridHeight || 60;
                const squareSize = gridOptions.size;

                worldDimensions.width = gridW_squares * squareSize;
                worldDimensions.height = gridH_squares * squareSize;

                gridScale = currentSceneConfig.gridScale || 1.5;
                gridUnit = currentSceneConfig.gridUnit || 'm';

                if (isGM) {
                    gridScaleInput.value = gridScale;
                    gridUnitInput.value = gridUnit;
                    worldWidthInput.value = gridW_squares;
                    worldHeightInput.value = gridH_squares;
                }

                loadMapBackground(currentSceneConfig.backgroundUrl);
                drawGrid();
                fitMapToView();
            });

            activeTokensRef.on('child_added', (snap) => drawOrUpdateToken(snap.key, snap.val()));
            activeTokensRef.on('child_changed', (snap) => drawOrUpdateToken(snap.key, snap.val()));
            activeTokensRef.on('child_removed', (snap) => {
                if (stage) {
                    const token = stage.findOne('#' + snap.key);
                    if (token) token.destroy();
                }
            });

            activeDrawingsRef.on('child_added', (snap) => drawOrUpdateShape(snap.key, snap.val()));
            activeDrawingsRef.on('child_removed', (snap) => {
                if (stage) {
                    const shape = stage.findOne('#' + snap.key);
                    if (shape) shape.destroy();
                }
            });
        });
    }

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

    clearDrawingsBtn.addEventListener('click', () => {
        if (isGM && activeDrawingsRef && window.confirm('Sei sicuro di voler CANCELLARE TUTTI i disegni su QUESTA SCENA?')) {
            activeDrawingsRef.set(null); // Cancella solo i disegni della scena attiva
        } else if (!activeDrawingsRef) {
            alert("Nessuna scena attiva selezionata.");
        }
    });

    rollMacroBtn.addEventListener('click', () => {
        const command = macroSelect.value;
        if (command) {
            handleRoll(command);
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

        if (isGM) {
            setTimeout(() => vttPingsRef.child(snapshot.key).remove(), 5000);
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
                document.body.classList.add('is-gm');
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

    gmRequestModal.addEventListener('click', (e) => {
        if (e.target === gmRequestModal) {
            gmRequestRef.set(null); // Stessa logica di "rifiuta"
            gmRequestModal.classList.remove('is-visible');
        }
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

            localStorage.setItem('vttActiveTool', currentDrawingTool);

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
                case 'text':
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

    // Sostituisci il vecchio listener
    vttUpdateGridBtn.addEventListener('click', () => {
        if (!isGM || !activeConfigRef) return;

        const scale = parseFloat(gridScaleInput.value);
        const unit = gridUnitInput.value.trim() || 'm';
        const gridW_squares = parseInt(worldWidthInput.value) || 80;
        const gridH_squares = parseInt(worldHeightInput.value) || 60;

        if (scale > 0 && gridW_squares > 0 && gridH_squares > 0) {
            activeConfigRef.update({
                gridScale: scale,
                gridUnit: unit,
                gridWidth: gridW_squares,
                gridHeight: gridH_squares
            });
        } else {
            alert("Inserisci valori validi (maggiori di 0) per dimensioni e scala.");
        }
    });

    sceneCreateBtn.addEventListener('click', () => {
        if (!isGM) return;
        const sceneName = prompt("Inserisci il nome della nuova scena:");
        if (sceneName) {
            const newSceneRef = scenesRef.push({
                config: {
                    name: sceneName,
                    backgroundUrl: null,
                    gridWidth: 80,
                    gridHeight: 60,
                    gridScale: 1.5,
                    gridUnit: 'm'
                }
            });
            // Attiva automaticamente la nuova scena
            vttStateRef.child('activeSceneId').set(newSceneRef.key);
        }
    });

    sceneActivateBtn.addEventListener('click', () => {
        const selectedId = sceneSelect.value;
        if (selectedId) {
            vttStateRef.child('activeSceneId').set(selectedId);
        }
    });

    sceneDeleteBtn.addEventListener('click', () => {
        const sceneIdToDelete = activeSceneId; 

        // 2. Controlla la variabile locale
        if (!isGM || !sceneIdToDelete) { 
            alert("Nessuna scena attiva da eliminare.");
            return;
        }

        const sceneName = scenesCache[sceneIdToDelete]?.config?.name || 'Scena Sconosciuta';
        if (window.confirm(`Sei sicuro di voler eliminare per sempre la scena "${sceneName}"?`)) {
            // 3. Imposta la scena attiva a null
            vttStateRef.child('activeSceneId').set(null).then(() => {
                // 4. Usa la variabile locale (che è ancora "scena_123") per eliminare
                scenesRef.child(sceneIdToDelete).remove(); 
            });
        }
    });

    function closeEditTokenModal() {
        editTokenModal.classList.remove('is-visible');
        currentEditingTokenId = null;
    }

    editTokenCloseBtn.addEventListener('click', closeEditTokenModal);
    editTokenModal.addEventListener('click', (e) => {
        if(e.target === editTokenModal) closeEditTokenModal();
    });

    editTokenSaveBtn.addEventListener('click', () => {
        if (!currentEditingTokenId || !activeTokensRef) return;

        const updates = {
            name: editTokenName.value.trim(),
            imageUrl: editTokenUrl.value.trim() || null,
            color: editTokenColor.value,
            owner: editTokenOwner.value || null
        };

        activeTokensRef.child(currentEditingTokenId).update(updates);
        closeEditTokenModal();
    });

    editTokenDeleteBtn.addEventListener('click', () => {
        if (!currentEditingTokenId || !activeTokensRef) return;

        if (window.confirm(`Sei sicuro di voler eliminare questo token?`)) {
            activeTokensRef.child(currentEditingTokenId).remove();
            closeEditTokenModal();
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

        const now = Date.now();
        if (now - lastMessageTime < MESSAGE_COOLDOWN) {
            console.warn("Anti-spam: Messaggio bloccato.");
            return;
        }

        const testo = chatMessageInput.value.trim();
        if (testo) {
            lastMessageTime = now;

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

        const now = Date.now();
        if (now - lastMessageTime < MESSAGE_COOLDOWN) {
            console.warn("Anti-spam: Tiro bloccato.");
            return; // Blocca l'invio
        }
        lastMessageTime = now; // Aggiorna il timestamp

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
        if (!isGM || !activeConfigRef) { // Controlla il config ref
            alert("Nessuna scena attiva selezionata.");
            return;
        }

        const file = vttMapFileInput.files[0];

        if (!file) {
            alert('Per favore, seleziona un file immagine da caricare.');
            return;
        }

        // 1. (Opzionale) Controlla il tipo di file
        if (!file.type.startsWith('image/')) {
            alert('Puoi caricare solo file immagine (png, jpg, gif, webp).');
            return;
        }

        // 2. Disabilita il bottone per evitare doppi click
        vttSetMapBtn.disabled = true;
        vttSetMapBtn.textContent = 'Caricamento...';

        // 3. Crea un percorso univoco su Firebase Storage
        // Es: maps/167888654123-mia-mappa.jpg
        const filePath = `maps/${Date.now()}-${file.name}`;
        const fileRef = storage.ref(filePath);

        // 4. Avvia il caricamento
        const uploadTask = fileRef.put(file);

        // 5. Gestisci il completamento
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                vttSetMapBtn.textContent = `Caricamento... ${Math.round(progress)}%`;
            },
            (error) => {
                // Gestisci errore
                console.error("Errore caricamento mappa:", error);
                alert('Errore durante il caricamento della mappa.');
                vttSetMapBtn.disabled = false;
                vttSetMapBtn.textContent = 'Carica e Imposta Mappa';
            },
            () => {
                // Caricamento completato con successo
                fileRef.getDownloadURL().then((downloadURL) => {
                    // 6. [MODIFICA] Salva l'URL nella scena attiva
                    activeConfigRef.update({ backgroundUrl: downloadURL });

                    // 7. Resetta il bottone e l'input
                    vttSetMapBtn.disabled = false;
                    vttSetMapBtn.textContent = 'Carica e Imposta Mappa';
                    vttMapFileInput.value = '';
                });
            }
        );
    });

    vttAddTokenBtn.addEventListener('click', () => {
        if (!isGM || !activeTokensRef) {
            alert("Nessuna scena attiva selezionata.");
            return;
        }

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

    vttTokenUrlInput.addEventListener('dblclick', () => {
        vttTokenUrlInput.readOnly = false;
    });
    vttTokenUrlInput.addEventListener('blur', () => {
        vttTokenUrlInput.readOnly = true;
    });

    vttUploadTokenImageBtn.addEventListener('click', () => {
        vttTokenFileInput.click(); 
    });

    vttTokenFileInput.addEventListener('change', () => {
        if (!isGM) return;
        const file = vttTokenFileInput.files[0];
        if (!file || !file.type.startsWith('image/')) {
            alert('Seleziona un file immagine valido.');
            return;
        }

        // Mostra un feedback di caricamento
        const originalText = vttAddTokenBtn.textContent;
        vttAddTokenBtn.disabled = true;
        vttAddTokenBtn.textContent = 'Carico img...';

        const filePath = `tokens/${Date.now()}-${file.name}`;
        const fileRef = storage.ref(filePath);
        const uploadTask = fileRef.put(file);

        uploadTask.on('state_changed', 
            null, // Non serve il progress per i token piccoli
            (error) => {
                console.error("Errore caricamento token:", error);
                alert('Errore caricamento immagine token.');
                vttAddTokenBtn.disabled = false;
                vttAddTokenBtn.textContent = originalText;
            },
            () => {
                // Successo!
                fileRef.getDownloadURL().then((downloadURL) => {
                    // Incolla l'URL nel campo di testo
                    vttTokenUrlInput.value = downloadURL;
                    vttAddTokenBtn.disabled = false;
                    vttAddTokenBtn.textContent = originalText;
                    vttTokenFileInput.value = ''; // Resetta l'input file
                });
            }
        );
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