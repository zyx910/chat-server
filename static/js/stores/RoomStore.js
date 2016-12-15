import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class RoomStore extends EventEmitter {
    constructor() {
        super();
        this.rooms = [];
    }

    getAll() {
        return this.rooms;
    }

    matchUser(data) {
        console.log('data from matchUser', data);
        for (var i = 0; i < this.rooms.length; i++) {
            if (data.room === this.rooms[i].room) {
                console.log('This room has already been there.');
                return;
            }
        }
        if (localStorage.name === data.inviter ||
            localStorage.name === data.guest) {
            console.log('Ready to make a new room out!!!');
            this.rooms.push(data);
            this.emit('addNewRoom', data);
        }
    }

    handleActions(action) {
        switch(action.type) {
            case 'MATCH_USER': {
                this.matchUser(action.data);
            }
        }
    }
}

const roomStore = new RoomStore;
dispatcher.register(roomStore.handleActions.bind(roomStore));
export default roomStore;