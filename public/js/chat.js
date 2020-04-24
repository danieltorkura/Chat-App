const socket = io()

// Elements
const form = document.querySelector('#click')
const formInput = form.querySelector('input')
const buttonMessage = form.querySelector('button')
const locationButton = document.querySelector('#send-location')
const messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML


// Options

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })


socket.on('message', (welcome) => {
    console.log(welcome)
    const html = Mustache.render(messageTemplate, {
        username: welcome.username,
        message: welcome.text,
        createdAt: moment(welcome.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (url) => {
    console.log(url)
    const html = Mustache.render(locationTemplate, {
        username = url.username,
        link: url.url,
        createdAt: moment(url.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend', html)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    // disable
    buttonMessage.setAttribute('disabled', 'disabled')    
    
    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {
        // enable
        buttonMessage.removeAttribute('disabled')
        formInput.value = ''
        formInput.focus()
        if(error) {
            return console.log(error)
        }
        console.log('The message was delivered')
    })
})


locationButton.addEventListener('click', () => {
    locationButton.setAttribute('disabled', 'disabled')
    if(!navigator.geolocation) {
        return alert('Not supported by browser')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Location shared!')
            locationButton.removeAttribute('disabled')
        })
    })
})

socket.emit('join', {username, room}, (error) => {
    if(error) {
        alert(error)
        location.href = '/'
    }
})