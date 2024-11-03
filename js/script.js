document.addEventListener('DOMContentLoaded', function() {
    // Initialize Video.js player
    var player = videojs('video-player');
    var nepaliChannelList = document.getElementById('nepali-channel-list');
    var hindiChannelList = document.getElementById('hindi-channel-list');
    var moviesList = document.getElementById('movies-list');
    var seriesList = document.getElementById('series-list'); // Add series list
    var playerWrapper = document.getElementById('player-wrapper');
    var notification = document.querySelector('.side-text');
    var buttonContainer = document.querySelector('.button-container');
    var nepaliChannelsBtn = document.getElementById('nepali-channels-btn');
    var hindiChannelsBtn = document.getElementById('hindi-channels-btn');
    var moviesBtn = document.getElementById('movies-btn');
    var seriesBtn = document.getElementById('series-btn'); // Add series button
    var searchInput = document.getElementById('search-input');
    var searchContainer = document.querySelector('.search-container');
    var content = document.querySelector('.content');
    var fullscreenLogo = document.querySelector('.fullscreen-logo');
    var backButton = document.getElementById('back-button');
    var lastViewedCategory = '';
    var nepaliChannels = [
        // Nepali channels array
    ];

    var nepaliChannels = [
        {
    src: "https://ktvhdsg.ekantipur.com:8443/high_quality_85840165/hd/playlist.m3u8",
    img: "https://kantipurtv.com/assets/img/ktv-logo.svg",
    text: "Kantipur HD"
},
{
    src: "http://150.107.205.212:1935/live/mithila/playlist.m3u8",
    img: "https://firebasestorage.googleapis.com/v0/b/merotv-f3e97.appspot.com/o/logo_stor%2F1719112505174.jpg?alt=media&token=3bd2ac60-3ba1-4717-b66d-6a5dcda7813a",
    text: "Mithila HD"
},
{
    src: "https://streaming.tvnepal.com:19360/janatatv/janatatv.m3u8",
    img: "https://th.bing.com/th/id/OIP.Sa5GCH4LXL87JtEbbvUzzwHaHn?rs=1&pid=ImgDetMain",
    text: "janata tv"
},
{
    src: "https://ythls.armelin.one/channel/UCMDzPE_7fcZSRJgpwIVor_A.m3u8",
    img: "https://snowberry.prixacdn.net/media/av_vj7ypigi0u9ihjehg71f5bade7hgd5yt4cdzctq5n15poqjutkvavi25gjak.jpeg",
    text: "AVENUES"
},
{
    src: "http://live.divyadarshantv.com/hls/stream.m3u8",
    img: "https://divyadarshantv.com/wp-content/uploads/2020/06/Divya-Darshan_tvlogo.png",
    text: "Divyadarshantv"
},
{
    src: "https://youtu.be/9Q5lNbZw5Qk",
    img: "https://img.youtube.com/vi/9Q5lNbZw5Qk/0.jpg",
    text: "HANUMAN CHALISA"
},
{
    src: "https://np.truestreamz.com/broadcaster/INDIGENOUSmob.stream/playlist.m3u8",
    img: "https://th.bing.com/th/id/OIP.ckz_nK74iMtIXb5UjAHmCQAAAA?w=145&h=100&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    text: "INDIGENOUS"
},
{
    src: "https://webtv-stream.nettv.com.np/broadcaster/Paryawaran.stream/playlist.m3u8",
    img: "https://th.bing.com/th/id/OIP.cpxJy6rZgudspSEEqr8IFQHaHa?w=174&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    text: "Paryawaran Channel"
}
// Add other Nepali channels here...
];

var hindiChannels = [
{
    src: "https://pubads.g.doubleclick.net/ssai/event/JCAm25qkRXiKcK1AJMlvKQ/master.m3u8",
    img: "https://okteve.com/wp-content/uploads/media/050fe3b3bdb50730367e3eede501eaeb.jpeg",
    text: "ZOOM TV"
},
{
    src: "https://cdn-uw2-prod.tsv2.amagi.tv/linear/amg01412-xiaomiasia-yrfmusic-xiaomi/playlist.m3u8",
    img: "https://images.genius.com/279c9c8189f98d5ba38e3b97b2f76915.900x900x1.jpg",
    text: "YRF Music HD"
},
{
    src: "http://d2q8p4pe5spbak.cloudfront.net/bpk-tv/9XM/9XM.isml/index.m3u8",
    img: "https://videoportal.viavilab.com/upload/images/9xm_logo.png",
    text: "9XM Music"
},
{
    src: "http://2hubs.ddns.net:25461/crAig1s/myG32Vd21@/67252#checkedby:iptvlister.com",
    img: "https://origin-staticv2.sonyliv.com/masthead_logo/Sony_TEN1HD_23oct_masthead_logo.png",
    text: "Sony sport"
},
{
    src: "http://2hubs.ddns.net:25461/pachaman/asdfghuytrc/63595#checkedby:iptvlister.com",
    img: "https://th.bing.com/th/id/OIP.Fy8Yb2gHvn-o6vI4L3OhLwAAAA?rs=1&pid=ImgDetMain",
    text: "Sony sport 2"
},
{
    src: "https://d22ljxpuae2sin.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/BayWatch-Canada-prod/playlist.m3u8",
    img: "https://flxt.tmsimg.com/assets/p7892732_b_v8_aa.jpg",
    text: "The BAYWATCH"
},
{
    src: "https://streamer103.neterra.tv/wness/wness_SD.m3u8",
    img: "https://th.bing.com/th/id/OIP.3AXXz8mg3kkpC2coWeWbqgHaHa?rs=1&pid=ImgDetMain",
    text: "Fitness Plus"
},
{
    src: "http://103.72.179.30:1935/GECHindi/SONY.stream_720p/Playlist.m3u8",
    img: "https://upload.wikimedia.org/wikipedia/en/d/de/Sony_TV_new.png",
    text: "SONY TV"
},
{
    src: "https://familyhls.avatv.live/hls/stream.m3u8",
    img: "https://th.bing.com/th/id/R.9e1ec9a3d6fa566a776c1b247cdef5ae?rik=vj%2ffh1%2bprTsyaQ&pid=ImgRaw&r=0",
    text: "The Q"
},
{
    src: "https://denver1769.pages.dev/Discovery/discovery_hd_hindi.m3u8",
    img: "https://th.bing.com/th/id/OIP.GpvM3--bNBNZLwuP07GNawHaFj?rs=1&pid=ImgDetMain",
    text: "Discovery Channel - Hindi"
},
{
    src: "https://d35j504z0x2vu2.cloudfront.net/v1/master/0bc8e8376bd8417a1b6761138aa41c26c7309312/foodfood/master.m3u8",
    img: "https://yt3.ggpht.com/-MlPj8fz7Pwg/AAAAAAAAAAI/AAAAAAAAAAA/t8sJ07Lb6dw/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
    text: "FOOD FOOD"
}
// Add other Hindi channels here...
];

var movies = [
{
    src: "https://www.youtube.com/watch?v=KwMI_u4CSzc",
    img: "https://img.youtube.com/vi/KwMI_u4CSzc/0.jpg",
    text: "लक्का जवान २०२४"
},
{
    src: "https://www.youtube.com/watch?v=7WR3qzB40V8",
    img: "https://img.youtube.com/vi/7WR3qzB40V8/0.jpg",
    text: "कबड्डी ४ - The Final Match"
},
{
    src: "https://www.youtube.com/watch?v=HBljixfMG-0",
    img: "https://img.youtube.com/vi/HBljixfMG-0/0.jpg",
    text: "Yathartha - The Reality"
},
{
    src: "https://www.youtube.com/watch?v=y7vMwo5Iowk",
    img: "https://img.youtube.com/vi/y7vMwo5Iowk/0.jpg",
    text: "Manavta"
},
{
    src: "https://www.youtube.com/watch?v=gBM4IwixICg",
    img: "https://img.youtube.com/vi/gBM4IwixICg/0.jpg",
    text: "Fulbari"
},
{
    src: "https://www.youtube.com/watch?v=vhS4YFaGDCg",
    img: "https://img.youtube.com/vi/vhS4YFaGDCg/0.jpg",
    text: "UK Sweater"
},
{
    src: "https://www.youtube.com/watch?v=TMQ0aqljWG4",
    img: "https://img.youtube.com/vi/TMQ0aqljWG4/0.jpg",
    text: "Appa"
},
{
    src: "https://www.youtube.com/watch?v=442Aw7Dj_2w",
    img: "https://img.youtube.com/vi/442Aw7Dj_2w/0.jpg",
    text: "Sano Mann"
},
{
    src: "https://www.youtube.com/watch?v=zOuQfyvw4mM",
    img: "https://img.youtube.com/vi/zOuQfyvw4mM/0.jpg",
    text: "A Mero Hajur 4"
},
{
    src: "https://www.youtube.com/watch?v=lgnmYWl26SY",
    img: "https://img.youtube.com/vi/lgnmYWl26SY/0.jpg",
    text: "Dui Numbari"
},
{
    src: "https://www.youtube.com/watch?v=xHbyrAIPn3Y",
    img: "https://img.youtube.com/vi/xHbyrAIPn3Y/0.jpg",
    text: "Ghampani"
}
// Add other movies here...
];


var series = [
    {
        src: "https://www.youtube.com/watch?v=ZLmJgjY8FOo",
        img: "https://th.bing.com/th?id=ODL.cca1d0426a7460477927487ee3d72e53&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1",
        text: "Sapne Vs Zimmedari EP-1"
    },

{
        src: "https://www.youtube.com/watch?v=ypN1PSk3kpw",
        img: "https://th.bing.com/th?id=ODL.cca1d0426a7460477927487ee3d72e53&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1",
        text: "Sapne Vs Zimmedari EP-2"
    },
{
        src: "https://www.youtube.com/watch?v=p2-m37D0phk",
        img: "https://th.bing.com/th?id=ODL.cca1d0426a7460477927487ee3d72e53&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1",
        text: "Sapne Vs Zimmedari EP-3"
    },
{
        src: "https://www.youtube.com/watch?v=0I9NkFoFEd8",
        img: "https://th.bing.com/th?id=ODL.cca1d0426a7460477927487ee3d72e53&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1",
        text: "Sapne Vs Zimmedari EP-4"
    },

{
        src: "https://www.youtube.com/watch?v=ADdPLjzxGDE",
        img: "https://th.bing.com/th?id=ODL.cca1d0426a7460477927487ee3d72e53&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1",
        text: "Sapne Vs Zimmedari EP-5"
    },

];

    // Function to create list items from data
    function createListItems(listId, items) {
        var list = document.getElementById(listId);
        list.innerHTML = ''; // Clear existing items
        items.forEach(function(item) {
            var li = document.createElement('li');
            li.setAttribute('data-src', item.src);

            var img = document.createElement('img');
            img.setAttribute('src', item.img);
            img.setAttribute('alt', item.text);
            li.appendChild(img);

            var div = document.createElement('div');
            div.textContent = item.text;
            li.appendChild(div);

            list.appendChild(li);
        });
    }

    createListItems('nepali-channel-list', nepaliChannels);
    createListItems('hindi-channel-list', hindiChannels);
    createListItems('movies-list', movies);
    createListItems('series-list', series); // Create series list items
    hindiChannelList.style.display = 'none';
    moviesList.style.display = 'none';
    seriesList.style.display = 'none'; // Hide series list initially

    // Disable right-click
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });

    // Disable inspect and developer tools
    document.addEventListener('keydown', function(event) {
        if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
            event.preventDefault();
        }
    });

    document.addEventListener('mousedown', function(event) {
        if (event.button === 2) { // Right mouse button
            event.preventDefault();
        }
    });

    // Function to filter items based on search input
    function filterItems() {
        var query = searchInput.value.toLowerCase();
        filterList(nepaliChannelList, query);
        filterList(hindiChannelList, query);
        filterList(moviesList, query);
        filterList(seriesList, query); // Add series list to filter
        hideNotification(); // Hide notification when searching
    }

    // Function to filter a list based on query
    function filterList(list, query) {
        if (list) {
            var items = list.getElementsByTagName('li');
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var text = item.textContent.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            }
        }
    }

    // Add event listener for search input
    if (searchInput) {
        searchInput.addEventListener('input', filterItems);
    }

    // Event listeners for category buttons
    if (nepaliChannelsBtn) {
        nepaliChannelsBtn.addEventListener('click', function() {
            showCategory('nepali');
        });
    }

    if (hindiChannelsBtn) {
        hindiChannelsBtn.addEventListener('click', function() {
            showCategory('hindi');
        });
    }

    if (moviesBtn) {
        moviesBtn.addEventListener('click', function() {
            showCategory('movies');
        });
    }

    if (seriesBtn) {
        seriesBtn.addEventListener('click', function() {
            showCategory('series');
        });
    }

    function showCategory(category) {
        lastViewedCategory = category;

        if (nepaliChannelList) nepaliChannelList.style.display = category === 'nepali' ? 'grid' : 'none';
        if (hindiChannelList) hindiChannelList.style.display = category === 'hindi' ? 'grid' : 'none';
        if (moviesList) moviesList.style.display = category === 'movies' ? 'grid' : 'none';
        if (seriesList) seriesList.style.display = category === 'series' ? 'grid' : 'none'; // Show/hide series list
        hideNotification(); // Ensure notification is hidden
    }

    function addChannelClickListener(channelList) {
        if (channelList) {
            channelList.addEventListener('click', function(event) {
                var target = event.target.closest('li');
                if (target) {
                    var src = target.getAttribute('data-src');
                    playChannel(src);
                }
            });
        }
    }

    addChannelClickListener(nepaliChannelList);
    addChannelClickListener(hindiChannelList);
    addChannelClickListener(moviesList);
    addChannelClickListener(seriesList); // Add click listener for series list

    function playChannel(src) {
        var type = getSourceType(src);
        player.src({
            src: src,
            type: type
        });
        player.play();
        if (playerWrapper) playerWrapper.style.display = 'block';
        if (searchContainer) searchContainer.style.display = 'none'; // Hide search container
        if (content) content.style.display = 'none'; // Hide content
        if (buttonContainer) buttonContainer.style.display = 'none'; // Hide buttons
        hideNotification(); // Ensure notification is hidden
    }

    if (backButton) {
        backButton.addEventListener('click', function() {
            player.pause();
            player.src('');
            if (playerWrapper) playerWrapper.style.display = 'none';
            if (searchContainer) searchContainer.style.display = 'block'; // Show search container
            showLastViewedCategory();
            if (content) content.style.display = 'block'; // Show content
            if (buttonContainer) buttonContainer.style.display = 'block'; // Show buttons
            hideNotification(); // Ensure notification is hidden
        });
    }

    function showLastViewedCategory() {
        if (lastViewedCategory === 'nepali' && nepaliChannelList) {
            nepaliChannelList.style.display = 'grid';
        } else if (lastViewedCategory === 'hindi' && hindiChannelList) {
            hindiChannelList.style.display = 'grid';
        } else if (lastViewedCategory === 'movies' && moviesList) {
            moviesList.style.display = 'grid';
        } else if (lastViewedCategory === 'series' && seriesList) {
            seriesList.style.display = 'grid';
        }
    }

    function getSourceType(src) {
        if (src.includes('youtube.com') || src.includes('youtu.be')) {
            return 'video/youtube';
        } else if (src.endsWith('.m3u8')) {
            return 'application/x-mpegURL';
        } else {
            return 'video/mp4';
        }
    }

    // Function to show notification
    function showNotification() {
        console.log('Notification function called'); // Debugging log
        if (notification) {
            notification.style.display = 'block';
        } else {
            console.error('Notification element not found');
        }
    }

    // Function to hide notification
    function hideNotification() {
        console.log('Hide notification function called'); // Debugging log
        if (notification) {
            notification.style.display = 'none';
        } else {
            console.error('Notification element not found');
        }
    }

    // Show notification on initial load
    showNotification();
});
