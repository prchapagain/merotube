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
    var backButton = document.getElementById('back-button');
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

    function showCategory(category) {
        lastViewedCategory = category;

        if (nepaliChannelList) nepaliChannelList.style.display = category === 'nepali' ? 'grid' : 'none';
        if (hindiChannelList) hindiChannelList.style.display = category === 'hindi' ? 'grid' : 'none';
        if (moviesList) moviesList.style.display = category === 'movies' ? 'grid' : 'none';
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
        console.log('Showing notification'); // Log for debugging
        if (notification) {
            notification.style.display = 'block';
            notification.style.opacity = '1';
            notification.style.visibility = 'visible';

            // Auto-hide after 7 seconds (7000 milliseconds)
            setTimeout(function() {
                hideNotification();
            }, 7000);
        }
    }

    // Function to hide notification
    function hideNotification() {
        console.log('Hiding notification'); // Log for debugging
        if (notification) {
            notification.style.opacity = '0';
            notification.style.visibility = 'hidden';
            
            // Optional: set display to none after hiding for better performance
            setTimeout(function() {
                notification.style.display = 'none';
            }, 700); // Match this timeout with the transition duration
        }
    }

    // Show notification on page load and then hide it after 7 seconds
    showNotification();

    // Show logo when video goes full screen
    player.on('fullscreenchange', function() {
        console.log('Fullscreen change event triggered'); // Log for debugging
        if (fullscreenLogo) {
            if (player.isFullscreen()) {
                console.log('Entering full screen mode'); // Log for debugging
                fullscreenLogo.style.display = 'block';
            } else {
                console.log('Exiting full screen mode'); // Log for debugging
                fullscreenLogo.style.display = 'none';
            }
        }
    });

    // Exit confirmation dialog on back press
    window.addEventListener('popstate', function(event) {
        event.preventDefault();
        showExitDialog();
    });

    function showExitDialog() {
        const confirmation = confirm('Are you sure you want to exit?');
        if (confirmation) {
            window.history.back();
        } else {
            // Push state back to maintain current view
            history.pushState(null, null, window.location.pathname);
        }
    }

    // Push initial state to manage back button functionality
    history.pushState(null, null, window.location.pathname);
});
