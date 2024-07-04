# MeroTV

MeroTV is a simple web-based video player include nepali TV, hindi channel and movies channelthat allows users to switch between different channels. The video player uses Video.js along with HLS (HTTP Live Streaming) support. Users can click on a channel from the list to start streaming the selected channel.

## Features

- Video.js player with HLS support
- Channel list with logos
- Autoplay video when the page loads
- Highlight currently playing channel

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Video.js
- videojs-contrib-hls

## Getting Started

### Prerequisites

To run this project, you need a web browser that supports HTML5 and JavaScript.

### Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/prchapagain/merotv.git
    ```

2. Navigate to the project directory:

    ```bash
    cd merotv
    ```

3. Open the `index.html` file in your web browser.

## Usage

1. Open `index.html` in your web browser.
2. The video player will automatically start playing the default channel.
3. Click on any channel in the list to change the stream.
4. The currently playing channel will be highlighted, and its logo will appear.

## Customization

### Adding New Channels

To add new channels to the list:

1. Open the `index.html` file.
2. Locate the `<ul class="channel-list" id="channel-list">` section.
3. Add a new `<li>` element with the `data-src` attribute set to the URL of the new channel's HLS stream. Include an `<img>` tag for the channel's logo.

Example:

```html
<li data-src="https://example.com/new_channel.m3u8">
    <img src="https://example.com/new_channel_logo.png" alt="New Channel">
    New Channel
</li>
