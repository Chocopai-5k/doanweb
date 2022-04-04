const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playList = $(".playlist");
const volume_change = $("#controls_lever_range");

// Render sóng
// Scroll top
// Play / Pause /Seek
// CD rotage
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRamdom: false,
  isRepeat: false,
  songs: [
    {
      name: "Yêu đương khó quá thì chạy về khóc với anh",
      singer: "Erik",
      path: "./access/css/song/YeuDuongKhoQuaThiChayVeKhocVoiAnh-ERIK-7128950.mp3",
      image: "./access/css/img/Erik.jpg",
    },
    {
      name: "Buồn làm chi em ơi",
      singer: "Hoài lâm",
      path: "./access/css/song/BuonLamChiEmOi1-HoaiLam-6297318.mp3",
      image: "./access/css/img/hoa-ngu.jpg",
    },
    {
      name: "Cao ốc 20",
      singer: "Bray",
      path: "./access/css/song/CaoOc20-BRayDatGMasewKICM-6008352.mp3",
      image: "./access/css/img/tivi02.jpg",
    },
    {
      name: "Em tôi",
      singer: "Đạt G",
      path: "./access/css/song/EmmEEmToi-DatGDuUyen-5494094.mp3",
      image: "./access/css/img/img01.jpg",
    },
    {
      name: "Em muốn ta là gì",
      singer: "Thanh Hưng",
      path: "./access/css/song/EmMuonTaLaGi-ThanhHungIdol-6119801.mp3",
      image: "./access/css/img/img02.jpg",
    },
    {
      name: "Hai chữ đã từng",
      singer: "Như Việt",
      path: "./access/css/song/HaiChuDaTung-NhuViet-6487469.mp3",
      image: "./access/css/img/img03.jpg",
    },
    {
      name: "Sai người sai thời điểm",
      singer: "Thanh Hưng",
      path: "./access/css/song/SaiNguoiSaiThoiDiem-ThanhHungIdol-5333777.mp3",
      image: "./access/css/img/img04.jpg",
    },
    {
      name: "Thương nhiều hơn nói",
      singer: "MaSew, Bray",
      path: "./access/css/song/ThuongNhieuHonNoi-DatGBrayMasew-5510862.mp3",
      image: "./access/css/img/img06.jpg",
    },
    {
      name: "Từng yêu",
      singer: "Phan Duy Anh",
      path: "./access/css/song/TungYeu-PhanDuyAnh-5989256.mp3",
      image: "./access/css/img/thap-nien-90.jpg",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="song ${
          index === this.currentIndex ? "active" : ""
        }" data-index="${index}">
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
          `;
    });
    playList.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvent: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;
    // Xử lý cd quay và dừng
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdThumbAnimate.pause();
    // Xử lí ảnh  khi cuộn lên xuống
    document.onscroll = function () {
      const scroolTop = window.scrollY || document.documentElement.scrollTop;
      const cdNew = cdWidth - scroolTop;

      cd.style.width = cdNew > 0 ? cdNew + "px" : 0;
      cd.style.opacity = cdNew / cdWidth;
    };
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    // Khi song được play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };
    // Khi song được pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };
    //Khi next song
    nextBtn.onclick = function () {
      if (_this.isRamdom) {
        _this.randomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActive();
    };
    prevBtn.onclick = function () {
      if (_this.isRamdom) {
        _this.randomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActive();
    };
    // Lắng nghe khi click vào playlist
    playList.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || e.target.closest(".option")) {
        _this.currentIndex = Number(songNode.dataset.index);
        _this.loadCurrentSong();
        _this.render();
        audio.play();
      }
    };
    // Ramdom bài hát
    randomBtn.onclick = function () {
      _this.isRamdom = !_this.isRamdom;
      randomBtn.classList.toggle("active", _this.isRamdom);
    };
    //Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };
    // Xử lí khi tua
    progress.oninput = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    // Phát lại khi hết bài
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };
    // Xử lí khi audio end
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.onclick();
      }
    };
    // Xử lí âm thanh
    volume_change.oninput = function (e) {
      audio.volume = e.target.value / 100;
    };
    // Xử lí thời gian
    audio.ontimeupdate = function () {
      const time_start = $(".controls_time--left");
      const time_count = $(".controls_time--right");

      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;

        // Xử lý tính thời gian của bài hát
        // Time Start
        var e = Math.floor(audio.currentTime); // thời gian hiện tại bài hát đang chạy
        var d = e % 60; // số giây
        var b = Math.floor(e / 60); // số phút
        if (d < 10) {
          var c = 0; // số chục giây
        } else {
          c = "";
        }
        time_start.textContent = "0" + b + ":" + c + d;
        // Time Count
        var ee = Math.floor(audio.duration); // Tổng số thời gian bài hát
        var dd = ee % 60; //số giây
        var bb = Math.floor(ee / 60); //số phút
        if (dd < 10) {
          var cc = 0; // số chục giây
        } else {
          cc = "";
        }
        time_count.textContent = "0" + bb + ":" + cc + dd;
      }
    };
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  scrollToActive: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }, 300);
  },

  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  randomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  start: function () {
    // Định nghĩa các thuộc tính cho object
    this.defineProperties();
    // Lắng nghe sự kiên
    this.handleEvent();
    //  Tải bài đầu tiên vào UI
    this.loadCurrentSong();
    // Render playlist
    this.render();
  },
};
app.start();
