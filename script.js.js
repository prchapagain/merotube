document.addEventListener('DOMContentLoaded', function() {
    var player = videojs('tv-player');

    player.on('play', function() {
        document.getElementById('playing').style.border = '0.1em solid lime';
    });

    player.on('pause', function() {
        document.getElementById('playing').style.border = 'none';
    });

    document.getElementById('channel-list').addEventListener('click', function(event) {
        var target = event.target;
        if (target.tagName.toLowerCase() === 'li') {
            var src = target.getAttribute('data-src');
            player.src({ src: src, type: 'application/x-mpegURL' });
            player.play();
            
            // Remove 'selected-channel' class from all li elements
            document.querySelectorAll('.channel-list li').forEach(function(li) {
                li.classList.remove('selected-channel');
            });
            
            // Add 'selected-channel' class to the clicked li element
            target.classList.add('selected-channel');
        }
    });
});
