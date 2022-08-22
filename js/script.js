// Helper get elements function
const getEl = function(el, isList = 0) {
  if (isList === 0) return document.querySelector(el)
  if (isList === 1) return document.querySelectorAll(el)
}

// Explore button
const btnExplore = getEl(".hero-btn")
const hadithSection = getEl(".section-hadith")

btnExplore.addEventListener('click', () => {
  hadithSection.scrollIntoView({
    behavior: 'smooth'
  })
})

// Make header fixed & Scroll to top
const header = getEl('.header')
const scrollTop = getEl(".scroll-top")
const sections = getEl("section", 1)
const navLinks = getEl(".main-nav-link", 1)


window.addEventListener('scroll', () => {
  window.scrollY > 240 ? header.classList.add('active') :  header.classList.remove('active')
  window.scrollY > 720 ? scrollTop.classList.add("show") : scrollTop.classList.remove("show")
  const scrollPosition = document.documentElement.scrollTop
  sections.forEach(section => {
    if (
      scrollPosition >= section.offsetTop - section.offsetHeight * 0.09 &&
      scrollPosition <
        section.offsetTop + section.offsetHeight - section.offsetHeight * 0.00
    ) {
      currentId = section.attributes.id.value
      removeAllActiveClasses()
      addActiveClass(currentId)
    }
  })
})

function removeAllActiveClasses() {
  navLinks.forEach(link => {
    link.classList.remove("active")
  })
}

function addActiveClass(id) {
  const selector = `.main-nav-link[data-id="${id}"]`
  getEl(selector).classList.add("active")
}

scrollTop.addEventListener('click', scrollToTop)

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// Make navbar links clickable
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    getEl(".main-nav-link.active").classList.remove("active")
    link.classList.add("active")
    getEl(`.${link.dataset.id}`).scrollIntoView({behavior: 'smooth'})
  })
})

// Mobile Navigation Toggle
const navMenu = getEl(".main-nav-list")
const navToggle = getEl('.mobile-nav-toggle')

navToggle.addEventListener('click', toggleNav)

function toggleNav() {
  const visibility = navMenu.getAttribute('data-visible')
  if (visibility === 'false') {
    navMenu.setAttribute("data-visible", "true")
    navToggle.setAttribute("aria-expanded", "true")
  } else if (visibility === "true") {
    navMenu.setAttribute("data-visible", "false")
    navToggle.setAttribute("aria-expanded", "false")
  }
}

// Hadith Section
const hadithContainer = getEl(".hadith-container");
const next = getEl('.next')
const count = getEl('.count')
const prev = getEl('.prev')

// let book = "bukhari"
// let one = 1;
// let threeHundred = 300;
// let range = `${one}-${threeHundred}`
let hadithIndex = 0

// Filter items
// const filterContainer = getEl(".hadith-books-header")
// const filterDropdown = getEl(".hadith-books-dropdown")
// const dropdownItems = [...getEl("span.dropdown-item", 1)]
// const arrow = getEl(".fa-angle-up")
// const bookName = getEl(".hadith-book-name")

// Next - Previous items
// const next300 = getEl(".next-300")
// const prev300 = getEl(".prev-300")

// function reload() {
//   const container = document.getElementById("yourDiv");
//   const content = container.innerHTML;
//   container.innerHTML = content;
// }

getHadith()
async function getHadith() {
  // const res = await fetch(
  //   `https://api.hadith.sutanlab.id/books/${book}?range=${range}`
  // )
  // const data = await res.json()
  // const hadiths = data.data.hadiths
  // const hadithsCount = data.data.requested
  // const available = data.data.available

  // function changeHadith() {
  //   hadithContainer.textContent = hadiths[hadithIndex].arab
  //   count.textContent = `${hadithIndex + 1} / ${hadithsCount}`
  // }
  // changeHadith();

  // New API
  const res = await fetch(
    `https://ahadith-api.herokuapp.com/api/ahadith/all/ar-tashkeel`
  )
  const data = await res.json()
  const hadiths = data.AllChapters
  const hadithsCount = 1896

  function changeHadith() {
    hadithContainer.innerHTML = `
      <p class="hadith-sanad">${hadiths[hadithIndex].Ar_Sanad_1}</p>
      <p class="hadith-text">${hadiths[hadithIndex].Ar_Text}</p>
      `
    count.textContent = `${hadithIndex + 1} / ${hadithsCount}`
  }
  changeHadith();

  // Netx - Previous hadith
  next.addEventListener("click", nextHadith);
  prev.addEventListener("click", prevHadith);

  function nextHadith() {
    if (hadithIndex != hadiths.length - 1) {
      hadithIndex++;
      changeHadith();
    }
  }

  function prevHadith() {
    if (hadithIndex != 0) {
      hadithIndex--;
      changeHadith();
    }
  }

  // Old API
  // Next - Previous 300 hadith
  // next300.addEventListener("click", getNext300);
  // prev300.addEventListener("click", getPrev300);

  // function getNext300() {
  //   if (threeHundred != available) {
  //     console.log(one, threeHundred, 'ava => ', available)
  //     one += 300
  //     threeHundred += 300
  //     getHadith()
  //   }
  // }
  
  // function getPrev300() {
  //   console.log(one, threeHundred, 'ava => ', available)
  //   if (one != 1) {
  //     one -= 300
  //     threeHundred -= 300
  //     getHadith()
  //   }
  // }
}

  // Open & Close dropdown menu
//   filterContainer.addEventListener("click", () => {
//     filterDropdown.classList.toggle("open-dropdown")
//     arrow.classList.toggle("rotate-arrow")
//   })
  
//   // Apply filter
//   dropdownItems.forEach(item => {
//     item.addEventListener("click", () => {
//       book = item.dataset.filter
//       hadithIndex = 0
//       getHadith()  // أول تغير بينط مره ومع كل تغير بينط نطه زياده
//       filterDropdown.classList.remove("open-dropdown")
//       bookName.textContent = item.textContent
//     })
//   })

//   // Close dropdown when click on anywhere in the whole document
//   document.addEventListener('click', (e) => {
//     if (!e.target.classList.contains("hadith-books-header"))
//       filterDropdown.classList.remove("open-dropdown")
//   })
  
//   // Close dropdown when press Escape keyboard key
//   document.addEventListener('keydown', (e) => {
//     if (e.key === "Escape" && e.code === "Escape") filterDropdown.classList.remove("open-dropdown")
// })

// Quran Player
const quranPlayerBtn = getEl(".quran-player")
const quranPlayerBtnClose = getEl(".quran-player-close")
const iFrame = getEl(".iframe-container")

quranPlayerBtn.addEventListener('click', () => {
  iFrame.classList.add('active')
})

quranPlayerBtnClose.addEventListener("click", () => {
  iFrame.classList.remove("active");
});

document.addEventListener('keydown', (e) => {
  if (e.key === "Escape" && e.code === "Escape") iFrame.classList.remove("active")
})

// Al-Quran al-kareem section
const quranContaner = getEl(".surahs-container");
getSurahs()

function getSurahs() {
  fetch("https://api.alquran.cloud/v1/meta")
    .then(res => res.json())
    .then(data => {
      const surahsCount = data.data.surahs.count;
      const surahsContainer = data.data.surahs.references;

      surahsContainer.forEach((surah) => {
        const surahNumber = surah.number;
        const surahName = surah.name;
        const englishName = surah.englishName;
        const translationName = surah.englishNameTranslation;
        const numberOfAyahs = surah.numberOfAyahs;
        const revelationType =
          surah.revelationType === "Meccan" ? "مكة" : "مدينة";

        quranContaner.innerHTML += `<div class="surah flex">
                                      <div class="right-side">
                                      <p class="arabic-name">${surahName}</p>
                                        <p class="surah-ayahs">${numberOfAyahs} آيات</p>
                                      </div>
                                      <div class="left-side flex">
                                        <div class="surah-name">
                                        <p class="english-name">${englishName}</p>
                                        <p class="translation-name">${translationName}</p>
                                        </div>
                                        <span class="surah-number">${surahNumber}</span>
                                        </div>
                                        </div>`;
                                      });
      const surahs = getEl(".surah", 1);
      const ayahsContainer = getEl(".ayahs-container");
      const popupPage = getEl(".surah-popup");
      const popupPageClose = getEl(".surah-popup-close");
      surahs.forEach((surah, index) => {
        surah.addEventListener("click", () => {
          fetch(`https://api.alquran.cloud/v1/surah/${index + 1}`)
          .then((res) => res.json())
          .then((data) => {
              const ayahs = data.data.ayahs
              ayahsContainer.innerHTML = ""
              ayahs.forEach((ayah) => {
                ayahsContainer.innerHTML += `<p class="ayah">${ayah.text} (${ayah.numberInSurah})</p>`
                getEl('.page-number').textContent = ayah.page
              })
              popupPage.classList.add("show");
            });
        });
      });
      popupPageClose.addEventListener("click", () =>
        popupPage.classList.remove("show")
      )
      
      // Close popup page when press Escape keyboard key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && e.code === "Escape")
        popupPage.classList.remove("show")
      })
    })
}

// Pray times section
const prayTimesCards = getEl('.pray-time-cards')

getPrayTimes()
function getPrayTimes() {
  fetch("https://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt")
    .then(res => res.json())
    .then(data => {
      const timings = data.data.timings
      const date = data.data.date
      prayTimesCards.innerHTML = ''

      for (let time in timings) {
        if (time !== "Lastthird" && time !== "Firstthird") {
          prayTimesCards.innerHTML += `
          <div class="pray-time-card">
            <div class="cirle">
              <svg>
                <circle cx="100" cy="100" r="100"></circle>
                <div class="pray-time">${timings[time]}</div>
              </svg>
            </div>
            <p class="pray-time-name">${translatePrayTimes(time)}</p>
          </div>
          `;
        }
      }

      function translatePrayTimes(time) {
        if (time === 'Fajr') time = 'الفجر'
        if (time === 'Sunrise') time = 'الشروق'
        if (time === 'Dhuhr') time = 'الظهر'
        if (time === 'Asr') time = 'العصر'
        if (time === 'Sunset') time = 'وقت الغروب'
        if (time === 'Maghrib') time = 'المغرب'
        if (time === 'Isha') time = 'العشاء'
        if (time === 'Imsak') time = 'الإمساك'
        if (time === 'Midnight') time = 'منتصف الليل'
        return time
      }
    })
}

// Get Date
getDate()
function getDate() {
  fetch("https://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt")
    .then(res => res.json())
    .then(data => {
      const date = data.data.date
      const hijriDate = `${date.hijri.day} ${date.hijri.month.ar} ${date.hijri.year} هـ`
      const gregorianDate = `${date.gregorian.month.en} ${date.gregorian.day}, ${date.gregorian.year}`
      getEl('.hijri-date').textContent = hijriDate
      getEl(".gregorian-date").textContent = gregorianDate
    })
}


// Asmaa Allah Al-Husna
const names = getEl(".allah-names")

getNames()
function getNames() {
  fetch(`../json/allah-names.json`)
    .then((res) => res.json())
    .then((data) => {
      names.innerHTML = "";
      data.forEach((e) => {
        names.innerHTML += `
        <p class="name">${e.name}
          <span class="text">${e.text}</span>
        </p>
        <p class="white-space"></p>`;
      });
    });
}

// Al-Azkar
const azkar = getEl(".azkar")

getAzkar()
function getAzkar() {
  fetch(`../json/azkar_api.json`)
    .then((res) => res.json())
    .then((data) => {
      const azkarData = data.data;
      azkar.innerHTML = "";
      azkarData.forEach((e) => {
        azkar.innerHTML += `<div class="zekr" data-text=${e.text} data-audio=${e.audio_url}>${e.title}</div>`;
        getEl(".zekr", 1).forEach((zekr) => {
          zekr.addEventListener("click", () => {
            const zekrText = zekr.dataset.text;
            const zekrAudio = zekr.dataset.audio;
          });
        });
      });
    });
}

// Al-Doaa
const quranDoaa = getEl(".quran-doaa")

getDoaa()
function getDoaa() {
  fetch(`../json/quran-prayers.json`)
    .then(res => res.json())
    .then(data => {
      const prayerData = data.data
      quranDoaa.innerHTML = ''

      prayerData.forEach(prayer => {
        const surah = prayer.surah
        const doaa = prayer.prayer
        
        quranDoaa.innerHTML += `
          <div class="doaa-container">
            <p class="doaa">${doaa}</p>
            <p class="doaa-surah">${surah}</p>
          </div>`
      })
    })
}

// Sajdahs Ayahs
function getSajdahs() {
    fetch('https://api.alquran.cloud/v1/sajda/quran-uthmani')
        .then(res => res.json())
        .then(data => {
            const ayahs = data.data.ayahs
            ayahs.forEach(ayah => {
                console.log(ayah.page)
                console.log(ayah.text)
                console.log(ayah.surah.name)
                console.log(ayah.surah.numberOfAyahs)
            })
        })
}
getSajdahs()