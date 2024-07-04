document.addEventListener('DOMContentLoaded', function() {
    var player = videojs('video-player');
    var nepaliChannelList = document.getElementById('nepali-channel-list');
    var hindiChannelList = document.getElementById('hindi-channel-list');
    var moviesList = document.getElementById('movies-list');
    var playerWrapper = document.getElementById('player-wrapper');
    var notification = document.querySelector('.side-text');
    var buttonContainer = document.querySelector('.button-container');
    var nepaliChannelsBtn = document.getElementById('nepali-channels-btn');
    var hindiChannelsBtn = document.getElementById('hindi-channels-btn');
    var moviesBtn = document.getElementById('movies-btn');
    var searchInput = document.getElementById('search-input');
    var searchContainer = document.querySelector('.search-container');
    var content = document.querySelector('.content');
    var fullscreenLogo = document.querySelector('.fullscreen-logo');
    var lastViewedCategory = '';

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
        hideNotification(); // Hide notification when searching
    }

    // Function to filter a list based on query
    function filterList(list, query) {
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

    // Add event listener for search input
    searchInput.addEventListener('input', filterItems);

    // Existing code for category buttons and player controls
    nepaliChannelsBtn.addEventListener('click', function() {
        showCategory('nepali');
    });

    hindiChannelsBtn.addEventListener('click', function() {
        showCategory('hindi');
    });

    moviesBtn.addEventListener('click', function() {
        showCategory('movies');
    });

    function showCategory(category) {
        lastViewedCategory = category;

        nepaliChannelList.style.display = category === 'nepali' ? 'grid' : 'none';
        hindiChannelList.style.display = category === 'hindi' ? 'grid' : 'none';
        moviesList.style.display = category === 'movies' ? 'grid' : 'none';
        hideNotification(); // Ensure notification is hidden
    }

    function addChannelClickListener(channelList) {
        channelList.addEventListener('click', function(event) {
            var target = event.target.closest('li');
            if (target) {
                var src = target.getAttribute('data-src');
                playChannel(src);
            }
        });
    }

    addChannelClickListener(nepaliChannelList);
    addChannelClickListener(hindiChannelList);
    addChannelClickListener(moviesList);

    function playChannel(src) {
        var type = getSourceType(src);
        player.src({
            src: src,
            type: type
        });
        player.play();
        playerWrapper.style.display = 'block';
        searchContainer.style.display = 'none'; // Hide search container
        content.style.display = 'none'; // Hide content
        buttonContainer.style.display = 'none'; // Hide buttons
        hideNotification(); // Ensure notification is hidden
        showLogo(); // Show the logo when the video starts playing
    }

    var backButton = document.getElementById('back-button');
    backButton.addEventListener('click', function() {
        player.pause();
        player.src('');
        playerWrapper.style.display = 'none';
        searchContainer.style.display = 'block'; // Show search container
        showLastViewedCategory();
        content.style.display = 'block'; // Show content
        buttonContainer.style.display = 'block'; // Show buttons
        hideNotification(); // Ensure notification is hidden
        hideLogo(); // Hide the logo when going back
    });

    function showLastViewedCategory() {
        if (lastViewedCategory === 'nepali') {
            nepaliChannelList.style.display = 'grid';
        } else if (lastViewedCategory === 'hindi') {
            hindiChannelList.style.display = 'grid';
        } else if (lastViewedCategory === 'movies') {
            moviesList.style.display = 'grid';
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
        notification.style.display = 'block';
        notification.style.opacity = '1';
        notification.style.visibility = 'visible';

        // Auto-hide after 3 seconds (3000 milliseconds)
        setTimeout(function() {
            hideNotification();
        }, 3000);
    }

    // Function to hide notification
    function hideNotification() {
        notification.style.opacity = '0';
        notification.style.visibility = 'hidden';

        // Optional: set display to none after hiding for better performance
        setTimeout(function() {
            notification.style.display = 'none';
        }, 500); // Match this timeout with the transition duration
    }

    // Show notification on page load and then hide it after 3 seconds
    showNotification();

    // Show logo when video is playing
    function showLogo() {
        fullscreenLogo.style.display = 'block';
    }

    // Hide logo when video is paused or ended
    function hideLogo() {
        fullscreenLogo.style.display = 'none';
    }

    player.on('play', showLogo);
    player.on('pause', hideLogo);
    player.on('ended', hideLogo);

    // Show logo when video goes full screen
    player.on('fullscreenchange', function() {
        if (player.isFullscreen()) {
            fullscreenLogo.style.display = 'block';
        } else {
            fullscreenLogo.style.display = 'none';
        }
    });
});
