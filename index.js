var express = require('express'),
    app = express(),
    http = require('http'),
    socketIO = require('socket.io'),
    server, io;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

server = http.Server(app);
server.listen(5000);

io = socketIO(server);

io.on('connection', function (socket) {
    socket.emit('greeting-from-server', {
        greeting: 'Hello Client'
    });
    socket.on('greeting-from-client', function (message) {
        console.log(message);
    });
    socket.on('receivedPlaylist', function (message) {
        console.log(message);
    })
    socket.on('sendSync', (message) => {
        console.log('send sync');
        socket.emit('syncPlaylist', getPlayList());
    })
    socket.on('login', (message) => {
        console.log('login');
        socket.emit('loggedIn');
    })
    // socket.emit('syncPlaylist', getPlayList());

    socket.on('playingNextUnit', (data) => {
        console.log('playing');
        console.log(data);
    })


    socket.on('setup', (message) => {
        var screen_uuid = message.screen_uuid;
        var partner = message.partner;
        var slot_duration = message.duration;

        // generate the code

        setTimeout(() => {
            socket.emit('verification_code', { 'code': 'code' });
        }, 5000);
        setTimeout(() => {
            socket.emit('recieveSecret', {
                'client_id': 'ci232',
                'client_secret_key': 'secret'
            })
        }, 10000);
    });
});


function getPlayList() {
    return {
        "id": "1",
        "units": [
            {
                "code": "unit12",
                "widget": "video",
                "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                "duration": 7000,
                "fit": "contain",
            },
            // {
            //     "code": "unit1",
            //     "widget": "image",
            //     "url": "/setup_bg.png",
            //     "duration": 5000,
            //     "fit": "cover",
            // },
            {
                "code": "unit4",
                "widget": "image",
                "url": "https://picsum.photos/250?image=13",
                "duration": 4000,
                "fit": "contain",
            },

            // {
            //     "code": "unit11",
            //     "widget": "image",
            //     "url": "https://freshfeeds.in/img_urls/img4.jpg",
            //     "duration": 7500,
            //     "fit": "contain",
            // },
            // {
            //     "code": "unit11",
            //     "widget": "image",
            //     "url": "https://c01.assets.adonmo.media/campaign_media_3297_1717847996.997577",
            //     "duration": 7500,
            //     "fit": "contain",
            // },
            // {
            //     "code": "unit13",
            //     "widget": "image",
            //     "url": "https://s3.ap-south-1.amazonaws.com/adonmo-campaign-assets/campaign_media_3297_1717755166.837189",
            //     "duration": 4000,
            //     "fit": "contain",
            // },
            // {
            //     "code": "unit23",
            //     "widget": "image",
            //     "url": "https://picsum.photos/seed/picsum/200/300",
            //     "duration": 4000,
            //     "fit": "contain",
            // },


            {
                "code": "unit45",
                "widget": "image",
                "url": "https://picsum.photos/250?image=10",
                "duration": 4000,
                "fit": "contain",
            },
            {
                "code": "unit45",
                "widget": "image",
                "url": "https://picsum.photos/250?image=8",
                "duration": 4000,
                "fit": "contain",
            },
            {
                "code": "unit45",
                "widget": "image",
                "url": "https://picsum.photos/250?image=15",
                "duration": 4000,
                "fit": "contain",
            },
            // {
            //     "code": "unit4",
            //     "widget": "video",
            //     "url": "http://192.168.0.135:8000/out_10000k_full.mp4",
            //     "duration": 240000,
            //     "fit": "contain",
            // },
            {
                "code": "unit15",
                "widget": "video",
                "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
                "duration": 10000,
                "fit": "contain",
            },
        ],
    };
}


