const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY= 'Dat Do'

const heading =$('header h2')
const cdthumb=$('.cd-thumb')
const audio=$('#audio')
const cd=$('.cd')
const playBtn=$('.btn-toggle-play')
const player=$('.player')
const progress=$('#progress')
const nextBtn=$('.btn-next')
const prevBtn=$('.btn-prev')
const randomBtn=$('.btn-random')
const repeatBtn=$('.btn-repeat')
const playlist= $('.playlist')
 const app = {
    currentIndex:0,
    isPlaying:false,
    isRandom:false,
    isRepeat:false,
    config:JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY))||{},
    songs: [
        {
          name: "Click Pow Get Down",
          singer: "Raftaar x Fortnite",
          path: "./assets/music/1.mp3",
          image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
          name: "Tu Phir Se Aana",
          singer: "Raftaar x Salim Merchant x Karma",
          path: "./assets/music/2.mp3",
          image:
            "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
          name: "Naachne Ka Shaunq",
          singer: "Raftaar x Brobha V",
          path:
            "./assets/music/3.mp3",
          image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
          name: "Mantoiyat",
          singer: "Raftaar x Nawazuddin Siddiqui",
          path: "./assets/music/4.mp3",
          image:
            "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
          name: "Aage Chal",
          singer: "Raftaar",
          path: "./assets/music/5.mp3",
          image:
            "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
          name: "Damn",
          singer: "Raftaar x kr$na",
          path:
            "./assets/music/6.mp3",
          image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        },
        {
          name: "Feeling You",
          singer: "Raftaar x Harjas",
          path: "./assets/music/7.mp3",
          image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        }
      ], 
    
        render:function() {
            const htmls=this.songs.map((song,index )=>{
             return `
                <div class="song ${index=== this.currentIndex? 'active':''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
                </div>
             `
             
            })
            playlist.innerHTML= htmls.join('')

        },
        defineProperties:function(){
            Object.defineProperty(this,'currentSong',{
                get:function() {
                  return this.songs[this.currentIndex]
                   
                }
            })
        }, 
        handleEvents: function(){
            const _this=this
            const cdwidth=cd.offsetWidth
            // x??? l?? CD quay v?? d???ng
            const cdthumbAnimate= cdthumb.animate([
              {transform: 'rotate(360deg)'}
            ],{
              duration:10000,
              iterations: Infinity
            })
            cdthumbAnimate.pause()

          // x??? l?? ph??ng to thu nh??? CD
            document.onscroll = function(){
                const scrollTop=window.scrollY
                const newcdWidth=cdwidth-scrollTop
                cd.style.width= newcdWidth>40 ? newcdWidth + 'px' :0
                cd.style.opacity = newcdWidth/cdwidth
            }

            // x??? l?? n??t play
            playBtn.onclick= function (){
              if(_this.isPlaying){
              audio.pause()
              }else{
              audio.play()
              }
            }
            // khi song ??c play
            audio.onplay=function(){
              _this.isPlaying=true
              player.classList.add('playing')
              cdthumbAnimate.play()
            }
            audio.onpause=function(){
              _this.isPlaying=false
              player.classList.remove('playing')
              cdthumbAnimate.pause()
            }

            // khi ti???n ????? b??i h??t thay ?????i
            audio.ontimeupdate = function() {
              if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration *100)
                progress.value=progressPercent
              }
            }
            // x??? l?? tua song
            progress.onchange = function (e){
              const seekTime = audio.duration/ 100 * e.target.value
              audio.currentTime = seekTime
            }
            // khi next song
            nextBtn.onclick = function(){
              if(_this.isRandom){
                _this.randomSong()
              }else {
                _this.nextSong()
              }
              
              audio.play()
              _this.render()
              _this.scrolltoActivesong()
            }
            //  khi prev song
            prevBtn.onclick = function(){
              if(_this.isRandom){
                _this.randomSong()
              }else {
                _this.prevSong()
              }
             
              audio.play()
              _this.render()
              _this.scrolltoActivesong()
            }
            // n??t random
            randomBtn.onclick=function(){
              _this.isRandom=!_this.isRandom
              randomBtn.classList.toggle('active',_this.isRandom)
              
            }
            // x??? l?? k??o thanh cu???n t???i song ??ang ph??t
            
            // x??? l?? ph??t l???i 1 b??i h??t
            repeatBtn.onclick = function(e){
              _this.isRepeat = !_this.isRepeat
              repeatBtn.classList.toggle('active', _this.isRepeat)
            }
            // x??? l?? next song khi 1 b??i song ended
            audio.onended = function (){
              if(_this.isRepeat){
                audio.play()
              }else {
                nextBtn.click()
              }
              
            }
            // l???ng nghe h??nh vi click v??o playlist
            playlist.onclick=function(e){
              const songNode=e.target.closest('.song:not(.active)')
              if(songNode||e.target.closest('option')){
                // x??? l?? khi click v??o song
                if(songNode){
                  _this.currentIndex=Number(songNode.dataset.index)
                  _this.loadcurrentSong()
                  audio.play()
                  _this.render()
                }
                // x??? l?? khi click v??o option
                if(e.target.closest('option')){

                }
              }
            }
        },
        scrolltoActivesong: function(){
          setTimeout(()=>{
            $('.song.active').scrollIntoView({
              behavior:'smooth',
              block:'nearest'
            })
          },100)
        },
        loadcurrentSong:function (){
            
        heading.textContent = this.songs[this.currentIndex].name;
    cdthumb.style.backgroundImage = `url('${this.songs[this.currentIndex].image}')`;
    audio.src = this.songs[this.currentIndex].path;
        
        },
      nextSong: function(){
          this.currentIndex++
          if(this.currentIndex >=this.songs.length){
            this.currentIndex=0
          }
          this.loadcurrentSong()
        },
        prevSong: function(){
          this.currentIndex--
          if(this.currentIndex <0){
            this.currentIndex=this.songs.length-1
          }
          this.loadcurrentSong()
        },
        randomSong: function(){
          let newIndex
          do{
            newIndex=Math.floor(Math.random()*this.songs.length)
          } while(newIndex ===this.currentIndex)
          this.currentIndex = newIndex
          this.loadcurrentSong()
        },
        start: function() {

            this.loadcurrentSong()
            this.defineProperties()
            this.handleEvents()
          
            this.render()
        }
    }
 

 app.start()