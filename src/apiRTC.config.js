import apiRTC from '@apirtc/apirtc';

let conversation

// Create a new UserAgent instance with your api key
let ua = new apiRTC.UserAgent({
    uri: 'apzkey:6d1dc8e5150d96dffcc6e0e9a894c33f'
});

// Register UserAgent to create an apiRTC session

export function startRegister() {

}

export function conversations(name) {
    console.log(name)
    //==============================
    // 2/ REGISTER
    //==============================
    ua.register().then((session) => {
        //==============================
        // 3/ CREATE CONVERSATION
        //==============================
        conversation = session.getOrCreateConversation(name, {
            meshModeEnabled: true,
            meshOnlyEnabled: true,
            moderationEnabled: true,
            moderator: true
        });
        console.log(conversation)
        //==========================================================
        // 4/ ADD EVENT LISTENER : WHEN NEW STREAM IS AVAILABLE IN CONVERSATION
        //==========================================================
        conversation.on('streamListChanged', (streamInfo) => {
            console.log("streamListChanged :", streamInfo);
            if (streamInfo.listEventType === 'added') {
                if (streamInfo.isRemote === true) {
                    conversation.subscribeToMedia(streamInfo.streamId)
                        .then((stream) => {
                            console.log('subscribeToMedia success');
                        }).catch((err) => {
                        console.error('subscribeToMedia error', err);
                    });
                }
            }
        });
        //=====================================================
        // 4 BIS/ ADD EVENT LISTENER : WHEN STREAM IS ADDED/REMOVED TO/FROM THE CONVERSATION
        //=====================================================
        conversation.on('streamAdded', (stream) => {
            stream.addInDiv('Two', 'emitter-video' + stream.streamId, {}, false);
        }).on('streamRemoved', (stream) => {
            stream.removeFromDiv('Two', 'emitter-video' + stream.streamId);
        });
        //==============================
        // 5/ CREATE LOCAL STREAM
        //==============================
        ua.createStream({
            constraints: {
                audio: true,
                video: true
            }
        })
            .then((stream) => {
                console.log('createStream :', stream);
                // Save local stream
                let localStream;
                localStream = stream;
                stream.removeFromDiv('One', 'receiver-video');
                stream.addInDiv('One', 'receiver-video', {}, true);
                //==============================
                // 6/ JOIN CONVERSATION
                //==============================
                conversation.join()
                    .then((response) => {
                        //==============================
                        // 7/ PUBLISH LOCAL STREAM
                        //==============================
                        console.log(response)
                        conversation.publish(localStream);
                    }).catch((err) => {
                    console.error('Conversation join error', err);
                });
            }).catch((err) => {
            console.error('create stream error', err);
        });
    });
    return {conversation}

}