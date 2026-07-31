var streaming;
var local_status;
const buttonPause = '<svg xmlns="https://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-pause" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000" fill="#000" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /><path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /></svg>';
const buttonPlay = '<svg xmlns="https://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play-filled" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000" fill="#000" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" stroke-width="0" fill="currentColor" /></svg>';
const bigButtonPause = '<svg xmlns="https://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-pause" width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000" fill="#000" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /><path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /></svg>';
const bigButtonPlay = '<svg xmlns="https://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play" width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000" fill="#000" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 4v16l13 -8z" /></svg>';
const buttongLoading = '<img width="40" height="40" src="https://storage.googleapis.com/nrm-web/oye/recursos/loading-normal.gif" style="padding:5px;"/>';
const buttonPodcastPlay = '<svg xmlns="https://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play" width="80" height="80" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 4v16l13 -8z" /></svg>';
const buttonPodcastPause = '<svg xmlns="https://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-pause" width="80" height="80" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /><path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /></svg>';
var volume;
var artist;
var cancion;
var hora;
const radioButton = document.getElementById('radiobutton');
const player = document.getElementById('player');
const secchome = document.getElementById('home');

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function setHtml(selector, html, root = document) {
  qsa(selector, root).forEach((el) => { el.innerHTML = html; });
}

function addClass(selector, className, root = document) {
  qsa(selector, root).forEach((el) => el.classList.add(className));
}

function removeClass(selector, className, root = document) {
  qsa(selector, root).forEach((el) => el.classList.remove(className));
}

function setStyle(selector, property, value, root = document) {
  qsa(selector, root).forEach((el) => { el.style[property] = value; });
}

function setAttr(selector, attribute, value, root = document) {
  qsa(selector, root).forEach((el) => el.setAttribute(attribute, value));
}

const boundHandlers = new WeakMap();

function replaceEventListener(element, key, type, handler) {
  if (!element) return;
  const handlers = boundHandlers.get(element) || {};
  if (handlers[key]) {
    element.removeEventListener(type, handlers[key]);
  }
  handlers[key] = handler;
  boundHandlers.set(element, handlers);
  element.addEventListener(type, handler);
}

function initGPT() {
  googletag.cmd.push(function() {
    googletag.destroySlots();

    // Responsive mappings — addSize([viewport_w, viewport_h], [ad_w, ad_h])
    var mappingLeader      = googletag.sizeMapping().addSize([768, 0], [728,  90]).addSize([0, 0], [320, 50]).build();
    var mappingBox         = googletag.sizeMapping().addSize([0, 0],   [300, 250]).build();
    var mappingDoubleBox   = googletag.sizeMapping().addSize([0, 0],   [300, 600]).build();
    var mappingModal       = googletag.sizeMapping().addSize([600, 0], [600, 800]).addSize([0, 0], [320, 480]).build();
    var mappingVideoNota   = googletag.sizeMapping().addSize([0, 0], [400, 311]).build();

    window.slot3   = googletag.defineSlot("/23349147378/Sabrosita", [[728,  90], [320, 50]], 'ad-slot3').defineSizeMapping(mappingLeader).addService(googletag.pubads());
    window.slot4   = googletag.defineSlot("/23349147378/Sabrosita", [[728,  90], [320, 50]], 'ad-slot4').defineSizeMapping(mappingLeader).addService(googletag.pubads());
    window.slot32  = googletag.defineSlot("/23349147378/Sabrosita", [[728,  90], [320, 50]], 'ad-slot32').defineSizeMapping(mappingLeader).addService(googletag.pubads());
    window.slot42  = googletag.defineSlot("/23349147378/Sabrosita", [[728,  90], [320, 50]], 'ad-slot42').defineSizeMapping(mappingLeader).addService(googletag.pubads());
    window.slot6   = googletag.defineSlot("/23349147378/Sabrosita", [[728,  90], [320, 50]], 'ad-slot6').defineSizeMapping(mappingLeader).addService(googletag.pubads());
    window.slot2   = googletag.defineSlot("/23349147378/Sabrosita", [300, 250],              'ad-slot2').defineSizeMapping(mappingBox).addService(googletag.pubads());
    window.slot5   = googletag.defineSlot("/23349147378/Sabrosita", [300, 600],              'ad-slot5').defineSizeMapping(mappingDoubleBox).addService(googletag.pubads());
    window.slot14  = googletag.defineSlot("/23349147378/Sabrosita", [[600, 800], [320, 480]],'ad-slot14').defineSizeMapping(mappingModal).addService(googletag.pubads());
    window.slot201 = googletag.defineSlot("/23349147378/Sabrosita/Box",  [300, 250], 'ad-slot201').defineSizeMapping(mappingBox).addService(googletag.pubads());
    window.slot202 = googletag.defineSlot("/23349147378/Sabrosita/Box2", [300, 250], 'ad-slot202').defineSizeMapping(mappingBox).addService(googletag.pubads());
    window.slot203 = googletag.defineSlot("/23349147378/Sabrosita/Box3", [300, 250], 'ad-slot203').defineSizeMapping(mappingBox).addService(googletag.pubads());
    window.slot204 = googletag.defineSlot("/23349147378/Sabrosita/Box4", [300, 250], 'ad-slot204').defineSizeMapping(mappingBox).addService(googletag.pubads());
    window.slot205 = googletag.defineSlot("/23349147378/Sabrosita/Box5", [300, 250], 'ad-slot205').defineSizeMapping(mappingBox).addService(googletag.pubads());
    window.slotVideoNota = googletag.defineSlot("/23349147378/Sabrosita", [400, 311], 'ad-slot-videonota').defineSizeMapping(mappingVideoNota).addService(googletag.pubads());

    googletag.pubads().setTargeting("test", "responsive");
    googletag.enableServices();

    // Solo llamar display() si el div existe en el DOM de esta página
    ['ad-slot3','ad-slot4','ad-slot32','ad-slot42','ad-slot6','ad-slot2','ad-slot5','ad-slot14',
     'ad-slot201','ad-slot202','ad-slot203','ad-slot204','ad-slot205','ad-slot-videonota'].forEach(function(id) {
      if (document.getElementById(id)) googletag.display(id);
    });

    if (window._boxRefreshInterval) clearInterval(window._boxRefreshInterval);
    window._boxRefreshInterval = setInterval(function() {
      googletag.pubads().refresh([window.slot2]); 
      googletag.pubads().refresh([window.slot4]); 
    }, 120000);

    });
}


function safeRefreshSlots() {
    if (window.googletag && googletag.apiReady && googletag.pubads) {
      // Repite para cada slot, si tienes más
      if (window.slot14) googletag.pubads().refresh([window.slot14]);
      if (window.slot141) googletag.pubads().refresh([window.slot141]);
      if (window.slot2) googletag.pubads().refresh([window.slot2]);
      if (window.slot3) googletag.pubads().refresh([window.slot3]);
      if (window.slot31) googletag.pubads().refresh([window.slot31]);
      if (window.slot32) googletag.pubads().refresh([window.slot32]);
      if (window.slot321) googletag.pubads().refresh([window.slot321]);
      if (window.slot4) googletag.pubads().refresh([window.slot4]);
      if (window.slot41) googletag.pubads().refresh([window.slot41]);
      if (window.slot42) googletag.pubads().refresh([window.slot42]);
      if (window.slot421) googletag.pubads().refresh([window.slot421]);
      if (window.slot5) googletag.pubads().refresh([window.slot5]);
      if (window.slot6) googletag.pubads().refresh([window.slot6]);
      if (window.slot61) googletag.pubads().refresh([window.slot61]);
      if (window.slot201) googletag.pubads().refresh([window.slot201]);
      if (window.slot202) googletag.pubads().refresh([window.slot202]);
      if (window.slot203) googletag.pubads().refresh([window.slot203]);
      if (window.slot204) googletag.pubads().refresh([window.slot204]);
      if (window.slot205) googletag.pubads().refresh([window.slot205]);
      // O simplemente: googletag.pubads().refresh();
      console.log('Banners refrescados post navegación');
    } else {
      safeRefreshSlots(); // Intenta de nuevo después de un breve retraso);
    }
  }


//function initPlayer(){
    function initPlayerSDK(){
        var tdPlayerConfig = {
             coreModules: [{
               id: 'MediaPlayer',
               playerId: 'td_container' ,
               audioAdaptive: false,
               plugins: [ {id:"vastAd"}]
             }],
             // The callbacks are defined in your source code.
             playerReady: onPlayerReady,
             moduleError: onModuleError,
             audioAdaptive: true,
             analytics: {
                active: true,
                debug: false,
                appInstallerId: 'sabrositapag',            
                trackingId: 'G-8T59T6QN5S',
                trackingEvents: [ 'play', 'stop', 'pause', 'resume', 'all' ],
                sampleRate: 100,     
                category: 'Reproduccion Radio Pag' 
             }
            };
        // The call to loadModules() as been removed.
        streaming = new TDSdk( tdPlayerConfig );
        streaming.addEventListener( 'stream-status', getStatus );
        streaming.addEventListener( 'ad-playback-complete', completeAd );
        streaming.addEventListener( 'ad-playback-start', startAd );
        streaming.addEventListener( 'ad-playback-error', errorAd );
        streaming.addEventListener( 'ad-break-cue-point', adBreakCuePoint);
        streaming.addEventListener( 'autoplay', autoplay);
      }
    
     var musicInterval = null; // Agrega esto al inicio del archivo o cerca de lastArtist/lastSong

    function getStatus(s){
        local_status = s.data.code;
        const secchome = document.getElementById('home');                 
        if( local_status == 'GETTING_STATION_INFORMATION' || local_status == 'LIVE_CONNECTING' || local_status == 'LIVE_BUFFERING' ){
            /*document.getElementById('loading').classList.add('show');
            document.getElementById('loading').classList.remove('hide');*/
            document.getElementById('play-pause').classList.remove('show');
            document.getElementById('play-pause').classList.add('hide'); 
            document.getElementById('big-play').innerHTML = buttongLoading;    
            
         }
         if (local_status == 'LIVE_PLAYING'){                        
            document.getElementById('play-pause').innerHTML = buttonPause;
            /*document.getElementById('loading').classList.remove('show');
            document.getElementById('loading').classList.add('hide');*/
            document.getElementById('play-pause').classList.add('show');
            document.getElementById('play-pause').classList.remove('hide'); 
            document.getElementById('big-play').innerHTML = bigButtonPause;            
            setHtml('.text-player', '<div style="font-weight:bold;">Estás escuchando...</div><div id="infoMusic" style="line-height:11px; font-size:12px;"></div>');
            addClass('.text-player', 'playing');
            document.getElementById('radiobutton')?.classList.add('playerplaying');
            // Limpia cualquier intervalo anterior
            if (musicInterval) clearInterval(musicInterval);
            setTimeout(function(){
                getInfoMusic(); // Primera consulta inmediata
            }, 1000); // Espera 1 segundo antes de la primera consulta
            musicInterval = setInterval(getInfoMusic, 30000); // Intervalo solo cuando está LIVE_PLAYING
            
         }
         if(local_status == 'LIVE_STOP' || local_status == 'LIVE_PAUSE') {
            /*document.getElementById('loading').classList.remove('show');
            document.getElementById('loading').classList.add('hide');*/
            document.getElementById('play-pause').classList.add('show');
            document.getElementById('play-pause').classList.remove('hide'); 
            document.getElementById('play-pause').innerHTML = buttonPlay;            
            document.getElementById('big-play').innerHTML = bigButtonPlay; 
            removeClass('.text-player', 'playing');
            document.getElementById('radiobutton')?.classList.remove('playerplaying');
            setHtml('.text-player', '');
            setTimeout( function(){
                setHtml('.text-player', 'ESCUCHA LA RADIO <span style="color: #df104a;    font-weight: bold;    font-size: 12px;">EN VIVO </span> AHORA');             
            },1000);
            if (musicInterval) clearInterval(musicInterval);    
         }

     }
     

    function completeAd(e){                
        streaming.play({
            station:'XEPHAM',
            trackingParameters:{
            Dist: 'WebSanrosita'
            }
        }); 
        document.getElementById('td_container')?.classList.remove('pub_active');
        const fullCover = document.getElementById('full-cover');
        if (fullCover) fullCover.style.display = 'none';
        
       
      }
     

     function adBreakCuePoint( e ){
       //console.log('PAUSA COMERCIAL');
       //document.getElementById('infoMusic').innerHTML = 'PAUSA COMERCIAL';
    }

      function startAd(e){
        document.getElementById('td_container')?.classList.add('pub_active');
        const fullCover = document.getElementById('full-cover');
        if (fullCover) fullCover.style.display = 'block';
        document.getElementById('big-play').innerHTML = buttongLoading;    
        setHtml('.text-player', '<div style="font-style: italic; line-height:11px; font-weight:bold; font-size:11px;">Iniciamos después del anuncio...</div>'); 
      }
      
      var start = function(){
        //console.log('trata la pub primero');    
        streaming.playAd( 'vastAd', { url:'https://pubads.g.doubleclick.net/gampad/ads?sz=600x360&iu=/23349147378/sabrosita/VDVIDEOS&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]' } );	        
      };


      function pause(){
        streaming.stop();
      }

      
      function play(){
        streaming.play({
            station:'XEPHAM',
            trackingParameters:{
            Dist: 'WebSabrosita'
            }
        });        
      }      
   

      function stop(){
      //  console.log('stopped');
        streaming.stop();
      }

      function errorAd(e){        
        streaming.play({
            station:'XEPHAM',
            trackingParameters:{
            Dist: 'WebSabrosita'
            }
        });
        console.log(e);
        console.log('error ad');
        
      }
    /* Callback function called to notify that the SDK is ready to be used */
    function onPlayerReady(){                
        console.log('streaming ready');        
        /*document.getElementById('loading').classList.remove('show');
        document.getElementById('loading').classList.add('hide');*/
        document.getElementById('play-pause').classList.add('show');
        document.getElementById('play-pause').classList.remove('hide'); 
        vol = streaming.getVolume();
     //   console.log(vol);

    }

  
    /* Callback function called to notify that the player configuration has an error. */
    function onConfigurationError( e ) {
        console.log(e);
        console.log(e.data.errors);
        //Error code : object.data.errors[0].code
        //Error message : object.data.errors[0].message
    }
    /* Callback function called to notify that a module has not been loaded properly */
    function onModuleError( object ){
        console.log(object);
        console.log(object.data.errors);
        //Error code : object.data.errors[0].code
        //Error message : object.data.errors[0].message
    }
    
    /* Callback function called to notify that an Ad-Blocker was detected */
    function onAdBlockerDetected(){
        console.log( 'AdBlockerDetected' );
    }

    const autoplay = function(){        
        streaming.play({
            station:'XEPHAM',
            trackingParameters:{
                Dist: 'WebSabrosita',
                autoplay: 1
            }
        });
    }

    initPlayerSDK();        
        volume = document.getElementById('vol');
        volume.addEventListener('input', function(){
            //console.log(volume.value);
            streaming.setVolume(volume.value);

        });

function detectarNavegador() {
  const ua = navigator.userAgent;

  let navegador = "desconocido";
  if (ua.includes("Chrome")) navegador = "Chrome";
  else if (ua.includes("Firefox")) navegador = "Firefox";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) navegador = "Safari";
  else if (ua.includes("Edge")) navegador = "Edge";
  else if (ua.includes("MSIE") || ua.includes("Trident")) navegador = "IE";

  let so = "desconocido";
  if (ua.includes("Windows")) so = "Windows";
  else if (ua.includes("Mac")) so = "MacOS";
  else if (ua.includes("Linux")) so = "Linux";
  else if (ua.includes("Android")) so = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) so = "iOS";

  return { navegador, sistema: so };
}

// === [VOTOS] Helpers y función reutilizable ===
const VOTE_COLOR = '#ef4444';

function detectarDispositivo() {
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
}

/**
 * Registra un voto en el backend.
 * @param {string} seccion - Ej: 'Radio', 'Hot parade', 'Lanzamientos'
 * @param {string} artista - Nombre del artista (sin codificar)
 * @param {string} cancion - Título de la canción (sin codificar)
 * @param {HTMLElement|null} button - Botón/elemento clicado (opcional) para manejar UI
 * @returns {Promise}
 */
function registerVote(seccion, artista, cancion, button = null) {
  return new Promise((resolve, reject) => {
    const url = 'https://sabrositadigital.com.mx/6456heu2/8s4v3f1l3s.php';

    // Protección de doble click o voto ya marcado
    if (button) {
      const svg = button.querySelector('svg');
      const fillColor = ((svg && getComputedStyle(svg).fill) || '').toLowerCase();
      if (fillColor === VOTE_COLOR) {
        console.log('Ya votaste por esta canción.');
        return resolve({ status: 'already' });
      }
      if (button.disabled) {
        return resolve({ status: 'disabled' });
      }
      button.disabled = true;
    }

    const safe = (s) => (s || '').toString().replace('&', '%26');
    const { navegador, sistema } = detectarNavegador();

    const body = new URLSearchParams({
        artista: safe(artista),
        cancion: safe(cancion),
        seccion: seccion, // El backend actual puede ignorarlo; ya preparado para futuro
        dispositivo: detectarDispositivo(),
        navegador,
        sistema_operativo: sistema,
    });

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body,
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('network-fail');
        }
        return resp.json();
      })
      .then((resp) => {
        if (button) button.disabled = false;
        if (resp && resp.status === 'success') {
          const svg = button?.querySelector('svg');
          if (svg) svg.style.fill = VOTE_COLOR;
          console.log('Voto registrado con éxito.');
          resolve(resp);
        } else {
          console.log((resp && resp.message) || 'Error al votar.');
          reject(resp || new Error('vote-error'));
        }
      })
      .catch(() => {
        if (button) button.disabled = false;
        console.log('No se pudo registrar el voto. Intenta de nuevo.');
        reject(new Error('network-fail'));
      });
  });
}


var lastArtist = null;
var lastSong = null;
var progInterval = null;

function getInfoMusic() {
    fetch("https://cdn.nrm.com.mx/cdn/sabrosita/playlist/cancion.json")
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        let newArtist = '';
        let newSong = '';
        let newHora = '';

        switch (data.categoria) {            
            case 'SAB-MUSICA':
                newArtist = data.artista;
                newSong = data.title;
                newHora = data.hora_real;
                break;
            default:
                newArtist = 'PAUSA COMERCIAL';
                newSong = '';
                newHora = '';
                break;
        }

        // Actualiza siempre en la primera llamada o si hay cambio
        if (lastArtist === null || lastSong === null || newArtist !== lastArtist || newSong !== lastSong) {
            lastArtist = newArtist;
            lastSong = newSong;
            artist = newArtist;
            cancion = newSong;
            hora = newHora;

            if (cancion === '') {
                document.getElementById('infoMusic').innerHTML = artist;
            } else {
                const secenvivo = document.getElementById('envivo');
                var cover;
                var coverbase = "https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=9a371ed9786b7037d2b0b088615b047a&format=json";
                const codtit = cancion.replace('&', '%26');
                const codart = artist.replace('&', '%26');
                console.log('Artista: ' + artist);
                console.log('Canción: ' + cancion);
                console.log('escribe');
                setHtml('#infoMusic', '<div class="current-song">' + cancion + ' / ' + artist + '</div><div class="share-current"><div class="like"><svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="28" height="28" stroke-width="1"> <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path> </svg> </div> <div class="share-wp"><a href="https://api.whatsapp.com/send/?text=Estoy%20escuchando%20' + codtit +'%20de%20'+ codart +'%20en%20https://sabrositadigital.mx/" target="_blank"> <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="28" height="28" stroke-width="1"> <path d="M13 4v4c-6.575 1.028 -9.02 6.788 -10 12c-.037 .206 5.384 -5.962 10 -6v4l8 -7l-8 -7z"></path> </svg> </div></div>'); 
                //document.getElementById('infoMusic').innerHTML = 

                
                // Binder de voto para la sección RADIO (evita handlers duplicados)
                qsa('.like').forEach((button) => replaceEventListener(button, 'click.vote', 'click', function (e) {
                  e.preventDefault();
                  registerVote('Radio', artist, cancion, button)
                    .then(() => {
                      // Hook opcional: aquí podrías disparar un toast/analytics
                    })
                    .catch(() => {
                      // Manejo ya se hizo con logs; deja el catch vacío para no romper UX
                    });
                }));

                // Consulta el cover solo si hay cambio
                var linkcover = coverbase + '&track=' + codtit + '&artist=' + codart;
                fetch(linkcover)
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error(`HTTP error! Status: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then((dataalbum) => {
                        var lig = dataalbum.track.album;
                        if (secenvivo) {
                            setHtml('.cover-background', '');
                            if (!lig || artist == 'PAUSA COMERCIAL') {
                                cover = 'https://storage.googleapis.com/nrm-web/sabrosita/resources/img/logo-sabrosita-player-small.svg';
                                setAttr('.logo-player img', 'src', cover);
                            } else {
                                cover = dataalbum.track.album.image[2]['#text'];
                                setAttr('.logo-player img', 'src', cover);
                            }
                        } else {
                            if (!lig || artist == 'PAUSA COMERCIAL') {
                                setHtml('#radiobutton .cover-background', '');
                            } else {
                                cover = dataalbum.track.album.image[2]['#text'];
                                setHtml('#radiobutton .cover-background', '');
                                document.getElementById('radiobutton')?.insertAdjacentHTML('beforeend', '<div class="cover-background"><img src="' + cover + '" /></div>');
                            }
                        }
                    });
            }
            }
            // Si no hay cambio, no hace nada
        });
    }

       
        function getInfoProg(){
            
            fetch("https://sabrositadigital.com.mx/wp-json/wp/v2/posts?_embed&per_page=100&categories=757&_fields[]=_links&_fields[]=_embedded&_fields[]=acf&_fields[]=content")
            .then((res) => {
                if (!res.ok) {
                    throw new Error
                        ('HTTP error! Status: ${res.status}');
                }
                return res.json();
            })
            .then((data) => {                
                console.log(data);
                const fecha = new Date();                
                //const hora = fecha.getHours() + ':' + fecha.getUTCMinutes() + ':' + fecha.getSeconds();
                const dias = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
                const dia = dias[fecha.getDay()];                
                const hora = dayjs(fecha).format('HH:mm:ss');
                let siguientePrograma = null;
                data.map(function(prog,i,el){                    
                    if(prog.acf[dia] === true){
                        var h_i;
                        if( prog.acf.hora_fin >= hora &&  prog.acf.hora_inicio <= hora){
                            setAttr('.banner-prog img', 'src', prog._embedded['wp:featuredmedia'][0].media_details.sizes['full'].source_url);
                            setHtml('.envivo-prog', prog.acf.programa);
                            setHtml('.envivo-now', prog.acf.hora_inicio + ' - ' + prog.acf.hora_fin);
                            setHtml('.envivo-prog-tab', prog.acf.programa);                            
                            setHtml('.envivo-desc', prog.content.rendered);                            
                        }

                        if (prog.acf.hora_inicio > hora) {
                            if (!siguientePrograma || prog.acf.hora_inicio < siguientePrograma.acf.hora_inicio) {
                                siguientePrograma = prog;
                            }
                        }                        
                    }
                });   
                if (siguientePrograma) {
                 //   console.log("Siguiente programa:", siguientePrograma.acf.programa);
                    setHtml('.envivo-next', siguientePrograma.acf.hora_inicio + ' - ' + siguientePrograma.acf.hora_fin);
                    setHtml('.envivo-prog-next-tab', siguientePrograma.acf.programa);
                }                                                
            });           
        }
        
        

const radioActive = function(){
    document.getElementById('player-inner')?.classList.add('active');
    document.getElementById('player-v-podcast')?.classList.remove('active');
    document.getElementById('player-v-video')?.classList.remove('active');
    removeClass('.player-float', 'hide');
}

const podcastActive = function(){
    //transitionPlayer();
    document.getElementById('player-inner')?.classList.remove('active');
    document.getElementById('player-v-podcast')?.classList.add('active');
    document.getElementById('player-v-video')?.classList.remove('active');
    addClass('.player-float', 'hide');
    removeClass('.player-float', 'active');
}

const videoActive = function(){
    document.getElementById('player-inner')?.classList.remove('active');
    document.getElementById('player-v-podcast')?.classList.remove('active');
    document.getElementById('player-v-video')?.classList.add('active');
}

const radioStop = function(){
        transitionPlayer();
        streaming.stop();
        document.getElementById('player')?.setAttribute('data-status','init');                
        //hidebarra();
        document.getElementById('player-inner')?.classList.remove('active');
}

const initPlayer = function(){
    transitionPlayer();
    document.getElementById('player-v-podcast')?.classList.remove('active');
    document.getElementById('player-v-video')?.classList.remove('active');
    removeClass('.player-float', 'hide');
    document.getElementById('radiobutton')?.classList.remove('playerplaying'); 
    removeClass('.player-float', 'hide');
    addClass('.player-float', 'active');    
}

const transitionPlayer = function(){
    const radioButton = document.getElementById('radiobutton');
    if (radioButton) radioButton.style.width = '0px';
    setTimeout( function(){
        const radioButton = document.getElementById('radiobutton');
        if (radioButton) radioButton.style.width = '250px';
    }, 500);
}


const playerstatus = function(){
    var state  = document.getElementById('player')?.getAttribute('data-status');
    return state;
};

const playstopRadio = function(){
            transitionPlayer();
            const getplayingstatus = playerstatus();                        
            if(getplayingstatus == 'podcast-playing'){
                //transitionBarra();
                const containerpodcast  = document.getElementById('iframepodcast');
                containerpodcast.innerHTML ='';                
            }                
                                               
            if(getplayingstatus == 'video-playing'){
                
            }

            if( local_status == null || local_status == 'undefined' || local_status == '' ){                                
                //console.log('aqui debe iniciar');
                start();     
                document.getElementById('player')?.setAttribute('data-status','radio-playing');
                //transitionBarra();                 
                radioActive();   
            }else if(local_status == 'LIVE_STOP'){
                //console.log('else play');
                play();
                document.getElementById('player')?.setAttribute('data-status','radio-playing');
            }else if( local_status == 'LIVE_PLAYING' || local_status == 'GETTING_STATION_INFORMATION' || local_status == 'LIVE_CONNECTING' || local_status == 'LIVE_BUFFERING'){                
                radioStop();
            }
};


document.getElementById('big-play')?.addEventListener('click',function(){    
       // console.log('click en radiobutton');
        playstopRadio();      
});


document.getElementById('return-live')?.addEventListener('click',function(){    
       playstopRadio();    
});

qsa('.radio-link').forEach((link) => link.addEventListener('click',function(){    
       playstopRadio();    
}));



function initAppleMusicAds() {
  const slot = document.getElementById('amplified_100007141');
  if (!slot) return;

  const runAppleMusicAds = () => {
    window.amplified = window.amplified || { init: [] };

    if (typeof window.amplified.setParams === 'function' &&
        typeof window.amplified.pushAdUnit === 'function' &&
        typeof window.amplified.run === 'function') {
      window.amplified.setParams({ artist: '', song: '' });
      window.amplified.pushAdUnit(100007141);
      window.amplified.run();
      return true;
    }

    if (Array.isArray(window.amplified.init)) {
      window.amplified.init.push(function() {
        window.amplified.setParams({ artist: '', song: '' });
        window.amplified.pushAdUnit(100007141);
        window.amplified.run();
      });
      return true;
    }

    return false;
  };

  if (runAppleMusicAds()) return;

  window.setTimeout(() => {
    if (!document.getElementById('amplified_100007141')) return;
    runAppleMusicAds();
  }, 500);
}

/* NAVIGATION */ 
document.addEventListener('astro:before-preparation', ev => {
  //  console.log('insert spin');    
    document.querySelector('main').classList.add('loading');    
    document.querySelector('.preloader').classList.add('showpreloader');
    if (typeof progInterval !== 'undefined' && progInterval) {
      clearInterval(progInterval);
      progInterval = null;
    }
    
});

document.addEventListener("astro:after-swap", () => {
    //console.log('astro:after-swap');
    initAppleMusicAds();
    //googletag.pubads().refresh();
    // Re-procesa embeds de Instagram solo si hay alguno y el SDK está listo
    const hasInstaEmbeds = !!document.querySelector('blockquote.instagram-media, .instagram-media, [data-instgrm-permalink], iframe[src*="instagram.com"]');
    if (hasInstaEmbeds) {
      // Carga perezosa del SDK si aún no existe
      const ensureInstagramSDK = () => new Promise((resolve) => {
        if (window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === 'function') {
          resolve();
          return;
        }
        let s = document.getElementById('instagram-embed-sdk');
        if (!s) {
          s = document.createElement('script');
          s.id = 'instagram-embed-sdk';
          s.src = 'https://www.instagram.com/embed.js';
          s.async = true;
          s.onload = () => resolve();
          // como fallback, resuelve tras un tiempo prudente
          setTimeout(() => resolve(), 2000);
          document.head.appendChild(s);
        } else {
          // si ya existe la etiqueta pero aún no expone la API, espera un poco
          setTimeout(() => resolve(), 500);
        }
      });

      ensureInstagramSDK().then(() => {
        try {
          if (window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === 'function') {
            window.instgrm.Embeds.process();
          }
        } catch (e) {
          console.warn('Instagram Embeds process() falló o no estaba disponible:', e);
        }
      });
    }
    //initGPT();
    //safeRefreshSlots();
});


document.addEventListener('astro:page-load', ev => {
   // console.log('pageload');
    initGPT();
 
    window.addEventListener('scroll', function () {
                const scrollY = window.scrollY;
                
                const barStereo = qs('.bar-stereo');
                if (barStereo?.classList.contains('is-pinned')) {
                    barStereo.classList.add('compress');
                    addClass('.bar-stereo .logo', 'compress-logo');
                }
                if (scrollY <= 1) {
                    setStyle('.bar-stereo', 'position', 'sticky');
                    removeClass('.bar-stereo', 'compress');
                    removeClass('.bar-stereo .logo', 'compress-logo');
                }                
            });

    /* =======COMSCORE*/
    var ts = Math.round((new Date()).getTime() / 1000 * Math.random() * 10);
    // cowensole.log(ts);
    self.COMSCORE && COMSCORE.beacon({
            c1: "2", c2: "6906652",
            options: {
                enableFirstPartyCookie: true,
                bypassUserConsentRequirementFor1PCookie: true
            }
    });

    fetch('/pageview_candidate.txt?'+ts)
    .then(function(resp){
        console.log(resp);            
    });  
    
    /* =======COMSCORE*/
    //googletag.pubads().refresh();


    initAppleMusicAds();

   const getplayingstatus = playerstatus();
    document.querySelector('main').classList.remove('loading');    
    document.querySelector('.preloader').classList.remove('showpreloader');
    
    const secchome = document.getElementById('home');
    const secenvivo = document.getElementById('envivo');

    if ( secenvivo ){   
        //console.log('envivo');
        getInfoProg();        
        getInfoMusic();
        progInterval = setInterval( getInfoProg, 60000);
        document.getElementById('radiobutton')?.classList.add('en-vivo');
        //console.log(local_status);
        if( local_status == null || local_status == 'undefined' || local_status == '' || local_status == 'LIVE_STOP' ){  
            playstopRadio();
        }
        if( local_status == 'LIVE_PLAYING' || local_status == 'GETTING_STATION_INFORMATION' || local_status == 'LIVE_CONNECTING' || local_status == 'LIVE_BUFFERING' ){
            setHtml('.cover-background', '');
        }
        setAttr('.logo-player img', 'src','https://storage.googleapis.com/nrm-web/sabrosita/resources/img/logo-sabrosita-player-small.svg');
        document.getElementById('big-play')?.classList.remove('border-4');
        
    }else{
       // getInfoMusic();
        setAttr('.logo-player img', 'src','https://storage.googleapis.com/nrm-web/sabrosita/resources/img/logo-sabrosita-player590.svg');        
        document.getElementById('radiobutton')?.classList.remove('en-vivo');
        document.getElementById('big-play')?.classList.add('border-4');
        if (progInterval) {
            console.log('clear interval prog');
            clearInterval(progInterval);
            progInterval = null;
        }
    }
    
    
    if ( secchome ){
       // getInfoProg();
        console.log(getplayingstatus);
        
    }else{
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    const secprogram = document.getElementById('programacion');
    const secprograma = document.getElementById('sonsonidero');
    
    if ( secprogram || secchome || secprograma ){  

        var elempod = document.querySelector('.main-carousel');
        var flktypod = new Flickity( elempod, {
            contain: true,
            lazyLoad: 1, 
            wrapAround: true, 
            cellAlign: 'left',
            pageDots: false,
            autoPlay: 5000,
        });
        var elempromo = document.querySelector('.main-promos');
        var flktypromo = new Flickity( elempromo, {
            contain: true,
            lazyLoad: 1, 
            wrapAround: true, 
            cellAlign: 'left',
            pageDots: false,
            autoPlay: 5000,
        });

        var elemlanza = document.querySelector('.main-lanzamientos');
        var flktylanza = new Flickity( elemlanza, {
            contain: true,
            lazyLoad: 1, 
            wrapAround: true, 
            cellAlign: 'left',
            pageDots: false,
            autoPlay: 5000,
        });

        var elemtopten = document.querySelector('.main-topten');
        var flktytopten = new Flickity( elemtopten, {
            contain: true,
            lazyLoad: 1, 
            wrapAround: true, 
            cellAlign: 'left',
            pageDots: false,
            autoPlay: true
        });
        
        var df = document.querySelector('.df');
        var flktydf = new Flickity( df, {
            contain: true,
            lazyLoad: 1, 
            wrapAround: true, 
            cellAlign: 'left',
            pageDots: false,
            autoPlay: true
        });
        console.log( flktydf);
        var elembuenfin = document.querySelector('.carousel-buenfin');
        var flktybuenfin = new Flickity( elembuenfin, {
            // options
            cellAlign: 'right',
            prevNextButtons: true,
        //    autoPlay: 5000,
            pageDots: false,
            pauseAutoPlayOnHover: true,
            freeScroll: true,
            wrapAround: true
        }); 
        var elemportada = document.querySelector('.carousel-portada');
        var flktyportada = new Flickity(elemportada, {
            cellAlign: 'center',
            prevNextButtons: false,
            pageDots: false,
            pauseAutoPlayOnHover: true,
            freeScroll: true,
            wrapAround: true,
            autoPlay: 5000,
        });
        
    }
    
    const imagenNota = document.getElementById("imagen-nota");
    if( imagenNota ){
        const imgNotaOriginal = imagenNota.getElementsByTagName('img');
        const imgNotaOriginal2 = imgNotaOriginal[0].getAttribute('src');
        imagenNota.style.backgroundImage = "url("+imgNotaOriginal2+")";
    }
    
    
    if( getplayingstatus == 'podcast-playing'){
        const containerpodcast  = document.getElementById('iframepodcast');
        //containerpodcast.innerHTML ='';
        initPlayer();
        //hidebarra();
    }

    qsa('.audiopod').forEach((audioPod) => {   
        replaceEventListener(audioPod, 'click.podcast', 'click', function(){
            const getstatus = playerstatus();
            const podactive = audioPod.querySelector('.play-pause-podcast');
            const podcaststatus = podactive?.getAttribute('data-podcast-status');
            const containerpodcast  = document.getElementById('iframepodcast');
            
            transitionPlayer();
            podcastActive();
            setTimeout( function(){
                document.getElementById('radiobutton')?.classList.add('playerplaying'); 
            },600);
            
            
            if (getstatus == 'radio-playing'){
                radioStop();                
            }            
                                                
            if (podactive) podactive.innerHTML = '<img class="loading-gif" src="https://storage.googleapis.com/nrm-web/oye/recursos/loading-normal.gif" />';
            
            qsa('.close-podcast').forEach((closeButton) => replaceEventListener(closeButton, 'click.closePodcast', 'click', function(){
                initPlayer();
                const playerpodcast = document.getElementById('iframepodcast').getElementsByTagName('iframe')[0];                
                const ply =  new playerjs.Player(playerpodcast);
                ply.on('ready', ()=> {
                    ply.pause();
                    podactive?.setAttribute('data-podcast-status','ready');
                });
                qsa('.audiopod').forEach((item) => {
                    qsa('.play-pause-podcast', item).forEach((playButton) => {
                        playButton.innerHTML = buttonPodcastPlay;
                        playButton.setAttribute('data-podcast-status','ready');
                    });
                });
                
            }));
            
            if (getstatus == 'podcast-playing'){
                
                const playerpodcast = document.getElementById('iframepodcast').getElementsByTagName('iframe')[0];                
                const ply =  new playerjs.Player(playerpodcast);
                ply.on('ready', ()=> {
                    ply.pause();
                    podactive?.setAttribute('data-podcast-status','ready');
                });
                qsa('.audiopod').forEach((item) => {
                    qsa('.play-pause-podcast', item).forEach((playButton) => {
                        playButton.innerHTML = buttonPodcastPlay;
                        playButton.setAttribute('data-podcast-status','ready');
                    });
                });
            }
            //console.log(podcaststatus);            
            if(podcaststatus == 'ready'){
                //transitionBarra();
                const ifr = audioPod.querySelector('.data-iframe')?.getAttribute('data-iframe');
                if (!ifr) return;
                const ifrsrc = ifr.split('src="');
                const src = ifrsrc[1].split('"');
                //const playerpodcast = document.getElementById('playerpodcast');
                //<iframe src="https://omny.fm/shows/beat-trends/amor-de-lejos-amor-de-ya-no-aplica/embed?size=square&style=cover&image=0&description=1&download=1&playlistImages=1&playlistShare=1&share=1&subscribe=0&background=efefef&foreground=2b2b2c&highlight=fff" allow="autoplay; clipboard-write" width="300" height="300" frameborder="0" title="Amor de lejos, amor de… Ya no aplica"></iframe>           
                containerpodcast.innerHTML ='';
                const playerpodcast = document.createElement('iframe');
                playerpodcast.setAttribute('src',src[0]+"?image=0&share=0&download=1&description=0&background=efefef&foreground=2b2b2c&highlight=fff");
                playerpodcast.setAttribute('width','300');
                playerpodcast.setAttribute('height','190');
                playerpodcast.setAttribute('frameborder','0');
                playerpodcast.setAttribute('allow','autoplay');
                playerpodcast.setAttribute('transition:persist','');
                //console.log(playerpodcast);
                containerpodcast.appendChild(playerpodcast);            
                const ply =  new playerjs.Player(playerpodcast);
                 
                ply.on('ready', ()=> {
                    podactive?.setAttribute('data-podcast-status','active');
                    document.getElementById('player')?.setAttribute('data-status','podcast-playing');
                    playerpodcast.classList.add('iframestyle');
                    ply.play(); 
                    
                    ply.on('play', ()=>{
                        if (podactive) podactive.innerHTML = buttonPodcastPause; 
                    });
    
                    ply.on('pause', ()=>{
                        if (podactive) podactive.innerHTML = buttonPodcastPlay; 
                    });
                    
                });   
            }
            else if(podcaststatus == 'active'){
                /*if( getplayingstatus == 'podcast-playing'){
                    const containerpodcast  = document.getElementById('iframepodcast');
                    containerpodcast.innerHTML ='';
                    hidebarra();
                }*/
                //containerpodcast.innerHTML = '';
                //hidebarra();                
                const playerpodcast = document.getElementById('iframepodcast').getElementsByTagName('iframe')[0];
                //console.log(playerpodcast);
                const ply =  new playerjs.Player(playerpodcast);
                ply.on('ready', ()=> {
                    ply.pause();
                    podactive?.setAttribute('data-podcast-status','ready');
                });                
                
            }

        });
    });
    
    qsa('.wp-block-image').forEach((blockImage) => {        
        const image = blockImage.querySelector('img');
        const datasrc = image?.getAttribute('data-src');        
        if (image && datasrc) image.setAttribute('src',datasrc);
    });

    
        
  

    const containvideo = document.getElementById('content-w-video');
    if (containvideo){
        //console.log('sccion pop');  
        //console.log(navigator.userAgent);
        if(navigator.userAgent.indexOf("iPhone") != -1){
            
        qsa('.wp-block-embed-youtube .wp-block-embed__wrapper iframe').forEach((iframe) => {
            iframe.addEventListener('click',function(){
                const getstatus = playerstatus();
                if( getstatus == 'radio-playing'){
                    radioStop();   
                    //hidebarra();
                    document.getElementById('player')?.setAttribute('data-status','video-playing');
                }
            });            
            
        });        

        }else{                      
        qsa('.wp-block-embed-youtube .wp-block-embed__wrapper').forEach((wrapper) => {
            const plyr = new Plyr(wrapper,{
                debug:true,
                controls:[
                    'play-large', // The large play button in the center
                    'restart', // Restart playback
                    'rewind', // Rewind by the seek time (default 10 seconds)
                    'play', // Play/pause playback
                    'fast-forward', // Fast forward by the seek time (default 10 seconds)
                    'progress', // The progress bar and scrubber for playback and buffering
                    'current-time', // The current time of playback
                    'duration', // The full duration of the media
                    'mute', // Toggle mute
                    'volume', // Volume control
                    'captions', // Toggle captions
                    'settings', // Settings menu
                    'pip', // Picture-in-picture (currently Safari only)
                    'airplay', // Airplay (currently Safari only)
                    'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
                    'fullscreen', 
                ],
                playsinline: true

            });
            //console.log(plyr);
            plyr.on('playing',function(){
                const getstatus = playerstatus();
                if( getstatus == 'radio-playing'){
                    radioStop();   
                    //hidebarra();
                    document.getElementById('player')?.setAttribute('data-status','video-playing');
                }
            });
            
            document.getElementById('radiobutton')?.addEventListener('click', function(){
                plyr.pause();
            });     
        }); 
        }
        
        
        /*voto*/
        qsa('.voto-pop').forEach((voteButton) => {
            replaceEventListener(voteButton, 'click.popVote', 'click', function(){
                const id = voteButton.getAttribute('data-voto-id');                                
                /*const params = {
                    "search": id, 
                    "per_page": 1000                    
                };*/
                const params = {
                    "item_id":id,
                    "user_id":15,
                    "type":"post",
                    "user_ip":"0.0.0.0",
                    "status":"like"
                };
                
                const Rparamas = {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer GoW1bJVNjV3SCoUfVblUJs6ddelYSrGmmadoZglqcWrFELxbvrksHfsIOKeYZcgFN0jKNFtpiJEB7YN8rwUsLONosH06pWU1UZ2zIL10n0kUM26ufABMlqyh',
                        'Content-Type': 'application/json'
                    },                    
                    body: JSON.stringify( params )
                };
                    
                fetch('https://contenido.beatdigital.mx/wp-json/wp-ulike-pro/v1/vote/', Rparamas)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error
                            ('HTTP error! Status: ${res.status}');
                    }
                    return res.json();
                })
                .then((data) => { 
                        //console.log(data);
                        voteButton.classList.add('voted');
                        voteButton.querySelector('svg')?.setAttribute('fill','white');
                        Toastify({
                            text: "Gracias por tu voto",
                            className: "info",
                            style: {
                              background: "linear-gradient(to right, #ec4899, #a855f7)",
                              'border-radius': '6px',
                              'box-shadow':'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)' 
                            },
                            offset:{
                                x:'10rem',
                                y:'20rem'
                            }
                        }).showToast();
                });

            });            
        });
        
        /*------------------- */
        
    } 

    // === [/VOTOS] ===
    qsa('.like-hotparade').forEach((button) => replaceEventListener(button, 'click.vote', 'click', function (e) {
                    e.preventDefault();
                    const artist = button.dataset.artist || '';
                    const cancion = button.dataset.song || '';
                    registerVote('HotParade', artist, cancion, button)
                        .then(() => {
                        // Hook opcional: aquí podrías disparar un toast/analytics
                        })
                        .catch(() => {
                        // Manejo ya se hizo con logs; deja el catch vacío para no romper UX
                        });
    }));

    qsa('.like-lanzamientos').forEach((button) => replaceEventListener(button, 'click.vote', 'click', function (e) {
                    e.preventDefault();
                    const artist = button.dataset.artist || '';
                    const cancion = button.dataset.song || '';
                    registerVote('Lanzamientos', artist, cancion, button)
                        .then(() => {
                        // Hook opcional: aquí podrías disparar un toast/analytics
                        })
                        .catch(() => {
                        // Manejo ya se hizo con logs; deja el catch vacío para no romper UX
                        });
    }));




});
